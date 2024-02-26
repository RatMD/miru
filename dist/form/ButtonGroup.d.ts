import type ButtonStd from "../button/ButtonStd";
/**
 * ButtonGroup Properties
 */
export interface ButtonGroupProps {
    /**
     * The desired alignment for the buttons within the group.
     */
    align?: 'left' | 'center' | 'right';
    /**
     * The desired gap-size between the single buttons, note that `md` is the default value. Has no
     * effect on the button size itself.
     */
    size?: 'left' | 'center' | 'right';
    /**
     * Whether to use manual selection of buttons, to support ungrouped buttons, or not.
     */
    manually?: boolean;
    /**
     * Whether to use a vertical-styled group or a horizontal one for the provided buttons.
     */
    vertical?: boolean;
}
/**
 * ButtonGroup Slots
 */
export interface ButtonGroupSlots {
    /**
     * The desired ButtonStd components.
     */
    default(props: ButtonGroupProps): InstanceType<typeof ButtonStd> | InstanceType<typeof ButtonStd>[];
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<ButtonGroupProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<ButtonGroupProps>>>, {}, {}>, Readonly<ButtonGroupSlots> & ButtonGroupSlots>;
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
