<template>
    <AccordionHeader
        v-bind="forwarded"
        data-slot="accordion-header"
        :class="
            cn('grid grid-cols-[minmax(0,1fr)_auto_2rem] items-center gap-x-2 px-4', props.class)
        ">
        <slot />
        <span
            v-if="$slots.actions"
            data-slot="accordion-actions"
            class="relative z-10 col-start-2 row-start-1 flex shrink-0 items-center gap-2">
            <slot name="actions" />
        </span>
    </AccordionHeader>
</template>

<script setup lang="ts">
import type { AccordionHeaderProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AccordionHeader, useForwardProps } from 'reka-ui';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { buttonActionDefaultsKey } from '../button-action/context';

const props = withDefaults(
    defineProps<
        AccordionHeaderProps & { class?: HTMLAttributes['class']; mutedActions?: boolean }
    >(),
    { mutedActions: true },
);
const forwarded = useForwardProps(reactiveOmit(props, 'class', 'mutedActions'));
provide(
    buttonActionDefaultsKey,
    computed(() => ({ muted: props.mutedActions })),
);
</script>
