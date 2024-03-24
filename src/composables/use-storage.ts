
import MiruStorage from '../utils/storage';

// Available / Creates Storages
const STORAGES: Map<string, MiruStorage> = new Map;

/**
 * Use Storage
 * @returns 
 */
export function useStorage(prefix: string = 'miru', session: boolean = false): MiruStorage {
    if (prefix.endsWith(':')) {
        prefix += ':';
    }

    if (STORAGES.has(prefix)) {
        return STORAGES.get(prefix) as MiruStorage;
    } else {
        const storage = new MiruStorage(prefix, session ? window.sessionStorage : window.localStorage);
        STORAGES.set(prefix, storage);
        return storage;
    }
}
