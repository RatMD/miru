<template>
    <h3 data-slot="card-title" :class="cn('min-w-0 font-heading font-semibold', props.class)">
        <slot />
    </h3>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>
