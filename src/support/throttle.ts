type ThrottleCallback = (...args: any[]) => unknown;

/**
 * Limit callback execution until the previous call and cooldown have finished.
 * @param callback Callback whose execution is limited.
 * @param ms Cooldown in milliseconds after the callback settles.
 * @returns A throttled callback preserving its arguments, receiver and return value.
 */
function throttle<T extends ThrottleCallback>(
    callback: T,
    ms: number,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T> | undefined {
    let paused = false;

    /**
     * Schedule the end of the current throttle cooldown.
     * @returns Nothing.
     */
    const resume = (): void => {
        setTimeout(() => {
            paused = false;
        }, ms);
    };

    return function (
        this: ThisParameterType<T>,
        ...args: Parameters<T>
    ): ReturnType<T> | undefined {
        if (paused) {
            return undefined;
        }

        paused = true;

        try {
            const result = callback.apply(this, args) as ReturnType<T>;

            if (result instanceof Promise) {
                return result.finally(resume) as ReturnType<T>;
            }

            resume();

            return result;
        } catch (error) {
            paused = false;

            throw error;
        }
    };
}

// Export module
export { throttle };
export type { ThrottleCallback };
