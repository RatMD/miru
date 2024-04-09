<template>
    <div class="form-wizard-page">
        <slot />
    </div>
</template>

<script lang="ts">
import type { FormHandler, ValidationResult } from '../../composables/use-form';

/**
 * FormWizardPage Properties
 */
export interface FormWizardPageProps {
    /**
     * Current Form Wizard Page.
     */
    form?: FormHandler<any>;

    /**
     * The desired form keys to validate.
     */
    validation?: string[];
}

/**
 * FormWizardPage Slots
 */
export interface FormWizardPageSlots {
    /**
     * Default Content Slot
     */
    default(): any;
}

/**
 * FormWizardPage Events
 */
export interface FormWizardPageEmits {
    /**
     * Event handler when FormWizardPage is valid.
     */
    (ev: 'valid', result: ValidationResult<any>): void;
    
    /**
     * Event handler when FormWizardPage is valid.
     */
    (ev: 'invalid', result: ValidationResult<any>): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'FormWizardPage'
}
</script>

<script lang="ts" setup>
// Define Component
const props = defineProps<FormWizardPageProps>();
const slots = defineSlots<FormWizardPageSlots>();
const emits = defineEmits<FormWizardPageEmits>();

/**
 * Validate current WizardPage.
 * @returns
 */
function validate() {
    if (!props.form || typeof props.validation == 'undefined' || props.validation.length == 0) {
        return true;
    } else {
        const result = props.form.validate(props.validation);
        if (result.valid) {
            emits('valid', result);
            return true;
        } else {
            emits('invalid', result);
            return true;
        }
    }
}

// Expose Component
defineExpose({
    validate
});
</script>

<style scoped>
.form-wizard-page {
    @apply h-full grow-0 shrink-0 basis-full overflow-x-auto pb-16;

    & :deep(.flex-container) {
        max-width: 450px;
    }
}
</style>
