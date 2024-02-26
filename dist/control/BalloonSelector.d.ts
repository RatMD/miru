import type { Component, MaybeRef } from 'vue';
export type SimpleOption = [string | number] | [string | number, string];
export interface AdvancedOption {
    /**
     * The option value, written to the modelValue.
     */
    value: string;
    /**
     * The option label, shown to the user.
     */
    label: string;
    /**
     * The option icon, shown next to the option label.
     */
    icon?: null | Component;
    /**
     * Whether to show the additional icon on the left or right side or as replacement to the label itself.
     */
    placement?: 'left' | 'right' | 'icon';
    /**
     * The disabled state for this balloon option.
     */
    disabled?: boolean;
    /**
     * Additional attributes for this balloon option, can be used on the `item` slot.
     */
    [key: string]: any;
}
export type BalloonSelectorOptionTypes = SimpleOption | AdvancedOption;
/**
 * BalloonSelector Properties
 */
export interface BalloonSelectorProps {
    /**
     * A custom balloon selector id, usually passed by the FormControl component. The default value
     * is an auto-generated UUID.
     */
    id?: null | string;
    /**
     * The name attribute for this balloon selector.
     */
    name?: null | string;
    /**
     * The value for this balloon selector, must be passed as v-model value.
     */
    modelValue?: null | string | number | (string | number)[];
    /**
     * The available options to be available on this balloon selector field.
     */
    options: BalloonSelectorOptionTypes[];
    /**
     * The desired size for this balloon selector, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Additional properties passed to the icon component if present, such as `size` or `stroke-width`.
     */
    iconProps?: {
        [key: string]: any;
    };
    /**
     * Whether to apply the condensed style on this balloon selector or not.
     */
    condensed?: boolean;
    /**
     * Whether to show the options in a connected style or not.
     */
    connected?: boolean;
    /**
     * Whether to support the selection of multiple options or not.
     */
    multiple?: boolean;
    /**
     * Whether to support deselecting a selected option, on non-multiple fields, or not.
     */
    unselect?: boolean;
    /**
     * The disabled state for this balloon selector.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this balloon selector.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this balloon selector.
     */
    required?: MaybeRef<boolean>;
    /**
     * The validation state for this balloon selector.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional balloon selector validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
}
/**
 * BalloonSelector Slot
 */
export interface BalloonSelectorSlots {
    /**
     * Custom balloon item content slot, used instead of the default option icon / label.
     * @param props
     */
    default(props: BalloonSelectorProps & {
        option: BalloonSelectorOptionTypes;
        idx: number;
    }): any;
}
/**
 * BalloonSelector Emits
 */
export interface BalloonSelectorEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | string | number | (string | number)[]): void;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<BalloonSelectorProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | (string | number)[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<BalloonSelectorProps>>> & {
    "onUpdate:modelValue"?: (value: string | number | (string | number)[]) => any;
}, {}, {}>, Readonly<BalloonSelectorSlots> & BalloonSelectorSlots>;
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
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
