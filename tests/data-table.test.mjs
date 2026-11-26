import assert from 'node:assert/strict';
import { test } from 'vitest';
import {
    adaptLucidList,
    adaptLucidPagination,
    serializeLucidQuery,
} from '../src/adapters/adonis.ts';
import { adaptLaravelPagination, adaptLaravelList } from '../src/adapters/laravel.ts';
import {
    appliedFilterValue,
    filterDraft,
    filterRangeInvalid,
    filterValueLabel,
    hasFilterValue,
} from '../src/components/data-table/filter-values.ts';
import { normalizeDataTableList } from '../src/components/data-table/normalization.ts';
import { dataTableRowId } from '../src/components/data-table/selection.ts';

const pagination = (overrides = {}) => ({
    data: [{ id: 'record-1' }],
    meta: { currentPage: 2, lastPage: 3, perPage: 20, total: 45, ...overrides },
});
const config = { filters: {}, actions: [], searchable: ['name'], sortable: ['name'] };

test('Laravel paginator fills the Miru contract and preserves server URLs and links', () => {
    const source = {
        data: [{ id: 'record-1' }],
        current_page: 2,
        last_page: 3,
        per_page: 20,
        total: 45,
        path: '/items?status=active',
        from: 21,
        to: 40,
        next_page_url: '/custom-next',
        links: [{ active: true, label: '2', url: '/items?page=2' }],
    };
    const result = adaptLaravelPagination(source);
    assert.equal(result.first_page, 1);
    assert.equal(result.prev_page_url, '/items?status=active&page=1');
    assert.equal(result.next_page_url, '/custom-next');
    assert.deepEqual(result.links, source.links);
    assert.equal(source.first_page, undefined);
    const empty = adaptLaravelPagination({
        ...source,
        data: [],
        current_page: 1,
        last_page: 0,
        total: 0,
        from: null,
        to: null,
    });
    assert.deepEqual([empty.from, empty.to, empty.last_page, empty.next_page_url], [0, 0, 1, null]);
    const list = adaptLaravelList({
        results: source,
        filters: { search: 'project' },
        config,
        state: { order_by: 'name', order: 'DESC' },
    });
    assert.deepEqual(list.state, {
        page: 2,
        per_page: 20,
        order_by: 'name',
        order: 'DESC',
        search: 'project',
    });
    assert.strictEqual(normalizeDataTableList(list, 'default'), list);
});

test('Lucid metadata normalizes ranges and synthesizes usable pager URLs without mutating source', () => {
    const original = pagination();
    const result = adaptLucidPagination(original, '/items?status=active');
    assert.deepEqual(
        [result.from, result.to, result.current_page, result.last_page],
        [21, 40, 2, 3],
    );
    assert.equal(result.prev_page_url, '/items?status=active&page=1');
    assert.equal(result.next_page_url, '/items?status=active&page=3');
    assert.equal(adaptLucidPagination(pagination({ currentPage: 3 })).to, 45);
    assert.equal(adaptLucidPagination(pagination({ currentPage: 3 })).next_page_url, null);
    const empty = adaptLucidPagination({
        data: [],
        meta: { currentPage: 1, lastPage: 0, perPage: 20, total: 0 },
    });
    assert.deepEqual(
        [empty.from, empty.to, empty.last_page, empty.prev_page_url, empty.next_page_url],
        [0, 0, 1, null, null],
    );
    assert.equal(original.meta.nextPageUrl, undefined);
});

test('format selection preserves the MIRU contract and normalizes Lucid state independently', () => {
    const source = {
        results: pagination(),
        config,
        filters: { search: 'motor', brands: ['a', 'b'] },
        state: { orderBy: 'name', order: 'desc' },
    };
    const normalized = normalizeDataTableList(source, 'lucid');
    assert.equal(normalized.state.order, 'DESC');
    assert.equal(normalized.state.order_by, 'name');
    assert.equal(normalized.state.search, 'motor');
    assert.equal(normalized.state.page, 2);
    assert.strictEqual(normalizeDataTableList(normalized, 'default'), normalized);
    assert.equal(
        adaptLucidList({ ...source, state: { search: 'term' }, filters: {} }).filters.search,
        'term',
    );
});

test('Lucid query serialization leaves endpoint naming and domain-specific filters configurable', () => {
    const state = { page: 2, per_page: 20, order_by: 'name', order: 'DESC', search: null };
    const filters = { brands: ['a', 'b'], size: { from: 0, to: 10 } };
    assert.deepEqual(serializeLucidQuery(state, filters), {
        ...filters,
        page: 2,
        perPage: 20,
        orderBy: 'name',
        order: 'desc',
        search: null,
    });
    const custom = serializeLucidQuery(state, filters, {
        perPageKey: 'limit',
        serializeFilters: (values) => ({
            brands: values.brands.join(','),
            sizeMin: values.size.from,
        }),
    });
    assert.equal(custom.limit, 20);
    assert.equal(custom.brands, 'a,b');
    assert.equal(custom.sizeMin, 0);
    assert.equal(custom.perPage, undefined);
});

test('filter drafts isolate cancellation, preserve zero and remove empty values', () => {
    const multi = {
        type: 'multiselect',
        options: [
            { value: 'a', label: 'Active' },
            { value: 'b', label_key: 'archived' },
        ],
    };
    const original = ['a'];
    const draft = filterDraft(multi, original);
    draft.push('b');
    assert.deepEqual(original, ['a']);
    assert.equal(
        filterValueLabel(multi, draft, (key) => key.toUpperCase()),
        'Active, ARCHIVED',
    );
    const range = { from: 0, to: 10 };
    const copy = filterDraft({ type: 'number-range', options: [] }, range);
    copy.to = 20;
    assert.equal(range.to, 10);
    assert.equal(hasFilterValue({ from: 0, to: '' }), true);
    for (const value of [[], { from: '', to: '' }, undefined, null, ''])
        assert.equal(hasFilterValue(value), false);
    assert.equal(appliedFilterValue([]), undefined);
    assert.equal(appliedFilterValue('__all__'), undefined);
    assert.deepEqual(appliedFilterValue({ from: 0, to: '' }), { from: 0, to: undefined });
});

