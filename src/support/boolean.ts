const TRULY_VALUES: any[] = [true, 'true', 1, '1', 'yes', 'on'];
const FALSY_VALUES: any[] = [false, 'false', 0, '0', 'no', 'off', null, void 0];

/**
 * Normalize recognized boolean-like values to true, false or null.
 * @param value Value to normalize.
 * @returns The normalized boolean, or null for an unrecognized value.
 */
function boolean(value: any): boolean | null {
    if (typeof value === 'string') {
        value = value.toLowerCase();
    }

    if (TRULY_VALUES.indexOf(value) >= 0) {
        return true;
    } else if (FALSY_VALUES.indexOf(value) >= 0) {
        return false;
    } else {
        return null;
    }
}

/**
 * Check whether a value is a recognized true-like value.
 * @param value Value to inspect.
 * @returns Whether the value represents true.
 */
function truly(value: any): boolean {
    if (typeof value === 'string') {
        value = value.toLowerCase();
    }

    return TRULY_VALUES.indexOf(value) >= 0;
}

/**
 * Check whether a value is a recognized false-like value.
 * @param value Value to inspect.
 * @returns Whether the value represents false.
 */
function falsy(value: any): boolean {
    if (typeof value === 'string') {
        value = value.toLowerCase();
    }

    return FALSY_VALUES.indexOf(value) >= 0;
}

// Export module
export { boolean, falsy, truly };
