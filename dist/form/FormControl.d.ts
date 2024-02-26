import type { MaybeRef } from 'vue';
/**
 * FormControl Properties
 */
export interface FormControlProps {
    /**
     * A custom form control id, used to assign the labels to the respective field, is passed to
     * the field itself as well. Default value is an auto-generated UUID.
     */
    id?: null | string;
    /**
     * The input name of this form control, is also passed to the control field itself as well.
     */
    name?: null | string;
    /**
     * Primary form control label, shown above the control field itself in most cases.
     */
    label?: null | string;
    /**
     * Additional form control description text, shown below this control field.
     */
    description?: null | string;
    /**
     * The validation state for this form control.
     */
    validation?: null | 'invalid' | 'valid';
    /**
     * Additional form control validation message, requires the validation property set either to
     * valid or invalid.
     */
    validationMessage?: null | string;
    /**
     * The disabled state of this form control, is also passed to the control field itself as well.
     */
    disabled?: MaybeRef<boolean>;
    /**
     * The required state of this form control, is also passed to the control field itself as well.
     */
    required?: MaybeRef<boolean>;
    /**
     * Whether to display the validation message above the description (when both are available) or
     * to toggle between them depending if the validation message is set or not (default).
     */
    vad?: boolean;
}
/**
 * FormControl Slots
 */
export interface FormControlSlots {
    /**
     * The default form control field.
     * @param props
     */
    default(props: Omit<FormControlProps, 'id'> & {
        id: string;
    }): any;
    /**
     * Custom form control label slot.
     * @param props
     */
    label(props: Omit<FormControlProps, 'id'> & {
        id: string;
    }): any;
    /**
     * Custom form control validation message slot.
     * @param props
     */
    validation(props: Omit<FormControlProps, 'id'> & {
        id: string;
    }): any;
    /**
     * Custom form control description slot.
     * @param props
     */
    description(props: Omit<FormControlProps, 'id'> & {
        id: string;
    }): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<FormControlProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<FormControlProps>>>, {}, {}>, Readonly<FormControlSlots> & FormControlSlots>;
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
