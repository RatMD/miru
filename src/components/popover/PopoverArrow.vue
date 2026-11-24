<template>
    <RekaPopoverArrow
        v-bind="forwarded"
        data-slot="popover-arrow"
        :class="cn('relative top-0 fill-popover stroke-border', props.class)">
        <path d="M0 0L6 6L12 0" vector-effect="non-scaling-stroke" />
    </RekaPopoverArrow>
</template>

<script setup lang="ts">
import type { PopoverArrowProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { PopoverArrow as RekaPopoverArrow, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = withDefaults(defineProps<PopoverArrowProps & { class?: HTMLAttributes['class'] }>(), {
    width: 20,
    height: 10,
});
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
</script>

<style>
/* Space utilities must not move Reka's absolutely positioned arrow wrapper. */
[data-slot='popover-content'] > span:has(> [data-slot='popover-arrow']) {
    margin: 0 !important;
}
</style>
