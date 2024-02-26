export interface BaseOffcanvasProps {
    /**
     * Offcanvas title, used when no header slot is present.
     */
    title?: string | null;
    /**
     * Offcanvas placement, uses right as default.
     */
    placement?: 'top' | 'left' | 'right' | 'bottom';
    /**
     * Offcanvas size, uses md as default.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Use additional Popover Backdrop.
     */
    backdrop?: boolean;
    target?: string;
    /**
     * v-model visible ref.
     */
    visible?: boolean;
}
export interface BaseOffcanvasSlotsProps extends BaseOffcanvasProps {
    /**
     * Visible State
     */
    visible: boolean;
    /**
     * Open Offcanvas
     */
    open: () => void;
    /**
     * Close Offcanvas
     */
    close: () => void;
    /**
     * Toggle Offcanvas
     */
    toggle: () => void;
}
export interface BaseOffcanvasSlots {
    /**
     * Header Offcanvas slot, rendered instead of title property.
     * @param props
     */
    header(props: BaseOffcanvasSlotsProps): any;
    /**
     * The default offcanvas content slot.
     * @param props
     */
    default(props: BaseOffcanvasSlotsProps): any;
    /**
     * Footer Offcanvas slot
     * @param props
     */
    footer(props: BaseOffcanvasSlotsProps): any;
}
export interface BaseOffcanvasEmits {
    /**
     * Update v-model value.
     */
    (ev: 'update:visible', value: boolean): void;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<BaseOffcanvasProps>, {
    visible: import("vue").WritableComputedRef<boolean>;
    open: () => void;
    close: () => void;
    toggle: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:visible": (value: boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<BaseOffcanvasProps>>> & {
    "onUpdate:visible"?: (value: boolean) => any;
}, {}, {}>, Readonly<BaseOffcanvasSlots> & BaseOffcanvasSlots>;
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
