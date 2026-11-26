import assert from 'node:assert/strict';
import { test } from 'vitest';
import { readColor, formatColor, normalizeSwatches } from '../src/components/color-picker/color.ts';

test('supported input/output formats preserve primary colors and transparency', () => {
    for (const value of ['#f00', 'rgb(255, 0, 0)', 'hsl(0, 100%, 50%)', 'hsv(0, 100%, 100%)']) {
        assert.equal(formatColor(readColor(value)), '#ff0000');
    }
    assert.equal(formatColor(readColor('#000000')), '#000000');
    assert.equal(formatColor(readColor('#ffffffff')), '#ffffff');
    assert.equal(formatColor(readColor('#4f46e580')), '#4f46e580');
    assert.equal(formatColor(readColor('#ff0000'), 'hsv'), 'hsv(0, 100%, 100%)');
    assert.equal(formatColor(readColor('#ff0000'), 'hsl'), 'hsl(0, 100%, 50%)');
    assert.equal(formatColor(readColor('#ff0000'), 'rgb'), 'rgb(255, 0, 0)');
});
test('incomplete, unsupported, and out-of-range colors cannot replace valid selections', () => {
    for (const value of [
        null,
        '',
        '#',
        '#12345',
        'garbage',
        'cmyk(0, 0, 0, 0)',
        'rgb(256, 0, 0)',
        'hsl(0, 101%, 50%)',
        'rgba(0, 0, 0, 2)',
    ]) {
        assert.equal(readColor(value), undefined, String(value));
    }
});
test('palettes deduplicate equivalent colors and respect the alpha setting', () => {
    const values = [
        '#fff',
        '#ffffff',
        'rgb(255, 255, 255)',
        '#ffffff80',
        'invalid',
        { value: '#059669', label: 'Emerald' },
    ];
    assert.deepEqual(normalizeSwatches(values, false), [
        { value: '#ffffff', label: '#fff' },
        { value: '#059669', label: 'Emerald' },
    ]);
    assert.deepEqual(
        normalizeSwatches(values, true).map((item) => item.value),
        ['#ffffff', '#ffffff80', '#059669'],
    );
});
