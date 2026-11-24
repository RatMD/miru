import type { ComputedRef, InjectionKey, Ref } from 'vue';

export type SelectSize = 'sm' | 'default' | 'lg';
export type SelectShape = 'default' | 'round';

/** Share the root shape with its trigger. */
export const selectShapeKey: InjectionKey<ComputedRef<SelectShape>> = Symbol('MiruSelectShape');

/** Preserve the trigger's dropdown density across SelectPortal. */
export const selectSizeKey: InjectionKey<ComputedRef<SelectSize>> = Symbol('MiruSelectSize');
export const selectTriggerSizeKey: InjectionKey<Ref<SelectSize | undefined>> =
    Symbol('MiruSelectTriggerSize');
