import type { ButtonVariants } from '../button';
import type { Component } from 'vue';

/** Overrides for a standard overlay action; choice actions use an action-based icon fallback. */
export interface OverlayAction {
    label?: string;
    variant?: ButtonVariants['variant'];
    size?: ButtonVariants['size'];
    icon?: Component | null;
    disabled?: boolean;
}
