import type { DataTableFormat } from '../components/data-table/contracts';
import type { MaybeRefOrGetter } from 'vue';
import { computed, inject, toValue } from 'vue';
import { resolveDataTableAdapter } from '../components/data-table/normalization';
import { miruOptionsKey } from '../miru';

/** Table-level format overrides take precedence over app-wide backend conventions. */
export function useDataTableAdapter(format?: MaybeRefOrGetter<DataTableFormat | undefined>) {
    const config = inject(miruOptionsKey, {});
    return computed(() => {
        const explicitFormat = toValue(format);
        if (config.dataTable && (!explicitFormat || explicitFormat === config.dataTable.format)) {
            return config.dataTable;
        }
        return resolveDataTableAdapter(explicitFormat ?? 'default');
    });
}
