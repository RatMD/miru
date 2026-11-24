<template>
    <span
        data-slot="button-status-icon"
        class="relative inline-flex shrink-0 items-center justify-center">
        <slot />
        <span
            v-if="visible"
            data-slot="button-status-dot"
            aria-hidden="true"
            :data-color="color"
            :class="
                cn(
                    'pointer-events-none absolute -top-1 -right-1 z-10 rounded-full border-2',
                    small ? 'size-2' : 'size-2.5',
                )
            "
            :style="{
                backgroundColor: dotColor,
                borderColor: 'var(--button-status-dot-cutout, var(--ui-background))',
            }" />
    </span>
</template>
<script setup lang="ts">
import type { ButtonVariants } from './index';
import { computed } from 'vue';
import { cn } from '../../support/classNames';
const props = withDefaults(
    defineProps<{
        color: NonNullable<ButtonVariants['variant']>;
        small?: boolean;
        visible?: boolean;
    }>(),
    { visible: true },
);
const dotColor = computed(() =>
    ['default', 'outline', 'ghost', 'ghostly'].includes(props.color)
        ? 'var(--ui-neutral-400)'
        : 'var(--ui-' + props.color + '-500)',
);
</script>
