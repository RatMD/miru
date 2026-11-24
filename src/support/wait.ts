/**
 * Resolve with null after the requested delay.
 * @param ms Delay in milliseconds.
 * @returns A promise that resolves with null after the delay.
 */
function wait(ms: number): Promise<null> {
    return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}

/**
 * Poll at most limit times; reject on predicate errors or exhausted attempts.
 * @param callback Synchronous or asynchronous predicate to evaluate.
 * @param step Delay in milliseconds between unsuccessful attempts.
 * @param limit Maximum number of predicate evaluations.
 * @returns A promise that resolves with null once the predicate succeeds.
 */
async function waitUntil(
    callback: () => boolean | Promise<boolean>,
    step = 200,
    limit = 100,
): Promise<null> {
    if (!Number.isInteger(limit) || limit < 1) {
        throw new RangeError('limit must be a positive integer.');
    }

    for (let attempt = 0; attempt < limit; attempt++) {
        if (await callback()) {
            return null;
        }

        if (attempt + 1 < limit) {
            await wait(Math.max(0, step));
        }
    }

    throw new Error('waitUntil exceeded its attempt limit.');
}

// Export module
export { wait, waitUntil };
