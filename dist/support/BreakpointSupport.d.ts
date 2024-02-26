export type BreakpointNames = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export interface BreakpointSupportSlotProps {
    width: number;
    height: number;
    orientation: undefined | 'landscape' | 'portrait';
}
/**
 * BreakpointSupport Properties
 */
export interface BreakpointSupportProps {
    /**
     * The minimum breakpoint required to display the slot content. Can be either a, exact viewport
     * width or a breakpoint name.
     */
    min?: null | number | BreakpointNames;
    /**
     * The maximum breakpoint allowed to display the slot content. Can be either a, exact viewport
     * width or a breakpoint name.
     */
    max?: null | number | BreakpointNames;
    /**
     * Additionally, the screen orientation required to display the slot content.
     */
    orientation?: null | 'landscape' | 'portrait';
}
/**
 * BreakpointSupport Slots
 */
export interface BreakpointSupportSlots {
    /**
     * Default Query Slot
     */
    default(props: BreakpointSupportSlotProps): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<BreakpointSupportProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<BreakpointSupportProps>>>, {}, {}>, Readonly<BreakpointSupportSlots> & BreakpointSupportSlots>;
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
