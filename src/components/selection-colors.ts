import type { InlineVariant } from './inline-variants';
import type { CSSProperties } from 'vue';

/** Theme-aware checked colors, shared by checkbox and radio controls. */
function selectionColors(variant: InlineVariant): CSSProperties {
    return {
        '--selection-bg': `var(--ui-${variant})`,
        '--selection-fg': `var(--ui-${variant}-foreground)`,
        '--selection-hover': `var(--ui-${variant}-hover)`,
    };
}

export { selectionColors };
