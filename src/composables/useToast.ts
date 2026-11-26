import type {
    ToastContent,
    ToastId,
    ToastOptions,
    ToastType,
    ToastPromiseOptions,
} from '../components/toast/types';
import type { MaybeRefOrGetter } from 'vue';
import { toValue, watch } from 'vue';
import { toast, dismissToastFrom } from '../components/toast/toast';
export type PageToastStatus = 'info' | 'success' | 'warning' | 'error';
export interface PageToast {
    id: string;
    status: PageToastStatus;
    title: string;
    description: string | null;
    duration: number | null;
    closable: boolean;
}
export interface UseToastOptions {
    /** Default target for local notifications and page toasts; per-call toasterId overrides it. */
    toasterId?: MaybeRefOrGetter<string | undefined>;
    /** Pass a getter from the host's Inertia page; no application layout is assumed. */
    pageToasts?: MaybeRefOrGetter<readonly PageToast[] | undefined>;
    immediate?: boolean;
}
/** Install once in a persistent layout to consume page toasts, or call anywhere for local notifications. */
export function useToast(options: UseToastOptions = {}) {
    const displayed = new Set<string>();
    const withHost = (data: ToastOptions = {}) => ({
        toasterId: toValue(options.toasterId),
        ...data,
    });
    function pushToast(item: PageToast): void {
        if (typeof window === 'undefined') return;
        const title = item.title.trim();
        if (!title) return;
        toast[item.status](
            title,
            withHost({
                id: item.id,
                description: item.description ?? undefined,
                duration: item.duration ?? Infinity,
                closeButton: item.closable,
                dismissible: item.closable,
            }),
        );
    }
    function pushPageToasts(items: readonly PageToast[] = toValue(options.pageToasts) ?? []): void {
        for (const item of items) {
            if (displayed.has(item.id) || !item.title.trim()) continue;
            displayed.add(item.id);
            pushToast(item);
            if (displayed.size > 500) displayed.delete(displayed.values().next().value!);
        }
    }
    if (options.pageToasts)
        watch(
            () => toValue(options.pageToasts),
            (items) => pushPageToasts(items ?? []),
            { immediate: options.immediate ?? true, deep: true },
        );
    return {
        pushToast,
        pushPageToasts,
        success: (title: ToastContent, data?: ToastOptions) => toast.success(title, withHost(data)),
        warning: (title: ToastContent, data?: ToastOptions) => toast.warning(title, withHost(data)),
        error: (title: ToastContent, data?: ToastOptions) => toast.error(title, withHost(data)),
        info: (title: ToastContent, data?: ToastOptions) => toast.info(title, withHost(data)),
        message: (title: ToastContent, data?: ToastOptions) => toast.message(title, withHost(data)),
        loading: (title: ToastContent, data?: ToastOptions) => toast.loading(title, withHost(data)),
        promise: <T>(task: Promise<T> | (() => Promise<T>), data: ToastPromiseOptions<T>) =>
            toast.promise(task, {
                ...data,
                toasterId: data.toasterId ?? toValue(options.toasterId),
            }),
        update: (id: ToastId, data: ToastOptions & { type?: ToastType }) =>
            toast.update(id, { ...withHost(data), type: data.type }),
        dismiss: (id?: ToastId) =>
            options.toasterId === undefined
                ? toast.dismiss(id)
                : dismissToastFrom(toValue(options.toasterId), id),
    };
}
/** Compatibility name for existing MIRU imports; supply pageToasts from the layout. */
export const useToaster = useToast;
