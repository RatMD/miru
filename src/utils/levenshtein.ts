
/**
 * Calculate Levenshtein distance between 2 strings.
 * @source https://www.tutorialspoint.com/levenshtein-distance-in-javascript
 * 
 * @param {string} string1 
 * @param {string} string2 
 * @returns {number}
 */
function levenshtein(string1: string, string2: string): number {
    const track = Array(string2.length + 1).fill(null).map(
        () => Array(string1.length + 1).fill(null)
    );

    for (let i = 0; i <= string1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= string2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= string2.length; j += 1) {
        for (let i = 1; i <= string1.length; i += 1) {
            const indicator = string1[i - 1] === string2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator, // substitution
            );
        }
    }
    return track[string2.length][string1.length];
};

// Export Module
export default levenshtein;
export { levenshtein };
