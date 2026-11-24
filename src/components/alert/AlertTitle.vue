<template>
    <h3
        data-slot="alert-title"
        :class="cn('col-start-2 text-[13px]/[18px] font-semibold text-foreground', props.class)">
        <slot />
    </h3>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
