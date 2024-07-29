
<template>
    <div class="alert-message" :class="[
        `alert-${props.type || 'note'}`,
        `alert-${props.variant || 'text'}`,
    ]">
        <template v-if="$slots.icon">
            <slot name="icon" v-bind="props" />
        </template>
        <template v-else>
            <component :is="props.icon" v-bind="props.iconProps || {}" v-if="props.icon" />
            <LucideInfoCircle :size="16" v-else-if="(props.type) == 'info'" />
            <LucideCheckCircle :size="16" v-else-if="(props.type) == 'success'" />
            <LucideTriangleAlert :size="16" v-else-if="(props.type) == 'warning'" />
            <LucideXCircle :size="16" v-else-if="(props.type) == 'danger'" />
            <LucideDotCircle :size="16" v-else />
        </template>

        <div class="message-text">
            <slot name="default" v-bind="props" />
        </div>
    </div>
</template>

<script lang="ts">
import type { Component } from 'vue';

export type AlertMessageTypes = 'note' | 'info' | 'success' | 'warning' | 'danger';

export type AlertMessageVariants = 'text' | 'badge';

/**
 * AlertMessage Properties
 */
export interface AlertMessageProps {
    /**
     * The desired type for this alert message.
     */
    type?: AlertMessageTypes;

    /**
     * Show a custom icon component, instead of the system one.
     */
    icon?: Component | null;

    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * The desired alert message style variants.
     */
    variant?: AlertMessageVariants;
}

/**
 * AlertMessage Slots
 */
export interface AlertMessageSlots {
    /**
     * The icon slot, used instead of the icon property.
     * @param props 
     */
    icon(props: AlertMessageProps): any;

    /**
     * The default content.
     * @param props 
     */
    default(props: AlertMessageProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'AlertMessage'
}
</script>

<script lang="ts" setup>
import LucideCheckCircle from '../lucide/CheckCircle.vue';
import LucideDotCircle from '../lucide/DotCircle.vue';
import LucideInfoCircle from '../lucide/InfoCircle.vue';
import LucideTriangleAlert from '../lucide/TriangleAlert.vue';
import LucideXCircle from '../lucide/XCircle.vue';

// Define Component
const props = defineProps<AlertMessageProps>();
const slots = defineSlots<AlertMessageSlots>();
</script>

<style scoped>
.alert-message {
    @apply my-2 flex flex-row gap-1.5 items-center;
    
    @media (min-device-width: 2000px) {
        @apply !gap-20;
    }
}

.message-text {
    @apply font-semibold text-sm;

}

/* Text Style */
.alert-message.alert-text {
    &.alert-note {
        @apply text-gray-600 dark:text-gray-300;
    }

    &.alert-info {
        @apply text-info-600 dark:text-info-500;
    }

    &.alert-success {
        @apply text-success-600 dark:text-success-500;
    }

    &.alert-warning {
        @apply text-warning-600 dark:text-warning-500;
    }

    &.alert-danger {
        @apply text-danger-600 dark:text-danger-500;
    }
}

/* Badge Style */
.alert-message.alert-badge {
    @apply inline-flex border rounded-full py-0.5 pl-2 pr-3;
    
    &.alert-note {
        @apply text-gray-600 border-gray-600 bg-gray-50;
        @apply dark:text-gray-50 dark:border-gray-600 dark:bg-gray-600;
    }

    &.alert-info {
        @apply text-info-600 border-info-600 bg-info-50;
        @apply dark:text-info-50 dark:border-info-500 dark:bg-info-500;
    }

    &.alert-success {
        @apply text-success-600 border-success-600 bg-success-50;
        @apply dark:text-success-50 dark:border-success-500 dark:bg-success-500;
    }

    &.alert-warning {
        @apply text-warning-600 border-warning-600 bg-warning-50;
        @apply dark:text-warning-50 dark:border-warning-500 dark:bg-warning-500;
    }

    &.alert-danger {
        @apply text-danger-600 border-danger-600 bg-danger-50;
        @apply dark:text-danger-50 dark:border-danger-500 dark:bg-danger-500;
    }
}
</style>
