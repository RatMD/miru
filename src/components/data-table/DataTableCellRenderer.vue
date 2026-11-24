<template>
    <component
        :is="component"
        v-if="component"
        :row="cell.row"
        :value="cell.getValue()"
        :item="cell.row.original"
        :actions="actions"
        :column="cell.column" />
    <FlexRender v-else :cell="cell" />
</template>

<script setup lang="ts" generic="TData extends RowData">
import type { DataTableCell, DataTableColumnMeta, DataTableRowAction } from './types';
import type { RowData } from '@tanstack/vue-table';
import { FlexRender } from '@tanstack/vue-table';
import { computed } from 'vue';

const props = defineProps<{
    cell: DataTableCell<TData>;
    actions?: DataTableRowAction<TData>[];
}>();

const component = computed(
    () => (props.cell.column.columnDef.meta as DataTableColumnMeta | undefined)?.component,
);
</script>
