type MiruStorageCallback = (
    newValue: any,
    oldValue: any,
    key: string,
    storage: MiruStorage,
) => void;

class MiruStorage {
    /**
     * Key-Prefix for this Storage instance
     */
    private prefix: string;

    /**
     * Used native browser storage engine for this Storage instance
     */
    private engine: Storage;

    /**
     * All available Storage Listeners
     */
    private listeners: { [key: string]: MiruStorageCallback[] };

    /**
     * Create a namespaced wrapper around a Storage engine.
     * @param prefix Key namespace; null disables prefixing.
     * @param storageEngine Storage-compatible engine; defaults to localStorage.
     * @returns A new storage wrapper.
     */
    constructor(prefix: string | null = null, storageEngine: Storage = localStorage) {
        this.prefix = prefix === null ? '' : prefix;

        if (this.prefix.length > 0 && !this.prefix.endsWith(':')) {
            this.prefix += ':';
        }

        this.engine = storageEngine;
        this.listeners = {};
    }

    /**
     * Apply the namespace unless the key is already prefixed.
     * @param key Logical or already-prefixed storage key.
     * @returns The key used by the underlying engine.
     * @internal
     */
    public prepare(key: string): string {
        if (this.prefix.length === 0) {
            return key;
        }

        return key.startsWith(this.prefix) ? key : `${this.prefix}${key}`;
    }

    /**
     * Encode a value using the storage wrapper's scalar and JSON conventions.
     * @param value Value to encode.
     * @returns The string written to the engine.
     * @internal
     */
    public encode(value: unknown): string {
        if (typeof value === 'undefined' || value === null) {
            value = '';
        } else if (typeof value === 'boolean') {
            value = value === true ? 'true' : 'false';
        } else if (typeof value === 'object') {
            value = JSON.stringify(value);
        } else if (typeof value !== 'string') {
            value = value.toString();
        }

        return value as string;
    }

    /**
     * Decode a stored scalar or JSON value.
     * @param value Stored string to decode.
     * @returns The decoded value, with an empty string represented as null.
     * @internal
     */
    public decode(value: string): unknown {
        if (typeof value !== 'string') {
            return value;
        } else if (value === '') {
            return null;
        }

        if (value.toLowerCase() === 'true') {
            return true;
        } else if (value.toLowerCase() === 'false') {
            return false;
        }

        if (value[0] === '{' || value[0] === '[') {
            return JSON.parse(value);
        } else if (/^[0-9]+(\.[0-9]+)?$/.test(value)) {
            return value.indexOf('.') >= 0 ? parseFloat(value) : parseInt(value);
        } else {
            return value;
        }
    }

    /**
     * Check whether a namespaced key exists in storage.
     * @param key Storage key to inspect.
     * @returns Whether the key is present.
     */
    public exists(key: string) {
        return this.engine.getItem(this.prepare(key)) !== null;
    }

    /**
     * Check whether a namespaced key exists in storage.
     * @param key Storage key to inspect.
     * @returns Whether the key is present.
     */
    public has(key: string) {
        return this.exists(key);
    }

    /**
     * Read and decode a stored value, or return a fallback.
     * @param key Storage key to read.
     * @param defaultValue Fallback returned when the key is absent.
     * @returns The decoded value or the supplied fallback.
     */
    public get(key: string, defaultValue: any = null) {
        const value = this.engine.getItem(this.prepare(key));

        if (value === null) {
            return defaultValue;
        } else {
            return this.decode(value);
        }
    }

    /**
     * Collect stored strings belonging to this namespace.
     * @returns A record of prefixed keys and stored strings.
     */
    public all(): { [key: string]: any } {
        const result: { [key: string]: any } = {};

        for (let i = 0; i < this.engine.length; i++) {
            const key = this.engine.key(i);

            if (key === null) {
                continue;
            }

            if (this.prefix === '' && key.indexOf(':') < 0) {
                result[key] = this.encode(this.engine.getItem(key));
            } else if (this.prefix.length > 0 && key.startsWith(this.prefix)) {
                result[key] = this.encode(this.engine.getItem(key));
            }
        }

        return result;
    }

    /**
     * Notify local listeners and write a namespaced value.
     * @param key Storage key to write.
     * @param value Value to encode and store.
     * @returns Nothing.
     */
    public set(key: string, value: any): void {
        const oldValue = this.get(key, null);

        if (typeof this.listeners[key] !== 'undefined') {
            this.listeners[key].forEach((cb: MiruStorageCallback) =>
                cb(value, oldValue, key, this),
            );
        }

        if (typeof this.listeners['_all'] !== 'undefined') {
            this.listeners['_all'].forEach((cb: MiruStorageCallback) =>
                cb(value, oldValue, key, this),
            );
        }

        this.engine.setItem(this.prepare(key), this.encode(value));
    }

    /**
     * Notify local listeners and remove a namespaced key.
     * @param key Storage key to remove.
     * @returns Nothing.
     */
    public remove(key: string): void {
        const oldValue = this.get(key, null);

        if (typeof this.listeners[key] !== 'undefined') {
            this.listeners[key].forEach((cb: MiruStorageCallback) => cb(null, oldValue, key, this));
        }

        if (typeof this.listeners['_all'] !== 'undefined') {
            this.listeners['_all'].forEach((cb: MiruStorageCallback) =>
                cb(null, oldValue, key, this),
            );
        }

        this.engine.removeItem(this.prepare(key));
    }

    /**
     * Remove a namespaced key through the remove alias.
     * @param key Storage key to remove.
     * @returns Nothing.
     */
    public delete(key: string): void {
        return this.remove(this.prepare(key));
    }

    /**
     * Remove a namespaced key through the remove alias.
     * @param key Storage key to remove.
     * @returns Nothing.
     */
    public unset(key: string): void {
        return this.remove(this.prepare(key));
    }

    /**
     * Remove all keys belonging to this wrapper's namespace.
     * @returns Nothing.
     */
    public clear() {
        const unset: string[] = [];

        for (let i = 0; i < this.engine.length; i++) {
            const key = this.engine.key(i);

            if (key === null) {
                continue;
            }

            if (this.prefix === '' && key.indexOf(':') < 0) {
                unset.push(key);
            } else if (this.prefix.length > 0 && key.startsWith(this.prefix)) {
                unset.push(key);
            }
        }

        unset.map((key) => this.engine.removeItem(key));
    }

    /**
     * Register a local listener for all writes and removals.
     * @param callback Listener receiving the new value, old value, key and wrapper.
     * @returns Nothing.
     */
    public listen(callback: MiruStorageCallback) {
        if (typeof this.listeners['_all'] === 'undefined') {
            this.listeners['_all'] = [];
        }

        this.listeners['_all'].push(callback);
    }

    /**
     * Register a local listener for a particular key.
     * @param key Logical key to observe.
     * @param callback Listener receiving the new value, old value, key and wrapper.
     * @returns Nothing.
     */
    public listenTo(key: string, callback: MiruStorageCallback) {
        if (typeof this.listeners[key] === 'undefined') {
            this.listeners[key] = [];
        }

        this.listeners[key].push(callback);
    }
}

// Export module
export { MiruStorage };
export type { MiruStorageCallback };
