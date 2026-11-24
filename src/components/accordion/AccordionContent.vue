<template>
    <AccordionContent
        v-bind="forwarded"
        data-slot="accordion-content"
        :class="
            cn(
                'miru-accordion-content overflow-hidden border-t border-border text-sm font-normal',
                props.class,
            )
        ">
        <ScrollArea
            v-if="maxHeight"
            fit-content
            :style="{ maxHeight: limit }"
            :viewport-class="'overscroll-contain'">
            <div data-slot="accordion-content-inner" class="p-4"><slot /></div>
        </ScrollArea>
        <div v-else data-slot="accordion-content-inner" class="p-4"><slot /></div>
    </AccordionContent>
</template>
<script setup lang="ts">
import type { AccordionContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AccordionContent, useForwardProps } from 'reka-ui';
import { computed } from 'vue';
import { cn } from '../../support/classNames';
import { ScrollArea } from '../scroll-area';
const props = defineProps<
    AccordionContentProps & { class?: HTMLAttributes['class']; maxHeight?: string | number }
>();
const forwarded = useForwardProps(reactiveOmit(props, 'class', 'maxHeight'));
const limit = computed(() =>
    typeof props.maxHeight === 'number' ? props.maxHeight + 'px' : props.maxHeight,
);
</script>
<style scoped>
.miru-accordion-content[data-state='open'] {
    animation: miru-accordion-open 220ms ease-out;
}
.miru-accordion-content[data-state='closed'] {
    animation: miru-accordion-close 220ms ease-in;
}
@keyframes miru-accordion-open {
    from {
        height: 0;
    }
    to {
        height: var(--reka-accordion-content-height);
    }
}
@keyframes miru-accordion-close {
    from {
        height: var(--reka-accordion-content-height);
    }
    to {
        height: 0;
    }
}
@media (prefers-reduced-motion: reduce) {
    .miru-accordion-content {
        animation: none !important;
    }
}
</style>
