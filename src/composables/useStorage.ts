import {
    getCurrentInstance,
    getCurrentScope,
    onMounted,
    onScopeDispose,
    readonly,
    shallowRef,
} from 'vue';

export interface StorageOptions {
    prefix?: string;
    session?: boolean;
    /** An explicit engine can also be used outside a browser. */
    storage?: Storage;
    window?: Window | null;
    onError?: (error: Error) => void;
}
export type StorageChangeCallback = (value: unknown, oldValue: unknown, key: string) => void;

// Notify other instances in this tab; native storage events only arrive in other documents.
const subscribers = new WeakMap<Storage, Set<() => void>>();

/** A namespaced reactive store. Browser storage is read after mount in component setup. */
export function useStorage(prefix?: string, session?: boolean): ReturnType<typeof createStorage>;
export function useStorage(options?: StorageOptions): ReturnType<typeof createStorage>;
export function useStorage(prefixOrOptions: string | StorageOptions = 'miru', session = false) {
    return createStorage(
        typeof prefixOrOptions === 'string'
            ? { prefix: prefixOrOptions, session }
            : prefixOrOptions,
    );
}

function createStorage(options: StorageOptions) {
    const prefix = (options.prefix ?? 'miru').replace(/:+$/, '');
    const namespace = prefix ? `${prefix}:` : '';
    const host =
        options.window === undefined
            ? typeof window === 'undefined'
                ? null
                : window
            : options.window;
    const data = shallowRef<Record<string, unknown>>(Object.create(null));
    const error = shallowRef<Error | null>(null);
    const persistent = shallowRef(false);
    const memory = new Map<string, string>();
    const listeners = new Set<StorageChangeCallback>();
    let engine: Storage | undefined;
    let stopSync: (() => void) | undefined;
    let initialized = false;
    let disposed = false;

    function fail(reason: unknown) {
        error.value = reason instanceof Error ? reason : new Error(String(reason));
        options.onError?.(error.value);
    }
    function decode(raw: string): unknown {
        try {
            return JSON.parse(raw);
        } catch {
            return raw;
        }
    }
    function keyName(key: string) {
        return namespace && key.startsWith(namespace) ? key.slice(namespace.length) : key;
    }
    function refresh() {
        if (disposed) return;
        const next: Record<string, unknown> = Object.create(null);
        try {
            const keys = engine
                ? Array.from({ length: engine.length }, (_, i) => engine!.key(i)).filter(
                      (key): key is string => key !== null,
                  )
                : [...memory.keys()];
            for (const key of keys) {
                if (!key.startsWith(namespace)) continue;
                const raw = engine ? engine.getItem(key) : memory.get(key);
                if (raw != null) next[key.slice(namespace.length)] = decode(raw);
            }
            const previous = data.value;
            data.value = next;
            for (const key of new Set([...Object.keys(previous), ...Object.keys(next)])) {
                if (JSON.stringify(previous[key]) !== JSON.stringify(next[key])) {
                    for (const callback of listeners)
                        callback(next[key] ?? null, previous[key] ?? null, key);
                }
            }
        } catch (reason) {
            fail(reason);
        }
    }
    function start() {
        if (initialized || disposed) return;
        initialized = true;
        try {
            engine =
                options.storage ??
                (host ? (options.session ? host.sessionStorage : host.localStorage) : undefined);
            persistent.value = !!engine;
        } catch (reason) {
            fail(reason);
        }
        if (engine) {
            let callbacks = subscribers.get(engine);
            if (!callbacks) subscribers.set(engine, (callbacks = new Set()));
            callbacks.add(refresh);
            const onStorage = (event: StorageEvent) => {
                if (
                    event.storageArea === engine &&
                    (event.key === null || event.key.startsWith(namespace))
                )
                    refresh();
            };
            host?.addEventListener('storage', onStorage);
            stopSync = () => {
                callbacks.delete(refresh);
                host?.removeEventListener('storage', onStorage);
            };
        }
        refresh();
    }
    function changed() {
        error.value = null;
        if (engine) for (const callback of subscribers.get(engine) ?? []) callback();
        else refresh();
    }
    function get<T = unknown>(key: string, fallback: T | null = null): T | null {
        return Object.hasOwn(data.value, keyName(key)) ? (data.value[keyName(key)] as T) : fallback;
    }
    function has(key: string) {
        return Object.hasOwn(data.value, keyName(key));
    }
    function set(key: string, value: unknown): boolean {
        if (disposed) return false;
        start();
        try {
            const raw = JSON.stringify(value);
            if (raw === undefined) throw new TypeError('Storage values must be JSON serializable.');
            const fullKey = namespace + keyName(key);
            if (engine) engine.setItem(fullKey, raw);
            else memory.set(fullKey, raw);
            changed();
            return true;
        } catch (reason) {
            fail(reason);
            return false;
        }
    }
    function remove(key: string): boolean {
        if (disposed) return false;
        start();
        try {
            const fullKey = namespace + keyName(key);
            if (engine) engine.removeItem(fullKey);
            else memory.delete(fullKey);
            changed();
            return true;
        } catch (reason) {
            fail(reason);
            return false;
        }
    }
    function clear(): boolean {
        if (disposed) return false;
        start();
        refresh();
        return Object.keys(data.value).map(remove).every(Boolean);
    }
    function listen(callback: StorageChangeCallback) {
        if (disposed) return () => {};
        listeners.add(callback);
        return () => {
            listeners.delete(callback);
        };
    }
    function listenTo(key: string, callback: StorageChangeCallback) {
        return listen((value, oldValue, changedKey) => {
            if (changedKey === keyName(key)) callback(value, oldValue, changedKey);
        });
    }
    function dispose() {
        disposed = true;
        stopSync?.();
        listeners.clear();
    }
    if (getCurrentInstance()) onMounted(start);
    else start();
    if (getCurrentScope()) onScopeDispose(dispose);
    return {
        data: readonly(data),
        error: readonly(error),
        isPersistent: readonly(persistent),
        get,
        set,
        has,
        exists: has,
        remove,
        delete: remove,
        unset: remove,
        clear,
        all: () => ({ ...data.value }),
        listen,
        listenTo,
        refresh,
        dispose,
    };
}
