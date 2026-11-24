<template>
    <span class="tabular-nums">{{ formatted }}</span>
</template>

<script setup lang="ts" generic="TData extends object">
import type { DataTableColumn, DataTableColumnMeta } from './types';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{ value: unknown; item: TData; column: DataTableColumn<TData> }>();
const meta = computed(() => props.column.columnDef.meta as DataTableColumnMeta | undefined);
const currency = computed(() => {
    const key = meta.value?.currencyKey ?? 'currency';
    const value = (props.item as unknown as Record<string, unknown>)[key];
    return typeof value === 'string' && value.length === 3 ? value : 'EUR';
});
const formatted = computed(() => {
    const amount = typeof props.value === 'number' ? props.value : Number(props.value ?? 0);
    if (!Number.isFinite(amount)) return '—';

    return new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency: currency.value,
    }).format(amount);
});
</script>
