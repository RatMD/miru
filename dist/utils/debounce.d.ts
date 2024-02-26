/**
 * Wraps a callback function into a debounced handler.
 * The debounce handler ensures that the passed function is called only after a certain period of
 * inactivity.
 * @param {Function} callback The desired function to call.
 * @param {number} ms The amount of milliseconds the function should be debounced.
 * @param {number} ms The number of ms
 *
 * to throttle/wait until the callback function is called.
 * @returns
 */
declare function debounce(callback: Function, ms: number): Function;
export default debounce;
