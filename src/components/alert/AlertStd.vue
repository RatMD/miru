
<template>
    <div ref="alert" class="alert" :class="[
        `alert-${props.type || 'note'}`,
        props.bordered ? `alert-bordered` : '',
    ]">
        <component :is="props.icon" v-bind="props.iconProps || {}" v-if="props.icon" />
        <LucideInfoCircle :size="16" v-else-if="(props.type) == 'info'" />
        <LucideCheckCircle :size="16" v-else-if="(props.type) == 'success'" />
        <LucideTriangleAlert :size="16" v-else-if="(props.type) == 'warning'" />
        <LucideXCircle :size="16" v-else-if="(props.type) == 'danger'" />
        <LucideDotCircle :size="16" v-else="(props.type) == 'note'" />
        
        <div class="alert-text">
            <div class="alert-title">
                {{ props.title }}
            </div>
            <slot name="default" v-bind="props" />
        </div>

        <button type="button" class="alert-close" v-if="props.closable || false" @click="onRemove">
            <LucideXSign :size="16" />
        </button>
    </div>
</template>

<script lang="ts">
import type { Component } from 'vue';

export type AlertStdTypes = 'note' | 'info' | 'success' | 'warning' | 'danger';

/**
 * AlertStd Properties
 */
export interface AlertStdProps {
    /**
     * The desires type for this alert message.
     */
    type?: AlertStdTypes;

    /**
     * Additional custom alert title.
     */
    title?: string;

    /**
     * Show a custom icon component, instead of the system one.
     */
    icon?: Component | null;

    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * Whether to use the bordered style or not.
     */
    bordered?: boolean;

    /**
     * Whether to allow closing / removing the alert message or not.
     */
    closable?: boolean;
}

/**
 * AlertStd Slots
 */
export interface AlertStdSlots {
    /**
     * The default content.
     * @param props 
     */
    default(props: AlertStdProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'AlertStd'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import LucideCheckCircle from '../lucide/CheckCircle.vue';
import LucideDotCircle from '../lucide/DotCircle.vue';
import LucideInfoCircle from '../lucide/InfoCircle.vue';
import LucideTriangleAlert from '../lucide/TriangleAlert.vue';
import LucideXCircle from '../lucide/XCircle.vue';
import LucideXSign from '../lucide/XSign.vue';

// Define Component
const props = defineProps<AlertStdProps>();
const slots = defineSlots<AlertStdSlots>();

// States
const alert = ref<HTMLElement>();

/**
 * Remove Component
 */
function onRemove() {
    if (alert.value) {
        alert.value.remove();
    }
}
</script>

<style scoped>
.alert {
    @apply relative my-2 flex flex-row gap-3 items-center rounded-lg px-4 py-2;

    & .alert-title {
        @apply font-semibold;
    }

    & .alert-close {
        @apply absolute top-1.5 right-1.5 mt-px p-1 flex items-center justify-center rounded-md;
        @apply duration-200 ease-in-out transition-colors;
    }

    & :deep(a) {
        @apply underline;
    }
}

/** Alert Colors */
.alert {
    &.alert-note {
        @apply text-gray-600 bg-gray-100;
        @apply dark:text-gray-50 dark:bg-gray-900/50;
        
        & .alert-close:hover {
            @apply text-gray-50 bg-gray-600;
        }
    }

    &.alert-info {
        @apply text-primary-600 bg-primary-50;
        @apply dark:text-primary-50 dark:bg-primary-900/50;
        
        & .alert-close:hover {
            @apply text-primary-50 bg-primary-600;
        }
    }

    &.alert-success {
        @apply text-success-600 bg-success-50;
        @apply dark:text-success-50 dark:bg-success-900/50;
        
        & .alert-close:hover {
            @apply text-success-50 bg-success-600;
        }
    }

    &.alert-warning {
        @apply text-warning-600 bg-warning-50;
        @apply dark:text-warning-50 dark:bg-warning-900/50;
        
        & .alert-close:hover {
            @apply text-warning-50 bg-warning-600;
        }
    }

    &.alert-danger {
        @apply text-danger-600 bg-danger-50;
        @apply dark:text-danger-50 dark:bg-danger-900/50;
        
        & .alert-close:hover {
            @apply text-danger-50 bg-danger-600;
        }
    }
}

/** Alert Outline Colors */
.alert.alert-bordered {
    @apply border border-solid;

    &.alert-note {
        @apply border-gray-600;
    }
    
    &.alert-info {
        @apply border-primary-600;
    }
    
    &.alert-success {
        @apply border-success-600;
    }
    
    &.alert-warning {
        @apply border-warning-600;
    }
    
    &.alert-danger {
        @apply border-danger-600;
    }
}
</style>
