/**
 * BaseCard Properties
 */
export interface BaseCardProps {
    /**
     * Card title, used when no header slot is present.
     */
    title?: string | null;
}
/**
 * BaseCard Slots
 */
export interface BaseCardSlots {
    /**
     * Header Card slot, rendered instead of title property.
     * @param props
     */
    header(props: BaseCardProps): any;
    /**
     * The default Card content slot.
     * @param props
     */
    default(props: BaseCardProps): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<BaseCardProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<BaseCardProps>>>, {}, {}>, Readonly<BaseCardSlots> & BaseCardSlots>;
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
