<template>
    <StepperDescription
        as="span"
        data-slot="stepper-description"
        :class="cn('miru-stepper-description', props.class)">
        <slot />
    </StepperDescription>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { StepperDescription } from 'reka-ui';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
