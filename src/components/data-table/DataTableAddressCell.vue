<template><TableAddressValue :value="address" :fallback-name="recipient" /></template>
<script setup lang="ts" generic="TData extends RowData">
import type { DataTableAddressLike } from './types';
import type { RowData } from '@tanstack/vue-table';
import { computed } from 'vue';
import TableAddressValue from '../table/values/TableAddressValue.vue';
const props = defineProps<{ value: unknown; item: TData }>();
const address = computed(() =>
    isAddress(props.value) ? props.value : isAddress(props.item) ? props.item : null,
);
const recipient = computed(() =>
    String(
        (props.item as Record<string, unknown>).name ??
            (props.item as Record<string, unknown>).display_name ??
            '',
    ),
);
function isAddress(value: unknown): value is DataTableAddressLike {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
</script>
