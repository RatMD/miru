import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import tailwind from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { test } from 'vitest';

test(
    'badge separators match framed badges across the six maintained light/dark schemes',
    { timeout: 60000 },
    async () => {
        const server = await createServer({
            configFile: false,
            root: fileURLToPath(new URL('..', import.meta.url)),
            plugins: [vue(), tailwind()],
            server: { host: '127.0.0.1', port: 0 },
            appType: 'custom',
        });
        server.middlewares.use(async (request, response, next) => {
            if (request.url !== '/badge-parts') return next();
            response.setHeader('Content-Type', 'text/html');
            response.end(
                await server.transformIndexHtml(
                    '/badge-parts',
                    `<!doctype html><html><head><link rel="stylesheet" href="/src/styles/index.css"></head><body><div id="app"></div><script type="module">
import {createApp,h} from 'vue';
import {Badge,BadgePart,BadgeSeparator} from '/src/components/badge/index.ts';
const roles=['default','primary','secondary','accent','danger','warning','success','info','outline','ghost','ghostly'];
createApp({render:()=>h('main',roles.flatMap(variant=>['auto','solid','soft'].map(appearance=>h(Badge,{variant,appearance},()=>[h(BadgePart,()=> 'Alpha'),h(BadgeSeparator),h(BadgePart,()=> 'Early preview. APIs may change.')]))))}).mount('#app');
window.badgesReady=true;
</script></body></html>`,
                ),
            );
        });
        let browser;
        try {
            await server.listen();
            browser = await chromium.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/badge-parts`);
            await page.waitForFunction(() => window.badgesReady);
            await page.addStyleTag({ content: '* { transition: none !important; }' });
            for (const scheme of [
                'original',
                'modern',
                'northern-lights',
                'lagoon',
                'rosewood',
                'golden-hour',
            ]) {
                const css = await readFile(
                    new URL(`../src/themes/${scheme}.css`, import.meta.url),
                    'utf8',
                );
                await page.addStyleTag({ content: css });
                for (const dark of [false, true]) {
                    await page.evaluate(
                        (dark) => document.documentElement.classList.toggle('dark', dark),
                        dark,
                    );
                    const badges = await page.evaluate(() =>
                        [...document.querySelectorAll('[data-slot=badge]')].map((badge) => {
                            const style = getComputedStyle(badge);
                            const separator = getComputedStyle(
                                badge.querySelector('[data-slot=badge-separator]'),
                            );
                            return {
                                variant: badge.dataset.variant,
                                appearance: badge.dataset.appearance,
                                border: style.borderLeftColor,
                                separator: separator.borderLeftColor,
                                color: style.color,
                                parts: [...badge.querySelectorAll('[data-slot=badge-part]')].map(
                                    (part) => getComputedStyle(part).color,
                                ),
                            };
                        }),
                    );
                    for (const badge of badges) {
                        const context = `${scheme} dark=${dark} ${badge.variant}/${badge.appearance}`;
                        assert.deepEqual(badge.parts, [badge.color, badge.color], context);
                        if (
                            (badge.appearance === 'soft' &&
                                !['ghost', 'ghostly'].includes(badge.variant)) ||
                            badge.variant === 'outline' ||
                            (dark &&
                                ((badge.appearance === 'auto' && badge.variant !== 'ghost') ||
                                    badge.variant === 'ghostly'))
                        ) {
                            assert.equal(badge.separator, badge.border, context);
                        } else {
                            // Transparent outer borders must still leave a visible internal divider.
                            assert.notEqual(badge.separator, 'rgba(0, 0, 0, 0)', context);
                        }
                    }
                }
            }
        } finally {
            await browser?.close();
            await server.close();
        }
    },
);
