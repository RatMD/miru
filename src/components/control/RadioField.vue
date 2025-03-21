<template>
    <div :id="fieldId" :class="[
        'field-input', 
        `field-radio`, 
        props.size ? `field-${props.size}` : '',
        props.validation ? `field-${props.validation}` : ''
    ]">
        <input :id="`${fieldId}-input`"
            type="radio" 
            class="radio-input"
            :name="props.name || fieldId"
            :value="props.value ? props.value : true"
            :disabled="toValue(props.disabled || false) || typeof disabled == 'string'"
            :required="toValue(props.required || false) || typeof required == 'string'"
            v-model="value" />
        <label :for="`${fieldId}-input`" class="radio-label">
            <span v-if="props.label">{{ props.label }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';
import type { SharedControlProps } from '../form/FormControl.vue';

/**
 * RadioField Properties
 */
export interface RadioFieldProps extends SharedControlProps<null | boolean | number | string> {
    /**
     * The label for this checkbox field.
     */
    label?: null | string;
    
    /**
     * The value attribute for this radio field, pass nothing to use binary mode with true and 
     * false.
     */
    value?: null | string;

    /**
     * The desired size for this radio field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
}

/**
 * RadioField Emits
 */
 export interface RadioFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | boolean | number | string): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'RadioField'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import uuid from '../../utils/uuid';

// Define Component
const props = defineProps<RadioFieldProps>();
const emits = defineEmits<RadioFieldEmits>();

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
.field-radio {
    @apply inline-flex;
}

.radio-input {
    @apply hidden;
}

.radio-input ~ .radio-label {
    @apply flex items-center relative gap-3;
    @apply duration-200 ease-in-out;
    transition-property: background-color, border-color, color;
    
    &::before {
        @apply w-5 h-5 border rounded-full shadow-white;
        @apply duration-200 ease-in-out;
        content: "";
        box-shadow: inset 0 0 0 0.25rem var(--tw-shadow-color);
        transition-property: background-color, border-color, box-shadow, color;
    }
    
    & span {
        @apply text-sm font-semibold pt-px;
    }
}

.radio-input {
    &:not(:disabled) ~ .radio-label {
        @apply cursor-pointer;
    }
    &:disabled ~ .radio-label {
        @apply cursor-not-allowed;
    }

    & ~ .radio-label {
        @apply text-zinc-800 dark:text-zinc-300;
    }
    &:disabled ~ .radio-label {
        @apply text-zinc-400 dark:text-zinc-500;
    }

    & ~ .radio-label::before {
        @apply border-zinc-300 bg-white;
        @apply dark:border-zinc-600 dark:bg-zinc-900;
    }
    &:not(:disabled):checked ~ .radio-label::before {
        @apply border-indigo-600 bg-indigo-600;
        @apply dark:border-indigo-500 dark:bg-indigo-500;
    }
    &:disabled ~ .radio-label::before {
        @apply border-zinc-400 bg-zinc-200;
        @apply dark:border-zinc-600 dark:bg-zinc-800;
    }
    &:disabled:checked ~ .radio-label::before {
        @apply border-indigo-400 bg-indigo-400;
        @apply dark:border-indigo-800 dark:bg-indigo-800;
    }
}

.field-radio:hover .radio-input {
    &:not(:disabled) ~ .radio-label::before {
        @apply border-indigo-400;
        @apply dark:border-indigo-600;
    }

    &:not(:disabled):checked ~ .radio-label::before {
        @apply border-indigo-800;
        @apply dark:border-indigo-400;
    }
}

.is-valid .field-radio,
.field-radio.field-valid {
    & .radio-input:not(:disabled) ~ .radio-label::before {
        @apply border-success-700 bg-success-50;
        @apply dark:border-success-600 dark:bg-success-950;
    }
}

.is-invalid .field-radio,
.field-radio.field-invalid {
    & .radio-input:not(:disabled) ~ .radio-label::before {
        @apply border-danger-700 bg-danger-50;
        @apply dark:border-danger-600 dark:bg-danger-950;
    }
}

/** Sizes */
.field-radio.field-sm .radio-input ~ .radio-label {
    @apply gap-2;
    
    &::before {
        @apply w-4 h-4;
        box-shadow: inset 0 0 0 0.175rem var(--tw-shadow-color);
    }

    & span {
        @apply text-xs;
    }
}

.field-radio.field-lg .radio-input ~ .radio-label {
    @apply gap-4;

    &::before {
        @apply w-6 h-6;
        box-shadow: inset 0 0 0 0.3175rem var(--tw-shadow-color);
    }

    & span {
        @apply text-base;
    }
}
</style>
