<template>
    <div
        v-if="active || forceMount"
        v-show="active"
        :id="`${group.id}-content-${resolvedStep}`"
        data-slot="stepper-content"
        role="region"
        :aria-labelledby="group.steps.get(resolvedStep)?.titleId"
        :class="cn('miru-stepper-content', props.class)">
        <slot :active="active" :step="resolvedStep" />
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { stepperKey, stepperItemKey } from './context';
const props = withDefaults(
    defineProps<{ step?: number; forceMount?: boolean; class?: HTMLAttributes['class'] }>(),
    { forceMount: false },
);
const group = inject(stepperKey);
const item = inject(stepperItemKey, undefined);
if (!group) throw new Error('StepperContent must be inside Stepper.');
if (props.step === undefined && !item)
    throw new Error('StepperContent needs a step outside StepperItem.');
const resolvedStep = computed(() => props.step ?? item!.step.value);
const active = computed(() => group.current.value === resolvedStep.value);
</script>
