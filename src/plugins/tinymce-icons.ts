import type { Editor } from 'tinymce';
import {
    IconArrowBackUp,
    IconArrowForwardUp,
    IconBold,
    IconItalic,
    IconUnderline,
    IconList,
    IconListNumbers,
    IconClearFormatting,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconCheck,
    IconX,
} from '@tabler/icons-vue';
import { h, render } from 'vue';

/** Register installed Tabler SVGs locally while retaining TinyMCE's command controls. */
export function registerEditorIcons(editor: Editor, document: Document): void {
    const icons = {
        undo: IconArrowBackUp,
        redo: IconArrowForwardUp,
        bold: IconBold,
        italic: IconItalic,
        underline: IconUnderline,
        'unordered-list': IconList,
        'ordered-list': IconListNumbers,
        'remove-formatting': IconClearFormatting,
        'chevron-down': IconChevronDown,
        'chevron-left': IconChevronLeft,
        'chevron-right': IconChevronRight,
        checkmark: IconCheck,
        close: IconX,
    };
    const container = document.createElement('div');
    for (const [name, icon] of Object.entries(icons)) {
        render(h(icon, { size: 20, strokeWidth: 1.75, 'aria-hidden': 'true' }), container);
        editor.ui.registry.addIcon(name, container.innerHTML);
    }
    render(null, container);
}
