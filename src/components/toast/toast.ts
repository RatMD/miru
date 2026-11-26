import type {
    ToastContent,
    ToastId,
    ToastNotification,
    ToastOptions,
    ToastPromiseHandle,
    ToastPromiseOptions,
    ToastType,
} from './types';
import type { GlobalToastManager } from 'reka-ui';
import type { Component } from 'vue';
import { createToastManager } from 'reka-ui';
import { isVNode } from 'vue';

export interface ToastRecord {
    notification: ToastNotification;
    custom?: Component;
    closed: boolean;
    reason: 'dismiss' | 'auto';
}
interface ToastChannel {
    manager: GlobalToastManager<ToastRecord>;
    records: Map<string, ToastRecord>;
    hosts: number;
    defaults?: () => ToastOptions | undefined;
}
const channels = new Map<string | undefined, ToastChannel>();
let sequence = 0;
function channelFor(id?: string): ToastChannel {
    let channel = channels.get(id);
    if (!channel) {
        channel = { manager: createToastManager<ToastRecord>(), records: new Map(), hosts: 0 };
        channels.set(id, channel);
    }
    return channel;
}
/** Internal: one Reka provider/store per named Miru host. */
export function acquireToastChannel(id?: string, defaults?: () => ToastOptions | undefined) {
    if (typeof window === 'undefined')
        return { manager: createToastManager<ToastRecord>(), release: () => {} };
    const channel = channelFor(id);
    channel.defaults = defaults;
    channel.hosts++;
    return {
        manager: channel.manager,
        release: () => {
            if (--channel.hosts === 0) {
                channel.records.clear();
                if (channels.get(id) === channel) channels.delete(id);
            }
        },
    };
}
function plain(value: ToastContent | undefined) {
    return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
}
function defined<T extends object>(value: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(value).filter(([, entry]) => entry !== undefined),
    ) as Partial<T>;
}
function payload(record: ToastRecord) {
    const item = record.notification;
    return {
        title: plain(item.title),
        description: plain(item.description),
        status: item.type,
        duration: item.duration,
        data: record,
    };
}
function publish(
    type: ToastType,
    title: ToastContent,
    options: ToastOptions = {},
    custom?: Component,
): ToastId {
    const id = options.id ?? `miru-toast-${++sequence}`;
    // Never retain module-level notification data between SSR requests.
    if (typeof window === 'undefined') return id;
    const channel = channelFor(options.toasterId);
    const key = String(id);
    const previous = channel.records.get(key);
    const record: ToastRecord = {
        notification: {
            ...(!previous?.closed ? previous?.notification : {}),
            ...defined(options),
            id,
            title,
            type,
        },
        custom,
        closed: false,
        reason: 'auto',
    };
    channel.records.set(key, record);
    channel.manager.add({
        id: key,
        ...payload(record),
        onClose: () => {
            const current = channel.records.get(key);
            if (!current || current.closed) return;
            current.closed = true;
            const notification = {
                ...channel.defaults?.(),
                ...defined(current.notification),
            } as ToastNotification;
            (current.reason === 'auto' ? notification.onAutoClose : notification.onDismiss)?.(
                notification,
            );
        },
        onRemove: () => {
            if (channel.records.get(key)?.closed) channel.records.delete(key);
        },
    });
    return id;
}
function updateIn(channel: ToastChannel, id: ToastId, patch: ToastOptions & { type?: ToastType }) {
    const key = String(id),
        previous = channel.records.get(key);
    if (!previous || previous.closed) return;
    const record = {
        ...previous,
        notification: { ...previous.notification, ...defined(patch), id: previous.notification.id },
    };
    channel.records.set(key, record);
    // add(existing id) restarts the lifetime, including loading -> success updates.
    channel.manager.add({ id: key, ...payload(record) });
}
function update(id: ToastId, patch: ToastOptions & { type?: ToastType }) {
    for (const channel of channels.values()) {
        if (patch.toasterId !== undefined && channel !== channels.get(patch.toasterId)) continue;
        updateIn(channel, id, patch);
    }
    return id;
}
function dismiss(id?: ToastId) {
    for (const channel of channels.values()) {
        for (const [key, record] of channel.records)
            if (id === undefined || key === String(id)) record.reason = 'dismiss';
        channel.manager.close(id === undefined ? undefined : String(id));
    }
    return id;
}
/** Internal: dismiss only notifications belonging to a configured host. */
export function dismissToastFrom(toasterId: string | undefined, id?: ToastId) {
    const channel = channels.get(toasterId);
    if (channel) {
        for (const [key, record] of channel.records)
            if (id === undefined || key === String(id)) record.reason = 'dismiss';
        channel.manager.close(id === undefined ? undefined : String(id));
    }
    return id;
}
/** Internal: classify a user interaction before Reka closes the managed toast. */
export function markToastDismissed(toasterId: string | undefined, id: ToastId) {
    const record = channels.get(toasterId)?.records.get(String(id));
    if (record) record.reason = 'dismiss';
}
async function resolveState<T>(
    state: ToastPromiseOptions<T>['success'],
    value: T,
): Promise<ToastOptions | undefined> {
    if (state === undefined) return undefined;
    const resolved = typeof state === 'function' ? await state(value) : state;
    return typeof resolved === 'object' &&
        resolved !== null &&
        !Array.isArray(resolved) &&
        !isVNode(resolved)
        ? { ...resolved, title: resolved.message ?? resolved.title }
        : { title: resolved as ToastContent };
}
function promise<T>(
    task: Promise<T> | (() => Promise<T>),
    options: ToastPromiseOptions<T>,
): ToastPromiseHandle<T> {
    const id = publish('loading', options.loading ?? '', options);
    const channel = typeof window === 'undefined' ? undefined : channels.get(options.toasterId);
    const operation = Promise.resolve()
        .then(() => (typeof task === 'function' ? task() : task))
        .then(
            async (value) => {
                const state = await resolveState(options.success, value);
                if (channel) {
                    if (state) updateIn(channel, id, { ...state, type: 'success' });
                    else {
                        const record = channel.records.get(String(id));
                        if (record) record.reason = 'dismiss';
                        channel.manager.close(String(id));
                    }
                }
                return value;
            },
            async (cause) => {
                const state = await resolveState(options.error, cause);
                if (channel) {
                    if (state) updateIn(channel, id, { ...state, type: 'error' });
                    else {
                        const record = channel.records.get(String(id));
                        if (record) record.reason = 'dismiss';
                        channel.manager.close(String(id));
                    }
                }
                throw cause;
            },
        )
        .finally(options.finally);
    // Fire-and-forget notifications must not create an unhandled rejection.
    // Awaiting the returned promise / unwrap() still returns or throws the original result.
    void operation.catch(() => {
        if (channel?.records.get(String(id))?.notification.type === 'loading')
            channel.manager.close(String(id));
    });
    return Object.assign(operation, { id, unwrap: () => operation });
}
const message = (title: ToastContent, options?: ToastOptions) => publish('message', title, options);
export const toast = Object.assign(message, {
    message,
    success: (title: ToastContent, options?: ToastOptions) => publish('success', title, options),
    info: (title: ToastContent, options?: ToastOptions) => publish('info', title, options),
    warning: (title: ToastContent, options?: ToastOptions) => publish('warning', title, options),
    error: (title: ToastContent, options?: ToastOptions) => publish('error', title, options),
    loading: (title: ToastContent, options?: ToastOptions) => publish('loading', title, options),
    custom: (component: Component, options?: ToastOptions) =>
        publish('message', options?.title ?? '', options, component),
    promise,
    update,
    dismiss,
    getActiveToasts: () =>
        [...channels.values()].flatMap((channel) =>
            [...channel.records.values()]
                .filter((record) => !record.closed)
                .map((record) => ({ ...record.notification })),
        ),
});
