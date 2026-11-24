<template>
    <Badge
        data-slot="filter-badge"
        :as="removable ? 'span' : 'button'"
        :type="removable ? undefined : 'button'"
        :disabled="(!removable && disabled) || undefined"
        :aria-pressed="!removable ? selected : undefined"
        :data-size="size"
        :variant="selected ? 'primary' : removable ? 'ghostly' : 'outline'"
        :class="
            cn(
                'miru-filter-badge inline-flex shrink-0 gap-0 overflow-hidden rounded-full py-0 px-0! font-medium',
                dimensions,
                disabled && 'opacity-50',
                props.class,
            )
        "
        @click="select">
        <span class="min-w-0 px-2.5 leading-5">{{ label }}</span>
        <Button
            v-if="removable"
            type="button"
            variant="ghost"
            size="xs"
            icon-only
            :disabled="disabled"
            :aria-label="removeLabel || trans('common.datatable.remove_filter', { filter: label })"
            data-slot="filter-badge-remove"
            class="filter-badge-remove h-auto! w-auto! min-w-0! shrink-0 self-stretch rounded-none px-1.5!"
            @click.stop="remove">
            <IconX :class="size === 'lg' ? 'size-4' : size === 'sm' ? 'size-3' : 'size-3.5'" />
        </Button>
    </Badge>
</template>
<script setup lang="ts">
import type { FilterBadgeSize } from './types';
import type { HTMLAttributes } from 'vue';
import { IconX } from '@tabler/icons-vue';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Badge } from '../badge';
import { Button } from '../button';
const props = withDefaults(
    defineProps<{
        label: string;
        size?: FilterBadgeSize;
        selected?: boolean;
        removable?: boolean;
        disabled?: boolean;
        removeLabel?: string;
        class?: HTMLAttributes['class'];
    }>(),
    { size: 'default', removable: true, selected: false, disabled: false },
);
const emit = defineEmits<{ remove: []; select: [] }>();
const { trans } = useI18n();
const dimensions = computed(
    () => ({ sm: 'h-6 text-[11px]', default: 'h-7 text-xs', lg: 'h-8 text-sm' })[props.size],
);
function remove(): void {
    if (!props.disabled) emit('remove');
}
function select(): void {
    if (!props.disabled && !props.removable) emit('select');
}
</script>
<style scoped>
.miru-filter-badge :deep(.filter-badge-remove) {
    color: inherit;
    background: transparent;
    border: 0;
    border-left: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    border-radius: 0;
}
.miru-filter-badge :deep(.filter-badge-remove:hover:not(:disabled)) {
    color: inherit;
    background: rgb(0 0 0 / 12%);
}
</style>
