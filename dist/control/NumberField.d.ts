import type { MaybeRef } from 'vue';
/**
 * NumberField Properties
 */
export interface NumberFieldProps {
    /**
     * A custom number field id, usually passed by the FormControl component. The default value is an
     * auto-generated UUID.
     */
    id?: null | string;
    /**
     * The name attribute for this number field.
     */
    name?: null | string;
    /**
     * The value for this number field, must be passed as v-model value.
     */
    modelValue?: null | number | string;
    /**
     * The placeholder attribute for this number field.
     */
    placeholder?: null | string;
    /**
     * The minimum supported value for this number field.
     */
    min?: number;
    /**
     * The maximum supported value for this number field.
     */
    max?: number;
    /**
     * The supported increase / decrease step for this number field.
     */
    step?: number;
    /**
     * Whether to force an integer value for this number field or a double / float.
     */
    integer?: boolean;
    /**
     * The desired size for this number field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The validation state for this number field.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional number field validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
    /**
     * The disabled state for this number field.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this number field.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this number field.
     */
    required?: MaybeRef<boolean>;
}
/**
 * NumberField Emits
 */
export interface NumberFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | number | string): void;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<NumberFieldProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<NumberFieldProps>>> & {
    "onUpdate:modelValue"?: (value: string | number) => any;
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
