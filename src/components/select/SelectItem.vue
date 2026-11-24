<template>
    <SelectItem
        data-slot="select-item"
        :data-size="size"
        v-bind="forwardedProps"
        :class="
            cn(
                `relative flex w-full cursor-pointer items-center gap-2 rounded-none outline-hidden select-none focus:bg-surface-hover focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:bg-primary-50 data-[state=checked]:text-primary-900 dark:data-[state=checked]:bg-primary/15 dark:data-[state=checked]:text-primary-200 data-[state=checked]:focus:bg-surface-hover [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2`,
                size === 'sm' ? 'py-1.5 pr-9 pl-3 text-xs' : 'py-2.5 pr-12 pl-4 text-sm',
                props.class,
            )
        ">
        <span
            class="absolute flex size-4 items-center justify-center"
            :class="size === 'sm' ? 'right-3' : 'right-4'">
            <SelectItemIndicator
                class="flex size-4 items-center justify-center text-primary-600 dark:text-primary-300">
                <slot name="indicator-icon">
                    <IconCheck class="size-4 text-primary-600 dark:text-primary-300" />
                </slot>
            </SelectItemIndicator>
        </span>

        <SelectItemText>
            <slot />
        </SelectItemText>
    </SelectItem>
</template>

<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconCheck } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { SelectItem, SelectItemIndicator, SelectItemText, useForwardProps } from 'reka-ui';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { selectSizeKey } from './context';

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>();
const inheritedSize = inject(selectSizeKey, undefined);
const size = computed(() => inheritedSize?.value ?? 'default');

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>
