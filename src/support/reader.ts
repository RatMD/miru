/**
 * Read a browser file as a data URL, text or an ArrayBuffer.
 * @param file File to read.
 * @param type Read mode: data URL, text or binary buffer.
 * @returns A promise containing the selected representation; read errors and aborts reject.
 */
function reader<T = string | ArrayBuffer | null>(
    file: File,
    type: 'data' | 'text' | 'buffer' = 'data',
): Promise<T> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as T);
        };
        reader.onerror = (ev) => reject(ev);
        reader.onabort = (ev) => reject(ev);

        if (type == 'text') {
            reader.readAsText(file);
        } else if (type == 'buffer') {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsDataURL(file);
        }
    });
}

// Export module
export { reader };
