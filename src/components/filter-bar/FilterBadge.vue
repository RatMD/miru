<template>
    <Badge
        data-slot="filter-badge"
        :as="removable ? 'span' : 'button'"
        :type="removable ? undefined : 'button'"
        :disabled="(!removable && disabled) || undefined"
        :aria-pressed="!removable ? selected : undefined"
        :aria-label="!removable && count != null ? label + ' (' + formattedCount + ')' : undefined"
        :size="size === 'lg' ? 'lg' : 'default'"
        :data-size="size"
        :variant="selected ? 'primary' : removable ? 'ghostly' : 'outline'"
        :class="
            cn(
                'miru-filter-badge inline-flex shrink-0 gap-0 overflow-hidden rounded-full py-0 px-0! font-medium',
                dimensions,
                selected ? 'border-primary-border dark:border-primary-border/30' : 'border-border',
                disabled && 'opacity-50',
                props.class,
            )
        "
        @click="select">
        <BadgePart class="min-w-0 px-2.5 py-0 leading-5">{{ label }}</BadgePart>
        <template v-if="count != null">
            <BadgeSeparator />
            <BadgePart data-slot="filter-badge-count" class="shrink-0 px-2.5 py-0 tabular-nums">
                {{ formattedCount }}
            </BadgePart>
        </template>
        <BadgeSeparator v-if="removable" />
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
import { formatNumber } from '../../support/numberFormat';
import { Badge, BadgePart, BadgeSeparator } from '../badge';
import { Button } from '../button';
const props = withDefaults(
    defineProps<{
        label: string;
        count?: number | string;
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
const { trans, locale } = useI18n();
const formattedCount = computed(() =>
    typeof props.count === 'number' ? formatNumber(props.count, locale.value) : props.count,
);
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
    border-radius: 0;
}
.miru-filter-badge :deep(.filter-badge-remove:hover:not(:disabled)) {
    color: inherit;
    background: rgb(0 0 0 / 12%);
}
</style>
