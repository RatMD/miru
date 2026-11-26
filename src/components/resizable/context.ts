import type { ResizableDirection } from './types';
import type { ComputedRef, InjectionKey } from 'vue';
export interface ResizablePanelController {
    collapsed: ComputedRef<boolean>;
    collapsible: ComputedRef<boolean>;
    collapse: () => void;
    expand: () => void;
}
export interface ResizableContext {
    id: ComputedRef<string>;
    direction: ComputedRef<ResizableDirection>;
    disabled: ComputedRef<boolean>;
    panels: Map<string, ResizablePanelController>;
}
export const resizableContextKey: InjectionKey<ResizableContext> = Symbol('Resizable');
