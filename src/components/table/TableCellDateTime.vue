<template>
    <TableCell :align="align" data-cell-type="date-time">
        <TableDateTimeValue :value="value" :display="display" :align="align" />
    </TableCell>
</template>
<script setup lang="ts">
import type { TableAlign } from './types';
import TableCell from './TableCell.vue';
import TableDateTimeValue from './values/TableDateTimeValue.vue';
withDefaults(
    defineProps<{ value: unknown; display?: 'date' | 'time' | 'date-time'; align?: TableAlign }>(),
    { display: 'date-time', align: 'right' },
);
</script>
