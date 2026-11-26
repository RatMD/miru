import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const separatorSummary =
    'A horizontal or vertical divider between related sections. Keep it decorative or expose it as a semantic separator to assistive technology.';
export function separatorDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        {
            packages: ['@vueuse/core', 'clsx', 'reka-ui', 'tailwind-merge', 'vue'],
            primitives: [
                { name: 'Reka UI Separator', url: 'https://reka-ui.com/docs/components/separator' },
            ],
        },
        storybook,
    );
}
export const separatorApiCopy: Record<
    string,
    { props: Record<string, string>; defaults?: Record<string, string> }
> = {
    Separator: {
        props: {
            class: 'Additional CSS classes for the divider.',
            orientation: 'Set the divider direction to horizontal or vertical.',
            decorative: 'Hide the divider from the accessibility tree when it is purely visual.',
            as: 'The HTML element or Vue component to render.',
            asChild: 'Merge the divider’s behaviour and attributes into its child.',
        },
        defaults: { as: '"div"', asChild: 'false' },
    },
};
export const separatorNotes = [
    {
        title: 'Direction and semantics',
        text: 'The default divider is horizontal and decorative. Set `:decorative="false"` to expose a separator role and its orientation. A vertical divider fills the available height, so give its container a defined height or set a height class on the divider. Separator exposes no component-specific events, slots or model bindings.',
    },
];
