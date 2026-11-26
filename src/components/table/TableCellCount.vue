<template>
    <TableCell :align="align" data-cell-type="count">
        <TableCountValue :value="value" :align="align" />
    </TableCell>
</template>
<script setup lang="ts">
import type { TableAlign } from './types';
import TableCell from './TableCell.vue';
import TableCountValue from './values/TableCountValue.vue';
withDefaults(defineProps<{ value: unknown; align?: TableAlign }>(), { align: 'center' });
</script>
