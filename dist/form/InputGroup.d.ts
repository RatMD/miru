/**
 * InputGroup Properties
 */
export interface InputGroupProps {
    /**
     * Whether to force a flex-row behavior (even on mobile devices) or not.
     */
    row?: boolean;
}
/**
 * InputGroup Slots
 */
export interface InputGroupSlots {
    /**
     * The desired control an other components and elements.
     */
    default(props: InputGroupProps): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<InputGroupProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<InputGroupProps>>>, {}, {}>, Readonly<InputGroupSlots> & InputGroupSlots>;
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
