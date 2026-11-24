<template>
    <Dialog v-model:open="open">
        <slot name="trigger" />
        <DialogContent
            :size="size"
            :close-label="trans('common.actions.close')"
            class="top-[10dvh] translate-y-0 max-h-[85dvh] gap-0 overflow-hidden p-0">
            <DialogTitle class="sr-only">{{ title }}</DialogTitle>
            <DialogDescription class="sr-only">{{ description }}</DialogDescription>
            <Command
                v-model:query="query"
                v-model:filters="filters"
                :items="items"
                :filter-options="filterOptions"
                :placeholder="placeholder"
                :loading="loading"
                :disabled="disabled"
                auto-focus
                class="rounded-none border-0 [&>[data-slot=command-list]]:max-h-[60dvh] [&>div:first-child]:pr-12"
                @select="select">
                <template v-if="$slots.item" #item="scope">
                    <slot name="item" v-bind="scope" />
                </template>
                <template #footer><slot name="footer" /></template>
            </Command>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import type { DialogSize } from '../dialog';
import type { CommandItem, CommandFilter } from './types';
import { useI18n } from '../../composables/useI18n';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../dialog';
import Command from './Command.vue';
const props = withDefaults(
    defineProps<{
        title: string;
        description: string;
        items: readonly CommandItem[];
        filterOptions?: readonly CommandFilter[];
        placeholder?: string;
        loading?: boolean;
        disabled?: boolean;
        size?: DialogSize;
        closeOnSelect?: boolean;
    }>(),
    { size: '4xl', closeOnSelect: true },
);
const open = defineModel<boolean>('open', { default: false }),
    query = defineModel<string>('query', { default: '' }),
    filters = defineModel<string[]>('filters', { default: () => [] });
const emit = defineEmits<{ select: [item: CommandItem] }>();
const { trans } = useI18n();
function select(item: CommandItem): void {
    emit('select', item);
    if (props.closeOnSelect) open.value = false;
}
</script>
