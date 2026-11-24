import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { renderToString } from '@vue/server-renderer';
import { createServer } from 'vite';
import { afterAll as after, test } from 'vitest';
import { createApp, createSSRApp, h, ref } from 'vue';
import { z } from 'zod';

const server = await createServer({
    configFile: false,
    root: fileURLToPath(new URL('..', import.meta.url)),
    plugins: [vue()],
    server: { middlewareMode: true },
    appType: 'custom',
});
after(() => server.close());
const { createMiru } = await server.ssrLoadModule('/src/miru.ts');
const { createMiruConfig } = await server.ssrLoadModule('/src/miru.ts');
const { createMiruI18n } = await server.ssrLoadModule('/src/plugins/i18n.ts');
const { defineValidators, createMiruValidation } = await server.ssrLoadModule(
    '/src/plugins/validation.ts',
);
const { useValidation } = await server.ssrLoadModule('/src/composables/useValidation.ts');
const { useForm } = await server.ssrLoadModule('/src/composables/useForm.ts');
const { default: UiProvider } = await server.ssrLoadModule(
    '/src/components/provider/UiProvider.vue',
);

function installed(options = {}) {
    const app = createApp({});
    app.use(createMiru({ directives: false, ...options }));

    return app;
}

function factories(app, local) {
    return app.runWithContext(() => useValidation(local).validators);
}

test('built-in factories produce ordinary chainable Zod string schemas', () => {
    const validators = factories(createApp({}));
    const valid = {
        mailAddress: 'name@bücher.de',
        gtin: '036000291452',
        iban: 'DE89 3704 0044 0532 0130 00',
        creditCard: '4242 4242 4242 4242',
    };

    for (const [name, value] of Object.entries(valid)) {
        const schema = validators[name]();
        assert.ok(schema instanceof z.ZodString);
        assert.equal(schema.parse(value), value);
        assert.equal(schema.optional().safeParse(undefined).success, true);
        assert.equal(schema.nullable().safeParse(null).success, true);
        assert.equal(schema.safeParse('bad').success, false);
        assert.equal(schema.safeParse(123).success, false);
    }

    assert.equal(
        validators
            .iban()
            .transform((value) => value.replaceAll(' ', ''))
            .parse(valid.iban),
        'DE89370400440532013000',
    );
});

test('existing schemas resolve localized messages at parse time, including wrong input types', () => {
    const locale = ref('en');
    const validators = factories(installed({ locale }));
    const schema = validators.iban();
    assert.match(schema.safeParse('bad').error.issues[0].message, /Enter a valid IBAN/);
    locale.value = 'de';
    assert.match(schema.safeParse('bad').error.issues[0].message, /gültige IBAN/);
    assert.match(schema.safeParse(null).error.issues[0].message, /gültige IBAN/);
    assert.equal(
        validators.iban({ error: 'Custom' }).safeParse('bad').error.issues[0].message,
        'Custom',
    );
    const error = ref('First');
    const custom = validators.gtin({ error: () => error.value });
    error.value = 'Second';
    assert.equal(custom.safeParse('bad').error.issues[0].message, 'Second');
});

test('registered factories retain arguments, transformations and app-local translation context', () => {
    const definitions = defineValidators({
        customerId: ({ z, t }, prefix = 'CUS-') =>
            z
                .string()
                .startsWith(prefix, { error: () => t('customer.invalid') })
                .transform((value) => value.toUpperCase()),
    });
    const app = installed({
        validators: definitions,
        translate: (key) => (key === 'customer.invalid' ? 'Choose a customer' : undefined),
    });
    const validators = factories(app);
    assert.equal(validators.customerId().parse('CUS-ab'), 'CUS-AB');
    assert.equal(validators.customerId('TEST-').safeParse('CUS-ab').success, false);
    assert.equal(
        validators.customerId().safeParse('bad').error.issues[0].message,
        'Choose a customer',
    );
});

test('the same plugin reused across apps keeps registration snapshots and contexts isolated', () => {
    const definitions = defineValidators({
        language: ({ z, locale }) => z.string().transform((value) => value + ':' + locale.value),
    });
    const plugin = createMiru({ directives: false, validators: definitions });
    const first = createApp({}),
        second = createApp({});
    first.use(plugin);
    second.use(plugin);
    const a = factories(first),
        b = factories(second);
    assert.notEqual(a.language, b.language);
    definitions.newFactory = ({ z }) => z.string();
    assert.equal(factories(first).newFactory, undefined);
    const de = factories(installed({ locale: 'de', validators: definitions }));
    assert.equal(a.language().parse('value'), 'value:en');
    assert.equal(de.language().parse('value'), 'value:de');
});

