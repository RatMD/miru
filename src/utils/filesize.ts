
/**
 * Format bytes as human-readable text.
 * @source https://stackoverflow.com/a/14919494
 * 
 * @param {number} bytes Number of bytes.
 * @param {boolean} si Whether to use metric (SI, 1000) or binary (IEC, 1024) units.
 * @param {number} dp Number of decimal places to display.
 * @returns {string}
 */
function filesize(bytes: number, si: boolean = false, dp: number = 1): string {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
  
    const units = si 
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return bytes.toFixed(dp) + ' ' + units[u];
}

// Export Module
export default filesize;
export { filesize };
