import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { renderToString } from '@vue/server-renderer';
import { createServer } from 'vite';
import { afterAll as after, test } from 'vitest';
import { computed, createApp, createSSRApp, h, inject, nextTick, ref } from 'vue';

const server = await createServer({
    configFile: false,
    root: fileURLToPath(new URL('..', import.meta.url)),
    plugins: [vue()],
    server: { middlewareMode: true },
    appType: 'custom',
});
after(() => server.close());
const { createMiru, MiruPlugin } = await server.ssrLoadModule('/src/miru.ts');

test('PageRoot renders on the server with the default Reka toast host without retaining page notices', async () => {
    const ui=createMiru({plugins:false,pageToasts:[{id:'private-ssr',status:'success',title:'Private server notice',description:null,duration:null,closable:true}]});
    const app=createSSRApp({render:()=>ui.wrap({render:()=>h('main','Application content')})});
    app.use(ui);
    const html=await renderToString(app);
    assert.match(html,/<main>Application content<\/main>/);
    assert.doesNotMatch(html,/Private server notice/);
});
const { useMiru } = await server.ssrLoadModule('/src/composables/useMiru.ts');
const { translateI18n } = await server.ssrLoadModule('/src/plugins/i18n.ts');
const { useI18n } = await server.ssrLoadModule('/src/composables/useI18n.ts');
const { createMiruConfig } = await server.ssrLoadModule('/src/miru.ts');
const { createMiruI18n } = await server.ssrLoadModule('/src/plugins/i18n.ts');
const { createMiruDirectives } = await server.ssrLoadModule('/src/plugins/directives.ts');
const { default: ContextProvider } = await server.ssrLoadModule(
    '/src/components/provider/ContextProvider.vue',
);

function readContext(app) {
    return app.runWithContext(() => useMiru());
}

test('form adapter defaults and configure overrides remain local to each app', () => {
    const first = createApp({});
    const second = createApp({});
    const adapter = {
        async submit() {
            return { status: 'success', result: true };
        },
    };
    first.use(createMiru({ plugins: false, formAdapter: adapter }));
    second.use(createMiru({ plugins: false, configure: () => ({ formAdapter: 'ajax' }) }));
    assert.equal(readContext(first).options.formAdapter, adapter);
    assert.equal(readContext(second).options.formAdapter, 'ajax');
});

test('separate Vue apps have independent reactive locales, translators and currency', async () => {
    const locale = ref('de_DE');
    const first = createApp({});
    const second = createApp({});
    first.use(
        createMiru({
            locale,
            currency: 'CHF',
            directives: false,
            translate: (key) => (key === 'host.label' ? 'Host' : key),
        }),
    );
    second.use(MiruPlugin, { locale: 'en', directives: false });
    const de = readContext(first),
        en = readContext(second);
    assert.equal(de.locale.value, 'de-DE');
    assert.equal(de.currency, 'CHF');
    assert.equal(de.trans('host.label'), 'Host');
    assert.equal(de.trans('common.actions.close'), translateI18n('de', 'common.actions.close'));
    assert.equal(en.locale.value, 'en');
    assert.equal(en.currency, 'EUR');
    locale.value = 'en_GB';
    await nextTick();
    assert.equal(de.locale.value, 'en-GB');
    assert.equal(de.trans('common.actions.close'), translateI18n('en', 'common.actions.close'));
    assert.equal(en.locale.value, 'en');
    assert.equal(de.trans('missing.key'), 'missing.key');
});

test('host pluralization receives count and replacements', () => {
    const app = createApp({});
    app.use(
        createMiru({
            directives: false,
            translateChoice: (key, count, values) =>
                key === 'host.count' ? count + ':' + values.name : undefined,
        }),
    );
    assert.equal(readContext(app).transChoice('host.count', 3, { name: 'devices' }), '3:devices');
});

