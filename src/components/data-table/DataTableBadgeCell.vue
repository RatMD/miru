<template>
    <TableBadgeValue
        :value="value"
        :statuses="column.columnDef.meta?.statuses"
        :translation-prefix="column.columnDef.meta?.translationPrefix" />
</template>
<script setup lang="ts" generic="TData extends RowData">
import type { DataTableColumn } from './types';
import type { RowData } from '@tanstack/vue-table';
import TableBadgeValue from '../table/values/TableBadgeValue.vue';
defineProps<{ value: unknown; item: TData; column: DataTableColumn<TData> }>();
</script>
