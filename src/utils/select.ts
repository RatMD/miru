
/**
 * Select Handler
 * @param {string} selector The desired element selector string.
 * @param {mixed} context The context element.
 * @returns {HTMLElement|null}
 */
function select(selector: string, context?: HTMLElement | Document): HTMLElement | null {
    return (context || document).querySelector(selector);
}

// Export Module
export default select;
export { select };
