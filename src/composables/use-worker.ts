
const SERVICE = {
    worker: void 0,
    script: void 0,
    scope: void 0,
    reject: (err: string) => console.error(err),
    resolve: (data: any) => console.log(data),
} as {
    worker: ServiceWorker|undefined,
    script: string|URL|undefined;
    scope: string|undefined;
    reject: (err: Event|string) => void;
    resolve: (data: any) => void;
};

/**
 * Use Service Worker
 * @returns 
 */
export function useWorker() {
    if (typeof navigator.serviceWorker == 'undefined') {
        throw new Error('The ServiceWorker WebAPI is not available on this browser or context.');
    }

    /**
     * Register a new ServiceWorker script
     * @param script The URL path (or URL instance) to your ServiceWorker script.
     * @param scope The desired scope for your ServiceWorker script.
     * @return
     */
    async function register(script: string|URL = '/sw.js', scope: string = './'): Promise<boolean> {
        if (typeof SERVICE.worker != 'undefined') {
            throw new Error('You cannot register more then one service worker at the time.');
        }

        // Declare Worker
        let worker: ServiceWorker;

        // Attach Listener
        const listener = (event: any) => {
            if (window.location.origin !== event.origin) {
                SERVICE.reject(`The event origin '${event.origin}' is unknown or invalid.`);
            } else {
                SERVICE.resolve(event.data);
            }
        };
        navigator.serviceWorker.addEventListener('message', listener);
        navigator.serviceWorker.addEventListener('messageerror', SERVICE.reject);
        navigator.serviceWorker.startMessages();

        // Register Service Worker
        try {
            const registration = await navigator.serviceWorker.register(script, {
                scope
            });
            
            // Get Service Worker
            if (registration.installing) {
                worker = registration.installing;
            } else if (registration.waiting) {
                worker = registration.waiting;
            } else if (registration.active) {
                worker = registration.active;
            } else {
                throw new Error('No service worker instance could be created.');
            }
            SERVICE.worker = worker;

            // Wait until ready
            await navigator.serviceWorker.ready;

            // Wait until activated
            if (SERVICE.worker.state === 'activating') {
                await new Promise ((resolve, reject) => {
                    if (!SERVICE.worker) {
                        return reject(null);
                    }
                    SERVICE.worker.addEventListener('statechange', (ev: any) => {
                        if (ev.target['state'] === 'activated') {
                            resolve(null);
                        } else {
                            reject(null);
                        }
                    });
                });
            }
            SERVICE.script = script;
            SERVICE.scope = scope;
            return true;
        } catch (err) {
            throw new Error(err instanceof Error ? err.message : (err as any).toString());
        }
    }

    /**
     * Update your ServiceWorker script.
     * @param force
     * @return
     */
    async function update(force: boolean = false): Promise<boolean> {
        const registration = await navigator.serviceWorker.getRegistration(SERVICE.script);
        if (!registration) {
            if (force) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                if (registrations.length > 0) {
                    for (const reg of registrations) {
                        await reg.update();
                    }
                    return true;
                }
            }
            throw new Error('No valid service worker registration found.');
        } else {
            await registration.update();
            return true;
        }
    }

    /**
     * Unregister your ServiceWorker script
     * @param force
     * @return
     */
    async function unregister(force: boolean = false): Promise<boolean> {
        const registration = await navigator.serviceWorker.getRegistration(SERVICE.script);
        if (!registration) {
            if (force) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                if (registrations.length > 0) {
                    for (const reg of registrations) {
                        await reg.unregister();
                    }
                    return true;
                }
            }
            throw new Error('No valid service worker registration found.');
        } else {
            return await registration.unregister();
        }
    }

    /**
     * Communicate with your ServiceWorker script.
     * @param message 
     * @returns 
     */
    async function communicate(message: any): Promise<{ [key: string]: any }|false> {
        if (!SERVICE.worker) {
            throw new Error('No service worker registered.');
        }

        // Communicate
        return await (new Promise((resolve, reject) => {
            if (!SERVICE.worker) {
                return reject(null);
            }
            SERVICE.resolve = resolve;
            SERVICE.reject = reject;
            SERVICE.worker.postMessage(message, {});
        }));
    }

    // Export
    return {
        register,
        unregister,
        update,
        communicate,
        SERVICE
    };
}
