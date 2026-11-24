import type { Component } from 'vue';
import { IconTrash, IconCheck } from '@tabler/icons-vue';

/** Match the triggering action, using the current locale for iconless deletion actions. */
export function resolveOverlayActionIcon(
    triggerIcon: Component | null | undefined,
    triggerLabel: string,
    deleteLabel: string,
    destructive = false,
): Component | null {
    if (triggerIcon !== undefined) return triggerIcon;
    const deletion = deleteLabel.trim().toLocaleLowerCase();
    return destructive || (deletion && triggerLabel.toLocaleLowerCase().includes(deletion))
        ? IconTrash
        : IconCheck;
}
