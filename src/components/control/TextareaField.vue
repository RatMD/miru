<template>
    <textarea 
        :id="fieldId"
        :name="props.name || void 0"
        :placeholder="props.placeholder || void 0"
        :class="[
            'field-input', 
            'field-textarea', 
            props.size ? `field-${props.size}` : '',
            props.validation ? `field-${props.validation}` : ''
        ]" 
        :disabled="toValue(props.disabled || false) || typeof disabled == 'string'"
        :readonly="toValue(props.readonly || false) || typeof readonly == 'string'"
        :required="toValue(props.required || false) || typeof required == 'string'"
        :invalid="props.validation == 'invalid' ? true : void 0"
        v-model="value"></textarea>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';

/**
 * TextareaField Properties
 */
export interface TextareaFieldProps {
    /**
     * A custom textarea field id, usually passed by the FormControl component. The default value is an 
     * auto-generated UUID.
     */
    id?: null | string;

    /**
     * The name attribute for this textarea field.
     */
    name?: null | string;

    /**
     * The value for this textarea field, must be passed as v-model value.
     */
    modelValue?: null | string;

    /**
     * The placeholder attribute for this textarea field.
     */
    placeholder?: null | string;

    /**
     * The desired size for this textarea field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The validation state for this textarea field.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * Additional textarea field validation message, requires the validation property set either to 
     * valid or invalid.
     */
    validationMessage?: null | string;

    /**
     * The disabled state for this textarea field.
     */
    disabled?: MaybeRef<boolean>;

    /**
     * The readonly state for this textarea field.
     */
    readonly?: MaybeRef<boolean>;

    /**
     * The required state for this textarea field.
     */
    required?: MaybeRef<boolean>;
}

/**
 * TextareaField Emits
 */
export interface TextareaFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | string): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'TextareaField'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import uuid from '@/utils/uuid';

// Define Component
const props = defineProps<TextareaFieldProps>();
const emits = defineEmits<TextareaFieldEmits>();

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
.field-input {
    @apply w-full px-4 py-2.5 border border-solid rounded-md outline-none shadow-none resize-y;
    @apply duration-300 ease-in-out;
    @apply bg-transparent border-gray-400;
    @apply dark:bg-gray-900 dark:border-gray-700;
    min-height: 3.0rem;
    transition-property: background-color, border-color, box-shadow, color;

    &:disabled {
        @apply cursor-not-allowed;
        @apply bg-gray-200 border-gray-400 text-gray-500;
        @apply dark:bg-gray-700 dark:border-gray-500 dark:text-gray-400;
    }

    &:read-only {
        @apply bg-gray-200 border-gray-400;
        @apply dark:bg-gray-700 dark:border-gray-500;
    }

    .is-valid &,
    &.field-valid {
        @apply border-success-600;
    }

    .is-invalid &,
    &.field-invalid {
        @apply border-danger-600;
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
.field-input.field-sm {
    @apply py-1.5;
    min-height: 2.5rem;
    /* required to prevent zoom-behaviour on apple devices */
    /* @see https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/ */
    font-size: 16px;

    @screen md {
        @apply text-sm;
    }
}
.field-input.field-lg {
    @apply py-4 text-lg;
    min-height: 3.5rem;
}
</style>
