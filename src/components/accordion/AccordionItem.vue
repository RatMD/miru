<template>
    <AccordionItem
        v-slot="slotProps"
        v-bind="forwarded"
        data-slot="accordion-item"
        :class="cn('rounded-md border border-border bg-background text-foreground', props.class)">
        <slot v-bind="slotProps" />
    </AccordionItem>
</template>

<script setup lang="ts">
import type { AccordionItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AccordionItem, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>();
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
</script>
