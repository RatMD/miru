/**
 * Merge plain records into a target, replacing arrays and other values.
 * @param target Record receiving the merged values.
 * @param sources Source records to apply in order.
 * @returns The mutated target record.
 */
function merge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
    /**
     * Check whether a value is a plain record.
     * @param value Value to inspect.
     * @returns Whether the value has Object.prototype or null as its prototype.
     */
    const plain = (value: unknown): value is Record<string, unknown> =>
        value !== null &&
        typeof value === 'object' &&
        [Object.prototype, null].includes(Object.getPrototypeOf(value));
    const result: Record<string, unknown> = target;

    for (const source of sources) {
        if (!plain(source)) {
            continue;
        }

        for (const key of Object.keys(source)) {
            if (['__proto__', 'constructor', 'prototype'].includes(key)) {
                continue;
            }

            const next = source[key];
            result[key] =
                plain(result[key]) && plain(next) ? merge({ ...result[key] }, next) : next;
        }
    }

    return target;
}

// Export module
export { merge };
