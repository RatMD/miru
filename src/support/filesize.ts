/**
 * Format a byte count with metric or binary units.
 * @param bytes Number of bytes.
 * @param metric Use powers of 1000 instead of 1024.
 * @param digits Number of decimal places.
 * @returns A human-readable size with its unit.
 * @source https://stackoverflow.com/a/14919494
 */
function filesize(bytes: number, metric: boolean = false, digits: number = 1): string {
    const thresh = metric ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = metric
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** digits;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(digits) + ' ' + units[u];
}

// Export module
export { filesize };
