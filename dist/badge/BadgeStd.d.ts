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
     * Whether to show the additional icon on the left or right side or as replacement to the label itself.
     */
    iconPlacement?: 'left' | 'right' | 'icon';
    /**
     * The desired size of the badge, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Show a dot / circle instead of an icon next to the label, if available.
     */
    dot?: boolean;
}
/**
 * Badge Slots
 */
export interface BadgeSlots {
    /**
     * Default content slot, used instead of the label property
     * @param props
     */
    default(props: BadgeProps): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<BadgeProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<BadgeProps>>>, {}, {}>, Readonly<BadgeSlots> & BadgeSlots>;
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
