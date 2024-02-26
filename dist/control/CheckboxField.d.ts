import type { MaybeRef } from 'vue';
/**
 * CheckboxField Properties
 */
export interface CheckboxFieldProps {
    /**
     * A custom checkbox field id, usually passed by the FormControl component. The default value
     * is an auto-generated UUID.
     */
    id?: null | string;
    /**
     * The label for this checkbox field.
     */
    label?: null | string;
    /**
     * The name attribute for this checkbox field.
     */
    name?: null | string;
    /**
     * The value attribute for this checkbox field, pass nothing to use binary mode with true and
     * false.
     */
    value?: null | number | string;
    /**
     * The value for this checkbox field, must be passed as v-model value.
     */
    modelValue?: null | boolean | number | string | (string | number)[];
    /**
     * The desired size for this checkbox field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The disabled state for this checkbox field.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this checkbox field.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this checkbox field.
     */
    required?: MaybeRef<boolean>;
    /**
     * The validation state for this checkbox field.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional checkbox field validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
}
/**
 * CheckboxField Emits
 */
export interface CheckboxFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | boolean | number | string | (string | number)[]): void;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<CheckboxFieldProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | boolean | (string | number)[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<CheckboxFieldProps>>> & {
    "onUpdate:modelValue"?: (value: string | number | boolean | (string | number)[]) => any;
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
