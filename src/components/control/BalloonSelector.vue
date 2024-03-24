<template>
    <div :id="fieldId" :class="[
        'field-input', 
        `field-balloon-selector`, 
        props.size ? `field-${props.size}` : '',
        props.validation ? `field-${props.validation}` : '',
        props.condensed ? `field-condensed`: '',
        props.connected ? `field-connected`: ''
    ]">
        <label v-for="(option, idx) of props.options" :key="idx" 
            :id="`${fieldId}-${idx}`"
            :class="{
                'balloon-item': true,
                'item-disabled': isDisabled || (!Array.isArray(option) ? option.disabled : false),
                'item-required': isRequired,
                'item-checked': isChecked(option)
            }"
            :aria-label="Array.isArray(option) ? option[1] || option[0].toString() : option.label"
            :title="Array.isArray(option) ? option[1] || option[0].toString() : option.label"
            @click.prevent="() => onSelect(option)">
            <input :id="`${fieldId}-${idx}`"
                :type="props.multiple ? 'checkbox' : 'radio'" 
                :name="`${props.name || props.id}${(props.multiple ? '[]' : '')}`"
                :value="Array.isArray(option) ? option[0] : option.value"
                :disabled="isDisabled || (!Array.isArray(option) ? option.disabled : false)"
                :required="isRequired"
                :checked="isChecked(option)" />
            <slot name="default" v-bind="props" :option="option" :idx="idx">
                <div class="item-label">
                    <template v-if="!Array.isArray(option) && option.icon && (option.placement || 'left') != 'right'">
                        <component :is="option.icon" v-bind="iconBinding" class="label-icon" />
                    </template>
                    
                    <template v-if="!(!Array.isArray(option) && option.icon && (option.placement || 'left') == 'icon')">
                        <span class="label-text">{{ Array.isArray(option) ? option[1] || option[0] : option.label }}</span>
                    </template>

                    <template v-if="!Array.isArray(option) && option.icon && (option.placement || 'left') == 'right'">
                        <component :is="option.icon" v-bind="iconBinding" class="label-icon" />
                    </template>
                </div>
            </slot>
        </label>
    </div>
</template>

<script lang="ts">
import type { Component, MaybeRef } from 'vue';

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
     * The option icon, shown next to the option label.
     */
    icon?: null | Component;

    /**
     * Whether to show the additional icon on the left or right side or as replacement to the label itself.
     */
    placement?: 'left' | 'right' | 'icon';

    /**
     * The disabled state for this balloon option.
     */
    disabled?: boolean;

    /**
     * Additional attributes for this balloon option, can be used on the `item` slot.
     */
    [key: string]: any;
}
export type BalloonSelectorOptionTypes = SimpleOption|AdvancedOption;

/**
 * BalloonSelector Properties
 */
export interface BalloonSelectorProps {
    /**
     * A custom balloon selector id, usually passed by the FormControl component. The default value 
     * is an auto-generated UUID.
     */
    id?: null | string;

    /**
     * The name attribute for this balloon selector.
     */
    name?: null | string;

    /**
     * The value for this balloon selector, must be passed as v-model value.
     */
    modelValue?: null | string | number | (string|number)[];

    /**
     * The available options to be available on this balloon selector field.
     */
    options: BalloonSelectorOptionTypes[];

    /**
     * The desired size for this balloon selector, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * Additional properties passed to the icon component if present, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * Whether to apply the condensed style on this balloon selector or not.
     */
    condensed?: boolean;

    /**
     * Whether to show the options in a connected style or not.
     */
    connected?: boolean;

    /**
     * Whether to support the selection of multiple options or not.
     */
    multiple?: boolean;

    /**
     * Whether to support deselecting a selected option, on non-multiple fields, or not.
     */
    unselect?: boolean;

    /**
     * The disabled state for this balloon selector.
     */
    disabled?: MaybeRef<boolean>;

    /**
     * The readonly state for this balloon selector.
     */
    readonly?: MaybeRef<boolean>;

    /**
     * The required state for this balloon selector.
     */
    required?: MaybeRef<boolean>;

    /**
     * The validation state for this balloon selector.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * Additional balloon selector validation message, requires the validation property set either to 
     * valid or invalid.
     */
    validationMessage?: null | string;
}

/**
 * BalloonSelector Slot
 */
export interface BalloonSelectorSlots {
    /**
     * Custom balloon item content slot, used instead of the default option icon / label.
     * @param props 
     */
    default(props: BalloonSelectorProps & { option: BalloonSelectorOptionTypes, idx: number }): any;
}

