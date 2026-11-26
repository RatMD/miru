<template>
    <th
        data-slot="table-head"
        :scope="scope"
        :aria-sort="
            sortable
                ? sort === 'asc'
                    ? 'ascending'
                    : sort === 'desc'
                      ? 'descending'
                      : 'none'
                : undefined
        "
        :class="
            cn(
                'text-left align-middle font-medium text-muted-foreground',
                variant === 'compact' ? 'h-9 px-5 sm:px-6' : 'h-11 px-3',
                align === 'center' && 'text-center',
                align === 'right' && 'text-right',
                props.class,
            )
        ">
        <button
            v-if="sortable"
            type="button"
            :disabled="disabled"
            :class="
                cn(
                    'inline-flex w-full cursor-pointer items-center gap-1.5 rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50',
                    align === 'right'
                        ? 'justify-end'
                        : align === 'center'
                          ? 'justify-center'
                          : 'justify-start',
                )
            "
            @click="emit('sort')">
            <slot />
            <IconArrowUp v-if="sort === 'asc'" aria-hidden="true" class="size-3.5 shrink-0" />
            <IconArrowDown
                v-else-if="sort === 'desc'"
                aria-hidden="true"
                class="size-3.5 shrink-0" />
            <IconArrowsSort v-else aria-hidden="true" class="size-3.5 shrink-0 opacity-50" />
        </button>
        <slot v-else />
    </th>
</template>
<script setup lang="ts">
import type { TableSortDirection } from './context';
import type { ThHTMLAttributes } from 'vue';
import { IconArrowDown, IconArrowsSort, IconArrowUp } from '@tabler/icons-vue';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { tableVariantKey } from './context';
const props = withDefaults(
    defineProps<{
        class?: ThHTMLAttributes['class'];
        scope?: ThHTMLAttributes['scope'];
        align?: 'left' | 'center' | 'right';
        sortable?: boolean;
        sort?: TableSortDirection;
        disabled?: boolean;
    }>(),
    { scope: 'col', sort: false },
);
const emit = defineEmits<{ sort: [] }>();
const variant = inject(
    tableVariantKey,
    computed(() => 'default' as const),
);
</script>
