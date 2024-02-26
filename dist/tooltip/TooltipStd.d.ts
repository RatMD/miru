import { nextTick } from 'vue';
import type { Placement, OffsetOptions } from '@floating-ui/vue';
/**
 * Tooltip Properties
 */
export interface TooltipProps {
    /**
     * The desired color used for this tooltip.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    /**
     * The desired label text for this tooltip, used when no slot is passed.
     */
    label?: string;
    /**
     * The amount of milliseconds until the tooltip starts to get visible.
     */
    delay?: number;
    /**
     * The floating-ui placement option for this tooltip.
     */
    placement?: Placement;
    /**
     * The floating-ui offset option for this tooltip.
     */
    offset?: OffsetOptions;
}
/**
 * Tooltip Slots
 */
export interface TooltipSlots {
    /**
     * Default content slot, used instead of the label property.
     * @param props
     */
    default(props: TooltipProps & {
        show: (ev: Event) => void;
        hide: (ev: Event) => void;
    }): any;
    /**
     * Label content slot, used instead of the label property.
     * @param props
     */
    label(props: TooltipProps): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<TooltipProps>, {
    placement: string;
    offset: number;
}>, {
    show: (ev: Event | PointerEvent) => void;
    hide: (ev: Event | PointerEvent) => void;
    target: import("vue").Ref<HTMLElement>;
    tooltip: import("vue").Ref<{
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{}> & Omit<{
            readonly label?: string;
            readonly color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            color: {
                type: import("vue").PropType<"primary" | "secondary" | "success" | "warning" | "danger" | "info">;
            };
            label: {
                type: import("vue").PropType<string>;
            };
        }>>, never>;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot<any>;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}>;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}>;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            color: {
                type: import("vue").PropType<"primary" | "secondary" | "success" | "warning" | "danger" | "info">;
            };
            label: {
                type: import("vue").PropType<string>;
            };
        }>>, {
            tooltip: import("vue").Ref<HTMLElement>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}>, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}>, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: import("vue").WatchOptions<boolean>): import("vue").WatchStopHandle;
    } & Omit<Readonly<import("vue").ExtractPropTypes<{
        color: {
            type: import("vue").PropType<"primary" | "secondary" | "success" | "warning" | "danger" | "info">;
        };
        label: {
            type: import("vue").PropType<string>;
        };
    }>>, "tooltip"> & import("vue").ShallowUnwrapRef<{
        tooltip: import("vue").Ref<HTMLElement>;
    }> & {} & import("vue").ComponentCustomProperties & {} & {
        $slots: Readonly<import("./BaseTooltip.vue").BaseTooltipSlots> & import("./BaseTooltip").BaseTooltipSlots;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<TooltipProps>, {
    placement: string;
    offset: number;
}>>>, {
    offset: number;
    placement: Placement;
}, {}>, Readonly<TooltipSlots> & TooltipSlots>;
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
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
