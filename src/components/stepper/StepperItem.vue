<template>
    <StepperItem
        :step="step"
        :completed="completed"
        :disabled="disabled || group.disabled.value || group.busy.value"
        data-slot="stepper-item"
        :data-error="!!resolvedError || undefined"
        :class="cn('miru-stepper-item', props.class)"
        v-slot="slotProps">
        <slot v-bind="slotProps" :error="resolvedError" />
    </StepperItem>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { StepperItem } from 'reka-ui';
import { computed, inject, provide, useId, watchEffect } from 'vue';
import { cn } from '../../support/classNames';
import { stepperKey, stepperItemKey } from './context';
const props = withDefaults(
    defineProps<{
        step: number;
        completed?: boolean;
        disabled?: boolean;
        error?: boolean | string;
        class?: HTMLAttributes['class'];
    }>(),
    { completed: false, disabled: false, error: false },
);
const group = inject(stepperKey);
if (!group) throw new Error('StepperItem must be inside Stepper.');
const titleId = `${group.id}-title-${useId()}`;
const resolvedError = computed(
    () => props.error || (group.current.value === props.step ? group.error.value : false),
);
provide(stepperItemKey, {
    step: computed(() => props.step),
    completed: computed(() => props.completed || group.current.value > props.step),
    error: resolvedError,
    titleId,
});
watchEffect((onCleanup) => {
    const step = props.step;
    group.steps.set(step, { disabled: computed(() => props.disabled), titleId });
    onCleanup(() => group.steps.delete(step));
});
</script>
