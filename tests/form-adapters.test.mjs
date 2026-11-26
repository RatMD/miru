import assert from 'node:assert/strict';
import { afterEach, test, vi } from 'vitest';
import { createAjaxFormAdapter } from '../src/adapters/ajax.ts';
import { request } from '../src/support/request.ts';

vi.mock('@inertiajs/vue3', () => ({ router: { visit: vi.fn() } }));
const { router } = await import('@inertiajs/vue3');
const { createInertiaFormAdapter } = await import('../src/adapters/inertia.ts');

afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
});
const context = (overrides = {}) => ({
    method: 'post',
    url: '/profile',
    values: { name: 'Ada' },
    payload: { name: 'Ada' },
    cancelledMessage: 'Cancelled',
    unprocessedMessage: 'Request did not complete',
    ...overrides,
});

test('AJAX serializes JSON and merges factory/request headers, methods and fetch options', async () => {
    const calls = [];
    vi.stubGlobal('fetch', async (url, options) => {
        calls.push([url, options]);
        return Response.json({ id: 1 });
    });
    const adapter = createAjaxFormAdapter({
        credentials: 'include',
        headers: { 'X-CSRF-TOKEN': 'token', 'X-Host': 'default' },
    });
    const result = await adapter.submit(
        context({ method: 'patch', options: { headers: { 'X-Host': 'form' } } }),
    );
    assert.deepEqual(result, { status: 'success', result: { id: 1 } });
    assert.equal(calls[0][1].method, 'PATCH');
    assert.equal(calls[0][1].body, '{"name":"Ada"}');
    assert.equal(calls[0][1].headers.get('X-CSRF-TOKEN'), 'token');
    assert.equal(calls[0][1].headers.get('X-Host'), 'form');
    assert.equal(calls[0][1].credentials, 'include');
    assert.equal('preserveErrorDetails' in calls[0][1], false);
});

test('AJAX preserves 422 field arrays and normalizes Miru errors, empty success and network failures', async () => {
    const adapter = createAjaxFormAdapter();
    vi.stubGlobal('fetch', async () =>
        Response.json(
            { message: 'Invalid', errors: { 'items.0.name': ['Required'] } },
            { status: 422 },
        ),
    );
    assert.deepEqual(await adapter.submit(context()), {
        status: 'error',
        message: 'Invalid',
        source: 'server',
        errors: { 'items.0.name': ['Required'] },
    });
    vi.stubGlobal('fetch', async () =>
        Response.json({
            status: 'error',
            message: 'Invalid',
            details: { source: 'server', errors: { name: 'Required' } },
        }),
    );
    assert.equal((await adapter.submit(context())).errors.name, 'Required');
    vi.stubGlobal('fetch', async () => Response.json({ status: 'error', message: 'Not allowed' }));
    assert.equal((await adapter.submit(context())).source, 'server');
    vi.stubGlobal('fetch', async () =>
        Response.json({ errors: { name: ['Internal failure'] } }, { status: 500 }),
    );
    assert.equal((await adapter.submit(context())).source, 'transport');
    vi.stubGlobal('fetch', async () => new Response(null, { status: 204 }));
    assert.deepEqual(await adapter.submit(context({ method: 'delete' })), {
        status: 'success',
        result: undefined,
    });
    vi.stubGlobal('fetch', async () => {
        throw new Error('Offline');
    });
    assert.equal((await adapter.submit(context())).source, 'transport');
});

test('AJAX uploads nested files as multipart and serializes GET fields with bracket notation', async () => {
    let seen;
    vi.stubGlobal('fetch', async (url, options) => {
        seen = { url, options };
        return Response.json({ status: 'success', result: true });
    });
    const adapter = createAjaxFormAdapter({ headers: { 'Content-Type': 'application/json' } });
    await adapter.submit(
        context({ payload: { files: [new Blob(['data'])], enabled: true, at: new Date(0) } }),
    );
    assert.ok(seen.options.body instanceof FormData);
    assert.ok(seen.options.body.get('files[0]') instanceof Blob);
    assert.equal(seen.options.body.get('enabled'), '1');
    assert.equal(seen.options.headers.has('Content-Type'), false);
    await adapter.submit(
        context({
            method: 'get',
            url: '/profile?existing=1#part',
            payload: { tags: ['a', 'b'], nested: { active: true } },
        }),
    );
    const url = new URL(seen.url, 'http://localhost');
    assert.equal(url.searchParams.get('tags[1]'), 'b');
    assert.equal(url.searchParams.get('nested[active]'), '1');
    assert.equal(url.hash, '#part');
});

test('request error metadata is opt-in and standard helper results stay compatible', async () => {
    vi.stubGlobal('fetch', async () =>
        Response.json({ message: 'Invalid', errors: { name: ['Required'] } }, { status: 422 }),
    );
    assert.deepEqual(await request.post('/profile'), { status: 'error', message: 'Invalid' });
    const detailed = await request.post('/profile', null, { preserveErrorDetails: true });
    assert.equal(detailed.httpStatus, 422);
    assert.deepEqual(detailed.details.errors, { name: ['Required'] });
});

test('Inertia passes transformed payload/options and maps success and server errors', async () => {
    const adapter = createInertiaFormAdapter({ preserveScroll: true });
    router.visit.mockImplementation((_url, options) => {
        assert.equal(options.preserveScroll, true);
        assert.deepEqual(options.data, { name: 'Ada' });
        options.onSuccess({ props: { saved: true } });
    });
    assert.deepEqual(await adapter.submit(context()), {
        status: 'success',
        result: { props: { saved: true } },
    });
    router.visit.mockImplementation((_url, options) => options.onError({ name: 'Required' }));
    assert.deepEqual(await adapter.submit(context()), {
        status: 'error',
        source: 'server',
        errors: { name: 'Required' },
    });
});

test('Inertia always settles cancellation, network failures, non-Inertia responses and finish-only visits', async () => {
    const adapter = createInertiaFormAdapter();
    for (const callback of ['onCancel', 'onHttpException', 'onFinish']) {
        router.visit.mockImplementation((_url, options) => options[callback]({}));
        assert.equal((await adapter.submit(context())).source, 'transport');
    }
    router.visit.mockImplementation((_url, options) =>
        options.onNetworkError(new Error('Offline')),
    );
    assert.equal((await adapter.submit(context())).message, 'Offline');
    router.visit.mockImplementation((_url, options) => options.onBefore({}));
    assert.equal(
        (await adapter.submit(context({ options: { onBefore: () => false } }))).message,
        'Cancelled',
    );
});
