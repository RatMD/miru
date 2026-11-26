import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const avatarSummary =
    'A person or entity represented by an image, initials or custom fallback content. Supports theme colours, five sizes and four shapes, with a fallback while the image loads or if it fails.';
export const avatarStackSummary =
    'A compact group of overlapping avatars with cut-outs that follow each avatar’s shape. Limit the visible avatars and show the remaining count in a customisable overflow indicator.';
export const avatarDependencies = {
    packages: [
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
        'vue',
    ],
    primitives: [{ name: 'Reka UI Avatar', url: 'https://reka-ui.com/docs/components/avatar' }],
};
export const avatarStackDependencies = {
    components: [
        {
            name: 'Avatar',
            url: '/components/api/avatar',
            storybook: '/docs/components-avatar--docs',
        },
        {
            name: 'AvatarFallback',
            url: '/components/api/avatar-fallback',
            storybook: '/docs/components-avatar--docs',
        },
    ],
    packages: ['clsx', 'tailwind-merge', 'vue'],
};
export function avatarDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(avatarDependencies, storybook);
}
export function avatarStackDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(avatarStackDependencies, storybook);
}
const commonProps = {
    class: 'Additional CSS classes for this part.',
    as: 'The HTML element or Vue component to render.',
    asChild: 'Merge behaviour and attributes into the child element.',
};
export const avatarApiCopy: Record<
    string,
    {
        props?: Record<string, string>;
        events?: Record<string, string>;
        slots?: Record<string, string>;
        defaults?: Record<string, string>;
    }
> = {
    Avatar: {
        props: {
            class: commonProps.class,
            size: 'Set the avatar dimensions and fallback text size.',
            shape: 'Choose a round, square, squircle or rounded hexagon shape.',
            tone: 'Set the background and fallback text colours.',
        },
        slots: { default: 'The AvatarImage and AvatarFallback, or custom avatar content.' },
        defaults: { size: '"default"', shape: '"round"', tone: '"default"' },
    },
    AvatarImage: {
        props: {
            ...commonProps,
            src: 'The image URL.',
            crossOrigin: 'The cross-origin request mode for loading the image.',
            referrerPolicy: 'The referrer policy used when loading the image.',
        },
        events: {
            loadingStatusChange:
                'Emitted when the image loading state changes: idle, loading, loaded or error.',
        },
        slots: { default: 'Content for a custom image element when using as or asChild.' },
        defaults: { as: '"img"', asChild: 'false' },
    },
    AvatarFallback: {
        props: { ...commonProps, delayMs: 'Delay showing the fallback by this many milliseconds.' },
        slots: {
            default: 'Initials, an icon or other content shown while the image is unavailable.',
        },
        defaults: { as: '"span"', asChild: 'false' },
    },
    AvatarStack: {
        props: {
            class: 'Additional CSS classes for the avatar group.',
            size: 'The default size for child avatars and the overflow indicator.',
            shape: 'The default shape for child avatars and the overflow indicator.',
            max: 'The maximum number of visible avatars; the overflow indicator does not use a place.',
            overlap:
                'The overlap as a fraction of the stack size, clamped from 0 to 0.75, or a named preset.',
            label: 'The accessible name of the avatar group.',
        },
        slots: {
            default: 'The avatars to group; each child may override size and shape.',
            overflow: 'Replace the overflow content; exposes the hidden avatar count.',
        },
    },
};
