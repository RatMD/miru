import { z } from 'zod';

/**
 * Validate an email address, including internationalized domain names.
 * @param value Original email address to validate.
 * @returns Whether the address passes email validation.
 */
function isValidMailAddress(value: string): boolean {
    if (typeof value !== 'string') {
        return false;
    }

    const separator = value.lastIndexOf('@');

    if (separator < 1) {
        return false;
    }

    const local = value.slice(0, separator);
    const domain = value.slice(separator + 1);

    if (!domain || /[^\p{L}\p{N}.-]/u.test(domain)) {
        return false;
    }

    try {
        const hostname = new URL(`https://${domain}`).hostname;

        return z.email().safeParse(`${local}@${hostname}`).success;
    } catch {
        return false;
    }
}

// Export module
export { isValidMailAddress, isValidMailAddress as isValidEmailAddress };
