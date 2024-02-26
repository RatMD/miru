import type { MaybeRef } from 'vue';
export type SimpleSelectFieldOption = (string | number)[];
export interface AdvancedFieldOption {
    value: string;
    label: string;
}
export type SelectOptions = (SimpleSelectFieldOption | AdvancedFieldOption)[];
/**
 * SelectField Properties
 */
export interface SelectFieldProps {
    /**
     * A custom select field id, usually passed by the FormControl component. The default value is an
     * auto-generated UUID.
     */
    id?: null | string;
    /**
     * The name attribute for this select field.
     */
    name?: null | string;
    /**
     * The desired options used for this select field.
     */
    options: SelectOptions;
    /**
     * The value for this select field, must be passed as v-model value.
     */
    modelValue?: null | string;
    /**
     * The placeholder attribute for this select field.
     */
    placeholder?: null | string;
    /**
     * The desired size for this select field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The validation state for this select field.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional select field validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
    /**
     * The disabled state for this select field.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this select field.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this select field.
     */
    required?: MaybeRef<boolean>;
}
/**
 * SelectField Emits
 */
export interface SelectFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: string | null): void;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<SelectFieldProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<SelectFieldProps>>> & {
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