test('range validation rejects inverted, nonfinite and impossible calendar boundaries', () => {
    const numbers = { type: 'number-range', options: [], min: 0, max: 100 };
    assert.equal(filterRangeInvalid(numbers, { from: 0, to: 10 }), false);
    for (const value of [
        { from: 5, to: 1 },
        { from: -1 },
        { to: 101 },
        { from: 'Infinity' },
        { from: 'bad' },
    ])
        assert.equal(filterRangeInvalid(numbers, value), true);
    const dates = { type: 'date-range', options: [] };
    assert.equal(filterRangeInvalid(dates, { from: '2026-10-25', to: '2026-10-25' }), false);
    assert.equal(filterRangeInvalid(dates, { from: '2026-02-30' }), true);
    assert.equal(filterRangeInvalid(dates, { from: '2026-11-02', to: '2026-11-01' }), true);
    assert.equal(filterRangeInvalid(dates, { from: '', to: '' }), false);
});

test('selection keys survive reorder, support composite keys and reject missing explicit keys', () => {
    assert.equal(dataTableRowId({ id: 'alpha' }, 0), dataTableRowId({ id: 'alpha' }, 8));
    assert.equal(dataTableRowId({ id: 0 }, 7), '0');
    assert.equal(dataTableRowId({ filename: 'backup.sql' }, 1, 'filename'), 'backup.sql');
    assert.equal(
        dataTableRowId({ provider: 'a', id: 5 }, 0, (row) => row.provider + ':' + row.id),
        'a:5',
    );
    assert.equal(dataTableRowId({}, 4), '4');
    assert.throws(() => dataTableRowId({}, 4, 'filename'));
});

// Exercise public composable callbacks with a mocked transport and real Vue reactivity.
const { readFile } = await import('node:fs/promises');
const ts = (await import('typescript')).default;
const { ref, toValue, unref } = await import('vue');
const { computed } = await import('vue');
const { resolveDataTableAdapter } = await import('../src/components/data-table/normalization.ts');
const querySource = await readFile(
    new URL('../src/components/data-table/useDataTableQuery.ts', import.meta.url),
    'utf8',
);
const queryOutput = ts.transpileModule(querySource.replace(/^import[\s\S]*?;\r?\n/gm, ''), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
function queryFixture(options = {}) {
    const exports = {};
    const calls = [];
    let cleared = 0;
    new Function(
        'exports',
        'useNavigation',
        'useDataTableAdapter',
        'toValue',
        'unref',
        queryOutput,
    )(
        exports,
        () => ({ visit: (url, { data, ...options }) => calls.push([url, data, options]) }),
        (format) => computed(() => resolveDataTableAdapter(toValue(format) ?? 'default')),
        toValue,
        unref,
    );
    const list = adaptLucidList({
        results: pagination(),
        config,
        filters: { search: 'motor', brands: ['a'] },
        state: { orderBy: 'name', order: 'asc' },
    });
    const controller = exports.useDataTableQuery({
        list,
        onNavigate: () => {
            cleared++;
        },
        ...options,
    });
    return { ...controller, calls, cleared: () => cleared };
}
test('raw transport callbacks are called only on navigation and locks prevent both navigation and selection clearing', () => {
    const disabled = ref(true);
    const visits = [];
    const fixture = queryFixture({
        disabled,
        queryHandler: (state, filters) => visits.push({ state, filters }),
    });
    assert.equal(visits.length, 0);
    fixture.visitPage(3);
    assert.equal(visits.length, 0);
    assert.equal(fixture.cleared(), 0);
    disabled.value = false;
    fixture.toggleSort('name');
    assert.equal(visits.length, 1);
    assert.equal(visits[0].state.order, 'DESC');
    assert.equal(visits[0].state.page, 1);
    assert.equal(fixture.cleared(), 1);
    fixture.toggleSort('not-sortable');
    assert.equal(visits.length, 1);
});
test('raw serializers receive normalized state exactly once and retain the MIRU partial reload contract', () => {
    const originalWindow = globalThis.window;
    globalThis.window = { location: { pathname: '/records' } };
    try {
        const legacy = queryFixture();
        legacy.visitPage(3);
        assert.equal(legacy.calls[0][1].page, 3);
        assert.deepEqual(legacy.calls[0][2].only, ['list']);
        let serializations = 0;
        const custom = queryFixture({
            dataFormat: 'lucid',
            queryProps: ['items'],
            querySerializer: (state, filters) => {
                serializations++;
                return serializeLucidQuery(state, filters, { perPageKey: 'limit' });
            },
        });
        custom.visitPerPage(50);
        assert.equal(serializations, 1);
        assert.equal(custom.calls[0][1].limit, 50);
        assert.equal(custom.calls[0][1].order, 'asc');
        assert.deepEqual(custom.calls[0][2].only, ['items']);
        const lucid = queryFixture({ dataFormat: 'lucid' });
        lucid.visitPage(2);
        assert.equal(lucid.calls[0][2].only, undefined);
    } finally {
        if (originalWindow === undefined) delete globalThis.window;
        else globalThis.window = originalWindow;
    }
});
