<template>
    <div class="badge" :class="[
        props.color ? `badge-${props.color}`: '', 
        props.size ? `badge-${props.size}` : '',
        props.iconPlacement == 'icon' ? `badge-icon-only` : ''
    ]">
        <slot name="default" v-bind="props">
            <template v-if="(props.icon || props.dot) && placement != 'right'">
                <component :is="icon" class="badge-icon" v-bind="iconBinding" v-if="props.icon" />
                <span class="badge-dot" v-else></span>
            </template>
    
            <template v-if="placement != 'icon'">
                <span class="badge-label">{{ props.label }}</span>
            </template>
    
            <template v-if="(props.icon || props.dot) && placement == 'right'">
                <component :is="icon" class="badge-icon" v-bind="iconBinding" v-if="props.icon" />
                <span class="badge-dot" v-else></span>
            </template>
        </slot>
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
     * Whether to show the additional icon on the left or right side or as replacement to the label itself.
     */
    iconPlacement?: 'left' | 'right' | 'icon';

    /**
     * The desired size of the badge, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * Show a dot / circle instead of an icon next to the label, if available.
     */
    dot?: boolean;
}

/**
 * Badge Slots
 */
export interface BadgeSlots {
    /**
     * Default content slot, used instead of the label property
     * @param props 
     */
    default(props: BadgeProps): any;
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
const slots = defineSlots<BadgeSlots>();

// States
const placement = computed<'left' | 'right' | 'icon'>(() => {
    if (!props.label && props.icon) {
        return 'icon';
    } else {
        return props.iconPlacement || 'left';
    }
});

const iconBinding = computed<{ [key: string]: any }>(() => {
    const result = {
        size: (props.size || 'sm') == 'lg' ? 24 : 16,
        strokeWidth: (props.size || 'sm') == 'lg' ? 1.5 : 2,
    };
    return Object.assign(result, props.iconProps || {});
});
</script>

<style scoped>
.badge {
    @apply inline-flex flex-row gap-2 items-center px-4 py-1.5 rounded-lg;
    @apply text-gray-900 bg-gray-200 dark:text-gray-300 dark:bg-gray-700;

    &.badge-icon-only {
        @apply px-2.5;
    }
}

.badge :slotted(.badge-dot) {
    @apply w-3 h-3 rounded-full bg-current;
}

.badge :slotted(.badge-label) {
    @apply text-sm font-semibold;
}

/** Sizes */
.badge.badge-sm {
    @apply px-2 py-1 rounded-md;

    &.badge-icon-only {
        @apply px-1.5;
    }

    & :slotted(.badge-dot) {
        @apply w-2 h-2;
    }

    & :slotted(.badge-label) {
        @apply text-xs;
    }
}

.badge.badge-lg {
    @apply px-5 py-2;

    &.badge-icon-only {
        @apply px-2.5;
    }

    & :slotted(.badge-dot) {
        @apply w-4 h-4;
    }
    
    & :slotted(.badge-label) {
        @apply text-base;
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
