import type { MaybeRefOrGetter } from 'vue';
import { toValue, watch } from 'vue';
import { toast as sonner } from 'vue-sonner';
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
    /** Pass a getter from the host's Inertia page; no application layout is assumed. */
    pageToasts?: MaybeRefOrGetter<readonly PageToast[] | undefined>;
    immediate?: boolean;
}
/** Install once in a persistent layout to consume page toasts, or call anywhere for local notifications. */
export function useToast(options: UseToastOptions = {}) {
    const displayed = new Set<string>();
    function pushToast(item: PageToast): void {
        if (typeof window === 'undefined') return;
        const title = item.title.trim();
        if (!title) return;
        sonner[item.status](title, {
            id: item.id,
            description: item.description ?? undefined,
            duration: item.duration ?? Infinity,
            closeButton: item.closable,
        });
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
        success: sonner.success,
        warning: sonner.warning,
        error: sonner.error,
        info: sonner.info,
        message: sonner.message,
        loading: sonner.loading,
        promise: sonner.promise,
        dismiss: sonner.dismiss,
    };
}
/** Compatibility name for existing MIRU imports; supply pageToasts from the layout. */
export const useToaster = useToast;
