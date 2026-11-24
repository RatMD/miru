type MapFunction<T> = (v: HTMLElement, k: number) => T;

/**
 * Find matching DOM elements, optionally mapping each result.
 * @param selector CSS selector to match.
 * @returns The matching elements or mapped results.
 */
function query(selector: string): HTMLElement[];

/**
 * Find matching DOM elements, optionally mapping each result.
 * @param selector CSS selector to match.
 * @param context Root element or document to search.
 * @returns The matching elements or mapped results.
 */
function query(selector: string, context: HTMLElement | Document): HTMLElement[];

/**
 * Find matching DOM elements, optionally mapping each result.
 * @param selector CSS selector to match.
 * @param callback Mapper receiving each matching element and its index.
 * @returns The matching elements or mapped results.
 */
function query<T = HTMLElement>(selector: string, callback: MapFunction<T>): T[];

/**
 * Find matching DOM elements, optionally mapping each result.
 * @param selector CSS selector to match.
 * @param context Root element or document to search.
 * @param callback Mapper receiving each matching element and its index.
 * @returns The matching elements or mapped results.
 */
function query<T = HTMLElement>(
    selector: string,
    context: HTMLElement | Document,
    callback: MapFunction<T>,
): T[];

/**
 * Find matching DOM elements, optionally mapping each result.
 * @param selector CSS selector to match.
 * @param context_or_callback Search root or mapping callback; defaults to document.
 * @param callback Mapper receiving each matching element and its index.
 * @returns The matching elements or mapped results.
 */
function query<T = HTMLElement>(
    selector: string,
    context_or_callback?: HTMLElement | Document | MapFunction<T>,
    callback?: MapFunction<T>,
): T[] | HTMLElement[] {
    let context: HTMLElement | Document;

    if (typeof context_or_callback === 'function') {
        context = document;
        callback = context_or_callback;
    } else {
        context = context_or_callback || document;
    }

    if (typeof callback === 'function') {
        return Array.from(context.querySelectorAll(selector) as NodeListOf<HTMLElement>, callback);
    } else {
        return Array.from(context.querySelectorAll(selector) as NodeListOf<HTMLElement>);
    }
}

// Export module
export { query };
