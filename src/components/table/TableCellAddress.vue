<template>
    <TableCell data-cell-type="address"><TableAddressValue :value="value" /></TableCell>
</template>
<script setup lang="ts">
import type { TableAddressLike } from './types';
import TableCell from './TableCell.vue';
import TableAddressValue from './values/TableAddressValue.vue';
defineProps<{ value?: TableAddressLike | null }>();
</script>
