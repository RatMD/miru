
type MapFunction = (v: HTMLElement, k: number) => HTMLElement | any;

/**
 * Query Handler
 * @param {string} selector The desired element selector string.
 * @param {mixed} context_or_callback The context element or the forEach callback function. 
 * @param {Function} callback The forEach callback function, used when context is an element.
 * @returns {HTMLElement[]}
 */
function query(selector: string): HTMLElement[];
function query(selector: string, context: HTMLElement | Document): HTMLElement[];
function query(selector: string, callback: MapFunction): HTMLElement[];
function query(selector: string, context_or_callback?: HTMLElement | Document | MapFunction, callback?: MapFunction): HTMLElement[] {
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

// Export Module
export default query;
