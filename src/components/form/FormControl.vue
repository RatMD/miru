<template>
    <div class="form-control" :class="{
        'is-valid': props.validation == 'valid',
        'is-invalid': props.validation == 'invalid',
        'is-disabled': props.disabled,
        'is-required': props.required,
    }" :data-input="props.name ? props.name : void 0">
        <slot name="label" v-bind="props" :id="controlId">
            <label :for="controlId" class="control-label" v-if="(typeof props.label =='string' && props.label.length > 0)">
                {{ props.label }}
            </label>
        </slot>

        <div class="control-field">
            <slot name="default" v-bind="props" :id="controlId" />
        </div>
        
        <div class="control-footer control-validation" v-if="validationVisible">
            <slot name="validation" v-bind="props" :id="controlId">
                <p class="footer-text" :class="`${props.validation}-text`">
                    {{ props.validationMessage }}
                </p>
            </slot>
        </div>

        <div class="control-footer control-description" v-if="descriptionVisible">
            <slot name="description" v-bind="props" :id="controlId">
                <p class="footer-text">
                    {{ props.description }}
                </p>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';

/**
 * FormControl Properties
 */
export interface FormControlProps {
    /**
     * A custom form control id, used to assign the labels to the respective field, is passed to 
     * the field itself as well. Default value is an auto-generated UUID.
     */
    id?: null | string;

    /**
     * The input name of this form control, is also passed to the control field itself as well.
     */
    name?: null | string;

    /**
     * Primary form control label, shown above the control field itself in most cases.
     */
    label?: null | string;

    /**
     * Additional form control description text, shown below this control field.
     */
    description?: null | string;

    /**
     * The validation state for this form control.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * Additional form control validation message, requires the validation property set either to 
     * valid or invalid.
     */
    validationMessage?: null | string;

    /**
     * The disabled state of this form control, is also passed to the control field itself as well.
     */
    disabled?: MaybeRef<boolean>;

    /**
     * The required state of this form control, is also passed to the control field itself as well.
     */
    required?: MaybeRef<boolean>;

    /**
     * Whether to display the validation message above the description (when both are available) or 
     * to toggle between them depending if the validation message is set or not (default).
     */
    vad?: boolean;
}
/**
 * FormControl Slots
 */
export interface FormControlSlots {
    /**
     * The default form control field.
     * @param props 
     */
    default(props: Omit<FormControlProps, 'id'> & { id: string }): any;

    /**
     * Custom form control label slot.
     * @param props 
     */
    label(props: Omit<FormControlProps, 'id'> & { id: string }): any;

    /**
     * Custom form control validation message slot.
     * @param props 
     */
    validation(props: Omit<FormControlProps, 'id'> & { id: string }): any;

    /**
     * Custom form control description slot.
     * @param props 
     */
    description(props: Omit<FormControlProps, 'id'> & { id: string }): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'FormControl'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import uuid from '../../utils/uuid';

// Define Component
const props = defineProps<FormControlProps>();
const slots = defineSlots<FormControlSlots>();

// States
const controlId = computed<string>(() => props.id || `field-${uuid().replace(/-/g, '')}`);

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
        return validationVisible.value == false || (validationVisible.value && props.vad);
    }
})
</script>

<style scoped>
.form-control {
    @apply flex flex-col gap-2;
}

:slotted(.control-label) {
    @apply px-1 font-semibold text-sm;    
}

.control-field {
    @apply flex;
}

.control-footer {
    @apply px-1;
    
    & :slotted(.footer-text) {
        @apply text-sm;
    }
    & :slotted(.invalid-text) {
        @apply text-danger-600;
    }
    & :slotted(.valid-text) {
        @apply text-success-600;
    }
}
</style>
