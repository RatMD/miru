/**
 * Compare structures with cycle protection and ordered Map/Set entries.
 * @param left First value to compare.
 * @param right Second value to compare.
 * @returns Whether both values have equivalent contents.
 */
function equals(left: unknown, right: unknown): boolean {
    const seen = new WeakMap<object, WeakMap<object, boolean>>();

    /**
     * Recursively compare values while tracking previously visited object pairs.
     * @param a First value.
     * @param b Second value.
     * @returns Whether the values match.
     */
    function compare(a: unknown, b: unknown): boolean {
        if (a === b) {
            return true;
        }

        if (typeof a === 'number' && typeof b === 'number' && Number.isNaN(a) && Number.isNaN(b)) {
            return true;
        }

        if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
            return false;
        }

        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
            return false;
        }

        const previous = seen.get(a)?.get(b);

        if (previous !== undefined) {
            return previous;
        }

        const pairs = seen.get(a) ?? new WeakMap<object, boolean>();
        seen.set(a, pairs);
        pairs.set(b, true);
        let result: boolean;

        if (a instanceof Date && b instanceof Date) {
            result = Object.is(a.getTime(), b.getTime());
        } else if (a instanceof RegExp && b instanceof RegExp) {
            result = a.source === b.source && a.flags === b.flags;
        } else if (a instanceof ArrayBuffer && b instanceof ArrayBuffer) {
            result = bytes(new Uint8Array(a), new Uint8Array(b));
        } else if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
            result = bytes(
                new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
                new Uint8Array(b.buffer, b.byteOffset, b.byteLength),
            );
        } else if (
            (a instanceof Map && b instanceof Map) ||
            (a instanceof Set && b instanceof Set)
        ) {
            result = a.size === b.size && compare(Array.from(a.entries()), Array.from(b.entries()));
        } else if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length) {
            result = false;
        } else if (Object.prototype.toString.call(a) === '[object Object]' || Array.isArray(a)) {
            /**
             * Collect enumerable own string and symbol keys.
             * @param object Object whose keys are collected.
             * @returns The enumerable property keys.
             */
            const keys = (object: object): PropertyKey[] =>
                Reflect.ownKeys(object).filter((key) =>
                    Object.prototype.propertyIsEnumerable.call(object, key),
                );
            const aKeys = keys(a),
                bKeys = keys(b);
            result =
                aKeys.length === bKeys.length &&
                aKeys.every(
                    (key) =>
                        bKeys.includes(key) &&
                        compare(
                            (a as Record<PropertyKey, unknown>)[key],
                            (b as Record<PropertyKey, unknown>)[key],
                        ),
                );
        } else {
            const tag = Object.prototype.toString.call(a);
            result =
                [
                    '[object Number]',
                    '[object Boolean]',
                    '[object String]',
                    '[object Symbol]',
                    '[object BigInt]',
                ].includes(tag) && Object.is(a.valueOf(), b.valueOf());
        }

        pairs.set(b, result);

        return result;
    }

    /**
     * Compare the lengths and contents of two byte views.
     * @param a First byte view.
     * @param b Second byte view.
     * @returns Whether both views contain identical bytes.
     */
    function bytes(a: Uint8Array, b: Uint8Array): boolean {
        return a.length === b.length && a.every((value, index) => value === b[index]);
    }

    return compare(left, right);
}

// Export module
export { equals };
