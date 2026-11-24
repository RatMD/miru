import assert from 'node:assert/strict';
import { test } from 'vitest';
import {
    equals,
    merge,
    request,
    Queue,
    wait,
    waitUntil,
    debounce,
    throttle,
    toFormData,
    slugify,
    strspn,
    uuid,
} from '../dist/support.js';

test('equality compares contents, cycles, symbols and view offsets', () => {
    assert.equal(equals({ value: 1 }, { value: 2 }), false);
    const key = Symbol('key'),
        a = { [key]: [1, 2] },
        b = { [key]: [1, 2] };
    a.self = a;
    b.self = b;
    assert.equal(equals(a, b), true);
    b[key][1] = 3;
    assert.equal(equals(a, b), false);
    const bytes = new Uint8Array([0, 1, 2]);
    assert.equal(equals(new DataView(bytes.buffer, 1, 1), new DataView(bytes.buffer, 2, 1)), false);
    assert.equal(equals(new Date(0), new Date(1)), false);
});

test('merge preserves arrays and ignores unsafe prototype keys', () => {
    const target = { nested: { a: 1 }, rows: [1, 2] };
    merge(target, { nested: { b: 2 }, rows: [3] }, JSON.parse('{"__proto__":{"polluted":true}}'));
    assert.deepEqual(target, { nested: { a: 1, b: 2 }, rows: [3] });
    assert.equal({}.polluted, undefined);
});

test('request preserves GET URLs, handles empty responses and serializes JSON', async () => {
    const original = globalThis.fetch,
        calls = [];
    globalThis.fetch = async (url, options) => {
        calls.push({ url, options });
        return options.method === 'HEAD'
            ? new Response(null, { status: 204 })
            : new Response(JSON.stringify({ value: 1 }), { status: 200 });
    };
    try {
        const options = Object.freeze({ headers: { 'X-Example': '1' } });
        assert.deepEqual(await request.get('/items?existing=1#anchor', { q: 'a b' }, options), {
            status: 'success',
            result: { value: 1 },
        });
        assert.equal(calls[0].url, '/items?existing=1&q=a+b#anchor');
        assert.equal(options.method, undefined);
        assert.equal((await request.head(new URL('https://example.test/items'))).status, 'success');
        await request.post('/items', { name: 'example' });
        assert.equal(calls[2].options.body, '{"name":"example"}');
        assert.equal(new Headers(calls[2].options.headers).get('Content-Type'), 'application/json');
    } finally {
        globalThis.fetch = original;
    }
});

test('request reports HTTP and network errors', async () => {
    const original = globalThis.fetch;
    try {
        globalThis.fetch = async () =>
            new Response(JSON.stringify({ message: 'Rejected' }), { status: 422 });
        assert.deepEqual(await request.get('/items'), { status: 'error', message: 'Rejected' });
        globalThis.fetch = async () => {
            throw new Error('Offline');
        };
        assert.deepEqual(await request.get('/items'), { status: 'error', message: 'Offline' });
    } finally {
        globalThis.fetch = original;
    }
});

test('FormData retains id/name records, files, arrays and dates', () => {
    const data = toFormData({
        profile: { id: '1', name: 'Ada' },
        flags: [true, false],
        at: new Date(0),
        file: new Blob(['data']),
    });
    assert.equal(data.get('profile[name]'), 'Ada');
    assert.equal(data.get('profile[id]'), '1');
    assert.equal(data.get('flags[0]'), '1');
    assert.equal(data.get('flags[1]'), '0');
    assert.equal(data.get('at'), '1970-01-01T00:00:00.000Z');
    assert.ok(data.get('file') instanceof Blob);
    const cyclic = {};
    cyclic.self = cyclic;
    assert.throws(() => toFormData(cyclic), /circular/);
});

test('queue bounds concurrency and records only exhausted failures once', async () => {
    let active = 0,
        maximum = 0,
        errors = 0;
    const queue = new Queue(
        [1, 2, 3],
        async (item) => {
            active++;
            maximum = Math.max(maximum, active);
            try {
                await wait(1);
                if (item === 2) throw new Error('retry');
                return item * 2;
            } finally {
                active--;
            }
        },
        2,
        1,
    );
    queue.on('error', () => {
        errors++;
    });
    const result = await queue.start();
    assert.ok(maximum <= 2);
    assert.equal(errors, 2);
    assert.equal(result.success.length, 2);
    assert.equal(result.error.length, 1);
    assert.equal(result.error[0][0].item, 2);
    assert.throws(() => new Queue([], async () => null, 0), RangeError);
});

test('waitUntil rejects exhausted or failed predicates', async () => {
    let calls = 0;
    await assert.rejects(
        waitUntil(
            () => {
                calls++;
                return false;
            },
            1,
            3,
        ),
        /limit/,
    );
    assert.equal(calls, 3);
    await assert.rejects(
        waitUntil(
            () => {
                throw new Error('stop');
            },
            1,
            3,
        ),
        /stop/,
    );
    await assert.rejects(
        waitUntil(() => true, 1, 0),
        RangeError,
    );
});

test('debounce retains the latest call and its receiver', async () => {
    const values = [];
    const object = {
        prefix: 'x',
        action: debounce(function (value) {
            values.push(this.prefix + value);
        }, 5),
    };
    object.action('1');
    object.action('2');
    await wait(25);
    assert.deepEqual(values, ['x2']);
});

test('throttle resumes after an async rejection', async () => {
    let calls = 0;
    const action = throttle(async () => {
        calls++;
        if (calls === 1) throw new Error('first');
        return calls;
    }, 5);
    await assert.rejects(action(), /first/);
    await wait(20);
    assert.equal(await action(), 2);
});

test('slug and substring helpers retain intended edge cases', () => {
    assert.equal(slugify('Grüße aus Köln'), 'gruesse-aus-koeln');
    assert.equal(slugify('Two words', '.'), 'two.words');
    assert.equal(strspn('123abc', '0123456789'), 3);
    assert.equal(strspn('abc123', '0123456789', -3), 3);
});

test('UUID fallback remains crypto-backed without randomUUID', () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
    const crypto = globalThis.crypto;
    try {
        Object.defineProperty(globalThis, 'crypto', {
            configurable: true,
            value: { getRandomValues: crypto.getRandomValues.bind(crypto) },
        });
        const value = uuid();
        assert.match(
            value,
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
        );
        assert.equal(uuid('stable-test'), uuid('stable-test'));
    } finally {
        Object.defineProperty(globalThis, 'crypto', descriptor);
    }
});
