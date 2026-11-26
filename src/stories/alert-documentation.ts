import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Shared English copy for the Alert family. */
export const alertSummary =
    'An accessible notice for information, confirmations, warnings and errors. Combine semantic colours with an optional title, icon and dismiss button in the default or soft appearance.';

export const alertDependencies = {
    components: [
        {
            name: 'ButtonAction',
            url: '/components/api/button-action',
            storybook: '/docs/components-buttonaction--docs',
        },
    ],
    packages: ['@tabler/icons-vue', 'class-variance-authority', 'clsx', 'tailwind-merge', 'vue'],
};
export function alertDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(alertDependencies, storybook);
}

export const alertApiCopy: Record<
    string,
    {
        props?: Record<string, string>;
        events?: Record<string, string>;
        slots?: Record<string, string>;
    }
> = {
    Alert: {
        props: {
            class: 'Additional CSS classes for this part.',
            variant: 'Set the semantic colour of the notice.',
            appearance: 'Choose the default accented surface or a soft, tinted surface.',
            showIcon: 'Show the built-in status icon unless a custom icon is supplied.',
            dismissable: 'Show a button for dismissing the notice.',
            dismissLabel:
                'The accessible name of the dismiss button; uses the translated close label when omitted.',
            open: 'Control visibility; uses local state, initially visible, when omitted.',
        },
        events: {
            'update:open': 'Emitted with false when the dismiss button is activated.',
            dismiss: 'Emitted when the dismiss button is activated.',
        },
        slots: {
            default: 'The notice content, usually AlertTitle and AlertDescription.',
            icon: 'A custom icon replacing the built-in status icon, including when showIcon is false.',
        },
    },
    AlertTitle: {
        props: { class: 'Additional CSS classes for this part.' },
        slots: { default: 'The optional notice heading.' },
    },
    AlertDescription: {
        props: { class: 'Additional CSS classes for this part.' },
        slots: { default: 'The notice message and supporting content.' },
    },
};
