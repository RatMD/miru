import type { FormAdapter, FormAdapterSelection } from '../../types/adapters';
import { createAjaxFormAdapter } from '../../adapters/ajax';

/** Resolve app-local adapters without importing optional host integrations. */
export async function resolveFormAdapter(
    selection: FormAdapterSelection,
    adapters: Partial<Record<'ajax' | 'inertia', FormAdapter>> = {},
): Promise<FormAdapter> {
    if (typeof selection !== 'string') return selection;
    if (adapters[selection]) return adapters[selection];
    if (selection === 'ajax') return createAjaxFormAdapter();
    throw new Error(
        'The Inertia adapter is not configured. Use createMiru({ adapter: inertiaAdapter() }) or pass createInertiaFormAdapter() as the form adapter.',
    );
}
