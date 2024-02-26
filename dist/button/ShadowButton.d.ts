import type { Component, MaybeRef } from 'vue';
/**
 * ShadowButton Properties
 */
export interface ShadowButtonProps {
    /**
     * The desired color used for this button.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    /**
     * An additional icon which is displayed next to the label, if available.
     */
    icon: Component;
    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: {
        [key: string]: any;
    };
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
     * The active state for this button.
     */
    active?: MaybeRef<boolean> | boolean;
    /**
     * The disabled state for this button.
     */
    disabled?: MaybeRef<boolean> | boolean;
    /**
     * The loading state for this button.
     */
    loading?: MaybeRef<boolean> | boolean;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<ShadowButtonProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<ShadowButtonProps>>>, {}, {}>;
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
