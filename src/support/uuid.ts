const identifiers = new Map<string | symbol, string>();

/**
 * Generate a cryptographic UUID v4, optionally reusing it for a stable key.
 * @param id Optional stable string or symbol key.
 * @returns A new UUID or the UUID previously associated with the key.
 */
function uuid(id?: string | symbol | null): string {
    if (id != null && identifiers.has(id)) {
        return identifiers.get(id)!;
    }

    let result: string;

    if (typeof globalThis.crypto?.randomUUID === 'function') {
        result = globalThis.crypto.randomUUID();
    } else {
        if (typeof globalThis.crypto?.getRandomValues !== 'function') {
            throw new Error('A cryptographic random source is required.');
        }

        const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
        bytes[6] = (bytes[6]! & 0x0f) | 0x40;
        bytes[8] = (bytes[8]! & 0x3f) | 0x80;
        const hex = Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
        result = [
            hex.slice(0, 8),
            hex.slice(8, 12),
            hex.slice(12, 16),
            hex.slice(16, 20),
            hex.slice(20),
        ].join('-');
    }

    if (id != null) {
        identifiers.set(id, result);
    }

    return result;
}

// Export module
export { uuid };