test('local factories override custom app factories without modifying other consumers', () => {
    const app = installed({ validators: defineValidators({ value: ({ z }) => z.literal('app') }) });
    const local = factories(
        app,
        defineValidators({
            value: ({ z }) => z.literal('local'),
            count: ({ z }) => z.number().int(),
        }),
    );
    assert.equal(local.value().parse('local'), 'local');
    assert.equal(local.count().parse(3), 3);
    assert.equal(factories(app).value().parse('app'), 'app');
    assert.equal(factories(app).count, undefined);
});

test('custom factories support asynchronous checks and transformations', async () => {
    const validators = factories(
        installed({
            validators: defineValidators({
                available: ({ z }) =>
                    z
                        .string()
                        .refine(async (value) => value !== 'taken')
                        .transform(async (value) => value.toUpperCase()),
            }),
        }),
    );
    assert.equal((await validators.available().safeParseAsync('taken')).success, false);
    assert.equal(await validators.available().parseAsync('free'), 'FREE');
});

test('manual installation and configure registration work, and plugin selection is respected', () => {
    const definitions = defineValidators({ custom: ({ z }) => z.number() });
    const app = createApp({});
    app.use(createMiruConfig({ locale: 'de', validators: definitions }));
    app.use(createMiruI18n());
    app.use(createMiruValidation());
    assert.equal(factories(app).custom().parse(2), 2);
    assert.match(factories(app).iban().safeParse('bad').error.issues[0].message, /gültige/);
    const configured = installed({ configure: () => ({ validators: definitions }) });
    assert.equal(factories(configured).custom().parse(3), 3);
    const disabled = installed({ validators: definitions, plugins: { validation: false } });
    assert.equal(factories(disabled).custom, undefined);
    assert.equal(factories(disabled).gtin().parse('036000291452'), '036000291452');
});

test('factory configuration rejects reserved names, non-functions and invalid schema results', () => {
    for (const name of [
        'iban',
        'gtin',
        'mailAddress',
        'creditCard',
        '__proto__',
        'constructor',
        'prototype',
        '',
    ]) {
        assert.throws(
            () => defineValidators(Object.fromEntries([[name, ({ z }) => z.string()]])),
            /reserved or empty/,
        );
    }

    assert.throws(() => installed({ validators: { invalid: 42 } }), /must be a function/);
    assert.throws(() => factories(installed(), { iban: ({ z }) => z.string() }), /reserved/);
    const invalid = factories(installed({ validators: { invalid: () => null } }));
    assert.throws(() => invalid.invalid(), /must return a Zod schema synchronously/);
});

test('registered factories use the nearest provider, with no cross-tree locale mutation', async () => {
    const definitions = defineValidators({
        custom: ({ z, t }) => z.string().refine(() => false, { error: () => t('host.invalid') }),
    });
    const probe = {
        setup() {
            const schema = useValidation().validators.custom();

            return () => h('span', schema.safeParse('bad').error.issues[0].message);
        },
    };
    const app = createSSRApp({
        render: () =>
            h('main', [h(UiProvider, { locale: 'de' }, { default: () => h(probe) }), h(probe)]),
    });
    app.use(
        createMiru({
            directives: false,
            validators: definitions,
            i18n: { translate: (key, values, locale) => locale + ':' + key },
        }),
    );
    assert.match(
        await renderToString(app),
        /<span>de:host.invalid<\/span>.*<span>en:host.invalid<\/span>/,
    );
});

test('schemas integrate with the existing form composable, blocking invalid submits and preserving parsed output', async () => {
    let controller;
    let submitted;
    const probe = {
        setup() {
            const { validators } = useValidation();
            controller = useForm({
                schema: z.object({
                    iban: validators.iban().transform((value) => value.replaceAll(' ', '')),
                }),
                initialValues: { iban: 'invalid' },
                submit: '/test',
                beforeSubmit({ values }) {
                    submitted = values;
                    throw new Error('Stop before transport');
                },
            });

            return () => null;
        },
    };
    const app = createSSRApp(probe);
    app.use(createMiru({ directives: false }));
    await renderToString(app);
    const unmount = controller.form.mount();

    try {
        await controller.submitForm();
        assert.equal(submitted, undefined);
        controller.form.setFieldValue('iban', 'DE89 3704 0044 0532 0130 00');
        await controller.submitForm();
        assert.deepEqual(submitted, { iban: 'DE89370400440532013000' });
    } finally {
        unmount();
    }
});
