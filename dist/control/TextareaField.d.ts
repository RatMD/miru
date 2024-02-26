import type { MaybeRef } from 'vue';
/**
 * TextareaField Properties
 */
export interface TextareaFieldProps {
    /**
     * A custom textarea field id, usually passed by the FormControl component. The default value is an
     * auto-generated UUID.
     */
    id?: null | string;
    /**
     * The name attribute for this textarea field.
     */
    name?: null | string;
    /**
     * The value for this textarea field, must be passed as v-model value.
     */
    modelValue?: null | string;
    /**
     * The placeholder attribute for this textarea field.
     */
    placeholder?: null | string;
    /**
     * The desired size for this textarea field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The validation state for this textarea field.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional textarea field validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
    /**
     * The disabled state for this textarea field.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this textarea field.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this textarea field.
     */
    required?: MaybeRef<boolean>;
}
/**
 * TextareaField Emits
 */
export interface TextareaFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | string): void;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<TextareaFieldProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<TextareaFieldProps>>> & {
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
