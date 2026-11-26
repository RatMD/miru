import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const skeletonSummary =
    'A pulsing placeholder that reserves space while content loads. Set its dimensions and shape with CSS classes to match the content it will replace.';
export function skeletonDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        { packages: ['clsx', 'tailwind-merge', 'vue'] },
        storybook,
    );
}
export const skeletonApiCopy: Record<string, { props: Record<string, string> }> = {
    Skeleton: {
        props: {
            class: 'Additional CSS classes for the placeholder’s dimensions, shape and appearance.',
        },
    },
};
export const skeletonNotes = [
    {
        title: 'Dimensions and loading announcements',
        text: 'Set width and height with classes or native styles; Skeleton has no sizing props. The width, height and rounded controls in Storybook configure the example. For a group of placeholders, announce loading once on the surrounding region and hide decorative placeholders from assistive technology with `aria-hidden="true"`. Add `motion-reduce:animate-none` to disable the pulse for reduced-motion preferences. Skeleton exposes no component-specific events, slots or model bindings.',
    },
];
