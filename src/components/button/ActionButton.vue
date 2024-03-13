<template>
    <button 
        :type="props.type || 'button'"
        class="btn btn-action" 
        :class="[
            props.color ? `btn-${props.color}` : '',
            props.size ? `btn-${props.size}` : '',
            toValue(props.active || false) ? 'active' : '',
            toValue(props.disabled || false) ? 'btn-disabled' : '',
            toValue(props.loading || false) ? 'btn-loading' : ''
        ]"
        :title="props.title || void 0"
        :disabled="toValue(props.disabled || false) || toValue(props.loading || false)">
        <component :is="icon" class="btn-icon" v-bind="iconBinding" />
    </button>
</template>

<script lang="ts">
import type { Component, MaybeRef } from 'vue';

/**
 * ActionButton Properties
 */
export interface ActionButtonProps {
    /**
     * An additional icon which is displayed next to the label, if available.
     */
    icon: Component;

    /**
     * The desired color used for this button.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | null;

    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * The desired size of the button, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The desired type of the button, note that `button` is the default value.
     */
    type?: 'button' | 'submit' | 'reset';

    /**
     * An alternative text that is used as title attribute on the button.
     */
    title?: string;

    /**
     * The active state for this button.
     */
    active?: MaybeRef<boolean> | boolean;

    /**
     * The loading state for this button.
     */
    loading?: MaybeRef<boolean> | boolean;

    /**
     * The disabled state for this button.
     */
    disabled?: MaybeRef<boolean> | boolean;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'ActionButton'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';

// Define Component
const props = defineProps<ActionButtonProps>();

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
.btn-action {
    @apply w-8 h-8 flex items-center justify-center border border-solid rounded-md cursor-pointer;
    @apply duration-300 ease-in-out;
    @apply outline-none shadow-none;

    & svg,
    & .btn-icon {
        @apply z-20 pointer-events-none;
    }

    &:disabled {
        @apply cursor-not-allowed;
        @apply bg-gray-100 border-gray-300 text-gray-500;
    }

    &:not(:disabled) {
        @apply bg-transparent border-transparent text-gray-600;
        @apply dark:bg-transparent dark:border-transparent dark:text-gray-400;
    }

    &:not(:disabled):hover {
        @apply bg-gray-200 border-gray-200 text-gray-900;
        @apply dark:bg-gray-800 dark:border-gray-800 dark:text-gray-200;
    }
    
    &:not(:disabled):focus {
        @apply border-gray-300;
        @apply dark:border-gray-700;
    }

    &:not(:disabled):active,
    &:not(:disabled).active {
        @apply bg-gray-900 border-gray-900 text-gray-100;
        @apply dark:bg-gray-200 dark:border-gray-200 dark:text-gray-800;
    }
}

/** Sizes */
.btn-action.btn-sm {
    @apply w-6 h-6;
}
.btn-action.btn-lg {
    @apply w-10 h-10;
}

/** Colors */
.btn-action.btn-primary {
    &:not(:disabled):hover {
        @apply bg-primary-50 text-primary-700 border-primary-700;
        @apply dark:bg-primary-700 dark:text-black dark:border-primary-700;
    }

    &:not(:disabled):active,
    &:not(:disabled).active {
        @apply bg-primary-700 text-primary-50 border-primary-900;
    }
}

.btn-action.btn-secondary {
    &:not(:disabled):hover {
        @apply bg-gray-100 border-gray-500 text-gray-900;
        @apply dark:bg-gray-800 dark:border-gray-800 dark:text-gray-200;
    }

    &:not(:disabled):active,
    &:not(:disabled).active {
        @apply bg-gray-600 text-gray-50 border-gray-800;
    }
}

.btn-action.btn-danger {
    &:not(:disabled):hover {
        @apply bg-danger-50 text-danger-700 border-danger-700;
        @apply dark:bg-danger-700 dark:text-black dark:border-danger-700;
    }

    &:not(:disabled):active,
    &:not(:disabled).active {
        @apply bg-danger-700 text-danger-50 border-danger-900;
    }
}

.btn-action.btn-warning {
    &:not(:disabled):hover {
        @apply bg-warning-50 text-warning-700 border-warning-700;
        @apply dark:bg-warning-700 dark:text-black dark:border-warning-700;
    }

    &:not(:disabled):active,
    &:not(:disabled).active {
        @apply bg-warning-700 text-warning-50 border-warning-900;
    }
}

.btn-action.btn-success {
    &:not(:disabled):hover {
        @apply bg-success-50 text-success-700 border-success-700;
        @apply dark:bg-success-700 dark:text-black dark:border-success-700;
    }

    &:not(:disabled):active,
    &:not(:disabled).active {
        @apply bg-success-700 text-success-50 border-success-900;
    }
}

.btn-action.btn-info {
    &:not(:disabled):hover {
        @apply bg-info-50 text-info-700 border-info-700;
        @apply dark:bg-info-700 dark:text-black dark:border-info-700;
    }

    &:not(:disabled):active,
    &:not(:disabled).active {
        @apply bg-info-700 text-info-50 border-info-900;
    }
}
</style>
