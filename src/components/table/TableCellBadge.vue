<template>
    <TableCell :align="align" data-cell-type="badge">
        <TableBadgeValue
            :value="value"
            :statuses="statuses"
            :translation-prefix="translationPrefix"
            :variant="variant" />
    </TableCell>
</template>
<script setup lang="ts">
import type { BadgeVariants } from '../badge';
import type { TableAlign, TableStatusDefinition } from './types';
import TableCell from './TableCell.vue';
import TableBadgeValue from './values/TableBadgeValue.vue';
defineProps<{
    value: unknown;
    statuses?: Record<string, TableStatusDefinition>;
    translationPrefix?: string;
    variant?: BadgeVariants['variant'];
    align?: TableAlign;
}>();
</script>
