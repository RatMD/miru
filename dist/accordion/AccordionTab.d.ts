import type { Component } from 'vue';
/**
 * AccordionTab Properties
 */
export interface AccordionTabProps {
    /**
     * Custom accordion tab id, used for a11y purposes only.
     */
    id?: string;
    /**
     * The accordion label to toggle the accordion pane, used within the header slot.
     */
    label?: string;
    /**
     * The accordion toggle icon, uses a Chevron as default. Pass `null` to disable the icon completely.
     */
    icon?: Component | null;
    /**
     * Whether to show the accordion toggle icon on the left or right side of the label.
     */
    iconPlacement?: 'left' | 'right';
    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: {
        [key: string]: any;
    };
    /**
     * The duration until the accordion pane content is fully toggled, you can either pass the time
     * in milliseconds or a control-value to calculate the duration dynamically based on the amount
     * of content.
     */
    duration?: number | 'slow' | 'normal' | 'fast';
    /**
     * The visibility state of the accordion pane content, must be passed as v-model value.
     */
    visible?: boolean;
}
/**
 * AccordionTab Slots
 */
export interface AccordionTabSlots {
    /**
     * Accordion tab header, used instead of the label property.
     * @param props
     */
    header(props: AccordionTabProps): any;
    /**
     * Accordion pane content.
     * @param props
     */
    default(props: AccordionTabProps): any;
}
/**
 * AccordionTab Emits
 */
export interface AccordionTabEmits {
    /**
     * Change visibility state.
     */
    (ev: 'update:visible', value: boolean): void;
    /**
     * Event fires immediately, when the accordion pane starts to get hidden.
     */
    (ev: 'hide'): void;
    /**
     * Event fires after the accordion pane is fully hidden.
     */
    (ev: 'hidden'): void;
    /**
     * Event fires immediately, when the accordion pane starts to get visible.
     */
    (ev: 'show'): void;
    /**
     * Event fires after the accordion pane is fully shown.
     */
    (ev: 'shown'): void;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<AccordionTabProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:visible": (value: boolean) => void;
    hide: () => void;
    hidden: () => void;
    show: () => void;
    shown: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<AccordionTabProps>>> & {
    onShow?: () => any;
    "onUpdate:visible"?: (value: boolean) => any;
    onHide?: () => any;
    onHidden?: () => any;
    onShown?: () => any;
}, {}, {}>, Readonly<AccordionTabSlots> & AccordionTabSlots>;
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
