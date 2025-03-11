<template>
    <div :id="fieldId" :class="[
        'field-input', 
        `field-balloon-selector`, 
        props.size ? `field-${props.size}` : '',
        props.validation ? `field-${props.validation}` : '',
        props.condensed ? `field-condensed`: '',
        props.column ? `field-column`: '',
        props.connected ? `field-connected`: '',
        $slots.default ? 'field-custom' : ''
    ]">
        <label v-for="(option, idx) of generate()" :key="idx" 
            :id="`${fieldId}-${idx}`"
            :class="{
                'balloon-item': true,
                'item-loading': isLoading,
                'item-disabled': isDisabled || option.disabled || false,
                'item-required': isRequired,
                'item-checked': isChecked(option.value)
            }"
            :aria-label="option.label"
            :title="option.label"
            @click.prevent="() => onSelect(option)">
            <input :id="`${fieldId}-${idx}`"
                :type="props.multiple ? 'checkbox' : 'radio'" 
                :name="`${props.name || props.id}${(props.multiple ? '[]' : '')}`"
                :value="option.value"
                :tabindex="props.tabindex"
                :disabled="isLoading || isDisabled || option.disabled || false"
                :required="isRequired"
                :checked="isChecked(option.value)" />
            <slot name="default" v-bind="props" :option="option" :idx="idx">
                <div class="item-label">
                    <template v-if="option.icon && (option.placement || 'left') != 'right'">
                        <component :is="option.icon" v-bind="iconBinding" class="label-icon" />
                    </template>
                    
                    <template v-if="!(option.icon && (option.placement || 'left') == 'icon')">
                        <span class="label-text">{{ option.label }}</span>
                    </template>

                    <template v-if="option.icon && (option.placement || 'left') == 'right'">
                        <component :is="option.icon" v-bind="iconBinding" class="label-icon" />
                    </template>
                </div>
            </slot>
        </label>
    </div>
</template>

<script lang="ts">
import type { Component } from 'vue';
import type { SharedControlProps } from '../form/FormControl.vue';

export type SimpleOption = string | [string|number, string];
export interface AdvancedOption {
    /**
     * The option value, written to the modelValue.
     */
    value: number | string;

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

export type BalloonSelectorValue = null | number | string | (number|string)[];

/**
 * BalloonSelector Properties
 */
export interface BalloonSelectorProps extends SharedControlProps<BalloonSelectorValue> {
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
     * Whether to show the options in rows (false) or columns (true).
     */
    column?: boolean;
}

/**
 * BalloonSelector Slot
 */
export interface BalloonSelectorSlotProps extends BalloonSelectorProps {
    /**
     * Current Option IDX
     */
    idx: number;

    /**
     * Current Option item
     */
    option: AdvancedOption;
}

export interface BalloonSelectorSlots {
    /**
     * Custom balloon item content slot, used instead of the default option icon / label.
     * @param props 
     */
    default(props: BalloonSelectorSlotProps): any;
}

/**
 * BalloonSelector Events
 */
export interface BalloonSelectorEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: BalloonSelectorValue): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'BalloonSelector'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import uuid from '../../utils/uuid';

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
    set(value) {
        if (props.multiple) {
            value = value == null ? [] : (Array.isArray(value) ? value : [value]);
            value = value.filter(el => el != null);
        } else {
            value = Array.isArray(value) ? value[0] || null : value;
        }
        emits('update:modelValue', value as BalloonSelectorValue);
    }
});
const fieldId = computed<string>(() => props.id || `field-${uuid().replace(/-/g, '')}`);
const isLoading = computed<boolean>(() => toValue(props.loading || false));
const isDisabled = computed<boolean>(() => {
    if (toValue(props.disabled || false) || typeof props.disabled == 'string') {
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
 * Options Generator
 * @returns
 */
function* generate(): Generator<AdvancedOption> {
    for (const option of props.options) {
        if (typeof option == 'object' && !Array.isArray(option)) {
            yield option;
        } else {
            yield {
                value: typeof option == 'string' ? option : option[0],
                label: typeof option == 'string' ? option : (option[1] || option[0].toString()),
                disabled: props.disabled ? toValue(props.disabled) : false
            }
        }
    }
}

/**
 * Check if option is selected or nor
 * @param val
 * @returns
 */
function isChecked(val: string | number): boolean {
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
function onSelect(option: AdvancedOption) {
    if (props.disabled || option.disabled) {
        return;
    }

    if (props.multiple) {
        let values = [...(value.value as (string|number)[])];
        let idx = values.indexOf(option.value);

        if (idx >= 0) {
            values.splice(idx, 1);
        } else {
            values.push(option.value);
        }
        value.value = values;
    } else {
        if (value.value == option.value && props.unselect) {
            value.value = null;
        } else if (value.value != option.value) {
            value.value = option.value;
        }
    }
}
</script>

<style scoped>
.field-balloon-selector {
    @apply w-full flex flex-col gap-2;

    @screen lg {
        &:not(.field-column) {
            @apply flex-row;
        }
    }
}

.balloon-item {
    @apply w-full relative cursor-pointer border border-solid first:rounded-t-md last:rounded-b-md;
    @apply transition-colors duration-200 ease-in-out;

    @screen lg {
        &:not(.field-column) {
            @apply w-auto first:rounded-l-md first:rounded-r-none last:rounded-r-md last:rounded-l-none;
        }
    }

    & input {
        @apply invisible absolute right-0 w-0 h-0;
    }

    & :slotted(.item-label) {
        @apply h-full inline-flex flex-row gap-2 text-sm font-semibold px-5 py-2 items-center whitespace-nowrap;
    }
}

/** States */
.balloon-item {
    @apply h-10;
    
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
}

/** Sizes */
.field-balloon-selector.field-sm {
    & .balloon-item {
        @apply h-8;
    }

    & .balloon-item :slotted(.item-label) {
        @apply px-3.5 py-1.5 text-xs;
    }
}

.field-balloon-selector.field-lg {
    & .balloon-item {
        @apply h-14;
    }
    
    & .balloon-item :slotted(.item-label) {
        @apply px-7 py-3.5 text-base;
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
