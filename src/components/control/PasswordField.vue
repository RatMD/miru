<template>
    <div class="field-group">
        <InputField v-bind="props" :type="visible ? 'text' : 'password'" v-model="value" />
        <ActionButton :icon="visible ? LucideEyeOn : LucideEyeOff" :size="props.size || 'md'" @click="visible = !visible" />
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';

export type PasswordAutoCompleteValues = 'new-password' | 'current-password' | 'one-time-code' | 'webauthn';

/**
 * PasswordField Properties
 */
export interface PasswordFieldProps {
    /**
     * A custom password field id, usually passed by the FormControl component. The default value is an 
     * auto-generated UUID.
     */
    id?: null | string;

    /**
     * The name attribute for this password field.
     */
    name?: null | string;

    /**
     * The value for this password field, must be passed as v-model value.
     */
    modelValue?: null | string;

    /**
     * The placeholder attribute for this password field.
     */
    placeholder?: null | string;

    /**
     * Additional browser-supported autocomplete attribute for this password field.
     */
    autocomplete?: PasswordAutoCompleteValues;

    /**
     * The desired size for this password field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The validation state for this password field.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * Additional password field validation message, requires the validation property set either to 
     * valid or invalid.
     */
    validationMessage?: null | string;

    /**
     * The disabled state for this password field.
     */
    disabled?: MaybeRef<boolean>;

    /**
     * The readonly state for this password field.
     */
    readonly?: MaybeRef<boolean>;

    /**
     * The required state for this password field.
     */
    required?: MaybeRef<boolean>;
}

/**
 * PasswordField Emits
 */
export interface PasswordFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: string | null): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'PasswordField'
};
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import ActionButton from '@/components/button/ActionButton.vue';
import InputField from '@/components/control/InputField.vue';
import LucideEyeOn from '@/components/lucide/EyeOn.vue';
import LucideEyeOff from '@/components/lucide/EyeOff.vue';

// Define Component
const props = defineProps<PasswordFieldProps>();
const emits = defineEmits<PasswordFieldEmits>();

// States
const visible = ref<boolean>(false);
const value = computed({
    get() {
        return props.modelValue || null;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});
</script>

<style scoped>
.field-group {
    @apply w-full relative;
}

:deep(.field-input) {
    @apply pr-12;
}

:deep(.btn-action) {
    @apply top-2 right-2 absolute;
}
</style>
