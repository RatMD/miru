<template>
    <div
        data-slot="table-container"
        :class="
            cn(
                'bg-background',
                !embedded && 'overflow-x-auto border-border',
                !embedded && (variant === 'compact' ? 'border-b' : 'rounded-md border'),
                props.class,
            )
        ">
        <table data-slot="table" :class="cn('w-full text-sm', tableClass)">
            <slot />
        </table>
    </div>
</template>

<script setup lang="ts">
import type { TableVariant } from './context';
import type { HTMLAttributes } from 'vue';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { tableVariantKey } from './context';

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes['class'];
        tableClass?: HTMLAttributes['class'];
        variant?: TableVariant;
        /** The surrounding surface owns the border and horizontal scrolling. */
        embedded?: boolean;
    }>(),
    { variant: 'default', embedded: false },
);
provide(
    tableVariantKey,
    computed(() => props.variant),
);
</script>
