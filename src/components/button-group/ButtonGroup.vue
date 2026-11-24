<template>
    <div
        data-slot="button-group"
        role="group"
        :aria-label="label"
        :data-orientation="orientation"
        :data-size="size"
        :data-shape="shape"
        :class="
            cn(
                'miru-button-group isolate inline-flex w-fit shrink-0',
                shape === 'round' ? 'rounded-full' : radiusClasses[size],
                orientation === 'vertical' && 'flex-col',
                props.class,
            )
        ">
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const radiusClasses = {
    xs: 'rounded-sm',
    sm: 'rounded',
    default: 'rounded-md',
    lg: 'rounded-lg',
} satisfies Record<NonNullable<ButtonVariants['size']>, string>;

const props = withDefaults(
    defineProps<{
        orientation?: 'horizontal' | 'vertical';
        /** Match the size of the contained buttons. */
        size?: NonNullable<ButtonVariants['size']>;
        shape?: NonNullable<ButtonVariants['shape']>;
        label?: string;
        class?: HTMLAttributes['class'];
    }>(),
    { orientation: 'horizontal', size: 'default', shape: 'default' },
);
</script>
<style scoped>
.miru-button-group :deep(> :is(button, a, [role='button'])) {
    position: relative;
    border-radius: 0;
}
.miru-button-group :deep(> :is(button, a, [role='button']):hover) {
    z-index: 1;
}
.miru-button-group :deep(> :is(button, a, [role='button']):focus-visible) {
    z-index: 2;
}
/* Keep protruding badges above hovered or focused siblings. */
.miru-button-group :deep(> :is(button, a, [role='button']):has([data-slot='button-badge'])) {
    z-index: 3;
}
.miru-button-group[data-orientation='horizontal']
    :deep(> :is(button, a, [role='button']):not(:first-child)) {
    margin-left: -1px;
}
.miru-button-group[data-orientation='horizontal'] :deep(> :first-child) {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
}
.miru-button-group[data-orientation='horizontal'] :deep(> :last-child) {
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
}
.miru-button-group[data-orientation='vertical']
    :deep(> :is(button, a, [role='button']):not(:first-child)) {
    margin-top: -1px;
}
.miru-button-group[data-orientation='vertical'] :deep(> :first-child) {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}
.miru-button-group[data-orientation='vertical'] :deep(> :last-child) {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}
</style>
