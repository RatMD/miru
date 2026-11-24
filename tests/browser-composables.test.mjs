import assert from 'node:assert/strict';
import { test } from 'vitest';
import { computed, createRenderer, effectScope, h, nextTick } from 'vue';
import { useClient } from '../src/composables/useClient.ts';
import { useStorage } from '../src/composables/useStorage.ts';
import { useWorker } from '../src/composables/useWorker.ts';

class Target extends EventTarget {
    listeners = new Map();
    addEventListener(type, callback, options) {
        super.addEventListener(type, callback, options);
        let values = this.listeners.get(type);
        if (!values) this.listeners.set(type, (values = new Set()));
        values.add(callback);
    }
    removeEventListener(type, callback, options) {
        super.removeEventListener(type, callback, options);
        this.listeners.get(type)?.delete(callback);
    }
    emit(type, values = {}) {
        const event = new Event(type);
        for (const [key, value] of Object.entries(values))
            Object.defineProperty(event, key, { value });
        this.dispatchEvent(event);
    }
    count() {
        return [...this.listeners.values()].reduce((sum, entries) => sum + entries.size, 0);
    }
}

class MemoryStorage {
    values = new Map();
    get length() {
        return this.values.size;
    }
    key(index) {
        return [...this.values.keys()][index] ?? null;
    }
    getItem(key) {
        return this.values.get(key) ?? null;
    }
    setItem(key, value) {
        this.values.set(key, value);
    }
    removeItem(key) {
        this.values.delete(key);
    }
    clear() {
        this.values.clear();
    }
}

function browser() {
    const host = new Target();
    const queries = new Map();
    Object.assign(host, {
        navigator: {
            userAgent:
                'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36 Edg/130.2.3',
            maxTouchPoints: 0,
            cookieEnabled: true,
            onLine: true,
            language: 'de-DE',
            languages: ['de-DE', 'en'],
        },
        document: { documentElement: { clientWidth: 800, clientHeight: 600 } },
        innerWidth: 800,
        innerHeight: 600,
        devicePixelRatio: 2,
        localStorage: new MemoryStorage(),
        sessionStorage: new MemoryStorage(),
        location: {
            origin: 'https://miru.test',
            reload() {
                host.reloaded = true;
            },
        },
        matchMedia(query) {
            if (!queries.has(query))
                queries.set(query, Object.assign(new Target(), { matches: false }));
            return queries.get(query);
        },
    });
    return { host, queries };
}

const tick = () => new Promise((resolve) => setImmediate(resolve));

test('all three composables are callable without browser globals and SSR stores stay isolated', async () => {
    const client = useClient({ window: null });
    assert.equal(client.isSupported.value, false);
    assert.equal(client.screen.width, 0);
    const first = useStorage({ window: null }),
        second = useStorage({ window: null });
    first.set('theme', 'dark');
    assert.equal(first.get('theme'), 'dark');
    assert.equal(second.get('theme'), null);
    assert.equal(first.isPersistent.value, false);
    const worker = useWorker({ window: null });
    assert.equal(worker.isSupported, false);
    await assert.rejects(worker.communicate({ type: 'ping' }), /not available/);
    client.dispose();
    first.dispose();
    second.dispose();
    worker.dispose();
});

test('client detects Edge before Chrome, keeps full versions, tracks viewport and media preferences', () => {
    const { host, queries } = browser();
    const scope = effectScope();
    const client = scope.run(() => useClient({ window: host }));
    assert.equal(client.browser.value, 'Microsoft Edge');
    assert.equal(client.browserVersion.value, '130.2.3');
    assert.equal(client.browserMajorVersion.value, 130);
    assert.equal(client.isWindows.value, true);
    assert.equal(client.screen.pixelRatio, 2);
    host.document.documentElement.clientWidth = 400;
    host.navigator.onLine = false;
    host.emit('resize');
    host.emit('offline');
    assert.equal(client.screen.orientation, 'portrait');
    assert.equal(client.online.value, false);
    const media = queries.get('(prefers-reduced-motion: reduce)');
    media.matches = true;
    media.emit('change');
    assert.equal(client.prefersReducedMotion.value, true);
    assert.deepEqual([...client.languages.value], ['de-DE', 'en']);
    scope.stop();
    assert.equal(host.count(), 0);
    for (const query of queries.values()) assert.equal(query.count(), 0);
});

