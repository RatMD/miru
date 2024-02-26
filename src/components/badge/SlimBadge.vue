<template>
    <div class="badge badge-slim" :class="[
        props.color ? `badge-${props.color}`: '', 
        props.size ? `badge-${props.size}` : '',
    ]">
        <component :is="icon" class="badge-icon" v-bind="iconBinding" v-if="props.icon" />
        <span class="badge-label" v-else>{{ props.label }}</span>
    </div>
</template>

<script lang="ts">
import type { Component } from 'vue';

/**
 * Badge Properties
 */
export interface BadgeProps {
    /**
     * The desired color used for this badge.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

    /**
     * The desired label text for this badge.
     */
    label?: string | null;

    /**
     * An additional icon which is displayed next to the label, if available.
     */
    icon?: Component | null;

    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * The desired size of the badge, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'BadgeStd'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

// Define Component
const props = defineProps<BadgeProps>();

// States
const iconBinding = computed<{ [key: string]: any }>(() => {
    const result = {
        size: (props.size || 'sm') == 'lg' ? 24 : 16,
        strokeWidth: (props.size || 'sm') == 'lg' ? 1.5 : 2,
    };
    return Object.assign(result, props.iconProps || {});
});
</script>

<style>
.badge {
    @apply flex flex-row gap-2 items-center justify-center rounded-full w-6 h-6;
    @apply text-gray-900 bg-gray-200 dark:text-gray-300 dark:bg-gray-700;
}

.badge-label {
    @apply text-xs font-semibold;
}

/** Sizes */
.badge.badge-sm {
    @apply w-4 h-4;
}

.badge.badge-lg {
    @apply w-8 h-8;

    & .badge-label {
        @apply text-sm;
    }
}

/** Colors */
.badge.badge-primary {
    @apply text-primary-600 bg-primary-100;
    @apply dark:text-primary-200 dark:bg-primary-800/50;
}
.badge.badge-secondary {
    @apply text-gray-600 bg-gray-100;
    @apply dark:text-gray-200 dark:bg-gray-700;
}
.badge.badge-success {
    @apply text-success-600 bg-success-100;
    @apply dark:text-success-200 dark:bg-success-800/50;
}
.badge.badge-warning {
    @apply text-warning-600 bg-warning-100;
    @apply dark:text-warning-200 dark:bg-warning-800/50;
}
.badge.badge-danger {
    @apply text-danger-600 bg-danger-100;
    @apply dark:text-danger-200 dark:bg-danger-800/50;
}
.badge.badge-info {
    @apply text-info-600 bg-info-100;
    @apply dark:text-info-200 dark:bg-info-800/50;
}
</style>
