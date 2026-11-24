import type { InlineVariant } from '../inline-variants';
import type { ComputedRef, InjectionKey } from 'vue';

const checkboxVariantKey: InjectionKey<ComputedRef<InlineVariant>> = Symbol('CheckboxVariant');
export { checkboxVariantKey };
