
export type ThrottleCallback = (...args: any) => void | Promise<void>;

/**
 * Wraps a callback function into a throttle handler.
 * The throttle handler limits the rate at which the passed function is called.
 * @param {Function} callback The desired function to call.
 * @param {number} ms The number of ms to throttle/wait until the callback function is called.
 * @returns {Function}
 */
function throttle(callback: ThrottleCallback, ms: number): Function {
    let paused = false;

    return function (this: any) {
        if (paused) {
            return;
        }
        paused = true;

        let result = callback.apply(this, Array.from(arguments));
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
