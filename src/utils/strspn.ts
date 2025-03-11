/**
 * strspn implementation in JavaScript
 * @source https://gist.github.com/detomon/9830030
 * @param string
 * @param chars
 * @param start
 * @param length
 * @returns
 */
function strspn(string: string, chars: string, start: number = 0, length: null | number = null) {
    let end;

    if (start === undefined) {
        start = 0;
    } else if (start < 0) {
        start += string.length;
    }

    if (length === undefined) {
        length = string.length;
    }

    start = Math.max(0, Math.min(start, string.length));
    end = Math.max(start, Math.min(start + (length || 0), string.length));
    for (let i = start; i < end; i++) {
        if (chars.indexOf(string[i]) === -1) {
            return i - start;
        }
    }
    return end - start;
}

// Export Module
export default strspn;
export { strspn };
