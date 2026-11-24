<template>
    <DropdownMenuSubTrigger
        data-slot="dropdown-menu-sub-trigger"
        v-bind="forwardedProps"
        :data-inset="inset ? '' : undefined"
        :class="
            cn(
                `relative flex cursor-default items-center gap-2 rounded-none px-4 py-2.5 text-sm outline-hidden select-none focus:bg-surface-hover focus:text-surface-hover-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=danger]:text-danger data-[variant=danger]:focus:bg-danger/10 data-[variant=danger]:focus:text-danger dark:data-[variant=danger]:focus:bg-danger/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=danger]:*:[svg]:text-danger!`,
                props.class,
            )
        ">
        <slot />
        <IconChevronRight class="ml-auto size-4" />
    </DropdownMenuSubTrigger>
</template>

<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconChevronRight } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<
    DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class']; inset?: boolean }
>();

const delegatedProps = reactiveOmit(props, 'class', 'inset');
const forwardedProps = useForwardProps(delegatedProps);
</script>
