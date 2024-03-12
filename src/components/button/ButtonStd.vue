<template>
    <button 
        :type="props.type || 'button'"
        class="btn"
        :class="[
            props.color ? `btn-${props.color}` : '',
            props.size ? `btn-${props.size}` : '',
            `btn-${placement == 'icon' ? 'icon-only' : placement}`,
            toValue(props.disabled || false) ? 'btn-disabled' : '',
            toValue(props.loading || false) ? 'btn-loading' : '',
            props.fullwidth ? 'btn-fullwidth' : ''
        ]"
        :title="props.title || void 0"
        :disabled="toValue(props.disabled || false) || toValue(props.loading || false)">

        <component :is="props.iconLoading ? props.iconLoading : LucideLoaderCircle" class="btn-icon spin" v-bind="iconBinding" v-if="toValue(props.loading || false)" />
        <template v-if="props.icon && placement != 'right'">
            <component :is="icon" class="btn-icon" v-bind="iconBinding" />
        </template>

        <template v-if="placement != 'icon'">
            <span class="btn-label">{{ props.label }}</span>
        </template>

        <template v-if="props.icon && placement == 'right'">
            <component :is="icon" class="btn-icon" v-bind="iconBinding" />
        </template>
    </button>
</template>

<script lang="ts">
import type { Component, MaybeRef } from 'vue';

/**
 * Button Properties
 */
export interface ButtonProps {
    /**
     * The desired color used for this button.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

    /**
     * The desired label text for this button.
     */
    label?: string | null;

    /**
     * An additional icon which is displayed next to the label, if available.
     */
    icon?: Component;

    /**
     * A custom loading icon which is used instead of the default one.
     */
    iconLoading?: Component;

    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * Whether to show the additional icon on the left or right side or as replacement to the label itself.
     */
    iconPlacement?: 'left' | 'right' | 'icon';

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
     * Whether to use a fullwidth styling for this button or not.
     */
    fullwidth?: boolean;

    /**
     * The disabled state for this button.
     */
    disabled?: MaybeRef<boolean> | boolean;

    /**
     * The loading state for this button.
     */
    loading?: MaybeRef<boolean> | boolean;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'ButtonStd'
};
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import LucideLoaderCircle from '@/components/lucide/LoaderCircle.vue';

// Define Component
const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'button'
});

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
.btn {
    @apply w-auto h-12 px-8 py-2.5 inline-flex items-center gap-3 border border-solid rounded-lg cursor-pointer text-base;
    @apply duration-300 ease-in-out;
    @apply outline-none shadow-none;
    transition-property: background-color, border-color, box-shadow, color;

    & span,
    & svg {
        @apply pointer-events-none;

        &.spin {
            animation: spin 2.5s linear 0ms infinite;
        }
    }
    &.btn-loading .btn-icon {
        &:not(.spin) {
            @apply hidden;
        }
        
        &.spin {
            animation: spin 2.5s linear 0ms infinite;
        }
    }
    
    &:disabled {
        @apply cursor-not-allowed;
        
        &:not(.btn-loading) {
            @apply line-through;
        }

        @apply bg-gray-600 border-gray-600 text-gray-100;
        @apply dark:bg-gray-500 dark:border-gray-500 dark:text-gray-700;
    }

    &:not(:disabled) {
        @apply bg-gray-900 border-gray-900 text-gray-100;
        @apply dark:bg-gray-100 dark:border-gray-100 dark:text-gray-900;
    }

    &:not(:disabled):hover {
        @apply bg-gray-700 border-gray-700 text-gray-200;
        @apply dark:bg-gray-300 dark:border-gray-300 dark:text-gray-800;
    }
    
    &:not(:disabled):focus {
        @apply bg-gray-700 border-gray-700 text-gray-200 shadow-gray-700/20;
        @apply dark:bg-gray-300 dark:border-gray-300 dark:text-gray-800 dark:shadow-gray-300/20;
        box-shadow: 0 0 0 3px var(--tw-shadow-color);
    }

    &:not(:disabled):active {
        @apply bg-gray-950 border-gray-950 text-gray-300;
        @apply dark:bg-gray-500 dark:border-gray-500 dark:text-gray-800;
        box-shadow: none;
    }
}

/** Sizes */
.btn.btn-sm {
    @apply h-8 rounded-md py-1.5 px-4 text-sm;
}

.btn.btn-lg {
    @apply py-4 px-12 text-lg;
    height: 60px;
}

.btn.btn-fullwidth {
    @apply w-full text-center items-center justify-center;
}

/** Specials */
.btn.btn-icon-only {
    @apply px-0 w-12 items-center justify-center;

    &.btn-sm {
        @apply w-8 px-0;
    }
    &.btn-lg {
        @apply px-0;
        width: 60px;
    }
}

/** Primary Color */
.btn.btn-primary {
    &:disabled {
        @apply bg-primary-300 border-primary-300 text-primary-100;
        @apply dark:bg-primary-950 dark:border-primary-950 dark:text-primary-300;
    }

    &:not(:disabled) {
        @apply bg-primary-700 border-primary-700 text-primary-50;
        @apply dark:bg-primary-800 dark:border-primary-600 dark:text-primary-100;
    }

    &:not(:disabled):hover {
        @apply bg-primary-500 border-primary-500 text-primary-50;
        @apply dark:bg-primary-600 dark:border-primary-600 dark:text-primary-100;
    }
    
    &:not(:disabled):focus {
        @apply bg-primary-600 border-primary-600 text-primary-50 shadow-primary-600/20;
        @apply dark:bg-primary-700 dark:border-primary-500 dark:text-primary-100 shadow-primary-600/20;
        box-shadow: 0 0 0 3px var(--tw-shadow-color);
    }

    &:not(:disabled):active {
        @apply bg-primary-900 border-primary-900 text-primary-100;
        @apply dark:bg-primary-950 dark:border-primary-900 dark:text-primary-200;
        box-shadow: none;
    }
}

