export { default as RadioGroup } from './RadioGroup.vue';
export { default as RadioGroupItem } from './RadioGroupItem.vue';
import type { InlineVariant } from '../inline-variants';
import type { ComputedRef, InjectionKey } from 'vue';

export const radioGroupSizeKey: InjectionKey<ComputedRef<'sm' | 'default' | 'lg'>> =
    Symbol('RadioGroupSize');

export const radioGroupVariantKey: InjectionKey<ComputedRef<InlineVariant>> =
    Symbol('RadioGroupVariant');
