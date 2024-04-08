/**
 * Fix Typings on Components using generics
 * @source https://github.com/vuejs/core/issues/8373#issuecomment-1597800113
 */

import {
    DefineComponent,
    RendererElement,
    RendererNode,
    VNode,
    VNodeProps,
} from "vue";

type NoUndefined<T> = T extends undefined ? never : T;
type Props =| (VNodeProps & { [key: string]: any; }) | null;

export type SetupContext = {
    props: any;
    attrs: any;
    slots: any;
    emit: any;
    expose: (exposed?: any) => void;
};

export type ComponentReturn = VNode<RendererNode, RendererElement, Props> & {
    __ctx?: SetupContext;
};

export type PseudoComponent<
    T extends (...args: any[]) => ComponentReturn,
    PseudoReturnType extends ComponentReturn = ReturnType<T>,
    PseudoContext extends ComponentReturn["__ctx"] = PseudoReturnType["__ctx"],
    PseudoProps = NoUndefined<PseudoContext>["props"],
    PseudoExposed = Parameters<NoUndefined<PseudoContext>["expose"]>[0]
> = DefineComponent<PseudoProps, PseudoExposed>;
