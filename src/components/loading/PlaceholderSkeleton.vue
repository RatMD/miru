
<template>
    <div class="skeleton" :class="[props.vertical ? 'skeleton-vertical' : '', props.class]" :style="stylings"></div>
</template>

<script lang="ts">
/**
 * PlaceholderSkeleton Properties
 */
export interface PlaceholderSkeletonProps {
    /**
     * tailwind classes to style the skeleton.
     */
    class?: string;

    /**
     * Custom width unit-value, can be used instead of the tailwind CSS classes.
     */
    width?: string;

    /**
     * Custom height unit-value, can be used instead of the tailwind CSS classes.
     */
    height?: string;

    /**
     * Wether to use the vertical animation or horizontal one.
     */
    vertical?: boolean;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'PlaceholderSkeleton'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

// Define Component
const props = defineProps<PlaceholderSkeletonProps>();

// States
const stylings = computed<{ [key: string]: string }>(() => {
    let result: { [key: string]: string } = {};

    if (typeof props.width == 'string') {
        result.width = props.width;
    }

    if (typeof props.height == 'string') {
        result.height = props.height;
    }

    return result;
});
</script>

<style scoped>
.skeleton {
    @apply relative overflow-hidden;
    @apply bg-gray-200 dark:bg-gray-700;

    &::before {
        @apply h-full absolute top-0 left-0 right-0;
        animation: keyframe-translate-x 1.0s infinite;
        z-index: 1;
        content: "";
        transform: translateX(-100%);
    }

    &:not(.skeleton-vertical)::before {
        animation: keyframe-translate-x 1.0s infinite;
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
    }
    
    .dark &:not(.skeleton-vertical)::before {
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    }

    &.skeleton-vertical::before {
        animation: keyframe-translate-y 1.0s infinite;
        background-image: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
    }
    
    .dark &.skeleton-vertical::before {
        background-image: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    }
}
</style>

