/**
 * Serialize nested records, arrays, dates and blobs into FormData.
 * @param data Record to serialize using bracketed field paths.
 * @returns FormData containing every supported field.
 */
function toFormData(data: Record<string, unknown>): FormData {
    const result = new FormData();
    const ancestors = new WeakSet<object>();

    /**
     * Append a value recursively while rejecting circular structures.
     * @param key Bracketed field path.
     * @param value Value to serialize.
     * @returns Nothing.
     */
    function append(key: string, value: unknown): void {
        if (typeof Blob !== 'undefined' && value instanceof Blob) {
            result.append(key, value);
        } else if (value instanceof Date) {
            result.append(key, value.toISOString());
        } else if (value !== null && typeof value === 'object') {
            if (ancestors.has(value)) {
                throw new TypeError('Cannot serialize circular form data.');
            }

            ancestors.add(value);

            if (Array.isArray(value)) {
                value.forEach((entry, index) => append(key + '[' + index + ']', entry));
            } else {
                for (const [name, entry] of Object.entries(value)) {
                    append(key + '[' + name + ']', entry);
                }
            }

            ancestors.delete(value);
        } else if (typeof value === 'function' || typeof value === 'symbol') {
            throw new TypeError('Unsupported form data value.');
        } else {
            result.append(
                key,
                value == null
                    ? ''
                    : typeof value === 'boolean'
                      ? value
                          ? '1'
                          : '0'
                      : String(value),
            );
        }
    }

    for (const [key, value] of Object.entries(data)) {
        append(key, value);
    }

    return result;
}

// Export module
export { toFormData };
