/**
 * Find the first DOM element matching a selector.
 * @param selector CSS selector to match.
 * @param context Search root; defaults to document.
 * @returns The matching element, or null when no match exists.
 */
function select<T = HTMLElement>(selector: string, context?: HTMLElement | Document): T | null {
    return (context || document).querySelector(selector) as T | null;
}

// Export module
export { select };
