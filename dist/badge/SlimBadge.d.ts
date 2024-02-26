import type { Component } from 'vue';
/**
 * Badge Properties
 */
export interface BadgeProps {
    /**
     * The desired color used for this badge.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    /**
     * The desired label text for this badge.
     */
    label?: string | null;
    /**
     * An additional icon which is displayed next to the label, if available.
     */
    icon?: Component | null;
    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: {
        [key: string]: any;
    };
    /**
     * The desired size of the badge, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<BadgeProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<BadgeProps>>>, {}, {}>;
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
