import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const spinnerSummary =
    'A loading indicator with continuous or stepped rotation, theme colours and five sizes. Provides a localised loading label and respects reduced-motion preferences.';
export function spinnerDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        {
            packages: [
                '@tabler/icons-vue',
                'class-variance-authority',
                'clsx',
                'tailwind-merge',
                'vue',
            ],
        },
        storybook,
    );
}
export const spinnerApiCopy: Record<string, { props: Record<string, string> }> = {
    Spinner: {
        props: {
            class: 'Additional CSS classes for the loading indicator.',
            variant: 'Set the indicator colour.',
            size: 'Set the indicator dimensions.',
            mode: 'Choose continuous rotation (spin) or eight-step rotation (steps).',
            label: 'The accessible loading label; uses the translated loading text when omitted or empty.',
            decorative:
                'Hide the indicator from assistive technology when loading is already announced elsewhere.',
        },
    },
};
export const spinnerNotes = [
    {
        title: 'Loading labels and motion',
        text: 'Spinner renders a status element with an accessible label. Use `label` for context-specific loading text, or set `decorative` when nearby content already announces the loading state. Decorative mode removes the status role and label and hides the indicator from assistive technology. Both rotation modes stop when reduced motion is requested. Spinner exposes no component-specific events, slots or model bindings.',
    },
];
