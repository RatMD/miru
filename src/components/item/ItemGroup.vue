<template>
    <div data-slot="item-group" :class="cn('group/item-group flex flex-col', props.class)">
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
