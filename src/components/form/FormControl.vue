<template>
    <div :class="{
        'form-control': true,
        'is-valid': props.validation == 'valid',
        'is-invalid': props.validation == 'invalid',
        'is-loading': props.loading,
        'is-disabled': props.disabled,
        'is-required': props.required,
        'is-vad': validationVisible && descriptionVisible && props.vad,
    }" :data-input="props.name ? props.name : void 0">
        <slot name="label" v-bind="passed">
            <label :for="controlId" class="control-label" v-if="(typeof props.label =='string' && props.label.length > 0)">
                {{ props.label }}
                <span v-if="props.required">*</span>
            </label>
        </slot>

        <slot name="field" v-bind="passed">
            <div class="control-field">
                <slot name="icon" v-bind="passed">
                    <div class="field-icon animate-spin" v-if="toValue(props.loading || false)">
                        <component 
                            :is="props.iconLoading ? props.iconLoading : LucideLoaderCircle" 
                            v-bind="props.iconLoadingProps || props.iconProps || { class: 'size-4' }" />
                    </div>
                    <div class="field-icon" v-else-if="props.icon">
                        <component :is="props.icon" v-bind="props.iconProps || { class: 'size-4' }" />
                    </div>
                </slot>
                <slot name="default" v-bind="passed" />
            </div>
        </slot>

        <div class="control-footer">
            <slot name="footer" v-bind="passed">
                <slot name="validation" v-bind="passed" v-if="validationVisible">
                    <p class="footer-validation footer-text" :class="`${props.validation}-text`">
                        {{ props.validationMessage }}
                    </p>
                </slot>

                <slot name="description" v-bind="passed" v-if="descriptionVisible">
                    <p class="footer-description footer-text">
                        {{ props.description }}
                    </p>
                </slot>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import type { Component, MaybeRef } from 'vue';

/**
 * Shared Control Properties, available as `control` parameter on the `default` slot, to simple 
 * pass the desired values using `v-bind`. Example:
 * 
 * ```
 *      <FormControl v-slot="{ control }">
 *          <InputField v-bind="control" />
 *      </FormControl>
 * ```
 */
export interface SharedControlProps<T = any> {
    /**
     * A unique form control field id, using an auto-generated UUID by default.
     */
    id?: null | string;

    /**
     * The name attribute for this form control field.
     */
    name?: null | string;

    /**
     * The tabindex attribute for this form control field.
     */
    tabindex?: number | string;

    /**
     * The v-model value attribute for this form control field.
     */
    modelValue?: T;

    /**
     * The loading state for this form control field.
     */
    loading?: MaybeRef<boolean> | boolean;

    /**
     * The disabled state for this form control field.
     */
    disabled?: MaybeRef<boolean> | boolean;

    /**
     * The required state for this form control field.
     */
    required?: MaybeRef<boolean> | boolean;

    /**
     * The validation state for this form control field.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * The validation message for this form control field, required the validation property to be 
     * set either to valid or invalid as well.
     */
    validationMessage?: null | string;
}

/**
 * FormControl Properties
 */
export interface FormControlProps<T = any> extends SharedControlProps<T> {
    /**
     * Primary form control label, shown above the control field itself in most cases.
     */
    label?: null | string;

    /**
     * A custom icon, shown on the left side of supporting input fields.
     */
    icon?: Component | null;

    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * A custom icon, shown on the left side of supporting input fields, when loading state is passed.
     */
    iconLoading?: Component | null | false;

    /**
     * Additional properties passed to the loading icon component, such as `size` or `stroke-width`.
     */
    iconLoadingProps?: { [key: string]: any };

    /**
     * Additional form control description text, shown below this control field.
     */
    description?: null | string;

    /**
     * Whether to display the validation message above the description (when both are available) or 
     * to toggle between them depending if the validation message is set or not (default).
     */
    vad?: boolean;
}

/**
 * FormControl Slots
 */
export interface FormControlSlotProps<T = any> extends FormControlProps<T> {
    control: SharedControlProps<T>;
}

export interface FormControlSlots<T = any> {
    /**
     * The default form control field.
     * @param props 
     */
    default(props: FormControlSlotProps<T>): any;

    /**
     * Custom form control label slot.
     * @param props 
     */
    label(props: FormControlSlotProps<T>): any;

    /**
     * Custom form control field slot.
     * @param props 
     */
    field(props: FormControlSlotProps<T>): any;

    /**
     * Custom form control icon slot.
     * @param props 
     */
    icon(props: FormControlSlotProps<T>): any;

    /**
     * Custom form control footer message slot.
     * @param props 
     */
    footer(props: FormControlSlotProps<T>): any;
        
    /**
     * Custom form control validation message slot.
     * @param props 
     */
    validation(props: FormControlSlotProps<T>): any;

    /**
     * Custom form control description slot.
     * @param props 
     */
    description(props: FormControlSlotProps<T>): any;
}

/**
 * FormControl Events
 */
export interface FormControlEmits<T = any> {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: T): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'FormControl'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import LucideLoaderCircle from '../lucide/LoaderCircle.vue';
import uuid from '../../utils/uuid';

// Define Component
const props = defineProps<FormControlProps>();
const slots = defineSlots<FormControlSlots>();
const emits = defineEmits<FormControlEmits>();

// States
const controlId = computed<string>(() => props.id || `field-${uuid().replace(/-/g, '')}`);
const passed = computed<FormControlSlotProps>(() => ({
    ...props,
    control: {
        id: controlId.value,
        name: props.name,
        modelValue: props.modelValue,
        loading: props.loading,
        disabled: props.disabled,
        required: props.required,
        validation: props.validation,
        validationMessage: props.validationMessage,
        'onUpdate:modelValue': (val: any) => {
            emits('update:modelValue', val)
        }
    }
}))

// Check if form control validation  is shown or not.
const validationVisible = computed<boolean>(() => {
    let valid = props.validation || '';
    if (valid != 'valid' && valid != 'invalid') {
        return false;
    } else {
        let msg = props.validationMessage || null;
        return typeof msg == 'string' && msg.length > 0;
    }
});

// Check if form control description is shown or not.
const descriptionVisible = computed<boolean>(() => {
    let desc = (props.description || null);
    if (!desc || desc.length == 0) {
        return false;
    } else {
        return !validationVisible.value || props.vad;
    }
})
</script>

<style scoped>
.form-control {
    @apply flex flex-col gap-1;
}

:slotted(.control-label) {
    @apply px-1 mb-1 font-semibold text-sm;

    & span {
        @apply text-danger-600
    }
}

.control-field {
    @apply flex relative;

    & .field-icon {
        @apply absolute top-3 left-3;
    }
    & .field-icon + :deep(.field-input) {
        @apply pl-10;
    }
}

.control-footer {
    @apply px-1;

    .is-vad & {
        @apply flex flex-row-reverse justify-between;
    }
    
    & :slotted(.footer-text) {
        @apply text-xs;
    }

    & :slotted(.footer-validation) {
        @apply font-semibold;
    }

    & :slotted(.invalid-text) {
        @apply text-danger-600;
    }

    & :slotted(.valid-text) {
        @apply text-success-600;
    }
}
</style>
