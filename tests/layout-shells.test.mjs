import assert from 'node:assert/strict';
import { renderToString } from '@vue/server-renderer';
import { createServer } from 'vite';
import { afterAll as after, test } from 'vitest';
import { createSSRApp, defineComponent, h } from 'vue';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
after(() => server.close());
const { default: AuthPage } = await server.ssrLoadModule('/src/layouts/AuthPage.vue');
const { default: DashboardPage } = await server.ssrLoadModule('/src/layouts/DashboardPage.vue');
const { createMiru } = await server.ssrLoadModule('/src/miru.ts');

test('authentication shells render on the server with host content and no global page styles', async () => {
    const app = createSSRApp({
        render: () =>
            h(
                AuthPage,
                { title: 'Sign in', variant: 'card' },
                { default: () => h('form', 'Host form'), brand: () => 'Host brand' },
            ),
    });
    const html = await renderToString(app);
    assert.match(html, /data-variant="card"/);
    assert.match(html, /Host form/);
    assert.match(html, /Host brand/);
    assert.match(html, /auth-art-/);
    assert.ok(!html.includes('<style'));
});

test('multiple auth illustrations have unique SVG references and custom images stay host-owned', async () => {
    const html = await renderToString(
        createSSRApp({ render: () => h('div', [h(AuthPage), h(AuthPage)]) }),
    );
    const ids = [...html.matchAll(/id="(auth-art-[^"]+-base)"/g)].map((match) => match[1]);
    assert.equal(ids.length, 2);
    assert.equal(new Set(ids).size, 2);
    const image = await renderToString(
        createSSRApp({
            render: () => h(AuthPage, { image: '/host/auth.webp', imageAlt: 'Host landscape' }),
        }),
    );
    assert.match(image, /src="\/host\/auth.webp"/);
    assert.match(image, /alt="Host landscape"/);
});

test('dashboard SSR supports rail state, active nested navigation and an href router adapter', async () => {
    const Adapter = defineComponent({
        props: ['href'],
        setup:
            (props, { slots }) =>
            () =>
                h('a', { href: props.href, 'data-router-adapter': 'true' }, slots.default?.()),
    });
    const navigation = [
        {
            id: 'work',
            items: [
                {
                    id: 'group',
                    label: 'Data',
                    children: [{ id: 'stock', label: 'Stock', href: '/stock', active: true }],
                },
            ],
        },
    ];
    const html = await renderToString(
        createSSRApp({
            render: () =>
                h(
                    DashboardPage,
                    { navigation, linkComponent: Adapter, scrollRegion: true },
                    { default: () => 'Host dashboard' },
                ),
        }),
    );
    assert.match(html, /Host dashboard/);
    assert.match(html, /href="\/stock"/);
    assert.match(html, /data-router-adapter="true"/);
    assert.match(html, /aria-current="page"/);
    assert.match(html, /scroll-region=""/);
    const rail = await renderToString(
        createSSRApp({ render: () => h(DashboardPage, { collapsed: true, navigation }) }),
    );
    assert.match(rail, /data-collapsed="true"/);
    assert.match(rail, /aria-label="Data"/);
});

test('dashboard labels and models remain isolated between Vue apps', async () => {
    const render = async (locale, collapsed) => {
        const app = createSSRApp({ render: () => h(DashboardPage, { collapsed }) });
        app.use(createMiru({ locale, plugins: { directives: false } }));
        return renderToString(app);
    };
    const german = await render('de', true);
    const english = await render('en', false);
    assert.match(german, /Navigation öffnen/);
    assert.match(german, /data-collapsed="true"/);
    assert.match(english, /Open navigation/);
    assert.match(english, /data-collapsed="false"/);
    assert.ok(!english.includes('Navigation öffnen'));
});
