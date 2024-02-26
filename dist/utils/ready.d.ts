/**
 * Factory Handler on Ready
 * @param {Function} factory
 * @returns {Promise|void}
 */
declare function ready(factory?: (this: Document, ev?: Event) => any): void | Promise<null>;
export default ready;
