<template>
    <TableCell :align="align" data-cell-type="money">
        <TableMoneyValue :value="value" :currency="currency" />
    </TableCell>
</template>
<script setup lang="ts">
import type { TableAlign } from './types';
import TableCell from './TableCell.vue';
import TableMoneyValue from './values/TableMoneyValue.vue';
withDefaults(defineProps<{ value: unknown; currency?: string; align?: TableAlign }>(), {
    currency: 'EUR',
    align: 'right',
});
</script>
