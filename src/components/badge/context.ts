import type { BadgeVariants } from './index';
import type { ComputedRef, InjectionKey } from 'vue';

export const badgeSizeKey: InjectionKey<ComputedRef<BadgeVariants['size']>> =
    Symbol('miru-badge-size');
