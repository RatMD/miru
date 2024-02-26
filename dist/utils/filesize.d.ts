/**
 * Format bytes as human-readable text.
 * @source https://stackoverflow.com/a/14919494
 *
 * @param {number} bytes Number of bytes.
 * @param {boolean} si Whether to use metric (SI, 1000) or binary (IEC, 1024) units.
 * @param {number} dp Number of decimal places to display.
 * @returns {string}
 */
declare function filesize(bytes: number, si?: boolean, dp?: number): string;
export default filesize;
