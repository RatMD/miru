import type { ComputedRef, InjectionKey } from 'vue';

export type TableVariant = 'default' | 'compact';
export type TableSortDirection = 'asc' | 'desc' | false;
export const tableVariantKey: InjectionKey<ComputedRef<TableVariant>> =
    Symbol('miru-table-variant');
