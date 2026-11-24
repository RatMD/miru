<template>
    <ContextMenuRadioItem
        data-slot="context-menu-radio-item"
        v-bind="forwarded"
        :class="
            cn(
                'focus:bg-surface-hover focus:text-surface-hover-foreground relative flex cursor-default items-center gap-2 rounded-none py-2.5 pr-4 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
                props.class,
            )
        ">
        <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <ContextMenuItemIndicator>
                <slot name="indicator-icon">
                    <IconCircle class="size-2 fill-current" />
                </slot>
            </ContextMenuItemIndicator>
        </span>
        <slot />
    </ContextMenuRadioItem>
</template>
<script lang="ts" setup>
import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconCircle } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { ContextMenuItemIndicator, ContextMenuRadioItem, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<ContextMenuRadioItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ContextMenuRadioItemEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
