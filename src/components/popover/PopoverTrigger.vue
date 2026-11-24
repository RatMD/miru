<template>
    <!-- Register the Popover anchor outside Tooltip's nested PopperRoot.
         Without it, TooltipTrigger and PopoverTrigger register on the same root
         and the other content stays at Floating UI's off-screen placeholder. -->
    <PopoverAnchor v-if="tooltip" :reference="currentElement" as="span" hidden />
    <TooltipProvider v-if="tooltip" :delay-duration="tooltipDelayDuration">
        <Tooltip
            :disabled="popover.open.value"
            :open="tooltipOpen && !popover.open.value"
            @update:open="tooltipOpen = $event">
            <TooltipTrigger as-child>
                <RekaPopoverTrigger
                    :ref="forwardRef"
                    data-slot="popover-trigger"
                    v-bind="{ ...$attrs, ...forwarded }">
                    <slot />
                </RekaPopoverTrigger>
            </TooltipTrigger>
            <TooltipContent :side="tooltipSide" :align="tooltipAlign" :side-offset="8">
                {{ tooltip }}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <RekaPopoverTrigger
        v-else
        :ref="forwardRef"
        data-slot="popover-trigger"
        v-bind="{ ...$attrs, ...forwarded }">
        <slot />
    </RekaPopoverTrigger>
</template>

<script setup lang="ts">
import type { PopoverTriggerProps, TooltipContentProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import {
    PopoverAnchor,
    PopoverTrigger as RekaPopoverTrigger,
    injectPopoverRootContext,
    useForwardExpose,
    useForwardProps,
} from 'reka-ui';
import { computed, ref, watch } from 'vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<
        PopoverTriggerProps & {
            /** Optional hint; it is hidden while the popover is open. */
            tooltip?: string;
            tooltipSide?: TooltipContentProps['side'];
            tooltipAlign?: TooltipContentProps['align'];
            tooltipDelayDuration?: number;
        }
    >(),
    { tooltipSide: 'bottom', tooltipAlign: 'center', tooltipDelayDuration: 300 },
);
const forwarded = useForwardProps(
    reactiveOmit(props, 'tooltip', 'tooltipSide', 'tooltipAlign', 'tooltipDelayDuration'),
);
const popover = injectPopoverRootContext();
const tooltipOpen = ref(false);
watch(popover.open, (open) => {
    if (open) tooltipOpen.value = false;
});
const { forwardRef, currentElement: element } = useForwardExpose();
const currentElement = computed(() => element.value ?? undefined);
</script>
