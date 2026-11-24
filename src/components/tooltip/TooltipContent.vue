<template>
    <TooltipPortal>
        <TooltipContent
            data-slot="tooltip-content"
            :data-variant="variant"
            :style="colors"
            v-bind="{ ...forwarded, ...$attrs }"
            :class="
                cn(
                    'relative z-50 w-fit animate-in rounded-md border border-[var(--tooltip-border)] bg-[var(--tooltip-bg)] px-3 py-1.5 text-xs text-balance text-[color:var(--tooltip-fg)] fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                    props.class,
                )
            ">
            <slot />

            <TooltipArrow
                v-if="showArrow"
                class="z-50 size-[11px] translate-y-[calc(-50%_-_2px)] rotate-45 rounded-xs bg-[var(--tooltip-bg)] fill-[var(--tooltip-bg)]" />
        </TooltipContent>
    </TooltipPortal>
</template>

<script setup lang="ts">
import type { TooltipColor } from './colors';
import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';
import { cn } from '../../support/classNames';

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<
        TooltipContentProps & {
            class?: HTMLAttributes['class'];
            showArrow?: boolean;
            variant?: TooltipColor;
        }
    >(),
    {
        sideOffset: 4,
        variant: 'default',
        showArrow: true,
    },
);

const emits = defineEmits<TooltipContentEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'showArrow', 'variant');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
const colors = computed(() => {
    const v = props.variant;
    return {
        '--tooltip-bg': v === 'default' ? 'var(--ui-foreground)' : 'var(--ui-' + v + ')',
        '--tooltip-fg': v === 'default' ? 'var(--ui-background)' : 'var(--ui-' + v + '-foreground)',
        '--tooltip-border': v === 'outline' ? 'var(--ui-input)' : 'transparent',
    };
});
</script>
