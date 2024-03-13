<template>
    <div :id="fieldId" :class="[
        'field-input', 
        `field-checkbox`, 
        props.size ? `field-${props.size}` : '',
        props.validation ? `field-${props.validation}` : ''
    ]">
        <input :id="`${fieldId}-input`"
            type="checkbox" 
            class="checkbox-input"
            :name="props.name || fieldId"
            :value="props.value ? props.value : true"
            :disabled="toValue(props.disabled || false) || typeof disabled == 'string'"
            :readonly="toValue(props.readonly || false) || typeof readonly == 'string'"
            :required="toValue(props.required || false) || typeof required == 'string'"
            v-model="value" />
        <label :for="`${fieldId}-input`" class="checkbox-label">
            <span v-if="props.label">{{ props.label }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';

/**
 * CheckboxField Properties
 */
export interface CheckboxFieldProps {
    /**
     * A custom checkbox field id, usually passed by the FormControl component. The default value 
     * is an auto-generated UUID.
     */
    id?: null | string;

    /**
     * The label for this checkbox field.
     */
    label?: null | string;

    /**
     * The name attribute for this checkbox field.
     */
    name?: null | string;

    /**
     * The value attribute for this checkbox field, pass nothing to use binary mode with true and 
     * false.
     */
    value?: null | number | string;

    /**
     * The value for this checkbox field, must be passed as v-model value.
     */
    modelValue?: null | boolean | number | string | (string | number)[];

    /**
     * The desired size for this checkbox field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The disabled state for this checkbox field.
     */
    disabled?: MaybeRef<boolean>;

    /**
     * The readonly state for this checkbox field.
     */
    readonly?: MaybeRef<boolean>;

    /**
     * The required state for this checkbox field.
     */
    required?: MaybeRef<boolean>;

    /**
     * The validation state for this checkbox field.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * Additional checkbox field validation message, requires the validation property set either to 
     * valid or invalid.
     */
    validationMessage?: null | string;
}

/**
 * CheckboxField Emits
 */
export interface CheckboxFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | boolean | number | string | (string | number)[]): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'CheckboxField'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';

// Define Component
const props = defineProps<CheckboxFieldProps>();
const emits = defineEmits<CheckboxFieldEmits>();

// States
const value = computed({
    get() {
        return props.modelValue || null;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});
const fieldId = computed<string>(() => props.id || `field-${crypto.randomUUID().replace(/\-/g, '')}`);
</script>

<style scoped>
.field-checkbox {
    @apply inline-flex;
}

.checkbox-input {
    @apply hidden;
}

.checkbox-input ~ .checkbox-label {
    @apply flex items-center relative gap-3;
    @apply duration-300 ease-in-out;
    transition-property: background-color, border-color, color;
    
    &::before {
        @apply w-6 h-6 border rounded shadow-none bg-no-repeat bg-center;
        @apply duration-200 ease-in-out;
        content: "";
        background-size: 0px 0px;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0ZjQ2ZTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGVjayI+PHBhdGggZD0iTTIwIDYgOSAxN2wtNS01Ii8+PC9zdmc+');
        transition-property: background-color, background-size, border-color, color;
    }
    
    .dark &::before {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxODE4MWIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGVjayI+PHBhdGggZD0iTTIwIDYgOSAxN2wtNS01Ii8+PC9zdmc+');
    }

    & span {
        @apply text-sm font-semibold pt-px;
    }
}

.checkbox-input:checked ~ .checkbox-label {
    &::before {
        background-size: 16px 16px;
    }
}

.checkbox-input {
    &:not(:disabled) ~ .checkbox-label {
        @apply cursor-pointer;
    }
    &:disabled ~ .checkbox-label {
        @apply cursor-not-allowed;
    }

    & ~ .checkbox-label {
        @apply text-zinc-800 dark:text-zinc-300;
    }
    &:disabled ~ .checkbox-label {
        @apply text-zinc-400 dark:text-zinc-500;
    }

    & ~ .checkbox-label::before {
        @apply border-zinc-300 bg-white;
        @apply dark:border-zinc-600 dark:bg-zinc-900;
    }
    &:not(:disabled):checked ~ .checkbox-label::before {
        @apply border-indigo-600 bg-white;
        @apply dark:border-indigo-500 dark:bg-indigo-500;
    }
    &:disabled ~ .checkbox-label::before {
        @apply border-zinc-400 bg-zinc-200;
        @apply dark:border-zinc-600 dark:bg-zinc-800;
    }
    &:disabled:checked ~ .checkbox-label::before {
        @apply border-indigo-400 bg-indigo-100;
        @apply dark:border-indigo-800 dark:bg-indigo-800;
    }
}

.field-checkbox:hover .checkbox-input {
    &:not(:disabled) ~ .checkbox-label::before {
        @apply border-indigo-400;
        @apply dark:border-indigo-600;
    }

    &:not(:disabled):checked ~ .checkbox-label::before {
        @apply border-indigo-800;
        @apply dark:border-indigo-400;
    }
}

.is-valid .field-checkbox,
.field-checkbox.field-valid {
    & .checkbox-input:not(:disabled) ~ .checkbox-label::before {
        @apply border-success-700 bg-success-50;
        @apply dark:border-success-600 dark:bg-success-950;
    }
}

.is-invalid .field-checkbox,
.field-checkbox.field-invalid {
    & .checkbox-input:not(:disabled) ~ .checkbox-label::before {
        @apply border-danger-700 bg-danger-50;
        @apply dark:border-danger-600 dark:bg-danger-950;
    }
}

/** Sizes */
.field-checkbox.field-sm .checkbox-input ~ .checkbox-label {
    @apply gap-2;
    
    &::before {
        @apply w-4 h-4;
        background-size: 12px 12px;
    }

    & span {
        @apply text-xs;
    }
}

.field-checkbox.field-lg .checkbox-input ~ .checkbox-label {
    @apply gap-4;

    &::before {
        @apply w-8 h-8;
        background-size: 24px 24px;
    }

    & span {
        @apply text-base;
    }
}
</style>
