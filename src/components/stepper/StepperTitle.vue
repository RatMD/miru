<template>
    <StepperTitle
        as="span"
        :id="item.titleId"
        data-slot="stepper-title"
        :class="cn('miru-stepper-title', props.class)">
        <slot />
    </StepperTitle>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { StepperTitle } from 'reka-ui';
import { inject } from 'vue';
import { cn } from '../../support/classNames';
import { stepperItemKey } from './context';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
const item = inject(stepperItemKey);
if (!item) throw new Error('StepperTitle must be inside StepperItem.');
</script>
