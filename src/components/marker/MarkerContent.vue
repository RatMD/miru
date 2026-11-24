<template>
    <div data-slot="marker-content" :class="cn('min-w-0 flex-1 pt-1', props.class)"><slot /></div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
