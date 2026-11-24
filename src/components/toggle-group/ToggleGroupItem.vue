<template>
    <ToggleGroupItem
        v-slot="slotProps"
        data-slot="toggle-group-item"
        :data-size="resolvedSize"
        :data-variant="resolvedVariant"
        v-bind="forwardedProps"
        :class="
            cn(
                toggleVariants({ variant: resolvedVariant, size: resolvedSize, iconOnly }),
                'rounded-none',
                context?.orientation === 'vertical'
                    ? resolvedSize === 'sm'
                        ? 'first:rounded-t-[3px] last:rounded-b-[3px]'
                        : 'first:rounded-t last:rounded-b'
                    : resolvedSize === 'sm'
                      ? 'first:rounded-l-[3px] last:rounded-r-[3px]'
                      : 'first:rounded-l last:rounded-r',
                props.class,
            )
        ">
        <slot v-bind="slotProps" />
    </ToggleGroupItem>
</template>

<script setup lang="ts">
import type { ToggleVariants } from '../toggle';
import type { ToggleGroupItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ToggleGroupItem, useForwardProps } from 'reka-ui';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { toggleVariants } from '../toggle';
import { toggleGroupStyleKey } from './context';

const props = withDefaults(
    defineProps<
        ToggleGroupItemProps & {
            class?: HTMLAttributes['class'];
            variant?: ToggleVariants['variant'];
            size?: ToggleVariants['size'];
            iconOnly?: boolean;
        }
    >(),
    { iconOnly: false },
);
const context = inject(toggleGroupStyleKey, undefined);
const resolvedVariant = computed(() => context?.value.variant ?? props.variant ?? 'default');
const resolvedSize = computed(() => context?.value.size ?? props.size ?? 'default');
const forwardedProps = useForwardProps(reactiveOmit(props, 'class', 'size', 'variant', 'iconOnly'));
</script>
