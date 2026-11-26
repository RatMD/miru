import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const attachmentSummary =
    'A file or image preview with metadata, status, progress and independent actions. Supports horizontal or vertical layouts and optional editing of translated titles and descriptions.';
export const attachmentListSummary =
    'A collection of attachments arranged as a list, responsive grid or horizontal row. Supports reordering, removal, primary-item indicators and metadata editing through controlled updates.';
const ui = (name: string, slug: string, storybook: string) => ({
    name,
    url: '/components/api/' + slug,
    storybook: '/docs/' + storybook + '--docs',
});
export const attachmentDependencies = {
    components: [
        ui('Badge', 'badge', 'components-badge'),
        ui('ButtonAction', 'button-action', 'components-buttonaction'),
        ui('Field', 'field', 'form-field'),
        ui('FieldError', 'field-error', 'form-field'),
        ui('FieldLabel', 'field-label', 'form-field'),
        ui('FormLocaleSwitcher', 'form-locale-switcher', 'form-generator'),
        ui('Input', 'input', 'formfields-input'),
        ui('Progress', 'progress', 'components-progress'),
        ui('Textarea', 'textarea', 'formfields-textarea'),
        ui('Tooltip', 'tooltip', 'overlay-tooltip'),
        ui('TooltipContent', 'tooltip-content', 'overlay-tooltip'),
        ui('TooltipProvider', 'tooltip-provider', 'overlay-tooltip'),
        ui('TooltipTrigger', 'tooltip-trigger', 'overlay-tooltip'),
    ],
    packages: ['@tabler/icons-vue', 'clsx', 'tailwind-merge', 'vue'],
};
export const attachmentListDependencies = {
    components: [ui('Attachment', 'attachment', 'components-attachment')],
    packages: ['clsx', 'sortablejs', 'tailwind-merge', 'vue'],
};
export function attachmentDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(attachmentDependencies, storybook);
}
export function attachmentListDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(attachmentListDependencies, storybook);
}
const commonProps = {
    aspectRatio:
        'The preview width-to-height ratio in vertical layouts; non-positive values use 1.',
    maxWidth:
        'The attachment width limit in pixels or a CSS length; vertical cards default to 20rem via the theme token.',
    maxPreviewHeight: 'The vertical preview height limit in pixels or a CSS length.',
    size: 'Set the card spacing and horizontal thumbnail size.',
    primaryLabel: 'The primary badge text; uses the translated label when omitted.',
    showType: 'Show the inferred attachment kind.',
    showMime: 'Show the MIME type, with a tooltip when truncated.',
    mimeMaxLength: 'The MIME label character limit; values below 8 use 8.',
    showSize: 'Show the formatted file size when available.',
    sizeDigits: 'The number of decimal places in the file size, clamped between 0 and 20.',
    sizeMetric: 'Use decimal file-size units instead of binary units.',
    showStatus: 'Show status feedback and allow the progress indicator.',
    showProgress:
        'Show progress for uploading or processing items when showStatus is enabled and progress is supplied.',
    removable: 'Show the remove action.',
    editable: 'Show the built-in title and description fields.',
    locales: 'The available metadata languages; an empty array edits the item directly.',
    baseLocale: 'The initial editing language and base language shown by the locale switcher.',
    activeLocale: 'The metadata editing language; uses local selection when omitted.',
    locale: 'Override the interface language and formatting locale.',
    namePrefix: 'The prefix for generated metadata field names.',
    class: 'Additional CSS classes for the root element.',
};
export const attachmentApiCopy: Record<
    string,
    { props: Record<string, string>; events: Record<string, string>; slots: Record<string, string> }
> = {
    Attachment: {
        props: {
            ...commonProps,
            item: 'The attachment data, including its unique ID, file details, metadata and upload state.',
            orientation: 'Arrange the preview beside or above the attachment details.',
            primary: 'Mark this attachment with the primary badge.',
            dragHandle: 'Show a drag handle; arrow keys request movement through the move event.',
            moveButtons: 'Show previous and next actions that emit movement requests.',
            canMovePrevious: 'Enable the previous move action when movement is available.',
            canMoveNext: 'Enable the next move action when movement is available.',
            moveDirection: 'Choose horizontal or vertical arrow icons for the move buttons.',
            disabled:
                'Disable built-in editing and actions; item.disabled also disables the attachment.',
        },
        events: {
            'update:item': 'Emitted with a new attachment object after a metadata edit.',
            'update:activeLocale': 'Emitted when the metadata editing language changes.',
            remove: 'Emitted with the attachment ID when removal is requested.',
            move: 'Emitted with previous or next when movement is requested.',
        },
        slots: {
            media: 'Replace the preview; exposes the item, inferred kind and preview URL.',
            actions: 'Add independent actions; exposes the item and disabled state.',
            fields: 'Replace the metadata fields; exposes the item, editing locale, update callback and disabled state.',
        },
    },
    AttachmentList: {
        props: {
            ...commonProps,
            modelValue: 'The ordered attachment collection; updates replace the array.',
            layout: 'Arrange attachments as a list, responsive grid or horizontal row.',
            orientation:
                'Override each card orientation; list uses horizontal, while grid and row use vertical.',
            sortable: 'Enable drag sorting and keyboard movement controls.',
            dragHandle: 'Show drag handles when sortable is enabled.',
            moveButtons: 'Show previous and next actions when sortable is enabled.',
            disabled:
                'Disable sorting, removal and metadata edits; individual items may also be disabled.',
            showPrimary:
                'Show a primary badge on the matching primaryId, or on the first item when no ID is supplied.',
            primaryId: 'The ID to mark as primary when showPrimary is enabled.',
            label: 'The accessible list name; uses the translated attachment-list label when omitted.',
            listClass: 'Additional CSS classes for the inner list element.',
            namePrefix: 'The metadata field-name prefix; each item appends its array index.',
        },
        events: {
            'update:modelValue':
                'Emitted with a new array after reordering, removal or a metadata edit.',
            'update:item': 'Emitted with the edited attachment after the collection update.',
            'update:activeLocale':
                'Emitted when an attachment changes the metadata editing language.',
            reorder: 'Emitted with the ordered attachment IDs after a successful move.',
            remove: 'Emitted with the removed attachment ID after the collection update.',
        },
        slots: {
            media: 'Replace each preview; exposes the item, kind, URL and collection index.',
            actions:
                'Add actions to each attachment; exposes the item, disabled state and collection index.',
            fields: 'Replace each metadata editor; exposes the item, editing locale, update callback, disabled state and collection index.',
            empty: 'Replace the message shown when the collection is empty.',
        },
    },
};
