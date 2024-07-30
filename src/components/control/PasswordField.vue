<template>
    <div class="field-group" :class="[`field-group-${props.size || 'md'}`]">
        <InputField v-bind="props" 
            :type="visible ? 'text' : 'password'" 
            v-model="value" />
        <ActionButton 
            :icon="visible ? LucideEyeOn : LucideEyeOff" 
            :size="(props.size || 'md') == 'sm' ? 'sm' : 'md'" 
            @click="visible = !visible" 
            tabindex="-1" />
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';
import type { SharedControlProps } from '../form/FormControl.vue';

export type PasswordAutoCompleteValues = 'new-password' | 'current-password' | 'one-time-code' | 'webauthn';

/**
 * PasswordField Properties
 */
export interface PasswordFieldProps extends SharedControlProps<null | string> {
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
import ActionButton from '../button/ActionButton.vue';
import InputField from '../control/InputField.vue';
import LucideEyeOn from '../lucide/EyeOn.vue';
import LucideEyeOff from '../lucide/EyeOff.vue';

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
    @apply top-1 right-1 absolute;
}

.field-group-lg {
    & :deep(.btn-action) {
        @apply top-3 right-2;
    }
}
</style>
