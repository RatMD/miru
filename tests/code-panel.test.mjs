import assert from 'node:assert/strict';
import { test } from 'vitest';
import { formatCode, serializeCode } from '../src/components/code-panel/formatCode.ts';

test('JSON formatting retains object values and large source integers', async () => {
    const source = '{"id":9007199254740993,"payload":{"ok":true,"items":[1,2]}}';
    const formatted = await formatCode(source, 'json');
    assert.equal(formatted.failed, false);
    assert.ok(formatted.text.includes('9007199254740993'));
    assert.ok(formatted.text.includes('\n'));
    assert.deepEqual(JSON.parse((await formatCode({ rows: [1, 2], ok: true }, 'json')).text), {
        rows: [1, 2],
        ok: true,
    });
});
test('invalid JSON and disabled formatting preserve the original input', async () => {
    const invalid = '{not JSON';
    assert.deepEqual(await formatCode(invalid, 'json'), { text: invalid, failed: true });
    const raw = '  <p>  raw </p>\r\n';
    assert.deepEqual(await formatCode(raw, 'html', false), { text: raw, failed: false });
    assert.deepEqual(await formatCode(raw, 'text'), { text: raw, failed: false });
});
test('HTML is formatted as source without dropping script text', async () => {
    const result = await formatCode(
        '<section><h2>Title</h2><p>Text</p><script>globalThis.marker = true;</script></section>',
        'html',
    );
    assert.equal(result.failed, false);
    assert.ok(result.text.includes('\n'));
    assert.ok(result.text.includes('globalThis.marker = true;'));
    assert.equal(globalThis.marker, undefined);
});
test('serialization distinguishes shared references from actual cycles', () => {
    const shared = { count: 2 },
        value = { a: shared, b: shared, id: 42n };
    assert.deepEqual(JSON.parse(serializeCode(value)), {
        a: { count: 2 },
        b: { count: 2 },
        id: '42',
    });
    const cycle = { name: 'root' };
    cycle.self = cycle;
    assert.deepEqual(JSON.parse(serializeCode(cycle)), { name: 'root', self: '[Circular]' });
    assert.equal(serializeCode(undefined), 'undefined');
});
