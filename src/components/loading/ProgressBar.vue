

<template>
    <div class="progress-bar" :class="[
        `progress-bar-${props.color || 'primary'}`,
        `progress-bar-${props.size || 'md'}`,
        infinite ? `progress-bar-infinite` : null
    ]">
        <div class="progress-bar-inner" :style="styles"></div>
    </div>
</template>

<script lang="ts">
export type ProgressBarColors = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type ProgressBarSizes = 'sm' | 'md' | 'lg';

/**
 * ProgressBar Properties
 */
export interface ProgressBarProps {
    /**
     * The desired color used for this progress bar.
     */
    color?: ProgressBarColors;

    /**
     * The desired size used for this progress bar.
     */
    size?: ProgressBarSizes;

    /**
     * The final value on which is required toi reach the full progress.
     */
    final?: number;
    
    /**
     * The current value on which the progress-bar currently stands.
     */
    modelValue?: number;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'ProgressBar'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

// Define Component
const props = defineProps<ProgressBarProps>();

// States
const infinite = computed<boolean>(() => {
    return !props.final || (!props.modelValue && props.modelValue !== 0);
});
const percent = computed<number>(() => {
    if (!props.final || (!props.modelValue && props.modelValue !== 0)) {
        return 100;
    } else {
        let final = props.final || 100;
        let value = Math.min(props.modelValue, final);
        return final == value ? 100 : (final / 100 * value);
    }
});
const styles = computed<any>(() => ({
    width: infinite.value ? 'auto' : `${percent.value}%`
}));
</script>

<style scoped>
.progress-bar {
    @apply relative w-full h-3 overflow-hidden rounded-full;
    @apply bg-gray-100 dark:bg-gray-800;
    
    & .progress-bar-inner {
        @apply h-full absolute top-0 left-0 right-0 rounded-full;
        z-index: 1;
    }
}

/* Infinite ProgressBar */
.progress-bar.progress-bar-infinite {
    & .progress-bar-inner {
        animation: keyframe-translate-x 2.0s infinite;
        transform: translateX(-100%);
    }
}

/* ProgressBar Sizes */
.progress-bar.progress-bar-sm {
    @apply h-2;
}
.progress-bar.progress-bar-md {
    @apply h-3;
}
.progress-bar.progress-bar-lg {
    @apply h-4;
}

/* ProgressBar Colors */
.progress-bar.progress-bar-primary {
    & .progress-bar-inner {
        @apply bg-primary-600;
    }
}
.progress-bar.progress-bar-secondary {
    & .progress-bar-inner {
        @apply bg-gray-600;
    }
}
.progress-bar.progress-bar-success {
    & .progress-bar-inner {
        @apply bg-success-600;
    }
}
.progress-bar.progress-bar-warning {
    & .progress-bar-inner {
        @apply bg-warning-600;
    }
}
.progress-bar.progress-bar-danger {
    & .progress-bar-inner {
        @apply bg-danger-600;
    }
}
.progress-bar.progress-bar-info {
    & .progress-bar-inner {
        @apply bg-info-600;
    }
}
</style>
