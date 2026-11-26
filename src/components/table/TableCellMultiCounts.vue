<template>
    <TableCell :align="align" data-cell-type="multi-counts">
        <TableMultiCountsValue :item="item" :counts="counts" :align="align" />
    </TableCell>
</template>
<script setup lang="ts">
import type { TableAlign, TableCountDefinition } from './types';
import TableCell from './TableCell.vue';
import TableMultiCountsValue from './values/TableMultiCountsValue.vue';
withDefaults(defineProps<{ item: unknown; counts: TableCountDefinition[]; align?: TableAlign }>(), {
    align: 'center',
});
</script>
