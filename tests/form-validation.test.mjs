import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { FormApi, FieldApi } from '@tanstack/form-core';
import ts from 'typescript';
import { test } from 'vitest';
import { computed, ref, toValue } from 'vue';
import { z } from 'zod';

const source = await readFile(new URL('../src/composables/useForm.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source.replace(/^import[\s\S]*?;\r?\n/gm, ''), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
function fixture(options = {}) {
    let submissions = 0;
    const payloads = [];
    const exports = {};
    new Function(
        'exports',
        'router',
        'useHttp',
        'useTanStackForm',
        'computed',
        'ref',
        'toValue',
        'useI18n',
        outputText,
    )(
        exports,
        {
            visit: (_url, options) => {
                submissions++;
                payloads.push(options.data);
                options.onSuccess({ props: {} });
            },
        },
        () => ({ processing: false }),
        (options) => {
            const form = new FormApi(options);
            form.mount();
            return form;
        },
        computed,
        ref,
        toValue,
        () => ({ trans: (key) => key }),
    );
    const controller = exports.useForm({
        schema: z.object({ accounts: z.array(z.object({ target: z.string().min(1) })) }),
        submit: '/test',
        initialValues: { accounts: [{ target: 'valid' }] },
        ...options,
    });
    const field = new FieldApi({ form: controller.form, name: 'accounts' });
    const unmount = field.mount();
    return { ...controller, submissions: () => submissions, payloads, unmount };
}

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
