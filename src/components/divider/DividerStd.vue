<template>
    <hr :class="[
        `divider-${props.spacing || 'md'}`,
        `divider-${props.variant || 'solid'}`,
    ]" />
</template>

<script lang="ts">
export type DividerSpacings = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type DividerVariants = 'solid' | 'dashed' | 'dotted' | 'scissor';

/**
 * Divider Properties
 */
export interface DividerStdProps {
    /**
     * The desired spacing around the divider line.
     */
    spacing?: DividerSpacings;

    /**
     * The desired variant used for the divider line.
     */
    variant?: DividerVariants;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'DividerStd'
}
</script>

<script lang="ts" setup>
// Define Component
const props = defineProps<DividerStdProps>();
</script>

<style scoped>
hr {
    @apply block border-t border-l-0 border-r-0 border-b-0 my-6;
    @apply border-gray-300 dark:border-gray-500;
}

/* Divider Spacings */
.divider-xs {
    @apply my-2;
}
.divider-sm {
    @apply my-4;
}
.divider-md {
    @apply my-6;
}
.divider-lg {
    @apply my-8;
}
.divider-xl {
    @apply my-12;
}

/* Divider Variants */
.divider-solid {
    @apply border-solid;
}
.divider-dashed {
    @apply border-dashed;
}
.divider-dotted {
    @apply border-dotted;
}
.divider-scissor {
    @apply relative border-dashed overflow-visible;

    &::before {
        @apply absolute w-4 h-4 flex -translate-y-1/2 left-4;
        content: "";
        background-size: 16px 16px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgb(113 113 122)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-scissors'%3E%3Ccircle cx='6' cy='6' r='3'/%3E%3Cpath d='M8.12 8.12 12 12'/%3E%3Cpath d='M20 4 8.12 15.88'/%3E%3Ccircle cx='6' cy='18' r='3'/%3E%3Cpath d='M14.8 14.8 20 20'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
    }
    .dark &::before {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgb(212 212 216)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-scissors'%3E%3Ccircle cx='6' cy='6' r='3'/%3E%3Cpath d='M8.12 8.12 12 12'/%3E%3Cpath d='M20 4 8.12 15.88'/%3E%3Ccircle cx='6' cy='18' r='3'/%3E%3Cpath d='M14.8 14.8 20 20'/%3E%3C/svg%3E");
    }
}
</style>
