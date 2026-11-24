<template>
    <DataTableMultiCountsValue :item="item" :counts="counts" />
</template>

<script setup lang="ts" generic="TData extends RowData">
import type { DataTableColumn } from './types';
import type { RowData } from '@tanstack/vue-table';
import { computed } from 'vue';
import DataTableMultiCountsValue from './DataTableMultiCountsValue.vue';

const props = defineProps<{ item: TData; column: DataTableColumn<TData> }>();
const counts = computed(() => props.column.columnDef.meta?.counts ?? []);
</script>
