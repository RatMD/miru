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
            :tabindex="props.tabindex"
            :disabled="toValue(props.disabled || false) || typeof disabled == 'string'"
            :required="toValue(props.required || false) || typeof required == 'string'"
            v-model="value" />
        <label :for="`${fieldId}-input`" class="switch-label">
            <span v-if="props.label">{{ props.label }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import type { SharedControlProps } from '../form/FormControl.vue';

/**
 * SwitchField Properties
 */
export interface SwitchFieldProps extends SharedControlProps<null | boolean> {
    /**
     * The label for this switch field.
     */
    label?: null | string;

    /**
     * The desired size for this switch field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
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
import uuid from '../../utils/uuid';

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
const fieldId = computed<string>(() => props.id || `field-${uuid().replace(/-/g, '')}`);
</script>

<style scoped>
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
        @apply w-10 h-5 border rounded-full shadow-none;
        @apply duration-200 ease-in-out transition-colors;
        content: "";
    }

    &::after {
        @apply w-3.5 h-3.5 left-1 top-1 absolute rounded-full;
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
        @apply left-5 ml-0.5;
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
            @apply w-2.5 h-2.5 ml-0;
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
            @apply w-12 h-6;
        }

        &::after {
            @apply w-4 h-4 mt-px ml-0;
        }

        & span {
            @apply text-base;
        }
    }

    &:checked ~ .switch-label {
        &::after {
            @apply left-7;
        }
    }
}
</style>
