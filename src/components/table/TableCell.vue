<template>
    <td
        data-slot="table-cell"
        :class="
            cn(
                'align-middle',
                variant === 'compact' ? 'px-5 py-2.5 sm:px-6' : 'p-3',
                align === 'center' && 'text-center',
                align === 'right' && 'text-right',
                props.class,
            )
        ">
        <slot />
    </td>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { tableVariantKey } from './context';
const props = defineProps<{
    class?: HTMLAttributes['class'];
    align?: 'left' | 'center' | 'right';
}>();
const variant = inject(
    tableVariantKey,
    computed(() => 'default' as const),
);
</script>
