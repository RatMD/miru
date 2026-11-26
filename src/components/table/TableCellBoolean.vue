<template>
    <TableCell align="center" data-cell-type="boolean">
        <TableBooleanToggle
            :active="model"
            :label="label"
            :disabled="disabled"
            :active-class="activeClass"
            @toggle="model = !model">
            <template #default="{ active }">
                <slot :active="active">
                    <IconCheck v-if="active" class="size-4" aria-hidden="true" />
                    <IconX v-else class="size-4" aria-hidden="true" />
                </slot>
            </template>
        </TableBooleanToggle>
    </TableCell>
</template>
<script setup lang="ts">
import { IconCheck, IconX } from '@tabler/icons-vue';
import TableCell from './TableCell.vue';
import TableBooleanToggle from './values/TableBooleanToggle.vue';
defineProps<{ label: string; disabled?: boolean; activeClass?: string }>();
const model = defineModel<boolean>({ required: true });
</script>
