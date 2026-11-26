<template>
    <span data-slot="stepper-label" :class="cn('miru-stepper-labels min-w-0', props.class)">
        <slot />
    </span>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
