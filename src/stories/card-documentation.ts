import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Manually authored copy shared by Storybook and VitePress. */
export const cardSummaries: Record<string, string> = {
    Card: 'A surface for grouping related content, with composable headings, descriptions and actions. Add a footer or header divider to give each section a clear place.',
    CardAction: 'A container for badges and actions beside the card heading.',
    CardContent:
        'The main content area within a card, with spacing that adapts to the header divider.',
    CardDescription: 'Supporting text beneath a card heading, styled with a muted colour.',
    CardFooter: 'A footer for supporting content and actions at the bottom of a card.',
    CardHeader:
        'A header for a card heading and description, with optional badges, actions and a divider.',
    CardTitle: 'A card heading rendered as a level-three heading.',
    CardChart:
        'A card for a chart, with a heading, optional description and an empty state. Supply the chart through the default slot.',
};

export function cardDependencyMarkdown(name: string, storybook = false) {
    return componentDependenciesMarkdown(
        {
            components:
                name === 'CardChart'
                    ? ['Card', 'CardContent', 'CardDescription', 'CardHeader', 'CardTitle'].map(
                          (name) => ({
                              name,
                              url:
                                  '/components/api/' +
                                  name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
                              storybook: '/docs/components-card--docs',
                          }),
                      )
                    : [],
            packages: ['clsx', 'tailwind-merge', 'vue'],
        },
        storybook,
    );
}

type Copy = { props: Record<string, string>; slots: Record<string, string> };
const classProp = { class: 'Additional CSS classes for this card element.' };
export const cardApiCopy: Record<string, Copy> = {
    Card: {
        props: { ...classProp, border: 'Show a border around the card.' },
        slots: { default: 'The card header, content, footer and other composed elements.' },
    },
    CardAction: {
        props: classProp,
        slots: { default: 'Badges and actions displayed beside the heading.' },
    },
    CardContent: {
        props: classProp,
        slots: { default: 'The main card content.' },
    },
    CardDescription: {
        props: classProp,
        slots: { default: 'Supporting text for the card heading.' },
    },
    CardFooter: {
        props: classProp,
        slots: { default: 'Supporting content and footer actions.' },
    },
    CardHeader: {
        props: { ...classProp, border: 'Show a divider below the header.' },
        slots: {
            actions: 'Actions displayed after badges beside the heading.',
            badges: 'Badges displayed before actions beside the heading.',
            default: 'The card heading, description and optional CardAction.',
        },
    },
    CardTitle: {
        props: classProp,
        slots: { default: 'The card heading text or inline content.' },
    },
    CardChart: {
        props: {
            title: 'The card heading; replaced by the title slot when supplied.',
            description:
                'Supporting text below the heading; replaced by the description slot when supplied.',
            empty: 'Show the empty-state label instead of the default slot content.',
            emptyLabel: 'The message displayed when empty is true.',
            contentClass: 'Additional CSS classes for the CardContent element.',
            emptyClass: 'CSS classes for the empty-state container; replaces its default classes.',
        },
        slots: {
            default: 'The chart content, rendered when empty is false.',
            description: 'Custom supporting content below the heading.',
            title: 'Custom card heading content.',
        },
    },
};

export const cardNotes = {
    card: [
        {
            title: 'Composition and dividers',
            text: 'Compose CardHeader, CardTitle, CardDescription, CardContent and CardFooter inside Card. Place CardAction in the header, or use the header’s `badges` and `actions` slots; badges appear before actions. `Card.border` controls the outer border, while `CardHeader.border` controls the header divider. CardContent adds top spacing when it directly follows a header with a divider. These building blocks expose no component-specific events or model bindings.',
        },
    ],
    'card-chart': [
        {
            title: 'ApexCharts example',
            text: 'The preview uses [ApexChart](/components/api/apex-chart), backed by [apexcharts](https://www.npmjs.com/package/apexcharts) and [vue3-apexcharts](https://www.npmjs.com/package/vue3-apexcharts). Supply your own series and options through ApexChart.',
        },
        {
            title: 'Chart content and empty states',
            text: 'Supply any chart component through the default slot; CardChart does not choose or configure a chart library. Pass both `empty` and `emptyLabel`: they are required props. When `empty` is true, the default slot is not rendered and the label is shown instead. The title and description slots override their corresponding props. CardChart exposes no component-specific events or model bindings.',
        },
    ],
};
