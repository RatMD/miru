/**
 * Validate GTIN-8, GTIN-12, GTIN-13 and GTIN-14 using the GS1 check digit.
 * @param ean Barcode to validate.
 * @returns Whether the barcode has a valid numeric format and checksum.
 * @see https://www.activebarcode.com/codes/ean13.html
 * @author Vitim.us <https://stackoverflow.com/a/65928239/938822>
 */
function isValidGtin(ean: string): boolean {
    if (typeof ean !== 'string' || !ean || /[^0-9]/.test(ean)) {
        return false;
    }

    /**
     * Check the final barcode digit against its weighted checksum.
     * @param ean Numeric barcode including its check digit.
     * @returns Whether the check digit matches.
     */
    function testChecksum(ean: string) {
        const digits = ean.slice(0, -1);
        const checkDigit = parseInt(ean.slice(-1)) | 0;
        let sum = 0;

        for (let i = digits.length - 1, weight = 3; i >= 0; i--, weight = 4 - weight) {
            sum += Number(digits.charAt(i)) * weight;
        }

        sum = (10 - (sum % 10)) % 10;

        return sum === checkDigit;
    }
    const isValidLength =
        ean.length === 8 || ean.length === 12 || ean.length === 13 || ean.length === 14;

    return isValidLength && testChecksum(ean);
}

// Export module
export { isValidGtin };
