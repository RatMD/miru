
export type ThrottleCallback = (...args: any) => void | Promise<void>;

/**
 * Wraps a callback function into a throttle handler.
 * @param {Function} callback The desired function to call.
 * @param {numbet} ms The amount of milliseconds the function should be called.
 * @returns {Function}
 */
function throttle(callback: ThrottleCallback, ms: number): Function {
    let paused = false;

    return function (this: any) {
        if (paused) {
            return;
        }
        paused = true;

        let result = callback.apply(this, arguments);
        if (typeof result !== 'undefined' && result instanceof Promise) {
            result.then(() => setTimeout(() => paused = false, ms));
        } else {
            setTimeout(() => paused = false, ms);
        }
    };
}

// Export Module
export default throttle;
export { throttle };
