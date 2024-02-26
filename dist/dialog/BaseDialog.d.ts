export interface BaseDialogProps {
    /**
     * The desired dialog title, can be used instead of the header slot.
     */
    title?: string | null;
    /**
     * The desired dialog size.
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Includes a modal-backdrop element. Using 'static' adds a backdrop modal which does not
     * close the modal when clicked.
     */
    backdrop?: boolean | 'status';
    /**
     * The dialog visibility state.
     */
    visible?: boolean;
    target?: string;
    /**
     * Shows an X-button inside the header, which closes the modal.
     */
    closable?: boolean;
}
export interface BaseDialogSlots {
    /**
     * The default dialog content slot.
     */
    default(): any;
    /**
     * Custom dialog header slot content.
     */
    header(): any;
    /**
     * Custom dialog footer slot content.
     */
    footer(): any;
}
export interface BaseDialogEmits {
    /**
     * Visibility state changed.
     */
    (ev: 'update:visible', value: boolean): void;
    /**
     * Before the modal / dialog is actually shown.
     */
    (ev: 'show'): void;
    /**
     * After the modal / dialog is available, but before the transition has been completed.
     */
    (ev: 'open'): void;
    /**
     * After the modal / dialog is available and fully visible.
     */
    (ev: 'shown'): void;
    /**
     * Before the modal / dialog is actually be removed.
     */
    (ev: 'hide'): void;
    /**
     * Before the modal / dialog is actually be removed, but after the transition has been started.
     */
    (ev: 'close'): void;
    /**
     * After the modal / dialog has been fully removed.
     */
    (ev: 'hidden'): void;
    /**
     * When a click outside the modal occurred.
     */
    (ev: 'clickOutside'): void;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<BaseDialogProps>, {
    open: () => Promise<void>;
    close: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:visible": (value: boolean) => void;
    show: () => void;
    open: () => void;
    shown: () => void;
    hide: () => void;
    close: () => void;
    hidden: () => void;
    clickOutside: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<BaseDialogProps>>> & {
    onShow?: () => any;
    "onUpdate:visible"?: (value: boolean) => any;
    onHide?: () => any;
    onHidden?: () => any;
    onShown?: () => any;
    onOpen?: () => any;
    onClose?: () => any;
    onClickOutside?: () => any;
}, {}, {}>, Readonly<BaseDialogSlots> & BaseDialogSlots>;
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
