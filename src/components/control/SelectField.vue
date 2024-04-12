<template>
    <select
        :id="fieldId"
        :name="props.name || void 0"
        :class="[
            'field-input',
            'field-select',
            props.size ? `field-${props.size}` : '',
            props.validation ? `field-${props.validation}` : ''
        ]"
        :disabled="toValue(props.disabled || false) || typeof disabled == 'string'"
        :required="toValue(props.required || false) || typeof required == 'string'"
        :invalid="props.validation == 'invalid' ? true : void 0"
        v-model="value">
        <option v-if="props.placeholder" :value="null" disabled>{{ props.placeholder }}</option>
        <option v-for="(option, idx) of props.options" :key="idx" 
            :value="Array.isArray(option) ? option[0] : option.value"
            :disabled="Array.isArray(option) ? void 0 : (option.disabled || void 0)">
            {{ Array.isArray(option) ? (option[1] || option[0]) : option.label }}
        </option>
    </select>
</template>

<script lang="ts">
import type { SharedControlProps } from '../form/FormControl.vue';

export type SimpleSelectFieldOption = (null|number|string)[];

export interface AdvancedFieldOption {
    value: null | number | string;
    label: string;
    disabled?: boolean;
}

export type SelectOptions = (SimpleSelectFieldOption|AdvancedFieldOption)[];

/**
 * SelectField Properties
 */
export interface SelectFieldProps extends SharedControlProps<null | number | string> {
    /**
     * The desired options used for this select field.
     */
    options: SelectOptions;

    /**
     * The placeholder attribute for this select field.
     */
    placeholder?: null | string;

    /**
     * The desired size for this select field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
}

/**
 * SelectField Emits
 */
export interface SelectFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | number | string): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'SelectField'
};
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import uuid from '../../utils/uuid';

// Define Component
const props = defineProps<SelectFieldProps>();
const emits = defineEmits<SelectFieldEmits>();

// States
const value = computed({
    get() {
        return props.modelValue || null;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});
const fieldId = computed<string>(() => props.id || `field-${uuid().replace(/-/g, '')}`);
</script>

<style scoped>
.field-select {
    @apply w-full h-10 pl-4 pr-12 py-2 border border-solid rounded-md outline-none shadow-none appearance-none;
    @apply duration-300 ease-in-out;
    @apply bg-transparent border-gray-400;
    @apply dark:bg-gray-900 dark:border-gray-700;
    transition-property: background-color, border-color, box-shadow, color;
    background-size: 24px 24px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+');
    background-repeat: no-repeat;
    background-position: center right 0.75rem;

    &:disabled {
        @apply cursor-not-allowed;
        @apply bg-gray-200 border-gray-400 text-gray-500;
        @apply dark:bg-gray-700 dark:border-gray-500 dark:text-gray-400;
    }

    .is-valid &,
    &.field-valid {
        @apply border-success-600;
    }

    .is-invalid &,
    &.field-invalid {
        @apply border-danger-600;
    }

    &:not(:disabled) {
        @apply cursor-pointer;
    }

    &:not(:disabled):hover {
        @apply border-gray-600;
    }
    
    &:not(:disabled):focus {
        @apply border-primary-600 shadow-primary-400/30;
        box-shadow: 0 0 0 3px var(--tw-shadow-color);
    }
}

/** Sizes */
.field-select.field-sm {
    @apply h-8 py-0.5 pr-8;
    /* required to prevent zoom-behaviour on apple devices, added here too for consistency */
    /* @see https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/ */
    font-size: 16px;
    background-size: 16px 16px;
    background-position: center right 0.5rem;

    @screen md {
        @apply text-sm;
    }
}
.field-select.field-lg {
    @apply h-14 py-3 text-lg;
}
</style>
