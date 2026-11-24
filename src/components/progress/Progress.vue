<template>
    <ProgressRoot
        data-slot="progress"
        :data-variant="variant"
        :data-animated="animated"
        v-bind="delegatedProps"
        :class="
            cn(
                'relative h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800',
                props.class,
            )
        ">
        <ProgressIndicator
            data-slot="progress-indicator"
            :class="cn(progressVariants({ variant }), animated && 'progress-animated')"
            :style="{ transform: 'translateX(-' + (100 - percentage) + '%)' }" />
    </ProgressRoot>
</template>

<script setup lang="ts">
import type { ProgressVariants } from '.';
import type { ProgressRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ProgressIndicator, ProgressRoot } from 'reka-ui';
import { computed } from 'vue';
import { cn } from '../../support/classNames';
import { progressVariants } from '.';

const props = withDefaults(
    defineProps<
        ProgressRootProps & {
            class?: HTMLAttributes['class'];
            variant?: ProgressVariants['variant'];
            animated?: boolean;
        }
    >(),
    {
        modelValue: 0,
        max: 100,
        variant: 'default',
        animated: false,
    },
);

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'animated');
const percentage = computed(() =>
    Math.max(0, Math.min(100, ((props.modelValue ?? 0) / (props.max > 0 ? props.max : 100)) * 100)),
);
</script>

<style scoped>
[data-slot='progress'] {
    --progress-stripe-color: rgb(255 255 255 / 30%);
}
[data-slot='progress'][data-variant='warning'] {
    --progress-stripe-color: rgb(0 0 0 / 24%);
}
[data-slot='progress'][data-variant='default']:where(
        .dark,
        .dark *,
        [data-theme='dark'],
        [data-theme='dark'] *
    ) {
    --progress-stripe-color: rgb(0 0 0 / 28%);
}

.progress-animated {
    background-image: linear-gradient(
        45deg,
        var(--progress-stripe-color) 25%,
        transparent 25%,
        transparent 50%,
        var(--progress-stripe-color) 50%,
        var(--progress-stripe-color) 75%,
        transparent 75%
    );
    background-size: 1rem 1rem;
    animation: progress-stripes 1s linear infinite;
}
@keyframes progress-stripes {
    to {
        background-position: 1rem 0;
    }
}
@media (prefers-reduced-motion: reduce) {
    .progress-animated {
        animation: none;
    }
}
</style>
