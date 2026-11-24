import assert from 'node:assert/strict';
import { renderToString } from '@vue/server-renderer';
import { createServer } from 'vite';
import { afterAll as after, test } from 'vitest';
import { createSSRApp, defineComponent, effectScope, h } from 'vue';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
after(() => server.close());
const { default: Breakpoint } = await server.ssrLoadModule(
    '/src/components/breakpoint/Breakpoint.vue',
);
const { default: Deferred } = await server.ssrLoadModule('/src/components/deferred/Deferred.vue');
const { default: Backdrop } = await server.ssrLoadModule('/src/components/backdrop/Backdrop.vue');
const { useBreakpoint } = await server.ssrLoadModule('/src/composables/useBreakpoint.ts');
const { createMiru } = await server.ssrLoadModule('/src/miru.ts');
const { useMiru } = await server.ssrLoadModule('/src/composables/useMiru.ts');

test('breakpoint SSR has a deterministic fallback and explicit viewport rules', async () => {
    const slots = { default: () => 'Matched', else: () => 'Fallback' };
    assert.match(
        await renderToString(createSSRApp({ render: () => h(Breakpoint, { min: 'md' }, slots) })),
        /Fallback/,
    );
    assert.match(
        await renderToString(
            createSSRApp({ render: () => h(Breakpoint, { min: 'md', ssrWidth: 900 }, slots) }),
        ),
        /Matched/,
    );
    assert.match(
        await renderToString(
            createSSRApp({ render: () => h(Breakpoint, { max: 900, ssrWidth: 900 }, slots) }),
        ),
        /Fallback/,
    );
    const scope = effectScope();
    scope.run(() => {
        const bp = useBreakpoint({
            min: 'tablet',
            breakpoints: { tablet: 900 },
            ssrWidth: 950,
            ssrHeight: 600,
            orientation: 'landscape',
        });
        assert.equal(bp.matches.value, true);
        assert.equal(bp.orientation.value, 'landscape');
        assert.throws(() => bp.resolve('missing'), RangeError);
    });
    scope.stop();
});

test('reused Miru installation keeps breakpoint configuration local to each app', async () => {
    const options = { breakpoints: { md: 900 }, plugins: false };
    const plugin = createMiru(options);
    const create = () =>
        createSSRApp({
            render: () =>
                h(
                    Breakpoint,
                    { min: 'md', ssrWidth: 1000 },
                    { default: () => 'Matched', else: () => 'Fallback' },
                ),
        });
    const first = create();
    first.use(plugin);
    const second = create();
    second.use(plugin);
    first.runWithContext(() => {
        useMiru().options.breakpoints.md = 1200;
    });
    assert.match(await renderToString(first), /Fallback/);
    assert.match(await renderToString(second), /Matched/);
    assert.equal(options.breakpoints.md, 900);
});

test('deferred renders imported components and async setup children on the server', async () => {
    const Imported = defineComponent({
        props: { label: String },
        setup: (props) => () => h('p', props.label),
    });
    const html = await renderToString(
        createSSRApp({
            render: () =>
                h(Deferred, {
                    loader: async () => ({ default: Imported }),
                    componentProps: { label: 'Imported content' },
                }),
        }),
    );
    assert.match(html, /Imported content/);
    const AsyncChild = defineComponent({
        async setup() {
            return () => h('p', 'Async slot content');
        },
    });
    const slotHtml = await renderToString(
        createSSRApp({ render: () => h(Deferred, {}, { default: () => h(AsyncChild) }) }),
    );
    assert.match(slotHtml, /Async slot content/);
});

test('backdrop is SSR-safe and hidden layers do not produce an interactive surface', async () => {
    const hidden = await renderToString(
        createSSRApp({ render: () => h(Backdrop, { visible: false, interactive: true }) }),
    );
    assert.doesNotMatch(hidden, /data-slot="backdrop"/);
    const visible = await renderToString(
        createSSRApp({
            render: () => h(Backdrop, { blur: 20, faded: true, origin: { x: 100, y: 50 } }),
        }),
    );
    assert.match(visible, /blur\(20px\)/);
    assert.match(visible, /--backdrop-origin-x:100px/);
    assert.match(visible, /aria-hidden="true"/);
});
