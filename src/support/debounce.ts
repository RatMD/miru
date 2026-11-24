type DebounceCallback = (...args: any[]) => unknown;

/**
 * Invoke a callback after its last call has remained idle for the delay.
 * @param callback Callback to defer.
 * @param ms Idle delay in milliseconds.
 * @returns A debounced callback that preserves its arguments and receiver.
 */
function debounce<T extends DebounceCallback>(
    callback: T,
    ms: number,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | undefined;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
        clearTimeout(timer);
        timer = setTimeout(() => callback.apply(this, args), ms);
    };
}

// Export module
export { debounce };
export type { DebounceCallback };
