<template>
    <TableCell :align="align" data-cell-type="status">
        <TableStatusValue
            :value="value"
            :statuses="statuses"
            :translation-prefix="translationPrefix" />
    </TableCell>
</template>
<script setup lang="ts">
import type { TableAlign, TableStatusDefinition } from './types';
import TableCell from './TableCell.vue';
import TableStatusValue from './values/TableStatusValue.vue';
withDefaults(
    defineProps<{
        value: unknown;
        statuses?: Record<string, TableStatusDefinition>;
        translationPrefix?: string;
        align?: TableAlign;
    }>(),
    { align: 'center' },
);
</script>
