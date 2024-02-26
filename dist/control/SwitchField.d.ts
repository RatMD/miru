import type { MaybeRef } from 'vue';
/**
 * SwitchField Properties
 */
export interface SwitchFieldProps {
    /**
     * A custom switch field id, usually passed by the FormControl component. The default value
     * is an auto-generated UUID.
     */
    id?: null | string;
    /**
     * The label for this switch field.
     */
    label?: null | string;
    /**
     * The name attribute for this switch field.
     */
    name?: null | string;
    /**
     * The value for this switch field, must be passed as v-model value.
     */
    modelValue?: null | boolean;
    /**
     * The desired size for this switch field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The disabled state for this switch field.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this switch field.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this switch field.
     */
    required?: MaybeRef<boolean>;
    /**
     * The validation state for this switch field.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional checkbox field validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
}
/**
 * SwitchField Emits
 */
export interface SwitchFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | string | number | boolean): void;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<SwitchFieldProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<SwitchFieldProps>>> & {
    "onUpdate:modelValue"?: (value: string | number | boolean) => any;
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
