import type { ComputedRef, InjectionKey } from 'vue';

type AccordionIconMode = 'default' | 'modern' | 'operator';

const accordionIconModeKey: InjectionKey<ComputedRef<AccordionIconMode>> =
    Symbol('AccordionIconMode');

export { accordionIconModeKey };
export type { AccordionIconMode };