test('the root wrapper preserves component props and provider overrides during SSR', async () => {
    const ui = createMiru({ locale: 'en', directives: false, toast: false });
    const probe = {
        props: ['title'],
        setup: (props) => {
            const ui = useMiru();
            return () =>
                h('span', props.title + ':' + ui.locale.value + ':' + ui.trans('host.label'));
        },
    };
    const content = {
        setup: () => () =>
            h(
                ContextProvider,
                {
                    locale: 'de_DE',
                    translate: (key) => (key === 'host.label' ? 'Lokal' : undefined),
                },
                { default: () => h(probe, { title: 'Passed' }) },
            ),
    };
    const app = createSSRApp({ render: () => ui.wrap(content) });
    app.use(ui);
    assert.match(await renderToString(app), /Passed:de-DE:Lokal/);
});

test('directive locale changes refresh the latest value and stop after unmount', async () => {
    const locale = ref('de-DE');
    const app = createApp({});
    app.use(createMiru({ locale }));
    const price = app.directive('price');
    const el = { textContent: '', dataset: {} };
    const binding = (value) => ({ value, modifiers: {} });
    price.mounted(el, binding(12.5));
    price.updated(el, binding(45.5));
    locale.value = 'en-US';
    await nextTick();
    assert.equal(
        el.textContent,
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(45.5),
    );
    price.beforeUnmount(el);
    locale.value = 'de-DE';
    await nextTick();
    assert.equal(
        el.textContent,
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(45.5),
    );
    const date = app.directive('dayjs');
    const dateElement = { textContent: 'MMMM', dataset: {} };
    date.mounted(dateElement, binding('2026-03-01'));
    assert.equal(dateElement.textContent, 'März');
    locale.value = 'en-US';
    await nextTick();
    assert.equal(dateElement.textContent, 'March');
    date.beforeUnmount(dateElement);
    const number = app.directive('number-format');
    const numberElement = { textContent: '' };
    number.mounted(numberElement, binding(1234.5));
    assert.equal(numberElement.textContent, '1,234.5');
    locale.value = 'de-DE';
    await nextTick();
    assert.equal(numberElement.textContent, '1.234,5');
    number.beforeUnmount(numberElement);
});

test('Inertia installation can render before the initial page props exist', async () => {
    const { inertiaAdapter } = await server.ssrLoadModule('/src/adapters/inertia.ts');
    const ui = createMiru({ adapter: inertiaAdapter(), directives: false });
    const probe = {
        setup() {
            const context = useMiru();
            return () => h('p', context.locale.value);
        },
    };
    const app = createSSRApp({ render: () => ui.wrap(probe) });
    app.use(ui);
    // PageRoot's immediate toast watcher runs before the Inertia child initializes usePage().props.
    assert.match(await renderToString(app), /<p>en<\/p>/);
});

test('default installation registers all runtime directives and exposes useI18n aliases', () => {
    const app = createApp({});
    app.use(createMiru());
    for (const name of [
        'click-outside',
        'resize',
        'filesize',
        'file-size',
        'dayjs',
        'price',
        'number-format',
        'tinymce',
    ]) {
        assert.ok(app.directive(name), name);
    }
    const i18n = app.runWithContext(() => useI18n());
    assert.equal(i18n.locale.value, 'en');
    assert.equal(i18n.t, i18n.trans);
    assert.equal(i18n.tc, i18n.transChoice);
});

