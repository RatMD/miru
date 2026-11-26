import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const paginationSummaries: Record<string, string> = {
    Pagination:
        'Navigation between pages of results, with numbered pages and first, previous, next and last controls. Choose a full, compact or navigation-only layout, with optional joined buttons.',
    PaginationContent:
        'A container that supplies page numbers and ellipsis entries for custom pagination.',
    PaginationEllipsis: 'An indicator for omitted pages in a pagination range.',
    PaginationFirst: 'A control that moves to the first page.',
    PaginationItem: 'A control that selects one numbered page.',
    PaginationLast: 'A control that moves to the last page.',
    PaginationNext: 'A control that moves to the next page.',
    PaginationPrevious: 'A control that moves to the previous page.',
};
export function paginationDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        {
            components: [
                {
                    name: 'Button',
                    url: '/components/api/button',
                    storybook: '/docs/components-button--docs',
                },
            ],
            packages: [
                '@tabler/icons-vue',
                '@vueuse/core',
                'class-variance-authority',
                'clsx',
                'reka-ui',
                'tailwind-merge',
                'vue',
            ],
            primitives: [
                {
                    name: 'Reka UI Pagination',
                    url: 'https://reka-ui.com/docs/components/pagination',
                },
            ],
        },
        storybook,
    );
}
type Copy = {
    props: Record<string, string>;
    slots?: Record<string, string>;
    events?: Record<string, string>;
    defaults?: Record<string, string>;
};
const commonProps = {
    class: 'Additional CSS classes for this pagination element.',
    as: 'The HTML element or Vue component to render.',
    asChild: 'Merge the element’s behaviour and attributes into its child.',
};
const navigationProps = {
    ...commonProps,
    size: 'Set the navigation control dimensions and spacing.',
    variant: 'Choose outlined or ghost styling; inherits the pagination variant when omitted.',
    compact: 'Show an icon-only control; inherits the pagination mode when omitted.',
};
const navigationDefaults = { as: '"button"', asChild: 'false' };
export const paginationApiCopy: Record<string, Copy> = {
    Pagination: {
        props: {
            ...commonProps,
            page: 'The current page number, starting at 1; bind with v-model:page for controlled navigation.',
            defaultPage: 'The initial page when page is not controlled.',
            itemsPerPage: 'The number of results per page.',
            total: 'The total number of results across all pages.',
            siblingCount:
                'The number of neighbouring pages shown on each side of the current page.',
            disabled: 'Prevent interaction with every pagination control.',
            showEdges: 'Include the first and last numbered pages in the page range.',
            variant: 'Choose outlined or ghost styling for inactive controls.',
            mode: 'Choose full or compact numbered controls, navigation controls only, or previous and next only (simple).',
            connected: 'Join adjacent controls with shared borders and outer corners.',
            size: 'Set the pagination control dimensions and spacing.',
        },
        events: {
            'update:page': 'Emitted when the current page changes, with the new page number.',
        },
        slots: {
            default:
                'Replace the standard controls; exposes the current page and total page count.',
        },
        defaults: {
            as: '"nav"',
            asChild: 'false',
            defaultPage: '1',
            total: '0',
            siblingCount: '2',
            disabled: 'false',
            showEdges: 'false',
        },
    },
    PaginationContent: {
        props: commonProps,
        slots: {
            default:
                'The pagination controls; exposes an items array of page and ellipsis entries.',
        },
        defaults: { as: '"div"', asChild: 'false' },
    },
    PaginationEllipsis: {
        props: commonProps,
        slots: { default: 'Replace the dots icon and translated omitted-pages label.' },
        defaults: { as: '"div"', asChild: 'false' },
    },
    PaginationItem: {
        props: {
            ...commonProps,
            value: 'The page number selected by this control.',
            size: 'Set the numbered control dimensions and spacing.',
            isActive:
                'Apply active-page styling; match this to the current page when composing controls.',
        },
        slots: { default: 'The visible page number or custom label.' },
        defaults: { ...navigationDefaults, isActive: 'false' },
    },
    PaginationFirst: {
        props: navigationProps,
        slots: { default: 'Replace the first-page icon and translated label.' },
        defaults: navigationDefaults,
    },
    PaginationLast: {
        props: navigationProps,
        slots: { default: 'Replace the last-page icon and translated label.' },
        defaults: navigationDefaults,
    },
    PaginationNext: {
        props: navigationProps,
        slots: { default: 'Replace the next-page icon and translated label.' },
        defaults: navigationDefaults,
    },
    PaginationPrevious: {
        props: navigationProps,
        slots: { default: 'Replace the previous-page icon and translated label.' },
        defaults: navigationDefaults,
    },
};
export const paginationNotes = [
    {
        title: 'Page state and custom controls',
        text: 'Set `itemsPerPage` and `total` to calculate the page count. Use `v-model:page` for controlled navigation or `defaultPage` for an initial uncontrolled value. Pagination reports page changes; the application loads or filters the results. Replace the default slot to compose PaginationContent and its controls, using the exposed `page` and `pageCount`. PaginationContent supplies page and ellipsis entries through its `items` slot property. Set `isActive` on custom PaginationItem controls to match the current page.',
    },
    {
        title: 'Modes and appearance',
        text: '`full` shows numbered pages and navigation controls with labels at wider screen widths. `compact` retains the numbered pages with icon-only navigation. `navigation` shows first, previous, next and last controls; `simple` shows previous and next only. `showEdges` affects the numbered range, while `connected` joins adjacent controls and retains gaps around ellipses. Individual navigation controls can override `variant` and `compact`. Navigation controls use translated labels.',
    },
];
