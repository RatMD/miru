<template>
    <div data-slot="marker" :class="cn('flex items-start gap-3 text-sm', props.class)">
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