test('configure runs once in app context before formatters and can return overrides', () => {
    const app = createApp({});
    const host = Symbol('host');
    app.provide(host, 'injected');
    let calls = 0;
    const plugin = createMiru({
        configure({ app: target, options }) {
            calls++;
            assert.equal(target, app);
            assert.equal(inject(host), 'injected');
            assert.equal(readContext(app).options, options);
            options.currency = 'CHF';
            return { locale: 'de_CH' };
        },
    });
    app.use(plugin);
    assert.equal(calls, 1);
    assert.equal(readContext(app).locale.value, 'de-CH');
    assert.equal(readContext(app).currency, 'CHF');
    const element = { textContent: '', dataset: {} };
    const price = app.directive('price');
    price.mounted(element, { value: 12, modifiers: {} });
    assert.equal(
        element.textContent,
        new Intl.NumberFormat('de-CH', {
            style: 'currency',
            currency: 'CHF',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(12),
    );
    price.beforeUnmount(element);
});

test('manual plugins and custom configure installation preserve host-owned settings', () => {
    const app = createApp({});
    app.use(createMiruConfig({ locale: 'de', currency: 'CHF' }));
    app.use(createMiruI18n());
    app.use(createMiruDirectives());
    assert.equal(readContext(app).locale.value, 'de');
    assert.ok(app.directive('price'));

    const custom = createApp({});
    custom.use(
        createMiru({
            plugins: false,
            configure({ app }) {
                app.use(
                    createMiruI18n({ locale: 'fr', messages: { fr: { greeting: 'Bonjour' } } }),
                );
            },
        }),
    );
    assert.equal(readContext(custom).trans('greeting'), 'Bonjour');
    assert.equal(custom.directive('price'), undefined);
});

test('automatic plugins can be selected independently and configure rejects async hooks', () => {
    const app = createApp({});
    app.use(createMiru({ locale: 'de', plugins: { directives: false } }));
    assert.equal(readContext(app).locale.value, 'de');
    assert.equal(app.directive('price'), undefined);
    const manual = createApp({});
    manual.use(createMiru({ locale: 'de', plugins: { i18n: false } }));
    assert.ok(manual.directive('price'));
    assert.equal(readContext(manual).locale.value, 'en');
    assert.throws(
        () => createApp({}).use(createMiru({ configure: async () => ({ locale: 'de' }) })),
        /must be synchronous/,
    );
});

test('one installation object reused across apps keeps mutable configuration isolated', () => {
    const plugin = createMiru({ locale: 'en', directives: false });
    const a = createApp({}),
        b = createApp({});
    a.use(plugin);
    b.use(plugin);
    const first = readContext(a),
        second = readContext(b);
    first.options.locale = 'de';
    assert.equal(first.locale.value, 'de');
    assert.equal(second.locale.value, 'en');
});

test('adapter locale, parameters and pluralization stay reactive without a library dependency', async () => {
    const locale = ref('de_DE');
    const seen = [];
    const app = createApp({});
    app.use(
        createMiru({
            directives: false,
            i18n: {
                locale,
                translate(key, parameters, active) {
                    seen.push([key, parameters, active]);
                    return key === 'host.greeting' ? `${active}:${parameters.name}` : key;
                },
                translateChoice(key, count, parameters, active) {
                    return key === 'host.count'
                        ? `${active}:${count}:${parameters.name}`
                        : undefined;
                },
            },
        }),
    );
    const context = app.runWithContext(() => useI18n());
    const greeting = computed(() => context.t('host.greeting', { name: 'Miru' }));
    assert.equal(greeting.value, 'de-DE:Miru');
    assert.equal(context.tc('host.count', 2, { name: 'items' }), 'de-DE:2:items');
    assert.equal(context.t('common.actions.close'), translateI18n('de', 'common.actions.close'));
    locale.value = 'en_US';
    await nextTick();
    assert.equal(greeting.value, 'en-US:Miru');
    assert.equal(seen.at(-1)[2], 'en-US');
});

test('custom dictionaries support locale variants, reactive replacement and fallback locale', () => {
    const messages = ref({
        fr: { greeting: 'Bonjour :name', count: ':count article|:count articles' },
        de: { fallback: 'Ersatz' },
    });
    const app = createApp({});
    app.use(createMiru({ locale: 'fr_CA', fallbackLocale: 'de', messages, directives: false }));
    const context = readContext(app);
    const greeting = computed(() => context.t('greeting', { name: 'Miru' }));
    assert.equal(greeting.value, 'Bonjour Miru');
    assert.equal(context.tc('count', 2), '2 articles');
    assert.equal(context.t('fallback'), 'Ersatz');
    assert.equal(context.t('common.actions.close'), translateI18n('de', 'common.actions.close'));
    messages.value = { fr: { greeting: 'Salut :name' } };
    assert.equal(greeting.value, 'Salut Miru');
    assert.equal(context.t('missing'), 'missing');
});

test('provider locale is passed to inherited host adapters without changing sibling trees', async () => {
    const app = createSSRApp({
        render: () =>
            h('main', [h(ContextProvider, { locale: 'de' }, { default: () => h(probe) }), h(probe)]),
    });
    const probe = {
        setup() {
            const context = useI18n();
            return () => h('span', context.t('label'));
        },
    };
    app.use(
        createMiru({
            locale: 'en',
            directives: false,
            i18n: { translate: (key, parameters, locale) => `${locale}:${key}` },
        }),
    );
    assert.match(await renderToString(app), /<span>de:label<\/span>.*<span>en:label<\/span>/);
});

test('Inertia respects an explicit adapter locale before its page default', async () => {
    const { inertiaAdapter } = await server.ssrLoadModule('/src/adapters/inertia.ts');
    const app = createApp({});
    app.use(createMiru({ adapter: inertiaAdapter(), directives: false, i18n: { locale: 'fr_CA' } }));
    assert.equal(readContext(app).locale.value, 'fr-CA');
});

test('Inertia integration supplies forms and navigation while plain apps remain independent', async () => {
    const { inertiaAdapter } = await server.ssrLoadModule('/src/adapters/inertia.ts');
    const inertia = createApp({});
    const plain = createApp({});
    inertia.use(createMiru({ plugins: false, adapter: inertiaAdapter() }));
    plain.use(createMiru({ plugins: false }));
    const options = readContext(inertia).options;
    assert.equal(options.formAdapter, 'inertia');
    assert.equal(typeof options.formAdapters.inertia.submit, 'function');
    assert.ok(options.navigation.link);
    assert.equal(typeof options.navigation.visit, 'function');
    assert.equal(readContext(plain).options.formAdapter, 'ajax');
    assert.equal(typeof readContext(plain).options.formAdapters.ajax.submit, 'function');
    assert.equal(typeof readContext(plain).options.navigation.visit, 'function');
    assert.equal(readContext(plain).options.formAdapters.inertia, undefined);
});

test('host adapters supply reactive defaults with explicit and configure overrides', async () => {
    const locale = ref('de');
    const transport = { async submit() { return { status: 'success', result: true }; } };
    const override = { async submit() { return { status: 'success', result: false }; } };
    const navigation = { visit() {} };
    const adapter = { locale, formAdapter: transport, formAdapters: { inertia: transport }, navigation };
    const first = createApp({});
    const second = createApp({});
    first.use(createMiru({ adapter, directives: false }));
    second.use(createMiru({
        adapter,
        directives: false,
        locale: 'fr',
        formAdapters: { inertia: override },
        configure: () => ({ formAdapter: override }),
    }));
    assert.equal(readContext(first).locale.value, 'de');
    locale.value = 'en';
    await nextTick();
    assert.equal(readContext(first).locale.value, 'en');
    assert.equal(readContext(second).locale.value, 'fr');
    assert.equal(readContext(first).options.formAdapter, transport);
    assert.equal(readContext(second).options.formAdapter, override);
    assert.equal(readContext(second).options.formAdapters.inertia, override);
    assert.equal(adapter.formAdapters.inertia, transport);
    const manual = createApp({});
    manual.use(createMiruConfig({ adapter }));
    assert.equal(readContext(manual).options.navigation, navigation);
});

test('form navigation links render ordinary anchors or the app-local host link', async () => {
    const { default: NavigationLink } = await server.ssrLoadModule('/src/components/anchor/NavigationLink.vue');
    const hostLink = {
        inheritAttrs: false,
        setup(_props, { attrs, slots }) {
            return () => h('a', { ...attrs, 'data-router': 'host' }, slots.default?.());
        },
    };
    for (const link of [undefined, hostLink]) {
        const app = createSSRApp({
            render: () => h(NavigationLink, { href: '/cancel', 'aria-label': 'Cancel form' }, () => 'Cancel'),
        });
        app.use(createMiruConfig({ navigation: { link, visit() {} } }));
        const html = await renderToString(app);
        assert.match(html, /href="\/cancel"/);
        assert.match(html, /aria-label="Cancel form"/);
        assert.match(html.replace(/<!--[\s\S]*?-->/g, ''), />Cancel<\/a>/);
        assert.equal(html.includes('data-router="host"'), Boolean(link));
    }
});
