import type { Component, MaybeRef } from 'vue';
/**
 * Button Properties
 */
export interface ButtonProps {
    /**
     * The desired color used for this button.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    /**
     * The desired label text for this button.
     */
    label?: string | null;
    /**
     * An additional icon which is displayed next to the label, if available.
     */
    icon?: Component;
    /**
     * A custom loading icon which is used instead of the default one.
     */
    iconLoading?: Component;
    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: {
        [key: string]: any;
    };
    /**
     * Whether to show the additional icon on the left or right side or as replacement to the label itself.
     */
    iconPlacement?: 'left' | 'right' | 'icon';
    /**
     * The desired size of the button, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The desired type of the button, note that `button` is the default value.
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * An alternative text that is used as title attribute on the button.
     */
    title?: string;
    /**
     * Whether to use a fullwidth styling for this button or not.
     */
    fullwidth?: boolean;
    /**
     * The disabled state for this button.
     */
    disabled?: MaybeRef<boolean> | boolean;
    /**
     * The loading state for this button.
     */
    loading?: MaybeRef<boolean> | boolean;
}
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ButtonProps>, {
    type: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ButtonProps>, {
    type: string;
}>>>, {
    type: "button" | "submit" | "reset";
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
