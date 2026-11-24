<template>
    <PaginationList
        v-slot="slotProps"
        data-slot="pagination-content"
        :data-connected="appearance?.connected || undefined"
        v-bind="delegatedProps"
        :class="cn('miru-pagination-content flex flex-row items-center gap-1', props.class)">
        <slot v-bind="slotProps" />
    </PaginationList>
</template>

<script setup lang="ts">
import type { PaginationListProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { PaginationList } from 'reka-ui';
import { cn } from '../../support/classNames';
import { usePaginationAppearance } from './context';

const props = defineProps<PaginationListProps & { class?: HTMLAttributes['class'] }>();

const appearance = usePaginationAppearance();
const delegatedProps = reactiveOmit(props, 'class');
</script>

<style>
.miru-pagination-content[data-connected='true'] {
    gap: 0;
    --pagination-radius: max(0px, calc(var(--ui-radius, 0.5rem) - 2px));
}
.miru-pagination-content[data-connected='true'] > :not([data-slot='pagination-ellipsis']) {
    position: relative;
    border-radius: 0;
    margin-inline-start: -1px;
}
.miru-pagination-content[data-connected='true'] > :first-child,
.miru-pagination-content[data-connected='true'] > [data-slot='pagination-ellipsis'] + * {
    margin-inline-start: 0;
    border-start-start-radius: var(--pagination-radius);
    border-end-start-radius: var(--pagination-radius);
}
.miru-pagination-content[data-connected='true'] > :last-child,
.miru-pagination-content[data-connected='true'] > :has(+ [data-slot='pagination-ellipsis']) {
    border-start-end-radius: var(--pagination-radius);
    border-end-end-radius: var(--pagination-radius);
}
.miru-pagination-content[data-connected='true'] > [data-slot='pagination-ellipsis'] {
    margin-inline: 0.375rem;
}
.miru-pagination-content[data-connected='true']
    > :not(:disabled):not([aria-disabled='true']):hover {
    z-index: 1;
}
.miru-pagination-content[data-connected='true'] > :focus-visible {
    z-index: 2;
}
</style>
