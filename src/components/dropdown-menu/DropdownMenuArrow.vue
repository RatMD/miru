<template>
    <RekaDropdownMenuArrow
        v-bind="forwarded"
        data-slot="dropdown-menu-arrow"
        :class="cn('relative -top-px fill-popover stroke-border', props.class)">
        <path d="M0 0L6 6L12 0" vector-effect="non-scaling-stroke" />
    </RekaDropdownMenuArrow>
</template>

<script setup lang="ts">
import type { DropdownMenuArrowProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DropdownMenuArrow as RekaDropdownMenuArrow, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = withDefaults(
    defineProps<DropdownMenuArrowProps & { class?: HTMLAttributes['class'] }>(),
    {
        width: 20,
        height: 10,
    },
);
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
</script>

<style>
/* Space utilities must not move Reka's absolutely positioned arrow wrapper. */
[data-slot='dropdown-menu-content'] > span:has(> [data-slot='dropdown-menu-arrow']) {
    margin: 0 !important;
}
</style>
