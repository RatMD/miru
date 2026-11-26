<template>
    <TableMoneyValue :value="value" :currency="currency" />
</template>

<script setup lang="ts" generic="TData extends object">
import type { DataTableColumn, DataTableColumnMeta } from './types';
import { computed } from 'vue';
import TableMoneyValue from '../table/values/TableMoneyValue.vue';

const props = defineProps<{ value: unknown; item: TData; column: DataTableColumn<TData> }>();
const meta = computed(() => props.column.columnDef.meta as DataTableColumnMeta | undefined);
const currency = computed(() => {
    const key = meta.value?.currencyKey ?? 'currency';
    const value = (props.item as unknown as Record<string, unknown>)[key];
    return typeof value === 'string' && value.length === 3 ? value : 'EUR';
});
</script>
