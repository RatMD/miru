import assert from 'node:assert/strict';
import { test } from 'vitest';
import { ref } from 'vue';
import { useTableSort } from '../src/composables/useTableSort.ts';

test('local sorting cycles, switches columns, and preserves the source order', () => {
    const rows = Object.freeze([
        { name: 'Item 10', amount: 29 },
        { name: 'Item 2', amount: 120 },
        { name: 'Item 1', amount: 9 },
    ]);
    const { sortedRows, sortBy, directionFor, sort } = useTableSort(rows);
    sortBy('amount');
    assert.deepEqual(
        sortedRows.value.map((row) => row.amount),
        [9, 29, 120],
    );
    sortBy('amount');
    assert.deepEqual(
        sortedRows.value.map((row) => row.amount),
        [120, 29, 9],
    );
    sortBy('amount');
    assert.equal(sort.value, null);
    assert.deepEqual(sortedRows.value, rows);
    sortBy('amount');
    sortBy('name');
    assert.equal(directionFor('amount'), false);
    assert.equal(directionFor('name'), 'asc');
    assert.deepEqual(
        sortedRows.value.map((row) => row.name),
        ['Item 1', 'Item 2', 'Item 10'],
    );
    assert.deepEqual(
        rows.map((row) => row.amount),
        [29, 120, 9],
    );
});

test('reactive sources update, equal values remain stable and missing values stay last', () => {
    const rows = ref([
        { id: 'missing', value: null },
        { id: 'first', value: 2 },
        { id: 'second', value: 2 },
        { id: 'small', value: 1 },
        { id: 'undefined' },
    ]);
    const { sortedRows, sortBy, sort } = useTableSort(() => rows.value, {
        key: 'value',
        direction: 'asc',
    });
    assert.deepEqual(
        sortedRows.value.map((row) => row.id),
        ['small', 'first', 'second', 'missing', 'undefined'],
    );
    sortBy('value');
    assert.deepEqual(
        sortedRows.value.map((row) => row.id),
        ['first', 'second', 'small', 'missing', 'undefined'],
    );
    rows.value = [
        { id: 'replacement', value: 7 },
        { id: 'larger', value: 10 },
    ];
    assert.deepEqual(
        sortedRows.value.map((row) => row.id),
        ['larger', 'replacement'],
    );
    sort.value = null;
    assert.deepEqual(
        sortedRows.value.map((row) => row.id),
        ['replacement', 'larger'],
    );
});

test('dates sort chronologically rather than by their display string', () => {
    const rows = [{ date: new Date('2026-01-01') }, { date: new Date('2025-12-31') }];
    const { sortedRows } = useTableSort(rows, { key: 'date', direction: 'asc' });
    assert.equal(sortedRows.value[0], rows[1]);
});
