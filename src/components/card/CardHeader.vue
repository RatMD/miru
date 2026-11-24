<template>
    <div
        data-slot="card-header"
        :data-border="border"
        :class="
            cn(
                'grid grid-cols-[minmax(0,1fr)] items-center gap-x-3 px-4 py-4 has-data-[slot=card-action]:grid-cols-[minmax(0,1fr)_auto] [&>[data-slot=card-title]]:col-start-1 [&>[data-slot=card-description]]:col-start-1',
                border && 'border-b',
                props.class,
            )
        ">
        <slot />
        <CardAction v-if="$slots.actions || $slots.badges">
            <slot name="badges" />
            <slot name="actions" />
        </CardAction>
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
import CardAction from './CardAction.vue';
const props = withDefaults(defineProps<{ border?: boolean; class?: HTMLAttributes['class'] }>(), {
    border: false,
});
</script>
