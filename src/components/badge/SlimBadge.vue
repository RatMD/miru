<template>
    <div class="slim-badge" :class="[
        props.color ? `badge-${props.color}`: '', 
        props.size ? `badge-${props.size}` : '',
        props.pill ? `badge-pill` : '',
        props.fill ? `badge-fill` : '',
    ]">
        <slot name="default">
            <component :is="props.icon" class="badge-icon" v-bind="iconBinding" v-if="props.icon" />
            <span class="badge-label" v-else>{{ props.label }}</span>
        </slot>
    </div>
</template>

<script lang="ts">
import type { Component } from 'vue';

/**
 * SlimBadge Properties
 */
export interface SlimBadgeProps {
    /**
     * The desired color used for this badge.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

    /**
     * The desired label text for this badge.
     */
    label?: string | number | null;

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

    /**
     * Use the pill-colored styling, instead of the default circle style.
     */
    pill?: boolean;

    /**
     * Use the fill-colored styling, instead of the default light style.
     */
    fill?: boolean;
}

/**
 * SlimBadge Slots
 */
export interface SlimBadgeSlots {
    /**
     * Default content slot, used instead of the label property
     * @param props 
     */
    default(props: SlimBadgeProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'SlimBadge'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

// Define Component
const props = defineProps<SlimBadgeProps>();
const slots = defineSlots<SlimBadgeSlots>();

// States
const iconBinding = computed<{ [key: string]: any }>(() => {
    const result = {
        size: (props.size || 'sm') == 'lg' ? 24 : 16,
        strokeWidth: (props.size || 'sm') == 'lg' ? 1.5 : 2,
    };
    return Object.assign(result, props.iconProps || {});
});
</script>

<style scoped>
.slim-badge {
    @apply inline-flex flex-row gap-2 items-center justify-center self-center rounded-full w-6 h-6;
    @apply text-gray-900 bg-gray-200 dark:text-gray-300 dark:bg-gray-700;

    & :slotted(.badge-label) {
        @apply text-xs font-semibold;
    }
}

/** Sizes */
.slim-badge.badge-sm {
    @apply w-4 h-4;
}
.slim-badge.badge-lg {
    @apply w-8 h-8;

    & :slotted(.badge-label) {
        @apply text-sm;
    }
}

/** Pill */
.slim-badge.badge-pill {
    @apply w-auto px-4;
    
    &.badge-sm {
        @apply w-auto px-2;
    }

    &.badge-lg {
        @apply w-auto px-6;
    }
}

/** Colors */
.slim-badge.badge-primary {
    @apply text-primary-600 bg-primary-100;
    @apply dark:text-primary-200 dark:bg-primary-800/50;
    
    &.badge-fill {
        @apply text-primary-50 bg-primary-600;
    }
}
.slim-badge.badge-secondary {
    @apply text-gray-600 bg-gray-100;
    @apply dark:text-gray-200 dark:bg-gray-700;
    
    &.badge-fill {
        @apply text-gray-50 bg-gray-600;
    }
}
.slim-badge.badge-success {
    @apply text-success-600 bg-success-100;
    @apply dark:text-success-200 dark:bg-success-800/50;
    
    &.badge-fill {
        @apply text-success-50 bg-success-600;
    }
}
.slim-badge.badge-warning {
    @apply text-warning-600 bg-warning-100;
    @apply dark:text-warning-200 dark:bg-warning-800/50;
    
    &.badge-fill {
        @apply text-warning-50 bg-warning-600;
    }
}
.slim-badge.badge-danger {
    @apply text-danger-600 bg-danger-100;
    @apply dark:text-danger-200 dark:bg-danger-800/50;
    
    &.badge-fill {
        @apply text-danger-50 bg-danger-600;
    }
}
.slim-badge.badge-info {
    @apply text-info-600 bg-info-100;
    @apply dark:text-info-200 dark:bg-info-800/50;
    
    &.badge-fill {
        @apply text-info-50 bg-info-600;
    }
}
</style>
