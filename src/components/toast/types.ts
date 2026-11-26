import type { ToastAppearance } from './appearance';
import type { Component, CSSProperties, HTMLAttributes, VNode, VNodeChild } from 'vue';

export type ToastId = string | number;
export type ToastType = 'message' | 'success' | 'info' | 'warning' | 'error' | 'loading';
export type ToastContent = string | number | VNode | (() => VNodeChild);
export type ToastPosition =
    'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type ToastSwipeDirection = 'up' | 'down' | 'left' | 'right';
export type ToastOffset =
    number | string | Partial<Record<'top' | 'right' | 'bottom' | 'left', number | string>>;
export interface ToastClasses {
    toast?: string;
    title?: string;
    description?: string;
    icon?: string;
    content?: string;
    closeButton?: string;
    actionButton?: string;
    cancelButton?: string;
    success?: string;
    info?: string;
    warning?: string;
    error?: string;
    loading?: string;
}
export interface ToastAction {
    label: ToastContent;
    altText?: string;
    onClick?: (event: MouseEvent) => void;
    /** Keep the toast open after the action. Calling preventDefault() also keeps it open. */
    closeOnClick?: boolean;
    actionButtonStyle?: CSSProperties;
}
export interface ToastOptions {
    id?: ToastId;
    toasterId?: string;
    title?: ToastContent;
    description?: ToastContent;
    duration?: number;
    closeButton?: boolean;
    closeButtonAriaLabel?: string;
    /** Disable user dismissal (button, Escape and swipe); programmatic dismissal still works. */
    dismissible?: boolean;
    richColors?: boolean;
    important?: boolean;
    action?: ToastAction;
    cancel?: ToastAction;
    icon?: Component | VNode | false;
    class?: string;
    classes?: ToastClasses;
    descriptionClass?: string;
    style?: CSSProperties;
    actionButtonStyle?: CSSProperties;
    cancelButtonStyle?: CSSProperties;
    testId?: string;
    onDismiss?: (toast: ToastNotification) => void;
    onAutoClose?: (toast: ToastNotification) => void;
}
export interface ToastNotification extends ToastOptions {
    id: ToastId;
    type: ToastType;
}
type PromiseMessage<T> =
    | ToastContent
    | (ToastOptions & { message?: ToastContent })
    | ((
          value: T,
      ) =>
          | ToastContent
          | (ToastOptions & { message?: ToastContent })
          | Promise<ToastContent | (ToastOptions & { message?: ToastContent })>);
export interface ToastPromiseOptions<T> extends Omit<ToastOptions, 'title'> {
    loading?: ToastContent;
    success?: PromiseMessage<T>;
    error?: PromiseMessage<unknown>;
    finally?: () => void | Promise<void>;
}
export type ToastPromiseHandle<T> = Promise<T> & { id: ToastId; unwrap: () => Promise<T> };
export interface ToasterProps {
    id?: string;
    appearance?: ToastAppearance;
    inline?: boolean;
    position?: ToastPosition;
    theme?: 'light' | 'dark' | 'system';
    closeButton?: boolean;
    closeButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    richColors?: boolean;
    expand?: boolean;
    duration?: number;
    gap?: number;
    visibleToasts?: number;
    toastOptions?: ToastOptions;
    offset?: ToastOffset;
    mobileOffset?: ToastOffset;
    dir?: 'ltr' | 'rtl' | 'auto';
    hotkey?: string[];
    containerAriaLabel?: string;
    swipeDirection?: ToastSwipeDirection;
    swipeThreshold?: number;
    disableSwipe?: boolean;
    icons?: Partial<Record<Exclude<ToastType, 'message'> | 'close', Component>>;
    class?: HTMLAttributes['class'];
    style?: CSSProperties;
}
