<template>
    <div :id="fieldId" :class="[
        'field-input', 
        `field-switch`, 
        props.size ? `field-${props.size}` : '',
        props.validation ? `field-${props.validation}` : ''
    ]">
        <input :id="`${fieldId}-input`"
            type="checkbox" 
            class="switch-input"
            :name="props.name || fieldId"
            :value="true"
            :disabled="toValue(props.disabled || false) || typeof disabled == 'string'"
            :readonly="toValue(props.readonly || false) || typeof readonly == 'string'"
            :required="toValue(props.required || false) || typeof required == 'string'"
            v-model="value" />
        <label :for="`${fieldId}-input`" class="switch-label">
            <span v-if="props.label">{{ props.label }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';

/**
 * SwitchField Properties
 */
export interface SwitchFieldProps {
    /**
     * A custom switch field id, usually passed by the FormControl component. The default value 
     * is an auto-generated UUID.
     */
    id?: null | string;

    /**
     * The label for this switch field.
     */
    label?: null | string;

    /**
     * The name attribute for this switch field.
     */
    name?: null | string;

    /**
     * The value for this switch field, must be passed as v-model value.
     */
    modelValue?: null | boolean;

    /**
     * The desired size for this switch field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The disabled state for this switch field.
     */
    disabled?: MaybeRef<boolean>;

    /**
     * The readonly state for this switch field.
     */
    readonly?: MaybeRef<boolean>;

    /**
     * The required state for this switch field.
     */
    required?: MaybeRef<boolean>;

    /**
     * The validation state for this switch field.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * Additional checkbox field validation message, requires the validation property set either to 
     * valid or invalid.
     */
    validationMessage?: null | string;
}

/**
 * SwitchField Emits
 */
export interface SwitchFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | string | number | boolean): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'SwitchField'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';

// Define Component
const props = defineProps<SwitchFieldProps>();
const emits = defineEmits<SwitchFieldEmits>();

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

<style>
.field-switch {
    @apply inline-flex;
}

.switch-input {
    @apply hidden;
}

.switch-input ~ .switch-label {
    @apply flex items-center relative gap-3;
    @apply duration-200 ease-in-out transition-colors;
    
    &::before {
        @apply w-12 h-6 border rounded-full shadow-none;
        @apply duration-200 ease-in-out transition-colors;
        content: "";
    }

    &::after {
        @apply w-4 h-4 left-1 top-1 absolute rounded-full;
        @apply duration-200 ease-in-out;
        @apply bg-primary-600;
        transition-property: background-color, left;
        content: "";
    }
    
    & span {
        @apply text-sm font-semibold pt-px;
    }
}

.switch-input:checked ~ .switch-label {
    &::after {
        @apply left-7;
    }
}

.switch-input {
    &:not(:disabled) ~ .switch-label {
        @apply cursor-pointer;
    }
    &:disabled ~ .switch-label {
        @apply cursor-not-allowed;
    }

    & ~ .switch-label {
        @apply text-zinc-800 dark:text-zinc-300;
    }
    &:disabled ~ .switch-label {
        @apply text-zinc-400 dark:text-zinc-500;
    }

    & ~ .switch-label::before {
        @apply border-zinc-300 bg-white;
        @apply dark:border-zinc-600 dark:bg-zinc-900;
    }
    &:not(:disabled):checked ~ .switch-label::before {
        @apply border-indigo-600 bg-white;
        @apply dark:border-indigo-500 dark:bg-indigo-500;
    }
    &:disabled ~ .switch-label::before {
        @apply border-zinc-400 bg-zinc-200;
        @apply dark:border-zinc-600 dark:bg-zinc-800;
    }
    &:disabled:checked ~ .switch-label::before {
        @apply border-indigo-400 bg-indigo-100;
        @apply dark:border-indigo-800 dark:bg-indigo-800;
    }
}

.field-switch:hover .switch-input {
    &:not(:disabled) ~ .switch-label::before {
        @apply border-indigo-400;
        @apply dark:border-indigo-600;
    }

    &:not(:disabled):checked ~ .switch-label::before {
        @apply border-indigo-800;
        @apply dark:border-indigo-400;
    }
}

.is-valid .field-switch,
.field-switch.field-valid {
    & .switch-input:not(:disabled) ~ .switch-label {
        &::before {
            @apply border-success-700 bg-success-50;
            @apply dark:border-success-600 dark:bg-success-950;
        }
        &::after {
            @apply bg-success-700;
        }
    }
}

.is-invalid .field-switch,
.field-switch.field-invalid {
    & .switch-input:not(:disabled) ~ .switch-label {
        &::before {
            @apply border-danger-700 bg-danger-50;
            @apply dark:border-danger-600 dark:bg-danger-950;
        }
        &::after {
            @apply bg-danger-700;
        }
    }
}

/** Sizes */
.field-switch.field-sm .switch-input {
    & ~ .switch-label {
        @apply gap-2;
        
        &::before {
            @apply w-8 h-4;
        }

        &::after {
            @apply w-2.5 h-2.5;
        }

        & span {
            @apply text-xs;
        }
    }

    &:checked ~ .switch-label {
        &::after {
            left: 1.175rem;
        }
    }
}

.field-switch.field-lg .switch-input {
    & ~ .switch-label {
        @apply gap-4;

        &::before {
            @apply w-16 h-8;
        }

        &::after {
            @apply w-6 h-6;
        }

        & span {
            @apply text-base;
        }
    }

    &:checked ~ .switch-label {
        &::after {
            @apply left-9;
        }
    }
}
</style>
