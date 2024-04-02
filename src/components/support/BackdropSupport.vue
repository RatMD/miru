<template>
    <div class="backdrop" :class="[
        props.position ? `backdrop-${props.position}` : ``,
        props.size ? `backdrop-${props.size}` : ``,
        props.visible ? `is-visible` : ``,
    ]"></div>
</template>

<script lang="ts">

/**
 * Backdrop Props
 */
export interface BackdropSupportProps {
    /**
     * The desired position behaviour, either fixed (default) or absolute.
     */
    position?: 'fixed' | 'absolute';
    
    /**
     * The desired backdrop blur effect intensity.
     */
    size?: null | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * Change backdrop visibility.
     */
    visible?: boolean;
}

// TypeScript Definition
// Default Export, used for IDE-related auto-import features
export default {
    name: 'BackdropSupport'
}
</script>

<script lang="ts" setup>
// Define Component
const props = withDefaults(defineProps<BackdropSupportProps>(), {
    position: 'fixed'
});

</script>

<style scoped>
.backdrop {
    @apply inset-0 backdrop-blur-none pointer-events-none select-none;
    @apply duration-300 ease-in-out;
    @apply bg-transparent;
    z-index: 99;
    transition-property: background-color, backdrop-filter;

    &.backdrop-fixed {
        @apply fixed;
    }
    
    &.backdrop-absolute {
        @apply absolute;
    }

    &.is-visible {
        @apply backdrop-blur;
        @apply bg-gray-300/50 dark:bg-gray-950/80;
    }

    &.is-visible.backdrop-sm {
        @apply backdrop-blur-sm;
    }

    &.is-visible.backdrop-md {
        @apply backdrop-blur-md;
    }

    &.is-visible.backdrop-lg {
        @apply backdrop-blur-lg;
    }

    &.is-visible.backdrop-xl {
        @apply backdrop-blur-xl;
    }
}
</style>
