import type { MaybeRef } from 'vue';
export type InputTypes = 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
export type InputModes = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
export type InputAutoCompleteAddressValues = 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level1' | 'address-level2' | 'address-level3' | 'address-level4' | 'country' | 'country-name' | 'postal-code';
export type InputAutoCompleteValues = 'off' | 'on' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix' | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'one-time-code' | 'organization-title' | 'organization' | 'shipping' | 'billing' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'tel' | 'tel-country-code' | 'tel-national' | 'tel-area-code' | 'tel-local' | 'tel-extension' | 'impp' | 'url' | 'photo' | 'webauthn' | InputAutoCompleteAddressValues | `billing ${InputAutoCompleteAddressValues}` | `shipping ${InputAutoCompleteAddressValues}`;
/**
 * InputField Properties
 */
export interface InputFieldProps {
    /**
     * A custom input field id, usually passed by the FormControl component. The default value is an
     * auto-generated UUID.
     */
    id?: null | string;
    /**
     * The type attribute for this input field.
     */
    type?: InputTypes;
    /**
     * The name attribute for this input field.
     */
    name?: null | string;
    /**
     * The value for this input field, must be passed as v-model value.
     */
    modelValue?: null | number | string;
    /**
     * The placeholder attribute for this input field.
     */
    placeholder?: null | string;
    /**
     * Additional browser-supported inputmode attribute for this input field.
     */
    inputmode?: InputModes;
    /**
     * Additional browser-supported autocomplete attribute for this input field.
     */
    autocomplete?: InputAutoCompleteValues;
    /**
     * The desired size for this input field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The validation state for this input field.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional input field validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
    /**
     * The disabled state for this input field.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this input field.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this input field.
     */
    required?: MaybeRef<boolean>;
}
/**
 * InputField Emits
 */
export interface InputFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | number | string): void;
}
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<InputFieldProps>, {
    type: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<InputFieldProps>, {
    type: string;
}>>> & {
    "onUpdate:modelValue"?: (value: string | number) => any;
}, {
    type: InputTypes;
}, {}>;
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
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
