<template>
    <p
        data-slot="card-description"
        :class="cn('min-w-0 text-xs leading-4 font-normal text-muted-foreground', props.class)">
        <slot />
    </p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>
