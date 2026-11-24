import type { ComputedRef, InjectionKey } from 'vue';
export const overlayDesktopKey: InjectionKey<ComputedRef<boolean>> = Symbol('OverlayDesktop');
