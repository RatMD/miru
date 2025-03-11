/**
 * Laravel-inspired way to slugify a name or title.
 * @param title
 * @param separator
 * @returns
 */
function slugify(
    title: string,
    separator: string = '-',
    map: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }
): string {
    const flip = separator === '-' ? '_' : '-';
    title = title.replace(new RegExp(`[${flip}]+`, 'gu'), separator);

    // Apply character replacements (umlauts & custom map)
    title = title
        .normalize('NFD') // Decomposes combined characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(new RegExp(`[${Object.keys(map).join('')}]`, 'g'), (match) => map[match]);

    // Remove invalid characters and replace spaces with separator
    title = title
        .toLowerCase()
        .replace(new RegExp(`[^${separator}a-z0-9\\s]+`, 'g'), '') // Keep only valid characters
        .replace(/\s+/g, separator) // Convert spaces to separator
        .replace(new RegExp(`[${separator}]+`, 'g'), separator) // Remove duplicate separators
        .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), ''); // Trim leading/trailing separators

    return title;
}

// Export Module
export default slugify;
export { slugify };
