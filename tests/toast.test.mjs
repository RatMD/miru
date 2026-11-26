import assert from 'node:assert/strict';
import { test } from 'vitest';
import { toast, acquireToastChannel } from '../src/components/toast/toast.ts';

test('server notifications never enter the shared client queue, including named hosts', () => {
    const before = toast.getActiveToasts();
    assert.equal(
        toast.success('Private server notice', { id: 'server-private', toasterId: 'server' }),
        'server-private',
    );
    assert.equal(toast.loading('Zero ID', { id: 0 }), 0);
    assert.deepEqual(toast.getActiveToasts(), before);
    const first = acquireToastChannel('server'),
        second = acquireToastChannel('server');
    assert.notEqual(first.manager, second.manager);
    first.release();
    second.release();
});

test('promise notifications preserve fulfilled results, async messages and finally without SSR state', async () => {
    const calls = [];
    const handle = toast.promise(Promise.resolve({ id: 42 }), {
        loading: 'Saving',
        success: async (value) => {
            calls.push(value.id);
            return { message: 'Saved', description: String(value.id) };
        },
        error: 'Failed',
        finally: () => {
            calls.push('finally');
        },
    });
    assert.equal(typeof handle.id, 'string');
    assert.deepEqual(await handle.unwrap(), { id: 42 });
    assert.deepEqual(await handle, { id: 42 });
    assert.deepEqual(calls, [42, 'finally']);
    assert.deepEqual(toast.getActiveToasts(), []);
});

test('promise notification failures remain observable to callers without storing server data', async () => {
    const cause = new Error('Request rejected');
    let received;
    const handle = toast.promise(() => Promise.reject(cause), {
        loading: 'Saving',
        error: (error) => {
            received = error;
            return 'Failed';
        },
    });
    await assert.rejects(handle.unwrap(), (error) => error === cause);
    assert.equal(received, cause);
    assert.deepEqual(toast.getActiveToasts(), []);
});
