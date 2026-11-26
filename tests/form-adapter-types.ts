import type { FormAdapter, InertiaFormOptions } from '@rat.md/miru';
import type { MiruAdapter } from '@rat.md/miru/miru';
import { z } from 'zod';
import { adonisAdapter } from '@rat.md/miru/adapters/adonis';
import { ajaxAdapter, createAjaxFormAdapter } from '@rat.md/miru/adapters/ajax';
import { createInertiaFormAdapter, inertiaAdapter } from '@rat.md/miru/adapters/inertia';
import { laravelAdapter } from '@rat.md/miru/adapters/laravel';
import { useForm } from '@rat.md/miru/composables/useForm';
import { createMiru } from '@rat.md/miru/miru';

const adapter: FormAdapter = {
    async submit(context) {
        const method: 'get' | 'post' | 'put' | 'patch' | 'delete' = context.method;
        return { status: 'success', result: { id: 1, method } };
    },
};
createMiru({ formAdapter: adapter });
createMiru({ adapter: inertiaAdapter({ preserveScroll: true }) });
createMiru({ adapter: ajaxAdapter(), dataTable: adonisAdapter({ perPageKey: 'limit' }) });
createMiru({ adapter: inertiaAdapter(), dataTable: laravelAdapter() });
// @ts-expect-error Backend list adapters do not provide a transport integration.
createMiru({ adapter: adonisAdapter() });
// @ts-expect-error Transport adapters do not normalize backend list payloads.
createMiru({ dataTable: inertiaAdapter() });
const hostAdapter: MiruAdapter = { formAdapter: adapter, navigation: { visit() {} } };
createMiru({ adapter: hostAdapter });
// @ts-expect-error Integration adapters carry form/navigation settings, not a submit method directly.
createMiru({ adapter });
createMiru({ formAdapter: createAjaxFormAdapter({ credentials: 'include' }) });
createMiru({ formAdapter: createInertiaFormAdapter({ preserveScroll: true }) });
// @ts-expect-error Only the built-in adapter names or adapter objects are accepted.
createMiru({ formAdapter: 'missing' });

const schema = z.object({ name: z.string() });
const visitOptions: InertiaFormOptions = {
    preserveScroll: true,
    onBefore: (visit) => {
        const method: string = visit.method;
        // @ts-expect-error The optional adapter preserves the full host visit type.
        const invalid: number = visit.method;
    },
};
useForm<typeof schema, { id: number }>({
    schema,
    initialValues: { name: 'Ada' },
    submit: '/api/profile',
    adapter,
    visitOptions: () => visitOptions,
    requestOptions: ({ values }) => ({ headers: { 'X-Name': values.name } }),
    onSuccess: ({ result, values }) => {
        const name: string = values.name;
        if (result.status === 'success') {
            const id: number = result.result.id;
            // @ts-expect-error Result IDs retain the declared response type.
            const invalid: string = result.result.id;
        }
    },
});
