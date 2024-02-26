/**
 * Popover Properties
 */
export interface BasePopoverProps {
    /**
     * The desired title shown as popover header unless the header slot is used.
     */
    title?: string;
    /**
     * Whether to use the popover arrow or not, or the desired location where the arrow should be shown.
     */
    arrow?: boolean | 'top' | 'right' | 'bottom' | 'left';
    /**
     * Additional stylings which should be applied to the arrow.
     */
    arrowStyles?: {
        [key: string]: any;
    };
    /**
     * Force a desired size for this popover instead to adapt the width to the content.
     */
    size?: null | 'sm' | 'md' | 'lg';
}
/**
 * Popover Slots
 */
export interface BasePopoverSlots {
    /**
     * Overwrite the whole popover inner including the arrow.
     * @param props
     */
    popover(props: BasePopoverProps): any;
    /**
     * Overwrite the popover content, excluding the arrow and main div container.
     * @param props
     */
    content(props: BasePopoverProps): any;
    /**
     * Custom popover header, preferred over the title property.
     * @param props
     */
    header(props: BasePopoverProps): any;
    /**
     * Default popover content slot.
     * @param props
     */
    default(props: BasePopoverProps): any;
    /**
     * Custom popover footer, optional use.
     * @param props
     */
    footer(props: BasePopoverProps): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<BasePopoverProps>, {
    popover: import("vue").Ref<HTMLElement>;
    arrow: import("vue").Ref<HTMLElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<BasePopoverProps>>>, {}, {}>, Readonly<BasePopoverSlots> & BasePopoverSlots>;
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
