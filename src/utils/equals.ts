
/**
 * Internal Equality Check
 * @source https://github.com/NickGard/tiny-isequal/blob/master/src/index.js
 * 
 * @param a 
 * @param b 
 * @param refs 
 * @returns 
 */
function _equals(a: any, b: any, refs: any[]) {
    const aType = Object.prototype.toString.call(a);
    const bType = Object.prototype.toString.call(b);
    let element;

    // Compare primitives and referentially equal objects
    if (a === b) {
        return true;
    }

    // Compare null / undefined
    if (a == null || b == null) {
        return false;
    }

    // Check if reference have been seen before
    if (refs.indexOf(a) > -1 && refs.indexOf(b) > -1) {
        return true;
    }
    refs.push(a, b);

    // Not the same type
    if (aType != bType) {
        return false;
    }

    // Check Properties
    let aElements = Object.getOwnPropertySymbols ? Object.keys(a).concat(Object.getOwnPropertySymbols(a).map(i => i.toString())) : Object.keys(a);
    let bElements = Object.getOwnPropertySymbols ? Object.keys(b).concat(Object.getOwnPropertySymbols(b).map(i => i.toString())) : Object.keys(b);
    if (aElements.length != bElements.length || aElements.some((key) => _equals(a[key], b[key], refs))) {
        return false;
    }

    // Check
    switch (aType.slice(8, -1)) {
        case "Symbol":
            return a.valueOf() == b.valueOf();
        case "Date":
        case "Number":
            return +a == +b || (+a != +a && +b != +b); // convert Dates to ms, check for NaN
        case "RegExp":
        case "Function":
        case "String":
        case "Boolean":
            return "" + a == "" + b;
        case "Set":
        case "Map": {
            aElements = a.entries();
            bElements = b.entries();
            do {
                element = (aElements as any).next();
                if (!_equals(element.value, (bElements as any).next().value, refs)) {
                    return false;
                }
            } while (!element.done);
            return true;
        }
        case "ArrayBuffer":
            (a = new Uint8Array(a)), (b = new Uint8Array(b)); // fall through to be handled as an Array
        case "DataView":
            (a = new Uint8Array(a.buffer)), (b = new Uint8Array(b.buffer)); // fall through to be handled as an Array
        case "Float32Array":
        case "Float64Array":
        case "Int8Array":
        case "Int16Array":
        case "Int32Array":
        case "Uint8Array":
        case "Uint16Array":
        case "Uint32Array":
        case "Uint8ClampedArray":
        case "Arguments":
        case "Array":
            if (a.length != b.length) {
                return false;
            }
            for (element = 0; element < a.length; element++) {
                if (!(element in a) && !(element in b)) {
                    continue; // empty slots are equal
                }

                // either one slot is empty but not both OR the elements are not equal
                if (element in a != element in b || !_equals(a[element], b[element], refs)) {
                    return false;
                }
            }
            return true;
        case "Object":
            return _equals(Object.getPrototypeOf(a), Object.getPrototypeOf(b), refs);
        default:
            return false;
    }
}

/**
 * Equality Check
 * @param a 
 * @param b 
 * @returns 
 */
function equals(a: any, b: any) {
    return _equals(a, b, []);
}

// Export Module
export default equals;
export { equals };
