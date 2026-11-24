<template>
    <AccordionRoot
        v-slot="slotProps"
        v-bind="forwarded"
        data-slot="accordion"
        :class="cn('w-full space-y-3', props.class)">
        <slot v-bind="slotProps" />
    </AccordionRoot>
</template>

<script setup lang="ts">
import type { AccordionIconMode } from './context';
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AccordionRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { accordionIconModeKey } from './context';

const props = defineProps<
    AccordionRootProps & {
        class?: HTMLAttributes['class'];
        /** Toggle icon and animation inherited by all triggers; defaults to the rotating down chevron. */
        iconMode?: AccordionIconMode;
    }
>();
const emits = defineEmits<AccordionRootEmits>();
const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class', 'iconMode'), emits);
provide(
    accordionIconModeKey,
    computed(() => props.iconMode ?? 'default'),
);
</script>
