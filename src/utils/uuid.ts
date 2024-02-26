
const UUID_MAP: Map<string|Symbol, string> = new Map();

/**
 * Create random UUID
 * @param {string | Symbol | null} id Additional unique ID, associated with the generated UUID.
 * @returns {string}
 */
function uuid(id?: string | Symbol | null): string {
    if (id) {
        if (UUID_MAP.has(id)) {
            return UUID_MAP.get(id) as string;
        } else {
            let result = crypto.randomUUID();
            UUID_MAP.set(id, result);
            return result;
        }
    } else {
        return crypto.randomUUID();
    }
}

// Export Module
export default uuid;
