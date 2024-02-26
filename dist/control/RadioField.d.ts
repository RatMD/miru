import type { MaybeRef } from 'vue';
/**
 * RadioField Properties
 */
export interface RadioFieldProps {
    /**
     * A custom radio field id, usually passed by the FormControl component. The default value
     * is an auto-generated UUID.
     */
    id?: null | string;
    /**
     * The label for this radio field.
     */
    label?: null | string;
    /**
     * The name attribute for this radio field.
     */
    name?: null | string;
    /**
     * The value attribute for this radio field, pass nothing to use binary mode with true and
     * false.
     */
    value?: null | string;
    /**
     * The value for this radio field, must be passed as v-model value.
     */
    modelValue?: null | boolean | number | string;
    /**
     * The desired size for this radio field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The disabled state for this radio field.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this radio field.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this radio field.
     */
    required?: MaybeRef<boolean>;
    /**
     * The validation state for this radio field.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional radio field validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
}
/**
 * RadioField Emits
 */
export interface RadioFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | boolean | number | string): void;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<RadioFieldProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<RadioFieldProps>>> & {
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
