<template>
    <div data-slot="sheet-header" :class="cn('flex flex-col gap-2.5 p-6 pr-14', props.class)">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
