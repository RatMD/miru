<template>
    <ContextMenuItem
        data-slot="context-menu-item"
        :data-inset="inset ? '' : undefined"
        :data-variant="variant"
        v-bind="forwarded"
        :class="
            cn(
                'focus:bg-surface-hover focus:text-surface-hover-foreground',
                'data-[variant=danger]:text-danger-600 data-[variant=danger]:focus:bg-danger-600/10 dark:data-[variant=danger]:focus:bg-danger-600/40 data-[variant=danger]:focus:text-danger-600 data-[variant=danger]:*:[svg]:!text-danger-600',
                '[&_svg:not([class*=\'text-\'])]:text-muted-foreground relative flex cursor-default items-center gap-2 px-4 py-2.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
                props.class,
            )
        ">
        <slot />
    </ContextMenuItem>
</template>
<script lang="ts" setup>
import type { ContextMenuItemEmits, ContextMenuItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ContextMenuItem, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = withDefaults(
    defineProps<
        ContextMenuItemProps & {
            class?: HTMLAttributes['class'];
            inset?: boolean;
            variant?: 'default' | 'danger';
        }
    >(),
    {
        variant: 'default',
    },
);
const emits = defineEmits<ContextMenuItemEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'inset', 'variant');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
