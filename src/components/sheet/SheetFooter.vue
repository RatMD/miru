<template>
    <div data-slot="sheet-footer" :class="cn('mt-auto flex flex-col gap-2 p-4', props.class)">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
