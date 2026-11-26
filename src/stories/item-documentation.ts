import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const itemSummaries: Record<string, string> = {
    Item: 'A composable row for related content, media and actions. Combine its building blocks into compact lists, linked rows or richer content layouts.',
    ItemActions: 'A container for actions beside an item’s content.',
    ItemContent: 'A flexible column for an item’s title, description and supporting content.',
    ItemDescription:
        'Supporting text for an item, styled with a muted colour and limited to two lines.',
    ItemFooter: 'A full-width footer for supporting content and item actions.',
    ItemGroup: 'A vertical group of related items, with semantics chosen by the application.',
    ItemHeader: 'A full-width header for introductory content and item actions.',
    ItemMedia: 'A media area for an item, with dedicated treatments for icons and images.',
    ItemSeparator: 'A divider between related items in a group.',
    ItemTitle: 'A compact title area for an item’s text and inline content.',
};
export function itemDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        {
            components: [
                {
                    name: 'Separator',
                    url: '/components/api/separator',
                    storybook: '/docs/components-separator--docs',
                },
            ],
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
                { name: 'Reka UI Separator', url: 'https://reka-ui.com/docs/components/separator' },
            ],
        },
        storybook,
    );
}
type Copy = {
    props: Record<string, string>;
    slots?: Record<string, string>;
    defaults?: Record<string, string>;
};
const classProp = { class: 'Additional CSS classes for this item element.' };
const polymorphicProps = {
    as: 'The HTML element or Vue component to render.',
    asChild: 'Merge the element’s behaviour and attributes into its child.',
};
export const itemApiCopy: Record<string, Copy> = {
    Item: {
        props: {
            ...classProp,
            ...polymorphicProps,
            variant: 'Choose a transparent, outlined or muted surface.',
            size: 'Set the row padding and spacing.',
        },
        slots: { default: 'The item’s media, content, actions, header and footer.' },
        defaults: { asChild: 'false', variant: '"default"', size: '"default"' },
    },
    ItemActions: { props: classProp, slots: { default: 'Buttons or other actions for the item.' } },
    ItemContent: {
        props: classProp,
        slots: { default: 'The item title, description and supporting content.' },
    },
    ItemDescription: {
        props: classProp,
        slots: { default: 'Supporting text or inline links for the item.' },
    },
    ItemFooter: {
        props: classProp,
        slots: { default: 'Supporting content and actions below the main row.' },
    },
    ItemGroup: {
        props: classProp,
        slots: { default: 'Related Item elements and optional ItemSeparator dividers.' },
    },
    ItemHeader: {
        props: classProp,
        slots: { default: 'Introductory content and actions above the main row.' },
    },
    ItemMedia: {
        props: { ...classProp, variant: 'Choose plain media, a framed icon or a cropped image.' },
        slots: { default: 'The icon, image or other media for the item.' },
        defaults: { variant: '"default"' },
    },
    ItemSeparator: {
        props: {
            ...classProp,
            ...polymorphicProps,
            decorative: 'Hide the divider from the accessibility tree when it is purely visual.',
            orientation: 'Set the divider direction to horizontal or vertical.',
        },
        defaults: {
            as: '"div"',
            asChild: 'false',
            decorative: 'false',
            orientation: '"horizontal"',
        },
    },
    ItemTitle: {
        props: classProp,
        slots: { default: 'The item title and optional inline content.' },
    },
};
export const itemNotes = [
    {
        title: 'Composition and semantics',
        text: 'Compose ItemMedia, ItemContent and ItemActions inside Item; ItemHeader and ItemFooter span the full row width. Use ItemGroup with ItemSeparator for a vertical collection. Item and ItemGroup render neutral `div` elements by default: choose suitable elements or roles when building a list. For linked rows, use `as="a"` with `href`, or `asChild` with a router link, and keep nested controls out of the link. ItemTitle is a styled `div`, so supply a heading within it when needed. These building blocks expose no component-specific events or model bindings.',
    },
];
