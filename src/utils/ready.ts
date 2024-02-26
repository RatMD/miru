
/**
 * Factory Handler on Ready
 * @param {Function} factory 
 * @returns {Promise|void}
 */
function ready(factory?: (this: Document, ev?: Event) => any): void | Promise<null> {
    if (typeof factory === 'undefined') {
        return new Promise(resolve => ready(resolve.bind(null, null)));
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', factory);
        } else {
            factory.call(document);
        }
    }
}

// Export Module
export default ready;
