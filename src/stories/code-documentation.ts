import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Manually authored copy shared by Storybook and VitePress. */
export const codeSummaries: Record<string, string> = {
    Code: 'Inline code with theme colours, an optional prompt prefix and clipboard controls. Copy from the whole element or a separate button while keeping the prefix out of the copied text.',
    CodePanel:
        'A scrollable panel for JSON, HTML or plain text, with optional formatting, line numbers and a copy button. Use the condensed appearance when embedding it in another surface.',
};
const ui = (name: string, slug: string, story: string) => ({
    name,
    url: '/components/api/' + slug,
    storybook: '/docs/' + story + '--docs',
});
export function codeDependencyMarkdown(name: string, storybook = false) {
    return componentDependenciesMarkdown(
        {
            components: [
                ...(name === 'CodePanel'
                    ? [
                          ui('ButtonAction', 'button-action', 'components-buttonaction'),
                          ui('ScrollArea', 'scroll-area', 'utilities-scrollarea'),
                      ]
                    : []),
                ui('Tooltip', 'tooltip', 'overlay-tooltip'),
            ],
            packages: [
                '@tabler/icons-vue',
                '@vueuse/core',
                'class-variance-authority',
                'clsx',
                ...(name === 'CodePanel' ? ['prettier'] : []),
                'reka-ui',
                'tailwind-merge',
                'vue',
            ],
        },
        storybook,
    );
}
export const codeApiCopy: Record<
    string,
    {
        props: Record<string, string>;
        events?: Record<string, string>;
        slots?: Record<string, string>;
    }
> = {
    Code: {
        props: {
            class: 'Additional CSS classes for the inline code element.',
            value: 'The code text; replaced by the default slot when supplied.',
            prefix: 'A decorative prompt before the code; excluded from copied text.',
            prefixVariant: 'Set the prefix colour; inherits the code colour when omitted.',
            variant: 'Set the code colour and its softly tinted background.',
            borderless: 'Hide the border while retaining the tinted background.',
            copyable: 'Enable clipboard copying with tooltip and status feedback.',
            copyTarget: 'Copy from the whole element (all) or a separate icon button (button).',
        },
        events: {
            copy: 'Emitted after a successful clipboard write, with the copied text.',
            'copy-error': 'Emitted when the clipboard write fails, with the error.',
        },
        slots: {
            default:
                'The displayed code content; its rendered text is copied when copying is enabled.',
        },
    },
    CodePanel: {
        props: {
            class: 'Additional CSS classes for the panel.',
            value: 'The source text or value to display; non-string values are serialised.',
            language: 'Choose JSON, HTML or plain text for formatting.',
            format: 'Format supported source text with Prettier before displaying it.',
            condensed: 'Use a flush surface with top and bottom borders for embedded panels.',
            lineNumbers: 'Show line numbers beside the source text.',
            maxHeight: 'Limit the scrollable content height; numbers are interpreted as pixels.',
            label: 'The accessible label for the panel and source area; uses the translated code label when omitted.',
        },
    },
};
export const codeNotes = {
    code: [
        {
            title: 'Clipboard content and feedback',
            text: 'The default slot replaces `value`; copying uses the rendered code text and excludes the decorative prefix and copy controls. With `copyTarget="all"`, the component renders a native button containing the code. Choose `copyTarget="button"` for a separate copy button. Success and failure feedback is translated, and the `copy` and `copy-error` events report the result. Code does not perform syntax highlighting or expose model bindings.',
        },
    ],
    'code-panel': [
        {
            title: 'Formatting and copying',
            text: 'Prettier and its parser plugins load on demand for JSON and HTML when `format` is enabled. Plain text bypasses formatting. If formatting fails, the original serialised text remains visible with a translated message. HTML is displayed as text. The copy button copies the displayed source without line numbers and reports clipboard failures within the panel. CodePanel exposes no component-specific events, slots or model bindings.',
        },
    ],
};
