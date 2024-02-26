type MapFunction = (v: HTMLElement, k: number) => HTMLElement | any;
/**
 * Query Handler
 * @param {string} selector The desired element selector string.
 * @param {mixed} context_or_callback The context element or the forEach callback function.
 * @param {Function} callback The forEach callback function, used when context is an element.
 * @returns {HTMLElement[]}
 */
declare function query(selector: string): HTMLElement[];
declare function query(selector: string, context: HTMLElement | Document): HTMLElement[];
declare function query(selector: string, callback: MapFunction): HTMLElement[];
export default query;
