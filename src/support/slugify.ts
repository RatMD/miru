/**
 * Transliterate and normalize a title into an ASCII slug.
 * @param title Text to convert.
 * @param separator Separator between slug segments.
 * @param map Character replacements applied before stripping diacritics.
 * @returns The normalized slug.
 */
function slugify(
    title: string,
    separator = '-',
    map: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' },
): string {
    const escaped = Array.from(separator)
        .map((char) => ('\\^$.*+?()[]{}|'.includes(char) ? '\\' + char : char))
        .join('');
    let value = Array.from(title)
        .map((char) => map[char] ?? map[char.toLowerCase()] ?? char)
        .join('')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[_-]+/g, separator);
    value = value
        .replace(new RegExp('[^a-z0-9\\s' + escaped + ']+', 'g'), '')
        .trim()
        .replace(/\s+/g, separator);

    return separator
        ? value
              .replace(new RegExp('(?:' + escaped + ')+', 'g'), separator)
              .replace(new RegExp('^(?:' + escaped + ')+|(?:' + escaped + ')+$', 'g'), '')
        : value;
}

// Export module
export { slugify };
