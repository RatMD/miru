<template>
    <DropdownMenuItem
        data-slot="dropdown-menu-item"
        :data-inset="inset ? '' : undefined"
        :data-variant="variant"
        v-bind="forwardedProps"
        :class="
            cn(
                `relative flex cursor-default items-center gap-2 rounded-none px-4 py-2.5 text-sm outline-hidden select-none focus:bg-surface-hover focus:text-surface-hover-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=danger]:text-danger data-[variant=danger]:focus:bg-danger/10 data-[variant=danger]:focus:text-danger dark:data-[variant=danger]:focus:bg-danger/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=danger]:*:[svg]:text-danger!`,
                props.class,
            )
        ">
        <slot />
    </DropdownMenuItem>
</template>

<script setup lang="ts">
import type { DropdownMenuItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DropdownMenuItem, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = withDefaults(
    defineProps<
        DropdownMenuItemProps & {
            class?: HTMLAttributes['class'];
            inset?: boolean;
            variant?: 'default' | 'danger';
        }
    >(),
    {
        variant: 'default',
    },
);

const delegatedProps = reactiveOmit(props, 'inset', 'variant', 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>
