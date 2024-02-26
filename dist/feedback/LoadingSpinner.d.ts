/**
 * LoadingSpinner Properties
 */
export interface LoadingSpinnerProps {
    /**
     * The desired color used for the loading spinner.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    /**
     * The desired size of the loading spinner.
     */
    size?: 'sm' | 'md' | 'lg';
}
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<LoadingSpinnerProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<LoadingSpinnerProps>>>, {}, {}>;
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
