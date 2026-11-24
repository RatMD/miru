<template>
    <DataTableDateTimeValue
        :value="resolvedValue"
        :display="column.columnDef.meta?.dateTimeDisplay"
        :align="alignment" />
</template>

<script setup lang="ts" generic="TData extends RowData">
import type { DataTableColumn } from './types';
import type { RowData } from '@tanstack/vue-table';
import { computed } from 'vue';
import DataTableDateTimeValue from './DataTableDateTimeValue.vue';

const props = defineProps<{ value: unknown; item: TData; column: DataTableColumn<TData> }>();
const key = computed(() =>
    String(
        'accessorKey' in props.column.columnDef
            ? props.column.columnDef.accessorKey
            : props.column.id,
    ),
);
const alignment = computed<'left' | 'center' | 'right'>(() => {
    const align = (props.column.columnDef.meta as { align?: string } | undefined)?.align;
    if (align === 'center' || align === 'left') return align;
    return 'right';
});
const resolvedValue = computed(
    () => props.value ?? (props.item as Record<string, unknown>)[key.value],
);
</script>