/**
 * BalloonSelector Emits
 */
export interface BalloonSelectorEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | string | number | (string|number)[]): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'BalloonSelector'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import uuid from '@/utils/uuid';

// Define Component
const props = defineProps<BalloonSelectorProps>();
const slots = defineSlots<BalloonSelectorSlots>();
const emits = defineEmits<BalloonSelectorEmits>();

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
    } else if (toValue(props.readonly || false) || typeof props.readonly == 'string') {
        return true;
    } else {
        return false;
    }
});
const isRequired = computed<boolean>(() => toValue(props.required || false) || typeof props.required == 'string');
const iconBinding = computed<{ [key: string]: any }>(() => {
    const result = {
        size: (props.size || 'md') == 'lg' ? 24 : 16,
        strokeWidth: (props.size || 'md') == 'lg' ? 1.5 : 2,
    };
    return Object.assign(result, props.iconProps || {});
});

/**
 * Check if option is selected or nor
 * @param option
 * @returns
 */
function isChecked(option: BalloonSelectorOptionTypes): boolean {
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
function onSelect(option: BalloonSelectorOptionTypes) {
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
    } else {
        if (value.value == val && props.unselect) {
            value.value = null;
        } else if (value.value != val) {
            value.value = val;
        }
    }
}
</script>

<style scoped>
.field-balloon-selector {
    @apply flex flex-col gap-2;

    @screen lg {
        @apply flex-row;
    }
}

.balloon-item {
    @apply w-full relative cursor-pointer border border-solid;
    @apply transition-colors duration-300 ease-in-out;

    &:first-child {
        @apply rounded-t-md;
    }

    &:last-child {
        @apply rounded-b-md;
    }

    @screen md {
        @apply w-auto;

        &:first-child {
            @apply rounded-l-md rounded-r-none;
        }

        &:last-child {
            @apply rounded-r-md rounded-l-none;
        }
    }

    &.item-disabled {
        @apply cursor-not-allowed;
        @apply bg-gray-100 border-gray-300 text-gray-400;
        @apply dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500;
    }

    &:not(.item-disabled) {
        @apply bg-transparent border-gray-300 text-gray-900;
        @apply dark:bg-transparent dark:border-gray-700 dark:text-gray-200;

        &:hover {
            @apply bg-gray-50 border-gray-400;
            @apply dark:bg-gray-800 dark:border-gray-600;
        }
    }

    &:not(.item-disabled).item-checked {
        @apply bg-primary-50 border-primary-600 text-primary-600;
        @apply dark:bg-primary-900/50 dark:border-primary-500 dark:text-primary-300;
    }

    &.item-disabled.item-checked {
        @apply bg-primary-100 border-primary-300 text-primary-400;
        @apply dark:bg-primary-950/50 dark:border-primary-800 dark:text-primary-500;
    }

    .is-invalid &:not(.item-disabled),
    .field-invalid &:not(.item-disabled) {
        @apply border-danger-600;

        &.item-checked {
            @apply bg-danger-50 text-danger-600;
            @apply dark:bg-danger-900 dark:text-danger-300;
        }
    }

    .is-valid &:not(.item-disabled),
    .field-valid &:not(.item-disabled) {
        @apply border-success-600;

        &.item-checked {
            @apply bg-success-50 text-success-600;
            @apply dark:bg-success-900 dark:text-success-300;
        }
    }

    & input {
        @apply invisible absolute right-0 w-0 h-0;
    }

    & :slotted(.item-label) {
        @apply h-full inline-flex flex-row gap-2 text-sm font-semibold px-5 items-center;
        padding-top: calc(0.875rem - 1px);
        padding-bottom: calc(0.875rem - 1px);
    }
}

/** Sizes */
.field-balloon-selector.field-sm {
    & .balloon-item :slotted(.item-label) {
        @apply text-xs px-3.5;
        padding-top: calc(0.75rem - 1px);
        padding-bottom: calc(0.75rem - 1px);
    }
}
.field-balloon-selector.field-lg {
    & .balloon-item :slotted(.item-label) {
        @apply text-base px-7;
        padding-top: calc(1.0rem - 1px);
        padding-bottom: calc(1.0rem - 1px);
    }
}

/** Connected */
.field-balloon-selector.field-connected {
    @apply gap-0;

    & .balloon-item:not(:first-child) {
        @apply -mt-px;

        @screen md {
            @apply mt-0 -ml-px;
        }
    }
}

/** Condensed */
.field-balloon-selector.field-condensed {
    & .balloon-item {
        @apply border-0;
    }
}
</style>
