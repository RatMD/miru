import type { Payload } from '../support/request';
import type {
    MiruAdapter,
    NavigationAdapter,
    FormAdapter,
    FormAdapterContext,
    FormServerErrors,
} from '../types/adapters';
import { toFormData } from '../support/formdata';
import { request } from '../support/request';

export type AjaxFormOptions = Omit<RequestInit, 'body' | 'method'>;

function containsBlob(value: unknown, seen = new WeakSet<object>()): boolean {
    if (typeof Blob !== 'undefined' && value instanceof Blob) return true;
    if (!value || typeof value !== 'object' || seen.has(value)) return false;
    seen.add(value);
    return Object.values(value).some((child) => containsBlob(child, seen));
}

function requestPayload(context: FormAdapterContext): Payload {
    const multipart = context.payload instanceof FormData;
    if (context.method === 'get') {
        const data = multipart
            ? (context.payload as FormData)
            : toFormData(context.payload as Record<string, unknown>);
        const query = new URLSearchParams();
        for (const [key, value] of data) {
            if (typeof value !== 'string')
                throw new TypeError('Files cannot be submitted using GET.');
            query.append(key, value);
        }
        return query;
    }
    return multipart || !containsBlob(context.payload)
        ? context.payload
        : toFormData(context.payload as Record<string, unknown>);
}

/** Recognize Laravel-style errors and Miru error envelopes without treating arbitrary objects as errors. */
function fieldErrors(value: unknown): FormServerErrors | undefined {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return;
    const record = value as Record<string, unknown>;
    const entries = Object.values(record);
    if (
        entries.length &&
        entries.every(
            (entry) =>
                typeof entry === 'string' ||
                (Array.isArray(entry) && entry.every((message) => typeof message === 'string')),
        )
    ) {
        return record as FormServerErrors;
    }
}

/** Plain fetch/AJAX transport through Miru's request helper; no Inertia runtime is imported. */
export function createAjaxFormAdapter(defaults: AjaxFormOptions = {}): FormAdapter {
    return {
        async submit(context) {
            const options = (context.options ?? {}) as AjaxFormOptions;
            const headers = new Headers({
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            });
            new Headers(defaults.headers).forEach((value, name) => headers.set(name, value));
            new Headers(options.headers).forEach((value, name) => headers.set(name, value));
            const payload = requestPayload(context);
            if (payload instanceof FormData) headers.delete('Content-Type');
            const result = await request(context.url, payload, {
                ...defaults,
                ...options,
                headers,
                method: context.method,
                preserveErrorDetails: true,
            });
            if (result.status === 'success') return result;
            const details = result.details;
            const declaredServer =
                !!details &&
                typeof details === 'object' &&
                'source' in details &&
                details.source === 'server';
            const errors = fieldErrors(
                details && typeof details === 'object' && 'errors' in details
                    ? details.errors
                    : undefined,
            );
            return {
                status: 'error',
                message: result.message,
                source:
                    result.httpStatus && result.httpStatus >= 500
                        ? 'transport'
                        : errors || declaredServer || (result.httpStatus && result.httpStatus < 500)
                          ? 'server'
                          : 'transport',
                errors,
            };
        },
    };
}

/** Normal browser page visits and AJAX mutations, without a router dependency. */
function createAjaxNavigationAdapter(defaults: AjaxFormOptions = {}): NavigationAdapter {
    return {
        visit(url, options = {}) {
            if (!options.method || options.method === 'get') {
                const target = new URL(url, window.location.href);
                if (options.data) {
                    const query = new URLSearchParams();
                    for (const [key, value] of toFormData(options.data)) {
                        if (typeof value !== 'string') {
                            throw new TypeError('Files cannot be submitted using GET.');
                        }
                        query.append(key, value);
                    }
                    for (const key of new Set(query.keys())) {
                        target.searchParams.delete(key);
                    }
                    for (const [key, value] of query) {
                        target.searchParams.append(key, value);
                    }
                }
                if (options.replace) {
                    window.location.replace(target.href);
                } else {
                    window.location.assign(target.href);
                }
                return;
            }

            void (async () => {
                try {
                    options.onStart?.();
                    const result = await createAjaxFormAdapter(defaults).submit({
                        method: options.method!,
                        url,
                        values: options.data ?? {},
                        payload: options.data ?? {},
                        cancelledMessage: 'Request cancelled',
                        unprocessedMessage: 'Request did not complete',
                    });
                    if (result.status === 'error') {
                        options.onError?.(result);
                    } else {
                        options.onSuccess?.();
                        window.location.reload();
                    }
                } catch (error) {
                    options.onError?.(error);
                } finally {
                    options.onFinish?.();
                }
            })();
        },
    };
}

const browserNavigation = createAjaxNavigationAdapter();
export { browserNavigation, createAjaxNavigationAdapter };
export type { NavigationAdapter, NavigationOptions } from '../types/adapters';

/** Default transport for JSON forms, browser navigation and AJAX table mutations. */
export function ajaxAdapter(options: AjaxFormOptions = {}): MiruAdapter {
    return {
        formAdapter: 'ajax',
        formAdapters: { ajax: createAjaxFormAdapter(options) },
        navigation: createAjaxNavigationAdapter(options),
    };
}
