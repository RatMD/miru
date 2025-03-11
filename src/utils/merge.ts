/**
 * Deep Merge multiple objects
 * @param target
 * @param sources
 * @returns
 */
function merge<T extends Record<string, any>>(target: T, ...sources: T[]): T {
    if (!sources.length) return target;

    for (const source of sources) {
        if (typeof source !== 'object' || source === null) continue;

        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                const targetValue = target[key];
                const sourceValue = source[key];

                if (
                    typeof targetValue === 'object' &&
                    targetValue !== null &&
                    typeof sourceValue === 'object' &&
                    sourceValue !== null
                ) {
                    target[key] = merge({ ...targetValue }, sourceValue);
                } else {
                    target[key] = sourceValue;
                }
            }
        }
    }

    return target;
}

// Export Module
export default merge;
export { merge };
