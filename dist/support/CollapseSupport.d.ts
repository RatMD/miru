/**
 * CollapseSupport Properties
 */
export interface CollapseSupportProps {
    /**
     * Collapsed State
     */
    collapsed: boolean;
    /**
     * The duration until the content is fully toggled, you can either pass the time in milliseconds
     * or a control-value to calculate the duration dynamically based on the amount of content.
     */
    duration?: number | 'slow' | 'normal' | 'fast';
}
/**
 * CollapseSupport Slots
 */
export interface CollapseSupportSlots {
    /**
     * Primary CollapseSupport content.
     * @param props
     */
    default(props: CollapseSupportProps): any;
}
/**
 * CollapseSupport Emits
 */
export interface CollapseSupportEmits {
    /**
     * Event fires immediately, when the content starts to get hidden.
     */
    (ev: 'hide'): void;
    /**
     * Event fires after the content is fully hidden.
     */
    (ev: 'hidden'): void;
    /**
     * Event fires immediately, when the content starts to get visible.
     */
    (ev: 'show'): void;
    /**
     * Event fires after the content is fully shown.
     */
    (ev: 'shown'): void;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<CollapseSupportProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    hide: () => void;
    hidden: () => void;
    show: () => void;
    shown: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<CollapseSupportProps>>> & {
    onShow?: () => any;
    onHide?: () => any;
    onHidden?: () => any;
    onShown?: () => any;
}, {}, {}>, Readonly<CollapseSupportSlots> & CollapseSupportSlots>;
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
