<template>
    <div
        data-slot="item-footer"
        :class="cn('flex basis-full items-center justify-between gap-2', props.class)">
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>
