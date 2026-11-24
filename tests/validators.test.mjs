import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'vitest';
import { isValidCreditCard } from '../src/support/creditCard.ts';
import { isValidMailAddress } from '../src/support/emailAddress.ts';
import { isValidGtin } from '../src/support/gtin.ts';
import { isValidIban } from '../src/support/iban.ts';

const registry = JSON.parse(
    readFileSync(new URL('./fixtures/iban-examples.json', import.meta.url), 'utf8'),
);

test('IBAN accepts every electronic example from SWIFT Registry release 103', () => {
    assert.equal(Object.keys(registry.examples).length, 89);

    for (const [country, value] of Object.entries(registry.examples)) {
        assert.equal(isValidIban(value), true, country + ': ' + value);
    }
});

test('IBAN accepts lowercase and printed spaces but rejects unsupported separators and Unicode lookalikes', () => {
    for (const value of ['de89 3704 0044 0532 0130 00', 'DE89\u00a03704 0044 0532 0130 00']) {
        assert.equal(isValidIban(value), true);
    }

    for (const value of [
        '',
        ' ',
        'DE89-370400440532013000',
        'DE89/370400440532013000',
        'DE89370400440532013000\n',
        '\tDE89370400440532013000',
        'ＤＥ89370400440532013000',
        'DE8937040044053201300O',
        null,
        undefined,
        89370400440532013000,
    ]) {
        assert.equal(isValidIban(value), false, String(value));
    }
});

test('IBAN rejects a changed check digit for every registered country', () => {
    for (const [country, value] of Object.entries(registry.examples)) {
        const incorrect = value.slice(0, 3) + ((Number(value[3]) + 1) % 10) + value.slice(4);
        assert.equal(isValidIban(incorrect), false, country);
    }
});

// Test-only BigInt calculation is independent of the production streaming remainder algorithm.
function withIbanChecksum(country, bban) {
    const numeric = (bban + country + '00').replace(/[A-Z]/g, (letter) =>
        String(letter.charCodeAt(0) - 55),
    );
    const checkDigits = String(98n - (BigInt(numeric) % 97n)).padStart(2, '0');

    return country + checkDigits + bban;
}

test('IBAN rejects unknown countries, invalid country lengths and invalid BBAN character classes despite valid checksums', () => {
    for (const [country, bban] of [
        ['ZZ', '370400440532013000'],
        ['DE', '37040044053201300'],
        ['DE', 'A70400440532013000'],
        ['GB', '123460161331926819'],
    ]) {
        assert.equal(isValidIban(withIbanChecksum(country, bban)), false, country + ':' + bban);
    }
});

test('IBAN rejects reserved check-digit values even when their MOD 97 remainder is one', () => {
    for (const [valid, reserved] of [
        ['97', '00'],
        ['98', '01'],
        ['02', '99'],
    ]) {
        let candidate;

        for (let suffix = 0; suffix < 97; suffix++) {
            const iban = withIbanChecksum('DE', String(suffix).padStart(18, '0'));

            if (iban.slice(2, 4) === valid) {
                candidate = iban;
                break;
            }
        }

        assert.ok(candidate);
        assert.equal(isValidIban(candidate), true);
        assert.equal(isValidIban(candidate.slice(0, 2) + reserved + candidate.slice(4)), false);
    }
});

test('credit card validation handles both Luhn parities and 12 through 19 digit boundaries', () => {
    for (const value of [
        '100000000008',
        '4222222222222',
        '30569309025904',
        '378282246310005',
        '4242424242424242',
        '5555555555554444',
        '4000000000000000006',
        '4242 4242 4242 4242',
        '4242-4242-4242-4242',
    ]) {
        assert.equal(isValidCreditCard(value), true, value);
    }
});

test('credit card validation rejects bad checksums, masked values, unexpected characters and invalid lengths', () => {
    for (const value of [
        '',
        '0',
        '0000000000000000',
        '4242424242424241',
        '42424242424',
        '42424242424242424242',
        '4242.4242.4242.4242',
        '4242/4242/4242/4242',
        '4242 xxxx xxxx 4242',
        '4242424242424242\n',
        '４２４２４２４２４２４２４２４２',
        null,
        undefined,
        4242424242424242,
    ]) {
        assert.equal(isValidCreditCard(value), false, String(value));
    }
});

test('GTIN validates all four GS1 lengths, preserving leading zeros', () => {
    for (const value of ['96385074', '036000291452', '4006381333931', '10012345000017']) {
        assert.equal(isValidGtin(value), true, value);
        assert.equal(
            isValidGtin(value.slice(0, -1) + ((Number(value.at(-1)) + 1) % 10)),
            false,
            value,
        );
    }

    for (const value of [
        '',
        '000000000000000000',
        '4006381333931\n',
        '4006 381333931',
        '400638133393X',
        null,
        undefined,
        4006381333931,
    ]) {
        assert.equal(isValidGtin(value), false, String(value));
    }
});

test('mail address validation supports IDN domains and rejects malformed inputs', () => {
    for (const value of ['name@example.com', 'name+tag@example.com', 'name@bücher.de']) {
        assert.equal(isValidMailAddress(value), true, value);
    }

    for (const value of [
        '',
        '@example.com',
        'name@',
        'name@example.com/path',
        'name@example.com\n',
        'name@example.com?x=1',
        'name@@example.com',
        null,
        undefined,
        123,
    ]) {
        assert.equal(isValidMailAddress(value), false, String(value));
    }
});
