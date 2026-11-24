import type { ComputedRef, InjectionKey } from 'vue';
/** Scoped defaults supplied by action containers, with per-button props taking precedence. */
export const buttonActionDefaultsKey: InjectionKey<ComputedRef<{ muted: boolean }>> =
    Symbol('ButtonActionDefaults');
