import type { ComputedRef, InjectionKey } from 'vue';
import { inject } from 'vue';
export type PaginationMode = 'full' | 'compact' | 'navigation' | 'simple';
export const paginationAppearance: InjectionKey<
    ComputedRef<{ variant: 'outline' | 'ghost'; compact: boolean; connected: boolean }>
> = Symbol('pagination-appearance');
export const usePaginationAppearance = () => inject(paginationAppearance, undefined);
