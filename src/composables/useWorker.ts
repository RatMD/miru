import { computed, getCurrentScope, onScopeDispose, readonly, shallowRef } from 'vue';

export type WorkerMode = 'default' | 'online-only';
export type WorkerMessage =
    | { type: 'ping' }
    | { type: 'get-mode' }
    | { type: 'set-mode'; mode: WorkerMode }
    | { type: 'clear-caches' }
    | { type: 'skip-waiting' };

export interface WorkerOptions {
    script?: string | URL;
    scope?: string;
    timeout?: number;
    messageTimeout?: number;
    cachePrefix?: string;
    window?: Window | null;
}
export interface WorkerRequestOptions {
    timeout?: number;
    signal?: AbortSignal;
}
export interface WorkerCacheOptions {
    prefix?: string;
    names?: readonly string[];
    /** Explicit opt-in to deleting all Cache Storage entries on this origin. */
    all?: boolean;
    /** The worker decides what its clear-caches command deletes. Requires protocol support. */
    worker?: boolean;
}
export interface WorkerOnlineOptions {
    unregister?: boolean;
    reload?: boolean;
    caches?: WorkerCacheOptions;
}

interface PendingMessage {
    worker: ServiceWorker;
    resolve: (data: unknown) => void;
    reject: (error: Error) => void;
}

