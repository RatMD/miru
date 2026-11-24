<template>
    <span
        data-slot="spinner"
        :data-mode="mode"
        :role="decorative ? undefined : 'status'"
        :aria-label="decorative ? undefined : label || trans('common.states.loading')"
        :aria-hidden="decorative || undefined"
        :class="cn(spinnerVariants({ variant, size }), props.class)">
        <component
            :is="mode === 'steps' ? IconLoaderQuarter : IconLoader2"
            aria-hidden="true"
            :class="
                mode === 'steps' ? 'miru-spinner-steps' : 'animate-spin motion-reduce:animate-none'
            " />
    </span>
</template>

<script setup lang="ts">
import type { SpinnerVariants } from './variants';
import type { HTMLAttributes } from 'vue';
import { IconLoaderQuarter, IconLoader2 } from '@tabler/icons-vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { spinnerVariants } from './variants';

const props = withDefaults(
    defineProps<{
        variant?: SpinnerVariants['variant'];
        size?: SpinnerVariants['size'];
        /** Stepped LoaderQuarter or continuously rotating Loader2. */
        mode?: 'steps' | 'spin';
        label?: string;
        /** Hide from assistive technology when a parent already announces loading. */
        decorative?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    { variant: 'default', size: 'default', mode: 'spin', decorative: false },
);

const { trans } = useI18n();
</script>

<style scoped>
.miru-spinner-steps {
    animation: miru-spinner-turn 1s steps(8, end) infinite;
}
@keyframes miru-spinner-turn {
    to {
        transform: rotate(360deg);
    }
}
@media (prefers-reduced-motion: reduce) {
    .miru-spinner-steps {
        animation: none;
    }
}
</style>
