<template>
    <ContextMenuSubTrigger
        data-slot="context-menu-sub-trigger"
        :data-inset="inset ? '' : undefined"
        v-bind="forwardedProps"
        :class="
            cn(
                'focus:bg-surface-hover focus:text-surface-hover-foreground data-[state=open]:bg-surface-hover data-[state=open]:text-surface-hover-foreground flex cursor-default items-center gap-2 px-4 py-2.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
                props.class,
            )
        ">
        <slot />
        <IconChevronRight class="ml-auto" />
    </ContextMenuSubTrigger>
</template>
<script lang="ts" setup>
import type { ContextMenuSubTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconChevronRight } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { ContextMenuSubTrigger, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<
    ContextMenuSubTriggerProps & { class?: HTMLAttributes['class']; inset?: boolean }
>();

const delegatedProps = reactiveOmit(props, 'class', 'inset');

const forwardedProps = useForwardProps(delegatedProps);
</script>
