type Callback = (this: Document, ev?: Event) => any;

/**
 * Run a callback when the DOM is ready, or wait for readiness.
 * @returns A readiness promise when no callback is supplied; otherwise nothing.
 */
function ready(): Promise<null>;

/**
 * Run a callback when the DOM is ready, or wait for readiness.
 * @param factory Callback invoked with document as its receiver.
 * @returns A readiness promise when no callback is supplied; otherwise nothing.
 */
function ready(factory: Callback): void;

/**
 * Run a callback when the DOM is ready, or wait for readiness.
 * @param factory Callback invoked with document as its receiver.
 * @returns A readiness promise when no callback is supplied; otherwise nothing.
 */
function ready(factory?: Callback): void | Promise<null> {
    if (typeof factory === 'undefined') {
        return new Promise((resolve) => ready(resolve.bind(null, null)));
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', factory);
        } else {
            factory.call(document);
        }
    }
}

// Export module
export { ready };
