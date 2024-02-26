<template>
    <button 
        :type="props.type || 'button'"
        class="btn btn-action" 
        :class="[
            props.color ? `btn-${props.color}` : '',
            props.size ? `btn-${props.size}` : '',
            toValue(props.active || false) ? 'btn-active' : '',
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
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

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
.btn.btn-action {
    @apply w-8 h-8 flex items-center justify-center border border-solid rounded-md cursor-pointer;
    @apply duration-300 ease-in-out;
    @apply outline-none shadow-none;

    &:disabled {
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
.btn.btn-action.btn-sm {
    @apply w-6 h-6;
}
.btn.btn-action.btn-lg {
    @apply w-10 h-10;
}

/** Colors */
.btn.btn-action.btn-primary {
    &:hover {
        @apply bg-indigo-50 text-indigo-700 border-indigo-700;
        @apply dark:bg-indigo-700 dark:text-black dark:border-indigo-700;
    }
}

.btn.btn-action.btn-secondary {
    &:hover {

    }
}

.btn.btn-action.btn-danger {
    &:hover {
        @apply bg-red-50 text-red-700 border-red-700;
        @apply dark:bg-red-700 dark:text-black dark:border-red-700;
    }
}

.btn.btn-action.btn-warning {
    &:hover {
        @apply bg-amber-50 text-amber-700 border-amber-700;
        @apply dark:bg-amber-700 dark:text-black dark:border-amber-700;
    }
}

.btn.btn-action.btn-success {
    &:hover {
        @apply bg-lime-50 text-lime-700 border-lime-700;
        @apply dark:bg-lime-700 dark:text-black dark:border-lime-700;
    }
}

.btn.btn-action.btn-info {
    &:hover {
        @apply bg-sky-50 text-sky-700 border-sky-700;
        @apply dark:bg-sky-700 dark:text-black dark:border-sky-700;
    }
}
</style>
