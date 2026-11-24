/**
 * Count accepted leading characters within a substring range.
 * @param value String to inspect.
 * @param chars Set of accepted characters.
 * @param start Substring offset; negative values count from the end.
 * @param length Range length; null uses the remainder and negative values exclude a suffix.
 * @returns The number of matching leading characters in the selected range.
 */
function strspn(value: string, chars: string, start = 0, length: number | null = null): number {
    const offset = Math.max(0, Math.min(start < 0 ? value.length + start : start, value.length));
    const end =
        length === null
            ? value.length
            : Math.max(
                  offset,
                  Math.min(length < 0 ? value.length + length : offset + length, value.length),
              );
    let count = 0;

    while (offset + count < end && chars.includes(value[offset + count]!)) {
        count++;
    }

    return count;
}

// Export module
export { strspn };
