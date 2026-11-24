<template>
    <div
        data-slot="card"
        :class="
            cn(
                'flex flex-col rounded-lg bg-card py-0 text-card-foreground shadow-sm',
                border && 'border',
                props.class,
            )
        ">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes['class'];
        border?: boolean;
    }>(),
    { border: true },
);
</script>
