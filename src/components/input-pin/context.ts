import type { InputPinSize } from './types';
import type { ComputedRef, InjectionKey, HTMLAttributes } from 'vue';
export interface InputPinContext {
    size: InputPinSize;
    connected: boolean;
    masked: boolean;
    maskCharacter: string;
    values: string[];
    length: number;
    label?: string;
    id?: string;
    describedBy?: string;
    invalid?: boolean | 'grammar' | 'spelling';
    valid?: boolean;
    readonly: boolean;
    inputClass?: HTMLAttributes['class'];
    autofocus: boolean;
}
export const inputPinContextKey: InjectionKey<ComputedRef<InputPinContext>> = Symbol('InputPin');
export const inputPinConnectedKey: InjectionKey<ComputedRef<boolean>> = Symbol('InputPinConnected');