test('client recognizes iPad desktop UA and never writes a test cookie', () => {
    const { host } = browser();
    host.navigator.userAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Version/18.0 Safari/605.1';
    host.navigator.maxTouchPoints = 5;
    host.navigator.cookieEnabled = undefined;
    const client = useClient({ window: host });
    assert.equal(client.os.value, 'iOS');
    assert.equal(client.isMobile.value, true);
    assert.equal(client.isApple.value, true);
    assert.equal(client.cookies.value, null);
    assert.equal(host.document.cookie, undefined);
    client.dispose();
});

test('Android is recognized before the Linux token in its user agent', () => {
    const { host } = browser();
    host.navigator.userAgent =
        'Mozilla/5.0 (Linux; Android 15; Pixel 9) Chrome/130.0 Mobile Safari/537.36';
    const client = useClient({ window: host });
    assert.equal(client.os.value, 'Android');
    assert.equal(client.osVersion.value, '15');
    assert.equal(client.isMobile.value, true);
    client.dispose();
});

test('component setup keeps deterministic initial client/storage values until mounted', () => {
    const { host } = browser();
    host.localStorage.setItem('miru:theme', '"dark"');
    const node = () => ({ children: [] });
    const renderer = createRenderer({
        createElement: node,
        createText: node,
        createComment: node,
        patchProp() {},
        setText() {},
        setElementText() {},
        insert(child, parent) {
            parent.children.push(child);
        },
        remove() {},
        parentNode: () => null,
        nextSibling: () => null,
    });
    let client, storage;
    const app = renderer.createApp({
        setup() {
            client = useClient({ window: host });
            storage = useStorage({ window: host });
            assert.equal(client.screen.width, 0);
            assert.equal(storage.get('theme'), null);
            return () => h('div');
        },
    });
    app.mount(node());
    assert.equal(client.screen.width, 800);
    assert.equal(storage.get('theme'), 'dark');
    app.unmount();
    assert.equal(host.count(), 0);
});

test('storage preserves JSON values and keeps local/session engines and prefixes separate', () => {
    const { host } = browser();
    const a = useStorage({ prefix: 'miru:', window: host });
    const b = useStorage({ prefix: 'miru', window: host });
    const session = useStorage({ prefix: 'miru', session: true, window: host });
    const other = useStorage({ prefix: 'other', window: host });
    const reactiveTheme = computed(() => b.get('theme'));
    assert.equal(reactiveTheme.value, null);
    for (const value of ['001', 'true', '', -2.5, false, null, { nested: ['a', 2] }]) {
        assert.equal(a.set('theme', value), true);
        assert.deepEqual(a.get('theme'), value);
        assert.deepEqual(reactiveTheme.value, value);
    }
    session.set('theme', 'session');
    other.set('theme', 'keep');
    assert.equal(host.localStorage.getItem('miru::theme'), null);
    assert.equal(session.get('theme'), 'session');
    assert.notEqual(a.get('theme'), 'session');
    assert.equal(a.has('miru:theme'), true);
    assert.equal(a.clear(), true);
    assert.equal(b.has('theme'), false);
    assert.equal(other.get('theme'), 'keep');
    assert.equal(session.get('theme'), 'session');
    for (const store of [a, b, session, other]) store.dispose();
});

test('storage handles external writes, malformed old values, listeners and native clear events', () => {
    const { host } = browser();
    const store = useStorage({ window: host });
    const calls = [];
    const stop = store.listenTo('theme', (...args) => calls.push(args));
    host.localStorage.setItem('miru:theme', '{broken');
    host.emit('storage', { key: 'miru:theme', storageArea: host.localStorage });
    assert.equal(store.get('theme'), '{broken');
    assert.deepEqual(calls, [['{broken', null, 'theme']]);
    host.localStorage.clear();
    host.emit('storage', { key: null, storageArea: host.localStorage });
    assert.equal(store.has('theme'), false);
    stop();
    store.set('theme', 'light');
    assert.equal(calls.length, 2);
    store.dispose();
    assert.equal(host.count(), 0);
    assert.equal(store.set('theme', 'dark'), false);
});

