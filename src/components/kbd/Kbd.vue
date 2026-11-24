<template>
    <kbd
        data-slot="kbd"
        :data-size="size"
        :class="
            cn(
                'inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded border border-border border-b-2 bg-muted px-1.5 pt-px align-middle font-mono leading-none font-medium whitespace-nowrap text-foreground shadow-xs select-none [&_svg]:size-[1em]',
                size === 'sm'
                    ? 'h-5 min-w-5 text-[10px]'
                    : size === 'lg'
                      ? 'h-7 min-w-7 text-sm'
                      : 'h-6 min-w-6 text-xs',
                props.class,
            )
        ">
        <slot />
    </kbd>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = withDefaults(
    defineProps<{ size?: 'sm' | 'default' | 'lg'; class?: HTMLAttributes['class'] }>(),
    { size: 'default' },
);
</script>
