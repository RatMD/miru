<template>
    <Copy :content="content" :label="label" :type="type" :wrapper="wrapper" :class="props.class">
        <Badge
            interactive
            :variant="variant"
            :appearance="appearance"
            :size="size"
            :class="cn(iconPosition === 'right' && '[&>svg]:order-2', badgeClass)">
            <slot name="icon">
                <component :is="icon" v-if="icon" :class="iconClass" />
            </slot>
            <span class="truncate">
                <slot>{{ content }}</slot>
            </span>
        </Badge>
    </Copy>
</template>

<script setup lang="ts">
import type { BadgeVariants } from '../badge';
import type { CopyProps } from '../copy/Copy.vue';
import type { Component, HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
import { Badge } from '../badge';
import { Copy } from '../copy';

const props = withDefaults(
    defineProps<
        CopyProps & {
            variant?: BadgeVariants['variant'];
            appearance?: BadgeVariants['appearance'];
            size?: BadgeVariants['size'];
            icon?: Component;
            iconPosition?: 'left' | 'right';
            iconClass?: HTMLAttributes['class'];
            badgeClass?: HTMLAttributes['class'];
        }
    >(),
    {
        wrapper: true,
        variant: 'default',
        size: 'default',
        iconPosition: 'left',
        badgeClass: 'max-w-[180px]',
    },
);
</script>