/** Service worker lifecycle and correlated messaging, compatible with the HL Portal protocol. */
export function useWorker(options: WorkerOptions = {}) {
    const host =
        options.window === undefined
            ? typeof window === 'undefined'
                ? null
                : window
            : options.window;
    const container = host?.navigator.serviceWorker;
    const isSupported = !!container;
    const registration = shallowRef<ServiceWorkerRegistration | null>(null);
    const controller = shallowRef<ServiceWorker | null>(container?.controller ?? null);
    const waiting = shallowRef<ServiceWorker | null>(null);
    const state = shallowRef<ServiceWorkerState | null>(null);
    const error = shallowRef<Error | null>(null);
    const pending = new Map<string, PendingMessage>();
    const cancellations = new Set<() => void>();
    const cleanups: (() => void)[] = [];
    const registrationCleanups: (() => void)[] = [];
    let currentScope = options.scope ?? '/';
    let registering: { key: string; promise: Promise<ServiceWorkerRegistration> } | undefined;
    let generation = 0;
    let sequence = 0;
    let disposed = false;
    const instanceId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

    function ensureSupport() {
        if (disposed) throw new Error('This service worker controller has been disposed.');
        if (!container) throw new Error('The ServiceWorker API is not available in this context.');
        return container;
    }
    function listen(target: EventTarget, type: string, handler: EventListener, list = cleanups) {
        target.addEventListener(type, handler);
        list.push(() => target.removeEventListener(type, handler));
    }
    function readState() {
        controller.value = container?.controller ?? null;
        waiting.value = registration.value?.waiting ?? null;
        state.value =
            (
                registration.value?.active ??
                registration.value?.installing ??
                registration.value?.waiting
            )?.state ?? null;
    }
    function track(value: ServiceWorkerRegistration) {
        registrationCleanups.splice(0).forEach((cleanup) => cleanup());
        registration.value = value;
        const tracked = new Set<ServiceWorker>();
        const update = () => {
            for (const worker of [value.installing, value.waiting, value.active]) {
                if (worker && !tracked.has(worker)) {
                    tracked.add(worker);
                    listen(worker, 'statechange', update, registrationCleanups);
                }
            }
            readState();
        };
        listen(value, 'updatefound', update, registrationCleanups);
        update();
    }

    /** Timeouts include discovery/activation, not just the postMessage round trip. */
    function run<T>(
        work: (signal: AbortSignal) => Promise<T>,
        request: WorkerRequestOptions = {},
        fallback = options.timeout ?? 10000,
    ): Promise<T> {
        const timeout = request.timeout ?? fallback;
        if (!Number.isFinite(timeout) || timeout <= 0)
            return Promise.reject(
                new RangeError('Worker timeout must be a positive finite number.'),
            );
        return new Promise<T>((resolve, reject) => {
            const aborter = new AbortController();
            const cancel = () => finish(new Error('Service worker operation aborted.'));
            const timer = setTimeout(
                () => finish(new Error(`Service worker operation timed out after ${timeout}ms.`)),
                timeout,
            );
            let finished = false;
            function finish(reason?: unknown, value?: T) {
                if (finished) return;
                finished = true;
                clearTimeout(timer);
                request.signal?.removeEventListener('abort', cancel);
                cancellations.delete(cancel);
                aborter.abort();
                if (reason !== undefined) {
                    const failure = reason instanceof Error ? reason : new Error(String(reason));
                    error.value = failure;
                    reject(failure);
                } else {
                    error.value = null;
                    resolve(value as T);
                }
            }
            cancellations.add(cancel);
            request.signal?.addEventListener('abort', cancel, { once: true });
            if (request.signal?.aborted || disposed) {
                cancel();
                return;
            }
            Promise.resolve()
                .then(() => {
                    ensureSupport();
                    if (aborter.signal.aborted)
                        throw new Error('Service worker operation aborted.');
                    return work(aborter.signal);
                })
                .then(
                    (value) => finish(undefined, value),
                    (reason) => finish(reason),
                );
        });
    }

    async function register(
        script: string | URL = options.script ?? '/service.js',
        scope = options.scope ?? '/',
        request: WorkerRequestOptions = {},
    ): Promise<ServiceWorkerRegistration> {
        const service = ensureSupport();
        const key = `${script.toString()}\n${scope}`;
        if (registering) {
            if (registering.key === key) return registering.promise;
            throw new Error('A different service worker registration is already in progress.');
        }
        currentScope = scope;
        const version = ++generation;
        const promise = run(async (signal) => {
            // Native register updates/reuses matching scopes. Never unregister an existing worker first.
            const value = await service.register(script, { scope });
            if (!signal.aborted && version === generation) track(value);
            return value;
        }, request);
        registering = { key, promise };
        try {
            return await promise;
        } finally {
            if (registering?.promise === promise) registering = undefined;
        }
    }

    async function findRegistration(signal: AbortSignal) {
        if (registration.value) return registration.value;
        const version = generation;
        const value = await ensureSupport().getRegistration(currentScope);
        if (signal.aborted || version !== generation)
            throw new Error('Service worker operation aborted.');
        if (value) track(value);
        return value;
    }

    function update(forceAll = false, request: WorkerRequestOptions = {}): Promise<boolean> {
        return run(async (signal) => {
            const values = forceAll
                ? await ensureSupport().getRegistrations()
                : [await findRegistration(signal)];
            if (signal.aborted) throw new Error('Service worker operation aborted.');
            const registrations = values.filter(
                (value): value is ServiceWorkerRegistration => !!value,
            );
            if (!registrations.length && !forceAll)
                throw new Error('No service worker registration found.');
            await Promise.all(registrations.map((value) => value.update()));
            return registrations.length > 0;
        }, request);
    }

    function unregister(
        forceAll = false,
        clearCache = false,
        request: WorkerRequestOptions = {},
    ): Promise<boolean> {
        if (registering)
            return Promise.reject(
                new Error('Wait for the service worker registration before unregistering.'),
            );
        ++generation;
        return run(async (signal) => {
            const values = forceAll
                ? await ensureSupport().getRegistrations()
                : [await findRegistration(signal)];
            if (signal.aborted) throw new Error('Service worker operation aborted.');
            const registrations = values.filter(
                (value): value is ServiceWorkerRegistration => !!value,
            );
            const results = await Promise.all(registrations.map((value) => value.unregister()));
            if (signal.aborted) throw new Error('Service worker operation aborted.');
            if (
                !signal.aborted &&
                registrations.some((value, index) => value === registration.value && results[index])
            ) {
                registrationCleanups.splice(0).forEach((cleanup) => cleanup());
                registration.value = null;
                readState();
                for (const message of pending.values())
                    message.reject(new Error('Service worker registration was removed.'));
            }
            if (clearCache) await clearCaches();
            return results.some(Boolean);
        }, request);
    }

    async function activeWorker(signal: AbortSignal): Promise<ServiceWorker> {
        const value = await findRegistration(signal);
        // Only use this registration: the document's controller can belong to another scope.
        const worker = value?.active;
        if (worker && worker.state === 'activated') return worker;
        if (!value) throw new Error('No service worker registration found.');
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if (value.active?.state === 'activated') {
                    cleanup();
                    resolve(value.active);
                }
            }, 25);
            const abort = () => {
                cleanup();
                reject(new Error('Service worker activation aborted.'));
            };
            function cleanup() {
                clearInterval(timer);
                signal.removeEventListener('abort', abort);
            }
            signal.addEventListener('abort', abort, { once: true });
            if (signal.aborted) abort();
        });
    }

    function communicate<T = unknown>(
        message: Record<string, unknown>,
        timeoutOrOptions: number | WorkerRequestOptions = {},
    ): Promise<T> {
        const request =
            typeof timeoutOrOptions === 'number' ? { timeout: timeoutOrOptions } : timeoutOrOptions;
        return run(
            async (signal) => {
                const worker = await activeWorker(signal);
                if (signal.aborted) throw new Error('Service worker operation aborted.');
                const messageId = `${instanceId}-${++sequence}`;
                return new Promise<T>((resolve, reject) => {
                    const abort = () => {
                        pending.delete(messageId);
                        reject(new Error('Service worker message aborted.'));
                    };
                    const finish = (data: unknown, failure?: Error) => {
                        signal.removeEventListener('abort', abort);
                        pending.delete(messageId);
                        if (failure) reject(failure);
                        else resolve(data as T);
                    };
                    pending.set(messageId, {
                        worker,
                        resolve: (data) => finish(data),
                        reject: (failure) => finish(undefined, failure),
                    });
                    signal.addEventListener('abort', abort, { once: true });
                    try {
                        worker.postMessage({ ...message, messageId });
                    } catch (reason) {
                        finish(
                            undefined,
                            reason instanceof Error ? reason : new Error(String(reason)),
                        );
                    }
                });
            },
            request,
            options.messageTimeout ?? 5000,
        );
    }

    if (container) {
        listen(container, 'controllerchange', readState);
        listen(container, 'message', ((event: MessageEvent) => {
            const data = event.data;
            if (!data || typeof data !== 'object' || typeof data.messageId !== 'string') return;
            const message = pending.get(data.messageId);
            if (!message || event.source !== message.worker) return;
            if (event.origin && host && event.origin !== host.location.origin) return;
            if (data.error != null) message.reject(new Error(String(data.error)));
            else message.resolve(data);
        }) as EventListener);
        listen(container, 'messageerror', ((event: MessageEvent) => {
            for (const message of pending.values()) {
                if (event.source === message.worker)
                    message.reject(new Error('Could not deserialize the service worker response.'));
            }
        }) as EventListener);
        container.startMessages?.();
    }

    async function getMode(): Promise<WorkerMode | null> {
        const response = await communicate<{ mode?: WorkerMode }>({ type: 'get-mode' });
        return response.mode === 'default' || response.mode === 'online-only'
            ? response.mode
            : null;
    }
    async function setMode(mode: WorkerMode): Promise<boolean> {
        const response = await communicate<{ mode?: WorkerMode }>({ type: 'set-mode', mode });
        return response.mode === mode;
    }
    async function clearCaches(config: WorkerCacheOptions = {}): Promise<number> {
        if (disposed) throw new Error('This service worker controller has been disposed.');
        const prefix =
            config.prefix ?? (config.names || config.all ? undefined : options.cachePrefix);
        if (!config.all && !config.names && !prefix && !config.worker)
            throw new Error(
                'Specify cache names, a cache prefix, or explicitly opt into all caches.',
            );
        if (config.worker) await communicate({ type: 'clear-caches' });
        if (!host?.caches) return 0;
        const names = await host.caches.keys();
        const selected = names.filter(
            (name) =>
                config.all || config.names?.includes(name) || (prefix && name.startsWith(prefix)),
        );
        const results = await Promise.all(selected.map((name) => host.caches.delete(name)));
        return results.filter(Boolean).length;
    }
    async function enableOnlineOnly(config: WorkerOnlineOptions = {}): Promise<void> {
        if (!(await setMode('online-only')))
            throw new Error('The service worker did not confirm online-only mode.');
        if (config.caches || options.cachePrefix) await clearCaches(config.caches);
        if (config.unregister) await unregister();
        if (config.reload) host?.location.reload();
    }
    async function enableDefaultMode(
        script: string | URL = options.script ?? '/service.js',
        scope = options.scope ?? '/',
        reload = false,
    ): Promise<void> {
        await register(script, scope);
        if (!(await setMode('default')))
            throw new Error('The service worker did not confirm default mode.');
        if (reload) host?.location.reload();
    }
    function dispose() {
        if (disposed) return;
        disposed = true;
        ++generation;
        for (const cancel of cancellations) cancel();
        cleanups.splice(0).forEach((cleanup) => cleanup());
        registrationCleanups.splice(0).forEach((cleanup) => cleanup());
        pending.clear();
    }
    if (getCurrentScope()) onScopeDispose(dispose);
    return {
        isSupported,
        registration: readonly(registration),
        controller: readonly(controller),
        waiting: readonly(waiting),
        state: readonly(state),
        error: readonly(error),
        updateAvailable: computed(() => waiting.value !== null),
        register,
        update,
        unregister,
        communicate,
        getMode,
        setMode,
        clearCaches,
        enableOnlineOnly,
        enableDefaultMode,
        dispose,
    };
}
