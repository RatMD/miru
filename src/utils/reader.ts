
/**
 * File Reader
 * @param {File} file 
 * @returns {Promise}
 */
function reader(file: File): Promise<string|ArrayBuffer|null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (ev) => reject(ev);
        reader.onabort = (ev) => reject(ev);
        reader.readAsDataURL(file);
    });
}

// Export Module
export default reader;
export { reader };
