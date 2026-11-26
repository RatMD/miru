import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const progressSummary =
    'A progress bar showing completion towards a total, with theme colours and optional animated stripes. Supply the current value and maximum to show a proportionate indicator.';
export function progressDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        {
            packages: [
                '@vueuse/core',
                'class-variance-authority',
                'clsx',
                'reka-ui',
                'tailwind-merge',
                'vue',
            ],
            primitives: [
                { name: 'Reka UI Progress', url: 'https://reka-ui.com/docs/components/progress' },
            ],
        },
        storybook,
    );
}
export const progressApiCopy: Record<
    string,
    { props: Record<string, string>; defaults?: Record<string, string> }
> = {
    Progress: {
        props: {
            class: 'Additional CSS classes for the progress track.',
            modelValue:
                'The current progress value; null marks progress as indeterminate for assistive technology.',
            max: 'The positive value that represents completion.',
            getValueLabel:
                'Return an accessible value label; defaults to a percentage for numeric values.',
            getValueText: 'Return custom accessible value text for the current value and maximum.',
            as: 'The HTML element or Vue component to render for the track.',
            asChild: 'Merge the track’s behaviour and attributes into its child.',
            variant: 'Set the indicator colour.',
            animated: 'Add moving stripes to the indicator; respects reduced-motion preferences.',
        },
        defaults: { as: '"div"', asChild: 'false' },
    },
};
export const progressNotes = [
    {
        title: 'Values and accessibility',
        text: 'Supply a meaningful accessible name with `aria-label` or `aria-labelledby`. The visible fill is clamped between zero and the maximum; use a positive `max` and values within that range. A `null` value exposes an indeterminate state but leaves the visible fill at zero. Animated stripes decorate the filled portion and do not provide an indeterminate loading animation. Update `modelValue` from the application; this wrapper declares no update event or model binding and exposes no custom slots.',
    },
];
