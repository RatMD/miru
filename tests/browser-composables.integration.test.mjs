import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { test } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test(
    'built composables synchronize real browser tabs and communicate with a native Service Worker',
    { timeout: 30000 },
    async () => {
        const script = `
        let mode = 'default';
        self.addEventListener('install', () => self.skipWaiting());
        self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
        self.addEventListener('message', event => {
            const { type, messageId } = event.data;
            if (type === 'silent') return;
            if (type === 'set-mode') mode = event.data.mode;
            event.source.postMessage({ messageId, type, mode, value: event.data.value });
        });
    `;
        const html = `<!doctype html><html><head><script type="importmap">{"imports":{"vue":"/vue.js"}}</script></head><body>Miru composable integration</body></html>`;
        const server = createServer(async (request, response) => {
            try {
                const url = new URL(request.url, 'http://localhost');
                if (url.pathname === '/worker-fixture/service.js') {
                    response.setHeader('Content-Type', 'text/javascript');
                    response.end(script);
                } else if (url.pathname === '/worker-fixture/index.html') {
                    response.setHeader('Content-Type', 'text/html');
                    response.end(html);
                } else {
                    const filename =
                        url.pathname === '/vue.js'
                            ? resolve(root, 'node_modules/vue/dist/vue.esm-browser.js')
                            : resolve(root, '.' + url.pathname);
                    if (!filename.startsWith(root + '/') && !filename.startsWith(root + '\\'))
                        throw new Error('Invalid path');
                    response.setHeader('Content-Type', 'text/javascript');
                    response.end(await readFile(filename));
                }
            } catch {
                response.writeHead(404);
                response.end();
            }
        });
        await new Promise((done) => server.listen(0, '127.0.0.1', done));
        let browser;
        try {
            browser = await chromium.launch({ headless: true });
            const context = await browser.newContext();
            const origin = `http://127.0.0.1:${server.address().port}`;
            const first = await context.newPage(),
                second = await context.newPage();
            for (const page of [first, second]) {
                await page.goto(origin + '/worker-fixture/index.html');
                // Keep native browser imports outside Vitest's SSR transform.
                await page.evaluate(`(async () => {
                    const { useStorage } = await import('/dist/composables/useStorage.js');
                    window.store = useStorage('native-test');
                })()`);
            }
            await first.evaluate(() =>
                window.store.set('settings', { theme: 'dark', number: '001' }),
            );
            await second.waitForFunction(() => window.store.get('settings')?.theme === 'dark');
            assert.deepEqual(await second.evaluate(() => window.store.get('settings')), {
                theme: 'dark',
                number: '001',
            });
            const result = await first.evaluate(`(async () => {
                const { useClient } = await import('/dist/composables/useClient.js');
                const { useWorker } = await import('/dist/composables/useWorker.js');
                const client = useClient();
                const worker = useWorker({
                    scope: '/worker-fixture/',
                    script: '/worker-fixture/service.js',
                    cachePrefix: 'miru-native-',
                });
                try {
                    await worker.register();
                    const replies = await Promise.all([
                        worker.communicate({ type: 'ping', value: 1 }),
                        worker.communicate({ type: 'ping', value: 2 }),
                    ]);
                    await worker.enableOnlineOnly();
                    const mode = await worker.getMode();
                    let timeout;
                    try {
                        await worker.communicate({ type: 'silent' }, 30);
                    } catch (error) {
                        timeout = error.message;
                    }
                    await caches.open('miru-native-test');
                    await caches.open('other-app');
                    const removed = await worker.clearCaches();
                    const remaining = await caches.keys();
                    const registered = !!worker.registration.value;
                    await worker.unregister();
                    return {
                        replies: replies.map((reply) => reply.value),
                        mode,
                        timeout,
                        removed,
                        remaining,
                        registered,
                        width: client.screen.width,
                        browser: client.browser.value,
                    };
                } finally {
                    client.dispose();
                    worker.dispose();
                }
            })()`);
            assert.deepEqual(result.replies, [1, 2]);
            assert.equal(result.mode, 'online-only');
            assert.match(result.timeout, /timed out/);
            assert.equal(result.removed, 1);
            assert.deepEqual(result.remaining, ['other-app']);
            assert.equal(result.registered, true);
            assert.ok(result.width > 0);
            assert.equal(result.browser, 'Chrome');
            await first.evaluate(() => {
                window.store.clear();
                window.store.dispose();
            });
            await second.waitForFunction(() => window.store.get('settings') === null);
            await second.evaluate(() => window.store.dispose());
        } finally {
            await browser?.close();
            await new Promise((done) => server.close(done));
        }
    },
);
