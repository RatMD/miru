import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const badgeSummary =
    'A compact label for a status, category or short value, with theme colours and optional icons. Use it on its own or combine parts and separators in a single badge.';
export const badgeCopySummary =
    'A badge that copies text or multiple MIME representations to the clipboard and shows a confirmation tooltip. Supports the same colours, appearances and sizes as Badge, with optional icons and custom label content.';
export const badgeDependencies = {
    packages: [
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
        'vue',
    ],
    primitives: [
        { name: 'Reka UI Primitive', url: 'https://reka-ui.com/docs/utilities/primitive' },
    ],
};
export const badgeCopyDependencies = {
    components: [
        { name: 'Badge', url: '/components/api/badge', storybook: '/docs/components-badge--docs' },
        { name: 'Copy', url: '/components/api/copy', storybook: '/docs/utilities-copy--docs' },
    ],
    packages: ['clsx', 'tailwind-merge', 'vue'],
};
export function badgeDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(badgeDependencies, storybook);
}
export function badgeCopyDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(badgeCopyDependencies, storybook);
}
const appearanceProps = {
    variant: 'Set the badge colour or neutral visual variant.',
    appearance: 'Use automatic theme styling, a solid fill or a soft tint for semantic colours.',
    size: 'Set the badge spacing, text size and icon size.',
};
const appearanceDefaults = { variant: '"default"', appearance: '"auto"', size: '"default"' };
export const badgeApiCopy: Record<
    string,
    {
        props?: Record<string, string>;
        slots?: Record<string, string>;
        defaults?: Record<string, string>;
    }
> = {
    Badge: {
        props: {
            ...appearanceProps,
            as: 'The element or component to render; link is an alias for a. Defaults to a when href is supplied, otherwise span.',
            asTag: 'Override as with another element or component; link is an alias for a.',
            asChild: 'Merge behaviour and attributes into the child element.',
            href: 'The link destination; selects an anchor when no element override is supplied.',
            interactive:
                'Enable interactive hover styling; links, buttons and asChild also enable it automatically.',
            class: 'Additional CSS classes for the badge.',
        },
        slots: {
            default: 'The label, icons or sections composed with BadgePart and BadgeSeparator.',
        },
        defaults: { ...appearanceDefaults, asChild: 'false', interactive: 'false' },
    },
    BadgePart: {
        props: { class: 'Additional CSS classes for this badge section.' },
        slots: {
            default:
                'The section text, icons or formatted value; spacing follows the surrounding Badge size.',
        },
    },
    BadgeSeparator: { props: { class: 'Additional CSS classes for the decorative separator.' } },
    BadgeCopy: {
        props: {
            ...appearanceProps,
            content: 'The text to copy, or an object mapping MIME types to their string content.',
            label: 'The copy button accessible name and confirmation tooltip; uses translated defaults when omitted.',
            type: 'The MIME type used when content is a string.',
            wrapper: 'Enable the wrapper styling option passed to Copy.',
            class: 'Additional CSS classes for the outer copy button.',
            badgeClass: 'Additional CSS classes for the inner badge, including its width limit.',
            icon: 'The icon component to render when the icon slot is not supplied.',
            iconPosition: 'Place a direct SVG icon before or after the label.',
            iconClass: 'Additional CSS classes for the icon supplied through the icon prop.',
        },
        slots: {
            default: 'The visible label; uses content when omitted.',
            icon: 'Replace the icon supplied through the icon prop.',
        },
        defaults: { ...appearanceDefaults, type: '"text/plain"' },
    },
};
