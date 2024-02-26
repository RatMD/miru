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
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<PasswordFieldProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<PasswordFieldProps>>> & {
    "onUpdate:modelValue"?: (value: string) => any;
}, {}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
