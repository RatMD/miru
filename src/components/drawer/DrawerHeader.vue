<template>
    <div data-slot="drawer-header" :class="cn('space-y-2 px-6 pt-3 pr-12 pb-4', props.class)">
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
