import type { MaybeRef } from 'vue';
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
     * The disabled state for this balloon option.
     */
    disabled?: boolean;
}
export type SelectableListOptionTypes = SimpleOption | AdvancedOption;
/**
 * SelectableList Properties
 */
export interface SelectableListProps {
    /**
     * A custom selectable list id, usually passed by the FormControl component. The default value
     * is an auto-generated UUID.
     */
    id?: null | string;
    /**
     * The name attribute for this selectable list.
     */
    name?: null | string;
    /**
     * The value for this selectable list, must be passed as v-model value.
     */
    modelValue?: null | string | number | (string | number)[];
    /**
     * The available options to be available on this selectable list field.
     */
    options: SelectableListOptionTypes[];
    /**
     * The desired size for this selectable list, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Whether to support the selection of multiple options or not.
     */
    multiple?: boolean;
    /**
     * The disabled state for this selectable list.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The readonly state for this selectable list.
     */
    readonly?: MaybeRef<boolean>;
    /**
     * The required state for this selectable list.
     */
    required?: MaybeRef<boolean>;
    /**
     * The validation state for this selectable list.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional selectable list validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
}
/**
 * BalloonSelector Emits
 */
export interface SelectableListEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | string | number | (string | number)[]): void;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<SelectableListProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | (string | number)[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<SelectableListProps>>> & {
    "onUpdate:modelValue"?: (value: string | number | (string | number)[]) => any;
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
