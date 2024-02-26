/**
 * Check if value is a boolean or something similar.
 * @param {mixed} value The desired value to check.
 * @returns {boolean|null}
 */
declare function boolean(value: any): boolean | null;
/**
 * Check if value is truly.
 * @param {mixed} value The desired value to check.
 * @returns {boolean}
 */
declare function truly(value: any): boolean;
/**
 * Check if value is falsy.
 * @param {mixed} value The desired value to check.
 * @returns {boolean}
 */
declare function falsy(value: any): boolean;
export default boolean;
export { boolean, falsy, truly };
