/**
 * Resize Image
 * @param {string} content
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @returns {Promise<string>}
 */
declare function resize(content: string, maxWidth: number, maxHeight: number): Promise<string>;
export default resize;
