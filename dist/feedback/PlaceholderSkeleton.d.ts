/**
 * PlaceholderSkeleton Properties
 */
export interface PlaceholderSkeletonProps {
    /**
     * tailwind classes to style the skeleton.
     */
    class?: string;
    /**
     * Custom width unit-value, can be used instead of the tailwind CSS classes.
     */
    width?: string;
    /**
     * Custom height unit-value, can be used instead of the tailwind CSS classes.
     */
    height?: string;
    /**
     * Wether to use the vertical animation or horizontal one.
     */
    vertical?: boolean;
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<PlaceholderSkeletonProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<PlaceholderSkeletonProps>>>, {}, {}>;
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
