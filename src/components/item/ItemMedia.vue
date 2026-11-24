<template>
    <div
        data-slot="item-media"
        :data-variant="props.variant"
        :class="cn(itemMediaVariants({ variant }), props.class)">
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { ItemMediaVariants } from '.';
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
import { itemMediaVariants } from '.';

const props = defineProps<{
    class?: HTMLAttributes['class'];
    variant?: ItemMediaVariants['variant'];
}>();
</script>
