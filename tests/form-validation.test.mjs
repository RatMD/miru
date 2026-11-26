import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { FormApi, FieldApi } from '@tanstack/form-core';
import ts from 'typescript';
import { test, vi } from 'vitest';
import { computed, ref, toValue } from 'vue';
import { z } from 'zod';
import { resolveFormAdapter } from '../src/components/form/adapter.ts';

const source = await readFile(new URL('../src/composables/useForm.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source.replace(/^import[\s\S]*?;\r?\n/gm, ''), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
function fixture(options = {}, globals = {}) {
    let submissions = 0;
    const payloads = [];
    const exports = {};
    const adapter = {
        async submit(context) {
            submissions++;
            payloads.push(context.payload);
            return { status: 'success', result: { props: {} } };
        },
    };
    new Function(
        'exports',
        'useTanStackForm',
        'computed',
        'ref',
        'toValue',
        'useI18n',
        'inject',
        'miruOptionsKey',
        'resolveFormAdapter',
        outputText,
    )(
        exports,
        (options) => {
            const form = new FormApi(options);
            form.mount();
            return form;
        },
        computed,
        ref,
        toValue,
        () => ({ trans: (key) => key }),
        () => globals,
        Symbol('miru'),
        resolveFormAdapter,
    );
    const controller = exports.useForm({
        schema: z.object({ accounts: z.array(z.object({ target: z.string().min(1) })) }),
        submit: '/test',
        initialValues: { accounts: [{ target: 'valid' }] },
        adapter,
        ...options,
    });
    const field = new FieldApi({ form: controller.form, name: 'accounts' });
    const unmount = field.mount();
    return { ...controller, submissions: () => submissions, payloads, unmount };
}

test('global adapter is used unless a form explicitly overrides it', async () => {
    const calls = [];
    const global = {
        async submit() {
            calls.push('global');
            return { status: 'success', result: 1 };
        },
    };
    const local = {
        async submit() {
            calls.push('local');
            return { status: 'success', result: 2 };
        },
    };
    const a = fixture({ adapter: undefined }, { formAdapter: global });
    const b = fixture({ adapter: local, mode: 'json' }, { formAdapter: global });
    try {
        assert.equal((await a.submitForm()).result, 1);
        assert.equal((await b.submitForm()).result, 2);
        assert.deepEqual(calls, ['global', 'local']);
    } finally {
        a.unmount();
        b.unmount();
    }
});

test('unconfigured forms submit through the plain AJAX request helper', async () => {
    const calls = [];
    vi.stubGlobal('fetch', async (url, init) => {
        calls.push([url, init]);
        return Response.json({ id: 42 });
    });
    const controller = fixture({ adapter: undefined });
    try {
        assert.equal((await controller.submitForm()).result.id, 42);
        assert.equal(calls[0][0], '/test');
        assert.deepEqual(JSON.parse(calls[0][1].body), { accounts: [{ target: 'valid' }] });
    } finally {
        controller.unmount();
        vi.unstubAllGlobals();
    }
});

test('legacy named Inertia forms resolve only the adapter registered for their app', async () => {
    const adapter = { async submit() { return { status: 'success', result: 'inertia' }; } };
    const configured = fixture({ adapter: 'inertia' }, { formAdapters: { inertia: adapter } });
    const missing = fixture({ adapter: 'inertia' });
    try {
        assert.equal((await configured.submitForm()).result, 'inertia');
        const result = await missing.submitForm();
        assert.equal(result.status, 'error');
        assert.equal(result.details.source, 'transport');
        assert.match(result.message, /Inertia adapter is not configured/);
    } finally {
        configured.unmount();
        missing.unmount();
    }
});

test('server field arrays normalize into TanStack paths and clear on a successful retry', async () => {
    let fail = true;
    const controller = fixture({
        adapter: {
            async submit() {
                return fail
                    ? {
                          status: 'error',
                          source: 'server',
                          errors: { 'accounts.0.target': ['Required'], _form: 'Check the form' },
                      }
                    : { status: 'success', result: true };
            },
        },
    });
    try {
        const result = await controller.submitForm();
        assert.equal(
            result.details.errors['accounts[0].target'],
            'Required',
            JSON.stringify(result),
        );
        assert.equal(
            controller.form.state.fieldMeta['accounts[0].target'].errorMap.onServer,
            'Required',
        );
        assert.equal(controller.formError.value, 'Check the form');
        fail = false;
        assert.equal((await controller.submitForm()).status, 'success');
        assert.equal(
            controller.form.state.fieldMeta['accounts[0].target'].errorMap.onServer,
            undefined,
        );
        assert.equal(controller.formError.value, undefined);
    } finally {
        controller.unmount();
    }
});

test('AJAX mode stops invalid client submissions and maps real 422 responses without Inertia', async () => {
    const original = globalThis.fetch;
    let calls = 0;
    globalThis.fetch = async () => {
        calls++;
        return Response.json({ errors: { 'accounts.0.target': ['Rejected'] } }, { status: 422 });
    };
    const controller = fixture({
        adapter: undefined,
        mode: 'json',
        initialValues: { accounts: [{ target: '' }] },
    });
    try {
        assert.equal((await controller.submitForm()).details.source, 'client');
        assert.equal(calls, 0);
        controller.form.setFieldValue('accounts[0].target', 'Valid');
        const result = await controller.submitForm();
        assert.equal(result.details.source, 'server');
        assert.equal(result.details.errors['accounts[0].target'], 'Rejected');
        assert.equal(calls, 1);
    } finally {
        globalThis.fetch = original;
        controller.unmount();
    }
});

test('shared adapters do not share loading state and duplicate submits are blocked per form', async () => {
    const pending = [];
    const adapter = {
        submit() {
            return new Promise((resolve) => pending.push(resolve));
        },
    };
    const a = fixture({ adapter });
    const b = fixture({ adapter });
    try {
        const first = a.submitForm();
        assert.equal(await a.submitForm(), undefined);
        const second = b.submitForm();
        await vi.waitFor(() => assert.equal(pending.length, 2));
        pending[0]({ status: 'success', result: 1 });
        await first;
        assert.equal(a.loading.value, false);
        assert.equal(b.loading.value, true);
        pending[1]({ status: 'success', result: 2 });
        await second;
        assert.equal(b.loading.value, false);
    } finally {
        a.unmount();
        b.unmount();
    }
});

test('custom editor metadata without either error map permits repeated saves', async () => {
    const controller = fixture();
    try {
        controller.form.setFieldMeta('accounts[0].target', (meta) => ({
            ...meta,
            errorSourceMap: undefined,
            errorMap: undefined,
        }));
        await controller.submitForm();
        await controller.submitForm();
        assert.equal(controller.submissions(), 2);
        assert.equal(controller.loading.value, false);
    } finally {
        controller.unmount();
    }
});

test('preparation errors release the submission lock and allow a later save', async () => {
    const controller = fixture();
    const setErrorMap = controller.form.setErrorMap.bind(controller.form);
    try {
        controller.form.setErrorMap = () => {
            throw new Error('Preparation failed');
        };
        const failed = await controller.submitForm();
        assert.equal(failed.status, 'error');
        assert.equal(controller.loading.value, false);
        controller.form.setErrorMap = setErrorMap;
        await controller.submitForm();
        assert.equal(controller.submissions(), 1);
    } finally {
        controller.unmount();
    }
});

test('submit transforms and callbacks receive the parsed async Zod output on every attempt', async () => {
    const callbacks = [];
    const controller = fixture({
        schema: z.object({
            accounts: z.array(
                z.object({
                    target: z
                        .string()
                        .min(1)
                        .transform(async (value) => value.trim().toUpperCase()),
                }),
            ),
        }),
        initialValues: { accounts: [{ target: ' first ' }] },
        transformValues: (values) => ({ normalized: values.accounts[0].target }),
        onSuccess: ({ values }) => callbacks.push(values.accounts[0].target),
    });
    try {
        await controller.submitForm();
        controller.form.setFieldValue('accounts', [{ target: '' }]);
        await controller.submitForm();
        assert.equal(controller.submissions(), 1);
        controller.form.setFieldValue('accounts', [{ target: ' second ' }]);
        await controller.submitForm();
        assert.deepEqual(controller.payloads, [{ normalized: 'FIRST' }, { normalized: 'SECOND' }]);
        assert.deepEqual(callbacks, ['FIRST', 'SECOND']);
        assert.equal(controller.form.state.values.accounts[0].target, ' second ');
    } finally {
        controller.unmount();
    }
});

test('validated host work receives parsed values before transport and releases the lock on failure', async () => {
    let permit = false;
    const seen = [];
    const controller = fixture({
        schema: z.object({
            accounts: z.array(z.object({ target: z.string().transform((value) => value.trim()) })),
        }),
        initialValues: { accounts: [{ target: ' normalized ' }] },
        beforeSubmit: async ({ values, payload }) => {
            seen.push(values.accounts[0].target);
            assert.equal(payload.accounts[0].target, 'normalized');
            if (!permit) throw new Error('Host work failed');
        },
    });
    try {
        const failed = await controller.submitForm();
        assert.equal(failed.status, 'error');
        assert.equal(controller.submissions(), 0);
        assert.equal(controller.loading.value, false);
        permit = true;
        await controller.submitForm();
        assert.equal(controller.submissions(), 1);
        assert.deepEqual(seen, ['normalized', 'normalized']);
    } finally {
        controller.unmount();
    }
});
