<template>
    <AccordionTrigger
        v-bind="forwarded"
        data-slot="accordion-trigger"
        :class="
            cn(
                'group/accordion-trigger col-span-full row-start-1 grid min-w-0 cursor-pointer grid-cols-subgrid items-center gap-x-2 rounded-sm py-4 text-left outline-none enabled:hover:text-foreground/80 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                props.class,
            )
        ">
        <span
            :class="
                cn(
                    'col-start-1 flex min-w-0 text-left',
                    badgesPosition === 'below'
                        ? 'flex-col items-start gap-1'
                        : 'flex-wrap items-center gap-2',
                )
            ">
            <span class="min-w-0 font-semibold">
                <slot />
                <span
                    v-if="$slots.description"
                    class="block text-xs font-normal text-muted-foreground">
                    <slot name="description" />
                </span>
            </span>
            <span v-if="$slots.badges" class="flex flex-wrap items-center gap-2">
                <slot name="badges" />
            </span>
        </span>
        <span
            data-slot="accordion-chevron"
            :data-icon-mode="iconMode"
            aria-hidden="true"
            class="col-start-3 -my-2 flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors group-[:enabled:hover]/accordion-trigger:bg-ghostly group-[:enabled:hover]/accordion-trigger:text-foreground group-[:enabled:active]/accordion-trigger:bg-outline-active group-[:enabled:active]/accordion-trigger:shadow-[var(--ui-pressed-shadow-subtle)] group-focus-visible/accordion-trigger:bg-ghostly group-focus-visible/accordion-trigger:text-foreground group-disabled/accordion-trigger:pointer-events-none motion-reduce:transition-none">
            <IconChevronDown
                v-if="iconMode === 'default'"
                class="size-4 transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-180 motion-reduce:transition-none" />
            <IconChevronLeft
                v-else-if="iconMode === 'modern'"
                class="size-4 transition-transform duration-200 group-data-[state=open]/accordion-trigger:-rotate-90 motion-reduce:transition-none" />
            <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                class="size-4 transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-180 motion-reduce:transition-none">
                <path d="M5 12h14" />
                <path
                    data-slot="accordion-operator-vertical"
                    d="M12 5v14"
                    class="transition-opacity delay-100 duration-0 group-data-[state=open]/accordion-trigger:opacity-0 motion-reduce:delay-0" />
            </svg>
        </span>
    </AccordionTrigger>
</template>

<script setup lang="ts">
import type { AccordionIconMode } from './context';
import type { AccordionTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconChevronDown, IconChevronLeft } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { AccordionTrigger, useForwardProps } from 'reka-ui';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { accordionIconModeKey } from './context';

const props = defineProps<
    AccordionTriggerProps & {
        class?: HTMLAttributes['class'];
        badgesPosition?: 'inline' | 'below';
        /** Override the icon mode inherited from the surrounding Accordion. */
        iconMode?: AccordionIconMode;
    }
>();
const inheritedIconMode = inject(accordionIconModeKey, undefined);
const iconMode = computed(() => props.iconMode ?? inheritedIconMode?.value ?? 'default');
const forwarded = useForwardProps(reactiveOmit(props, 'class', 'badgesPosition', 'iconMode'));
</script>
