<template>
    <StepperSeparator
        data-slot="stepper-separator"
        :class="cn('miru-stepper-separator', props.class)"
        aria-hidden="true" />
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { StepperSeparator } from 'reka-ui';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
