<template>
    <PaginationListItem
        data-slot="pagination-item"
        :data-active="isActive"
        :aria-current="isActive ? 'page' : undefined"
        v-bind="delegatedProps"
        :class="
            cn(
                buttonVariants({
                    variant: isActive ? 'outline' : (appearance?.variant ?? 'ghost'),
                    size,
                    iconOnly: true,
                }),
                isActive && 'border-border ',
                isActive &&
                    appearance?.variant === 'outline' &&
                    'bg-outline-active inset-shadow-pressed',
                props.class,
            )
        ">
        <slot />
    </PaginationListItem>
</template>

<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { PaginationListItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { PaginationListItem } from 'reka-ui';
import { cn } from '../../support/classNames';
import { buttonVariants } from '../button';
import { usePaginationAppearance } from './context';

const props = withDefaults(
    defineProps<
        PaginationListItemProps & {
            size?: ButtonVariants['size'];
            class?: HTMLAttributes['class'];
            isActive?: boolean;
        }
    >(),
    {
        size: 'default',
    },
);

const delegatedProps = reactiveOmit(props, 'class', 'size', 'isActive');
const appearance = usePaginationAppearance();
</script>
