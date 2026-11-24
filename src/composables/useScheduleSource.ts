import type { MaybeRefOrGetter, Ref, ShallowRef } from 'vue';
import { getCurrentScope, onScopeDispose, ref, shallowRef, toValue, watch } from 'vue';
/** Optional per-instance memory cache. The key must include source, scope, range, filters and timezone. */
export function useScheduleSource<T>(options: {
    key: MaybeRefOrGetter<string>;
    load: (signal: AbortSignal) => Promise<T>;
    initial?: T;
    staleTime?: number;
    maxEntries?: number;
    immediate?: boolean;
}): {
    data: ShallowRef<T | undefined>;
    loading: Ref<boolean>;
    error: ShallowRef<unknown>;
    refresh: (force?: boolean) => Promise<T | undefined>;
    invalidate: (key?: string) => void;
    dispose: () => void;
} {
    const data = shallowRef<T | undefined>(options.initial),
        loading = ref(false),
        error = shallowRef<unknown>();
    const cache = new Map<string, { value: T; at: number }>();
    let active:
        { key: string; controller: AbortController; promise: Promise<T | undefined> } | undefined;
    let revision = 0,
        disposed = false;
    function refresh(force = true): Promise<T | undefined> {
        if (disposed) return Promise.resolve(undefined);
        const key = toValue(options.key),
            stored = cache.get(key);
        if (!force && active?.key === key) return active.promise;
        active?.controller.abort();
        const current = ++revision;
        error.value = undefined;
        if (!force && stored && Date.now() - stored.at < (options.staleTime ?? 60000)) {
            data.value = stored.value;
            loading.value = false;
            active = undefined;
            return Promise.resolve(stored.value);
        }
        const controller = new AbortController();
        loading.value = true;
        const promise = Promise.resolve()
            .then(() => options.load(controller.signal))
            .then((value) => {
                if (disposed || controller.signal.aborted || current !== revision) return undefined;
                cache.delete(key);
                cache.set(key, { value, at: Date.now() });
                while (cache.size > Math.max(1, options.maxEntries ?? 24))
                    cache.delete(cache.keys().next().value!);
                data.value = value;
                return value;
            })
            .catch((cause) => {
                if (!controller.signal.aborted && current === revision && !disposed)
                    error.value = cause;
                return undefined;
            })
            .finally(() => {
                if (current === revision && !disposed) {
                    loading.value = false;
                    active = undefined;
                }
            });
        active = { key, controller, promise };
        return promise;
    }
    function invalidate(key?: string) {
        if (key === undefined) cache.clear();
        else cache.delete(key);
        if (key === undefined || key === toValue(options.key)) {
            active?.controller.abort();
            active = undefined;
            revision++;
            loading.value = false;
        }
    }
    const stop = watch(
        () => toValue(options.key),
        () => {
            void refresh(false);
        },
        { immediate: options.immediate !== false, flush: 'sync' },
    );
    function dispose() {
        disposed = true;
        revision++;
        active?.controller.abort();
        active = undefined;
        loading.value = false;
        cache.clear();
        stop();
    }
    if (getCurrentScope()) onScopeDispose(dispose);
    return { data, loading, error, refresh, invalidate, dispose };
}
