import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Shared English copy for Anchor. */
export const anchorSummary =
    'An inline link with theme colours, animated underlines and a clear keyboard focus state. Supports external destinations, router links and disabled navigation.';
export const anchorDependencies = {
    packages: ['@tabler/icons-vue', 'class-variance-authority', 'clsx', 'tailwind-merge', 'vue'],
};
export function anchorDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(anchorDependencies, storybook);
}
export const anchorApiCopy: Record<string, Record<string, Record<string, string>>> = {
    Anchor: {
        props: {
            href: 'The destination URL.',
            target: 'The browsing context in which to open the destination.',
            external: 'Show an external-link icon; also shown automatically for a new-tab target.',
            rel: 'The link relationship; noopener and noreferrer are added for new-tab targets.',
            variant: 'Set the text colour and matching hover tone.',
            underline: 'Show the underline on hover and keyboard focus, always, or never.',
            animation: 'Fade the hover underline or slide it from left to right.',
            disabled:
                'Prevent navigation and click handlers, and remove the link from the tab order.',
            asChild:
                'Merge behaviour and attributes into a link supplied through the default slot.',
            class: 'Additional CSS classes for the link.',
        },
        events: { click: 'Emitted with the mouse event when an enabled link is activated.' },
        slots: {
            default: 'The link label, or a single native or router link when asChild is enabled.',
        },
    },
};