test('storage reports quota/serialization failures without publishing unwritten values', () => {
    const { host } = browser();
    const store = useStorage({ window: host });
    store.set('theme', 'light');
    host.localStorage.setItem = () => {
        throw new Error('quota');
    };
    assert.equal(store.set('theme', 'dark'), false);
    assert.match(store.error.value.message, /quota/);
    assert.equal(store.get('theme'), 'light');
    const cycle = {};
    cycle.self = cycle;
    assert.equal(store.set('cycle', cycle), false);
    assert.equal(store.has('cycle'), false);
    store.dispose();
});

test('blocked storage access falls back to isolated memory without throwing', () => {
    const { host } = browser();
    Object.defineProperty(host, 'localStorage', {
        get() {
            throw new Error('blocked');
        },
    });
    const store = useStorage({ window: host });
    assert.match(store.error.value.message, /blocked/);
    assert.equal(store.isPersistent.value, false);
    store.set('value', 1);
    assert.equal(store.get('value'), 1);
    store.dispose();
});

function serviceFixture(options = {}) {
    const { host } = browser();
    const worker = Object.assign(new Target(), {
        state: 'activated',
        messages: [],
        postMessage(message) {
            this.messages.push(message);
        },
    });
    const registration = Object.assign(new Target(), {
        scope: 'https://miru.test/',
        active: worker,
        installing: null,
        waiting: null,
        updates: 0,
        removals: 0,
        async update() {
            this.updates++;
            return this;
        },
        async unregister() {
            this.removals++;
            return true;
        },
    });
    const container = Object.assign(new Target(), {
        controller: worker,
        calls: [],
        async register(script, config) {
            this.calls.push([script, config]);
            return registration;
        },
        async getRegistration() {
            return registration;
        },
        async getRegistrations() {
            return [registration];
        },
        startMessages() {},
    });
    host.navigator.serviceWorker = container;
    const api = useWorker({ window: host, ...options });
    const respond = (message, values = {}, source = worker) =>
        container.emit('message', {
            source,
            origin: host.location.origin,
            data: { messageId: message.messageId, ...values },
        });
    return { host, worker, registration, container, api, respond };
}

test('worker registration reuses concurrent requests, exposes lifecycle and never unregisters first', async () => {
    const { api, container, registration, worker } = serviceFixture();
    const [a, b] = await Promise.all([api.register(), api.register()]);
    assert.equal(a, b);
    assert.equal(container.calls.length, 1);
    assert.equal(registration.removals, 0);
    assert.equal(api.registration.value, registration);
    assert.equal(api.state.value, 'activated');
    registration.waiting = Object.assign(new Target(), { state: 'installed' });
    registration.emit('updatefound');
    assert.equal(api.updateAvailable.value, true);
    await api.update();
    assert.equal(registration.updates, 1);
    api.dispose();
    assert.equal(container.count(), 0);
    assert.equal(registration.count(), 0);
    assert.equal(worker.count(), 0);
});

test('parallel worker messages correlate out-of-order replies and ignore wrong source/origin', async () => {
    const { api, worker, container, respond } = serviceFixture();
    const first = api.communicate({ type: 'first' });
    const second = api.communicate({ type: 'second' });
    await tick();
    const [a, b] = worker.messages;
    assert.notEqual(a.messageId, b.messageId);
    respond(a, { value: 'wrong' }, {});
    container.emit('message', {
        source: worker,
        origin: 'https://other.test',
        data: { messageId: a.messageId, value: 'wrong-origin' },
    });
    respond(b, { value: 2 });
    respond(a, { value: 1 });
    assert.equal((await first).value, 1);
    assert.equal((await second).value, 2);
    api.dispose();
});

