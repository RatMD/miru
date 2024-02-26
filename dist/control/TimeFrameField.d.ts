import type { MaybeRef } from 'vue';
/**
 * TimeFrameField Properties
 */
export interface TimeFrameFieldProps {
    /**
     * A custom time-frame field id, usually passed by the FormControl component. The default value is an
     * auto-generated UUID.
     */
    id?: null | string;
    /**
     * The name attribute for this time-frame field.
     */
    name?: null | string;
    /**
     * The value for this time-frame field, must be passed as v-model value.
     */
    modelValue?: null | string;
    /**
     * The desired time between start and end using the 01:25:00 syntax (last part can be omitted).
     */
    between?: string;
    /**
     * The number of second increments to be used for the time. Select 60 to deactivate the seconds.
     */
    seconds?: number;
    /**
     * The desired size for this time-frame field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The validation state for this time-frame field.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional time-frame field validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
    /**
     * The disabled state for this time-frame field.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this time-frame field.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this time-frame field.
     */
    required?: MaybeRef<boolean>;
}
/**
 * TimeFrameField Emits
 */
export interface TimeFrameFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: string | null): void;
}
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<TimeFrameFieldProps>, {
    seconds: number;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<TimeFrameFieldProps>, {
    seconds: number;
}>>> & {
    "onUpdate:modelValue"?: (value: string) => any;
}, {
    seconds: number;
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
