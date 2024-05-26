<template>
    <div :id="fieldId" :class="[
        'field-input', 
        `field-selectable-list`, 
        props.size ? `field-${props.size}` : '',
        props.validation ? `field-${props.validation}` : '',
    ]">
        <template v-if="props.multiple">
            <CheckboxField v-for="(option, idx) of props.options" :key="`${fieldId}-${idx}`"
                :label="Array.isArray(option) ? (option[1] || option[0]).toString() : option.label"
                :value="Array.isArray(option) ? option[0].toString() : option.value"
                :tabindex="props.tabindex"
                :disabled="isDisabled || (!Array.isArray(option) ? option.disabled : false)"
                :required="isRequired"
                :size="props.size"
                v-model="(value as number | string)" />
        </template>

        <template v-else>
            <RadioField v-for="(option, idx) of props.options" :key="`${fieldId}-${idx}`"
                :label="Array.isArray(option) ? (option[1] || option[0]).toString() : option.label"
                :value="Array.isArray(option) ? option[0].toString() : option.value"
                :tabindex="props.tabindex"
                :disabled="isDisabled || (!Array.isArray(option) ? option.disabled : false)"
                :required="isRequired"
                :size="props.size"
                v-model="(value as number | string)" />
        </template>
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';
import type { SharedControlProps } from '../form/FormControl.vue';

export type SimpleOption = [string|number] | [string|number, string];
export interface AdvancedOption {
    /**
     * The option value, written to the modelValue.
     */
    value: string;

    /**
     * The option label, shown to the user.
     */
    label: string;

    /**
     * The disabled state for this balloon option.
     */
    disabled?: boolean;
}
export type SelectableListOptionTypes = SimpleOption|AdvancedOption;

/**
 * SelectableList Properties
 */
export interface SelectableListProps extends SharedControlProps<null | string | number | (string|number)[]> {
    /**
     * The available options to be available on this selectable list field.
     */
    options: SelectableListOptionTypes[];

    /**
     * The desired size for this selectable list, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * Whether to support the selection of multiple options or not.
     */
    multiple?: boolean;
}

/**
 * BalloonSelector Emits
 */
export interface SelectableListEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | string | number | (string|number)[]): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'SelectableList'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import CheckboxField from '../control/CheckboxField.vue';
import RadioField from '../control/RadioField.vue';
import uuid from '../../utils/uuid';

// Define Component
const props = defineProps<SelectableListProps>();
const emits = defineEmits<SelectableListEmits>();

// States
const value = computed({
    get() {
        let val = props.modelValue || null;
        if (props.multiple) {
            return val === null ? [] : (Array.isArray(val) ? val : [val]);
        } else {
            return val;
        }
    },
    set(value: null | string | number | (string|number)[]) {
        if (props.multiple) {
            emits('update:modelValue', value === null ? [] : Array.isArray(value) ? value : [value]);
        } else {
            emits('update:modelValue', Array.isArray(value) ? value[0] || null : value);
        }
    }
});
const fieldId = computed<string>(() => props.id || `field-${uuid().replace(/-/g, '')}`);
const isDisabled = computed<boolean>(() => {
    if (toValue(props.disabled || false) || typeof props.disabled == 'string') {
        return true;
    } else {
        return false;
    }
});
const isRequired = computed<boolean>(() => toValue(props.required || false) || typeof props.required == 'string');

/**
 * Check if option is selected or nor
 * @param option
 * @returns
 */
 function isChecked(option: SelectableListOptionTypes): boolean {
    let val = Array.isArray(option) ? option[0] : option.value;
    if (props.multiple) {
        return Array.isArray(value.value) && value.value.includes(val);
    } else {
        return !Array.isArray(value.value) && value.value == val;
    }
}

/**
 * Select an option
 * @param option 
 */
function onSelect(option: SelectableListOptionTypes) {
    if (props.disabled || (!Array.isArray(option) && (option.disabled || false))) {
        return;
    }

    let val = Array.isArray(option) ? option[0] : option.value;
    if (props.multiple) {
        let values = [...(value.value as (string|number)[])];
        let idx = values.indexOf(val);

        if (idx >= 0) {
            values.splice(idx, 1);
        } else {
            values.push(val);
        }
        value.value = values;
    } else if (value.value != val) {
        value.value = val;
    }
}
</script>

<style scoped>
.field-selectable-list {
    @apply flex flex-col gap-2;
}
</style>
