import assert from 'node:assert/strict';
import { test } from 'vitest';
import { nextTick, ref } from 'vue';
import { createNumberFormatDirective } from '../src/plugins/number-format.ts';
import { formatNumber, numberFormat } from '../src/support/numberFormat.ts';

test('formatNumber handles numeric values, locales, Intl options and missing data', () => {
    assert.equal(formatNumber('1234.5', 'de_DE'), '1.234,5');
    assert.equal(formatNumber(1234.5, 'en-US', { minimumFractionDigits: 2 }), '1,234.50');
    assert.equal(
        formatNumber(0.875, 'en-US', { style: 'percent', maximumFractionDigits: 1 }),
        '87.5%',
    );
    assert.equal(formatNumber(9007199254740993n, 'en-US'), '9,007,199,254,740,993');
    assert.equal(formatNumber(0, 'en-US'), '0');
    for (const value of [null, undefined, '', '  ', 'invalid', '1.234,50', NaN, Infinity]) {
        assert.equal(formatNumber(value, 'en-US'), '—');
    }
    const display = numberFormat({ unit: 'kg', decimal_places: 2 }, 'de-DE');
    assert.equal(formatNumber(12.5, 'de-DE', display.format), '12,50 kg');
});

test('number directive reacts to locale and binding changes, respects overrides and stops on unmount', async () => {
    const locale = ref('en-US');
    const directive = createNumberFormatDirective(() => locale.value);
    const el = { textContent: '' };
    directive.mounted(el, { value: 1234.5 });
    assert.equal(el.textContent, '1,234.5');
    locale.value = 'de-DE';
    await nextTick();
    assert.equal(el.textContent, '1.234,5');
    directive.updated(el, {
        value: { value: 0.5, locale: 'en-US', options: { style: 'percent' } },
    });
    assert.equal(el.textContent, '50%');
    locale.value = 'fr-FR';
    await nextTick();
    assert.equal(el.textContent, '50%');
    directive.updated(el, { value: 9876.25 });
    locale.value = 'de-DE';
    await nextTick();
    assert.equal(el.textContent, '9.876,25');
    directive.beforeUnmount(el);
    locale.value = 'en-US';
    await nextTick();
    assert.equal(el.textContent, '9.876,25');
});