/** Secondary Color */
.btn.btn-secondary {
    &:disabled {
        @apply bg-gray-300 border-gray-400 text-gray-600;
        @apply dark:bg-gray-900 dark:border-gray-800 dark:text-gray-500;
    }

    &:not(:disabled) {
        @apply bg-white border-gray-300 text-gray-900;
        @apply dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300;
    }

    &:not(:disabled):hover {
        @apply bg-gray-100 border-gray-400 text-gray-900;
        @apply dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200;
    }
    
    &:not(:disabled):focus {
        @apply bg-gray-100 border-gray-400 text-gray-900 shadow-gray-400/20;
        @apply dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 shadow-gray-700/20;
        box-shadow: 0 0 0 3px var(--tw-shadow-color);
    }

    &:not(:disabled):active {
        @apply bg-gray-300 border-gray-300 text-gray-700;
        @apply dark:bg-gray-900 dark:border-gray-900 dark:text-gray-400;
        box-shadow: none;
    }
}


/** Danger Color */
.btn.btn-danger {
    &:disabled {
        @apply bg-danger-300 border-danger-300 text-danger-100;
        @apply dark:bg-danger-950 dark:border-danger-950 dark:text-danger-300;
    }

    &:not(:disabled) {
        @apply bg-danger-700 border-danger-700 text-danger-50;
        @apply dark:bg-danger-800 dark:border-danger-600 dark:text-danger-100;
    }

    &:not(:disabled):hover {
        @apply bg-danger-500 border-danger-500 text-danger-50;
        @apply dark:bg-danger-600 dark:border-danger-600 dark:text-danger-100;
    }
    
    &:not(:disabled):focus {
        @apply bg-danger-600 border-danger-600 text-danger-50 shadow-danger-600/20;
        @apply dark:bg-danger-700 dark:border-danger-500 dark:text-danger-100 shadow-danger-600/20;
        box-shadow: 0 0 0 3px var(--tw-shadow-color);
    }

    &:not(:disabled):active {
        @apply bg-danger-900 border-danger-900 text-danger-100;
        @apply dark:bg-danger-950 dark:border-danger-900 dark:text-danger-200;
        box-shadow: none;
    }
}

/** Warning Color */
.btn.btn-warning {
    &:disabled {
        @apply bg-warning-300 border-warning-300 text-warning-100;
        @apply dark:bg-warning-950 dark:border-warning-950 dark:text-warning-300;
    }

    &:not(:disabled) {
        @apply bg-warning-600 border-warning-600 text-warning-50;
        @apply dark:bg-warning-700 dark:border-warning-600 dark:text-warning-100;
    }

    &:not(:disabled):hover {
        @apply bg-warning-500 border-warning-500 text-warning-50;
        @apply dark:bg-warning-600 dark:border-warning-600 dark:text-warning-100;
    }
    
    &:not(:disabled):focus {
        @apply bg-warning-600 border-warning-600 text-warning-50 shadow-warning-600/20;
        @apply dark:bg-warning-700 dark:border-warning-500 dark:text-warning-100 shadow-warning-600/20;
        box-shadow: 0 0 0 3px var(--tw-shadow-color);
    }

    &:not(:disabled):active {
        @apply bg-warning-900 border-warning-900 text-warning-100;
        @apply dark:bg-warning-950 dark:border-warning-900 dark:text-warning-200;
        box-shadow: none;
    }
}


/** Success Color */
.btn.btn-success {
    &:disabled {
        @apply bg-success-300 border-success-300 text-success-100;
        @apply dark:bg-success-950 dark:border-success-950 dark:text-success-300;
    }

    &:not(:disabled) {
        @apply bg-success-700 border-success-700 text-success-50;
        @apply dark:bg-success-800 dark:border-success-600 dark:text-success-100;
    }

    &:not(:disabled):hover {
        @apply bg-success-500 border-success-500 text-success-50;
        @apply dark:bg-success-600 dark:border-success-600 dark:text-success-100;
    }
    
    &:not(:disabled):focus {
        @apply bg-success-600 border-success-600 text-success-50 shadow-success-600/20;
        @apply dark:bg-success-700 dark:border-success-500 dark:text-success-100 shadow-success-600/20;
        box-shadow: 0 0 0 3px var(--tw-shadow-color);
    }

    &:not(:disabled):active {
        @apply bg-success-900 border-success-900 text-success-100;
        @apply dark:bg-success-950 dark:border-success-900 dark:text-success-200;
        box-shadow: none;
    }
}

/** Info Color */
.btn.btn-info {
    &:disabled {
        @apply bg-info-300 border-info-300 text-info-100;
        @apply dark:bg-info-950 dark:border-info-950 dark:text-info-300;
    }

    &:not(:disabled) {
        @apply bg-info-700 border-info-700 text-info-50;
        @apply dark:bg-info-800 dark:border-info-600 dark:text-info-100;
    }

    &:not(:disabled):hover {
        @apply bg-info-500 border-info-500 text-info-50;
        @apply dark:bg-info-600 dark:border-info-600 dark:text-info-100;
    }
    
    &:not(:disabled):focus {
        @apply bg-info-600 border-info-600 text-info-50 shadow-info-600/20;
        @apply dark:bg-info-700 dark:border-info-500 dark:text-info-100 shadow-info-600/20;
        box-shadow: 0 0 0 3px var(--tw-shadow-color);
    }

    &:not(:disabled):active {
        @apply bg-info-900 border-info-900 text-info-100;
        @apply dark:bg-info-950 dark:border-info-900 dark:text-info-200;
        box-shadow: none;
    }
}
</style>
