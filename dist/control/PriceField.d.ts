import type { Component, MaybeRef } from 'vue';
/**
 * PriceField Properties
 */
export interface PriceFieldProps {
    /**
     * A custom price field id, usually passed by the FormControl component. The default value is an
     * auto-generated UUID.
     */
    id?: null | string;
    /**
     * The name attribute for this price field.
     */
    name?: null | string;
    /**
     * The value for this price field, must be passed as v-model value.
     */
    modelValue?: null | number | string;
    /**
     * An additional icon which is displayed right within the input field, if available.
     */
    icon?: null | Component | 'currency' | 'bitcoin' | 'dollar' | 'euro' | 'gem' | 'yen' | 'percent' | 'sterling' | 'ruble' | 'franc';
    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: {
        [key: string]: any;
    };
    /**
     * Whether to show the additional icon on the left or right side or as replacement to the label itself.
     */
    iconPlacement?: 'left' | 'right';
    /**
     * The placeholder attribute for this price field.
     */
    placeholder?: null | string;
    /**
     * The minimum supported value for this price field.
     */
    min?: number;
    /**
     * The maximum supported value for this price field.
     */
    max?: number;
    /**
     * The supported increase / decrease step for this price field.
     */
    step?: number;
    /**
     * The number of decimals shown / formatted for this price field (default: 2).
     */
    decimals?: number;
    /**
     * The desired size for this price field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The validation state for this price field.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional price field validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
    /**
     * The disabled state for this price field.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this price field.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this price field.
     */
    required?: MaybeRef<boolean>;
}
/**
 * PriceField Emits
 */
export interface PriceFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | number | string): void;
}
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<PriceFieldProps>, {
    decimals: number;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<PriceFieldProps>, {
    decimals: number;
}>>> & {
    "onUpdate:modelValue"?: (value: string | number) => any;
}, {
    decimals: number;
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
