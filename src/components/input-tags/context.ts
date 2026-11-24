import type { InlineVariant } from '../inline-variants';
import type { ComputedRef, InjectionKey } from 'vue';

const tagsVariantKey: InjectionKey<ComputedRef<InlineVariant>> = Symbol('TagsVariant');
export { tagsVariantKey };
