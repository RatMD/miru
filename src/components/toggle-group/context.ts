import type { ToggleVariants } from '../toggle';
import type { ComputedRef, InjectionKey } from 'vue';

/** Reactive styling shared by a segmented group and its items. */
export const toggleGroupStyleKey: InjectionKey<
    ComputedRef<
        Pick<ToggleVariants, 'size' | 'variant'> & { orientation: 'horizontal' | 'vertical' }
    >
> = Symbol('MiruToggleGroupStyle');
