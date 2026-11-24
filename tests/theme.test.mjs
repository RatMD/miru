import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { createServer } from 'vite';
import { test, afterAll as after } from 'vitest';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';

const server = await createServer({
    configFile: false,
    root: fileURLToPath(new URL('..', import.meta.url)),
    plugins: [vue()],
    server: { middlewareMode: true },
    appType: 'custom',
});
after(() => server.close());
const modules = {};
for (const name of [
    'button',
    'badge',
    'button-action',
    'button-shadow',
    'avatar',
    'progress',
    'alert',
]) {
    modules[name] = await server.ssrLoadModule(`/src/components/${name}/index.ts`);
}

test('accent renders through Buttons, Actions, Shadows, Badges, Avatars, Progress and Alerts', async () => {
    for (const [family, component, props, expected] of [
        ['button', 'Button', { variant: 'accent' }, 'bg-accent'],
        [
            'button-action',
            'ButtonAction',
            { variant: 'accent', title: 'Accent action' },
            'miru-button-action',
        ],
        [
            'button-shadow',
            'ButtonShadow',
            { variant: 'accent', title: 'Accent shadow' },
            '--shadow-ink:var(--ui-accent-text, var(--ui-accent))',
        ],
        ['badge', 'Badge', { variant: 'accent' }, 'bg-accent-600'],
        ['avatar', 'Avatar', { tone: 'accent' }, 'bg-accent'],
        ['progress', 'Progress', { variant: 'accent', modelValue: 50 }, 'bg-accent'],
        ['alert', 'Alert', { variant: 'accent', showIcon: false }, 'ring-accent-300'],
    ]) {
        const html = await renderToString(
            createSSRApp({ render: () => h(modules[family][component], props, () => 'Accent') }),
        );
        assert.ok(html.includes(expected), `${component} should use accent tokens`);
    }
});
test('published CSS contains accent utilities and preserves neutral interaction surfaces', () => {
    const css = readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8');
    for (const utility of [
        '.text-accent{',
        '.bg-accent{',
        '.bg-accent-600{',
        '.text-accent-foreground{',
    ])
        assert.ok(css.includes(utility), utility);
    for (const step of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950])
        assert.ok(css.includes(`--ui-accent-${step}:`));
    assert.ok(css.includes('--ui-surface-hover:'));
    assert.ok(css.includes('--ui-menu-hover:var(--ui-surface-hover)'));
});
