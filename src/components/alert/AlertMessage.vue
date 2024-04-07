
<template>
    <div class="alert-message" :class="[
        `alert-${props.type || 'note'}`
    ]">
        <component :is="props.icon" v-bind="props.iconProps || {}" v-if="props.icon" />
        <LucideInfoCircle :size="16" v-else-if="(props.type) == 'info'" />
        <LucideCheckCircle :size="16" v-else-if="(props.type) == 'success'" />
        <LucideTriangleAlert :size="16" v-else-if="(props.type) == 'warning'" />
        <LucideXCircle :size="16" v-else-if="(props.type) == 'danger'" />
        <LucideDotCircle :size="16" v-else="(props.type) == 'note'" />
        <div class="message-text"><slot name="default" v-bind="props" /></div>
    </div>
</template>

<script lang="ts">
import type { Component } from 'vue';

export type AlertMessageTypes = 'note' | 'info' | 'success' | 'warning' | 'danger';

/**
 * AlertMessage Properties
 */
export interface AlertMessageProps {
    /**
     * The desires type for this alert message.
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
}

/**
 * AlertMessage Slots
 */
export interface AlertMessageSlots {
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
    @apply my-2 flex flex-row gap-2 items-center font-semibold text-sm;
    
    &.alert-note {
        @apply text-gray-600 dark:text-gray-500;
    }

    &.alert-info {
        @apply text-primary-600 dark:text-primary-500;
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
</style>
