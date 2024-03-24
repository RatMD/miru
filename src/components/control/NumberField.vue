<template>
    <div class="field-group">
        <ActionButton :icon="LucideMinusSign" :size="props.size || 'md'" @click="onDecrease" :disabled="reachedMin" />
        <InputField v-bind="props" type="text" @keydown="onKeyDown" @input.prevent="onInput" inputmode="numeric" v-model="value" />
        <ActionButton :icon="LucidePlusSign" :size="props.size || 'md'" @click="onIncrease" :disabled="reachedMax" />
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';

/**
 * NumberField Properties
 */
export interface NumberFieldProps {

    /**
     * A custom number field id, usually passed by the FormControl component. The default value is an 
     * auto-generated UUID.
     */
     id?: null | string;

    /**
     * The name attribute for this number field.
     */
    name?: null | string;

    /**
     * The value for this number field, must be passed as v-model value.
     */
    modelValue?: null | number | string;

    /**
     * The placeholder attribute for this number field.
     */
    placeholder?: null | string;

    /**
     * The minimum supported value for this number field.
     */
    min?: number;

    /**
     * The maximum supported value for this number field.
     */
    max?: number;

    /**
     * The supported increase / decrease step for this number field.
     */
    step?: number;

    /**
     * Whether to force an integer value for this number field or a double / float.
     */
    integer?: boolean;

    /**
     * The desired size for this number field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The validation state for this number field.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * Additional number field validation message, requires the validation property set either to 
     * valid or invalid.
     */
    validationMessage?: null | string;

    /**
     * The disabled state for this number field.
     */
    disabled?: MaybeRef<boolean>;

    /**
     * The readonly state for this number field.
     */
    readonly?: MaybeRef<boolean>;

    /**
     * The required state for this number field.
     */
    required?: MaybeRef<boolean>;
}

/**
 * NumberField Emits
 */
 export interface NumberFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | number | string): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'NumberField'
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import ActionButton from '../button/ActionButton.vue';
import InputField from '../control/InputField.vue';
import LucideMinusSign from '../lucide/MinusSign.vue';
import LucidePlusSign from '../lucide/PlusSign.vue';

// Define Component
const props = defineProps<NumberFieldProps>();
const emits = defineEmits<NumberFieldEmits>();

// States
const value = computed({
    get() {
        return props.modelValue || props.modelValue === 0 ? props.modelValue : null;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});

const numericValue = computed<number>(() => {
    const val = props.integer ? parseInt((props.modelValue || '0') as string) : parseFloat((props.modelValue || '0') as string);
    return isNaN(val) ? 0 : val;
});

const reachedMin = computed<boolean>(() => {
    return numericValue.value <= (props.min || -Infinity);
});

const reachedMax = computed<boolean>(() => {
    return numericValue.value >= (props.max || Infinity);
});

/**
 * Handle Keydown Event
 * @param ev 
 */
function onKeyDown(ev: KeyboardEvent) {
    if (ev.key == 'ArrowUp') {
        ev.preventDefault();
        onIncrease();
    }
    if (ev.key == 'ArrowDown') {
        ev.preventDefault();
        onDecrease();
    }
}

/**
 * Handle Input Event
 * @param ev 
 */
function onInput(ev: Event) {
    ev.preventDefault();
    let target = ev.target;
    if (!(target && target instanceof HTMLInputElement)) {
        return;
    }

    let newValue: any = target.value.replace(/[^0-9,.]+/, '');
    if (props.integer) {
        newValue = isNaN(parseInt(newValue)) ? false : newValue;
    } else {
        newValue = isNaN(parseFloat(newValue.replace(/,/, '.'))) ? false : newValue;
    }
    value.value = newValue === false ? 0 : newValue;
}

/**
 * Decrease Value by step
 */
 function onDecrease() {
    let newValue = numericValue.value;
    if (!reachedMin.value) {
        newValue -= (props.step || 1);
    }
    value.value = newValue;
}

/**
 * Increase Value by step
 */
function onIncrease() {
    let newValue = numericValue.value;
    if (!reachedMax.value) {
        newValue += (props.step || 1);
    }
    value.value = newValue;
}
</script>

<style scoped>
.field-group {
    @apply w-full relative;
}

:deep(.field-input) {
    @apply px-12 text-center;
}

:deep(.btn-action:first-child) {
    @apply top-2 left-2 absolute;
}

:deep(.btn-action:last-child) {
    @apply top-2 right-2 absolute;
}
</style>
