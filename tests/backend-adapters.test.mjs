import assert from 'node:assert/strict';
import { afterEach, test, vi } from 'vitest';
import { createApp } from 'vue';
import { adonisAdapter } from '../src/adapters/adonis.ts';
import { ajaxAdapter } from '../src/adapters/ajax.ts';
import { laravelAdapter } from '../src/adapters/laravel.ts';
import { useDataTableQuery } from '../src/components/data-table/useDataTableQuery.ts';
import { resolveFormAdapter } from '../src/components/form/adapter.ts';
import { useDataTableAdapter } from '../src/composables/useDataTableAdapter.ts';
import { createMiruConfig } from '../src/miru.ts';

afterEach(() => vi.unstubAllGlobals());

const records = [{ id: '1', name: 'Ada' }];
const config = { filters: {}, actions: [], searchable: ['name'], sortable: ['name'] };
const lucid = {
    results: { data: records, meta: { currentPage: 2, perPage: 10, lastPage: 3, total: 25 } },
    config,
    filters: { search: 'Ada' },
    state: { orderBy: 'name', order: 'desc' },
};
const laravel = {
    results: { data: records, current_page: 2, per_page: 10, last_page: 3, total: 25 },
    config,
    filters: { search: 'Ada' },
    state: { order_by: 'name', order: 'DESC' },
};

test('Adonis and Laravel normalize and serialize globally with an independently supplied transport', () => {
    vi.stubGlobal('window', { location: { pathname: '/items' } });
    for (const [dataTable, source, key] of [
        [adonisAdapter({ perPageKey: 'limit' }), lucid, 'limit'],
        [laravelAdapter(), laravel, 'per_page'],
    ]) {
        const visits = [];
        const app = createApp({});
        app.use(
            createMiruConfig({
                dataTable,
                adapter: { navigation: { visit: (...args) => visits.push(args) } },
            }),
        );
        const backend = app.runWithContext(() => useDataTableAdapter());
        const list = backend.value.normalize(source);
        assert.equal(list.state.page, 2);
        assert.equal(list.state.order, 'DESC');
        assert.equal(list.results.from, 11);
        assert.equal(list.results.to, 20);
        assert.equal(list.results.data, records);
        const query = app.runWithContext(() => useDataTableQuery({ list }));
        query.visitPage(3);
        assert.equal(visits[0][0], '/items');
        assert.equal(visits[0][1].data.page, 3);
        assert.equal(visits[0][1].data[key], 10);
        assert.equal(visits[0][1].data.order, key === 'limit' ? 'desc' : 'DESC');
        assert.deepEqual(visits[0][1].only, key === 'limit' ? undefined : ['list']);
        const local = app.runWithContext(() => useDataTableAdapter('default'));
        assert.equal(local.value.normalize(list), list);
        const localQuery = app.runWithContext(() =>
            useDataTableQuery({ list, dataFormat: 'default' }),
        );
        localQuery.visitPage(1);
        assert.equal(visits[1][1].data.per_page, 10);
        assert.equal(visits[1][1].data.limit, undefined);
    }
});

test('AJAX transport settings apply to named form submissions and table mutations', async () => {
    const seen = [];
    vi.stubGlobal('window', { location: { reload() {} } });
    vi.stubGlobal('fetch', async (_url, init) => {
        seen.push(init);
        return new Response(null, { status: 204 });
    });
    const adapter = ajaxAdapter({
        credentials: 'include',
        headers: { 'X-CSRF-TOKEN': 'host-token' },
    });
    const form = await resolveFormAdapter('ajax', adapter.formAdapters);
    await form.submit({
        method: 'post',
        url: '/profile',
        values: {},
        payload: {},
        cancelledMessage: '',
        unprocessedMessage: '',
    });
    await new Promise((resolve) => {
        adapter.navigation.visit('/items/1', { method: 'delete', onFinish: resolve });
    });
    assert.equal(seen.length, 2);
    for (const init of seen) {
        assert.equal(init.credentials, 'include');
        assert.equal(init.headers.get('X-CSRF-TOKEN'), 'host-token');
    }
});
