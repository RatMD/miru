/**
 * File Reader
 * @param {File} file
 * @returns {Promise}
 */
declare function reader(file: File): Promise<string | ArrayBuffer>;
export default reader;
