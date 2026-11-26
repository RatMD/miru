import assert from 'node:assert/strict';
import { test } from 'vitest';
import { indicatorInk, indicatorValue } from '../src/components/indicator/helpers.ts';
test('numeric caps preserve zero and leave text and preformatted values unchanged', () => {
    assert.equal(indicatorValue(120, 99), '99+');
    assert.equal(indicatorValue(99, 99), '99');
    assert.equal(indicatorValue(0, 99), '0');
    assert.equal(indicatorValue('00120', 99), '00120');
    assert.equal(indicatorValue('1 message', 99), '1 message');
    assert.equal(indicatorValue(12500), '12500');
    assert.equal(indicatorValue(120, Infinity), '120');
    assert.equal(indicatorValue(undefined), undefined);
    assert.equal(indicatorValue(''), undefined);
});
test('custom opaque hex colors choose readable black or white foregrounds', () => {
    assert.equal(indicatorInk('#fff'), '#000000');
    assert.equal(indicatorInk('#ffffff'), '#000000');
    assert.equal(indicatorInk('#ffb700'), '#000000');
    assert.equal(indicatorInk('#000'), '#ffffff');
    assert.equal(indicatorInk('#000000'), '#ffffff');
    assert.equal(indicatorInk('var(--brand)'), '#ffffff');
});
