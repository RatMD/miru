
/**
 * Wraps a callback function into a debounced handler.
 * @param {Function} callback The desired function to call.
 * @param {number} ms The amount of milliseconds the function should be debounced.
 * @returns 
 */
function debounce(callback: Function, ms: number): Function {
    let timeout: number | undefined = void 0;
    return function (this: any) {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(callback.bind(this, ...arguments), ms);
    };
}

// Export Module
export default debounce;
export { debounce };
