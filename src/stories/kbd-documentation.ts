import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const kbdSummaries: Record<string, string> = {
    Kbd: 'A keycap-style hint for keyboard input, with three sizes and support for icons. Combine keys with KbdGroup to describe a shortcut.',
    KbdGroup: 'A group of keyboard hints for displaying a shortcut or key sequence.',
};
export function kbdDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        { packages: ['clsx', 'tailwind-merge', 'vue'] },
        storybook,
    );
}
export const kbdApiCopy: Record<
    string,
    { props: Record<string, string>; slots: Record<string, string> }
> = {
    Kbd: {
        props: {
            class: 'Additional CSS classes for the keycap.',
            size: 'Set the keycap dimensions and text size.',
        },
        slots: { default: 'The key label, symbol or icon.' },
    },
    KbdGroup: {
        props: { class: 'Additional CSS classes for the keyboard hint group.' },
        slots: { default: 'The keycaps and separators that describe the shortcut or sequence.' },
    },
};
export const kbdNotes = [
    {
        title: 'Shortcut labels and behaviour',
        text: 'Kbd and KbdGroup render native `kbd` elements and describe keyboard input without registering keyboard handlers. Supply a readable `aria-label` when symbols or icons alone do not identify the shortcut clearly. Handle the shortcut in the application. These components expose no component-specific events or model bindings.',
    },
];
