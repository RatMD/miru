import assert from 'node:assert/strict';
import { afterEach, test, vi } from 'vitest';
import { createApp } from 'vue';
import { browserNavigation } from '../src/adapters/ajax.ts';
import { useDataTableQuery } from '../src/components/data-table/useDataTableQuery.ts';
import { createMiruConfig } from '../src/miru.ts';

afterEach(() => vi.unstubAllGlobals());

test('plain navigation serializes nested filters and keeps history behavior', () => {
    const location = {
        href: 'https://example.test/items',
        assign: vi.fn(),
        replace: vi.fn(),
    };
    vi.stubGlobal('window', { location });
    browserNavigation.visit('/items?existing=1#list', {
        data: { page: 2, filters: { active: true, tags: ['a', 'b'] } },
    });
    const target = new URL(location.assign.mock.calls[0][0]);
    assert.equal(target.searchParams.get('filters[active]'), '1');
    assert.equal(target.searchParams.get('filters[tags][1]'), 'b');
    assert.equal(target.searchParams.get('existing'), '1');
    assert.equal(target.hash, '#list');
    browserNavigation.visit('/items', { replace: true });
    assert.equal(location.replace.mock.calls[0][0], 'https://example.test/items');
});

test('plain table mutations use AJAX and finish on both success and validation failure', async () => {
    const reload = vi.fn();
    vi.stubGlobal('window', { location: { reload } });
    for (const success of [true, false]) {
        const events = [];
        vi.stubGlobal('fetch', async (_url, init) => {
            assert.equal(init.method, 'PATCH');
            assert.deepEqual(JSON.parse(init.body), { direction: 'up' });
            return success
                ? new Response(null, { status: 204 })
                : Response.json({ errors: { direction: ['Not allowed'] } }, { status: 422 });
        });
        await new Promise((resolve) => {
            browserNavigation.visit('/items/1/move', {
                method: 'patch',
                data: { direction: 'up' },
                onStart: () => events.push('start'),
                onSuccess: () => events.push('success'),
                onError: () => events.push('error'),
                onFinish: () => {
                    events.push('finish');
                    resolve();
                },
            });
        });
        assert.deepEqual(events, ['start', success ? 'success' : 'error', 'finish']);
    }
    assert.equal(reload.mock.calls.length, 1);
});

test('table queries use the app-local navigation adapter and custom handlers retain precedence', () => {
    const visits = [];
    const handled = [];
    const app = createApp({});
    app.use(createMiruConfig({ navigation: { visit: (...args) => visits.push(args) } }));
    vi.stubGlobal('window', { location: { pathname: '/items' } });
    const options = {
        list: {
            state: { page: 1, per_page: 20, order_by: 'name', order: 'ASC' },
            filters: { search: 'Ada' },
        },
    };
    const query = app.runWithContext(() => useDataTableQuery(options));
    query.visitPage(3);
    assert.equal(visits[0][0], '/items');
    assert.equal(visits[0][1].data.page, 3);
    assert.equal(visits[0][1].replace, false);
    assert.deepEqual(visits[0][1].only, ['list']);
    const custom = app.runWithContext(() =>
        useDataTableQuery({
            ...options,
            queryHandler: (...args) => handled.push(args),
        }),
    );
    custom.visitPage(4);
    assert.equal(handled[0][0].page, 4);
    assert.equal(visits.length, 1);
});
