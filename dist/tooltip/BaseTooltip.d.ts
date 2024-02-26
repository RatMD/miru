/**
 * Tooltip Properties
 */
export interface BaseTooltipProps {
    /**
     * The desired color used for this tooltip.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    /**
     * The desired label text for this tooltip, used when no slot is passed.
     */
    label?: string;
}
/**
 * Tooltip Slots
 */
export interface BaseTooltipSlots {
    /**
     * Default content slot, used instead of the label property.
     * @param props
     */
    default(props: BaseTooltipProps): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<BaseTooltipProps>, {
    tooltip: import("vue").Ref<HTMLElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<BaseTooltipProps>>>, {}, {}>, Readonly<BaseTooltipSlots> & BaseTooltipSlots>;
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
