<template>
    <DropdownMenuCheckboxItem
        data-slot="dropdown-menu-checkbox-item"
        v-bind="forwarded"
        :class="
            cn(
                `relative flex cursor-default items-center gap-2 rounded-none py-2.5 pr-4 pl-10 text-sm outline-hidden select-none focus:bg-surface-hover focus:text-surface-hover-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
                props.class,
            )
        ">
        <span class="pointer-events-none absolute left-4 flex size-3.5 items-center justify-center">
            <DropdownMenuItemIndicator>
                <slot name="indicator-icon">
                    <IconCheck class="size-4" />
                </slot>
            </DropdownMenuItemIndicator>
        </span>
        <slot />
    </DropdownMenuCheckboxItem>
</template>

<script setup lang="ts">
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconCheck } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
