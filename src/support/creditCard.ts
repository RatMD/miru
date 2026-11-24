/**
 * Check a payment card number's length and Luhn checksum without guessing its issuer.
 * @param value Card number containing 12 to 19 digits, with optional spaces or hyphens.
 * @returns Whether the number passes format and checksum checks; issuance and status are not checked.
 * @see https://www.pcisecuritystandards.org/faqs/1137/
 */
function isValidCreditCard(value: string): boolean {
    if (typeof value !== 'string' || /[^0-9 \u00a0-]/.test(value)) {
        return false;
    }

    const digits = value.replace(/[ \u00a0-]/g, '');

    if (!/^[0-9]{12,19}$/.test(digits) || /^0+$/.test(digits)) {
        return false;
    }

    let sum = 0;
    let double = false;

    for (let index = digits.length - 1; index >= 0; index--) {
        let digit = Number(digits[index]);

        if (double) {
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        double = !double;
    }

    return sum % 10 === 0;
}

// Export module
export { isValidCreditCard };
