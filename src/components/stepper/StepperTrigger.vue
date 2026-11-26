<template>
    <StepperTrigger
        v-bind="forwarded"
        data-slot="stepper-trigger"
        :aria-labelledby="item.titleId"
        :aria-invalid="!!item.error.value || undefined"
        :class="cn('miru-stepper-trigger', props.class)"
        @mousedown.capture.stop
        @keydown.capture="keyboard"
        @click="activate">
        <slot />
    </StepperTrigger>
</template>
<script setup lang="ts">
import type { StepperTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { StepperTrigger } from 'reka-ui';
import { inject } from 'vue';
import { cn } from '../../support/classNames';
import { stepperKey, stepperItemKey } from './context';
const props = defineProps<StepperTriggerProps & { class?: HTMLAttributes['class'] }>();
const group = inject(stepperKey);
const item = inject(stepperItemKey);
if (!group || !item) throw new Error('StepperTrigger must be inside StepperItem.');
const forwarded = reactiveOmit(props, 'class');
// Activate on click for mouse, touch and assistive technology; retain Reka arrow navigation.
function activate(event: MouseEvent) {
    if (!event.ctrlKey && !event.metaKey) void group!.goToStep(item!.step.value);
}
function keyboard(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) void group!.goToStep(item!.step.value);
}
</script>