test('worker discovery and activation are bounded; disposal cancels requests and late registrations', async () => {
    const { api, container, registration } = serviceFixture({ messageTimeout: 20 });
    container.getRegistration = () => new Promise(() => {});
    await assert.rejects(api.communicate({ type: 'ping' }), /timed out/);
    let finish;
    container.register = () =>
        new Promise((resolve) => {
            finish = resolve;
        });
    const pending = api.register();
    const assertion = assert.rejects(pending, /aborted/);
    await tick();
    api.dispose();
    await assertion;
    finish(registration);
    await tick();
    assert.equal(api.registration.value, null);
    assert.equal(container.count(), 0);
    const inactive = serviceFixture({ messageTimeout: 20 });
    inactive.registration.active = null;
    inactive.container.controller = null;
    await assert.rejects(inactive.api.communicate({ type: 'ping' }), /timed out/);
    inactive.api.dispose();
});

test('worker handles abort, postMessage failure, deserialization errors and late replies', async () => {
    const { api, worker, container, respond } = serviceFixture({ messageTimeout: 20 });
    const aborter = new AbortController();
    const aborted = api.communicate({ type: 'ping' }, { signal: aborter.signal });
    const abortedAssertion = assert.rejects(aborted, /aborted/);
    await tick();
    aborter.abort();
    await abortedAssertion;
    respond(worker.messages[0], { ignored: true });
    worker.postMessage = () => {
        throw new Error('clone failed');
    };
    await assert.rejects(api.communicate({ type: 'ping' }), /clone failed/);
    worker.postMessage = (message) => worker.messages.push(message);
    const broken = api.communicate({ type: 'ping' });
    const brokenAssertion = assert.rejects(broken, /deserialize/);
    await tick();
    container.emit('messageerror', { source: worker });
    await brokenAssertion;
    api.dispose();
});

test('worker unregister targets its own scope and cache clearing requires explicit selection', async () => {
    const { api, host, registration } = serviceFixture({ cachePrefix: 'miru-' });
    const deleted = [];
    host.caches = {
        async keys() {
            return ['miru-assets', 'other-app'];
        },
        async delete(name) {
            deleted.push(name);
            return true;
        },
    };
    assert.equal(await api.clearCaches(), 1);
    assert.deepEqual(deleted, ['miru-assets']);
    await api.register();
    await api.unregister();
    assert.equal(registration.removals, 1);
    assert.equal(api.registration.value, null);
    assert.deepEqual(deleted, ['miru-assets']);
    api.dispose();
    const plain = serviceFixture();
    await assert.rejects(plain.api.clearCaches(), /Specify cache/);
    plain.api.dispose();
});

test('worker mode helpers use the HL protocol and do not reload or unregister implicitly', async () => {
    const { api, worker, registration, host, respond } = serviceFixture();
    worker.postMessage = (message) => {
        worker.messages.push(message);
        respond(message, { mode: message.mode ?? 'default' });
    };
    assert.equal(await api.getMode(), 'default');
    await api.enableOnlineOnly();
    assert.equal(registration.removals, 0);
    assert.equal(host.reloaded, undefined);
    assert.equal(worker.messages.at(-1).mode, 'online-only');
    await api.enableDefaultMode();
    assert.equal(worker.messages.at(-1).mode, 'default');
    api.dispose();
});

test('explicit cache names override the configured prefix', async () => {
    const { api, host } = serviceFixture({ cachePrefix: 'miru-' });
    const removed = [];
    host.caches = {
        async keys() {
            return ['miru-assets', 'selected'];
        },
        async delete(name) {
            removed.push(name);
            return true;
        },
    };
    await api.clearCaches({ names: ['selected'] });
    assert.deepEqual(removed, ['selected']);
    api.dispose();
});

test('aborting before dispatch does not register or post a worker message', async () => {
    const { api, container, worker } = serviceFixture();
    const aborter = new AbortController();
    const registration = api.register(undefined, undefined, { signal: aborter.signal });
    aborter.abort();
    await assert.rejects(registration, /aborted/);
    assert.equal(container.calls.length, 0);
    assert.equal(worker.messages.length, 0);
    api.dispose();
});

test('scope lookup cannot fall back to a controller from another registration', async () => {
    const { api, container, worker } = serviceFixture();
    container.getRegistration = async () => undefined;
    await assert.rejects(api.communicate({ type: 'ping' }), /No service worker registration/);
    assert.equal(worker.messages.length, 0);
    api.dispose();
});
