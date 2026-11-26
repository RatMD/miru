import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const tableSummary =
    'A semantic table for static content and small, locally managed collections, with optional sorting and ready-made cells. For larger data sources, use DataTable, built on TanStack Table.';
export const tableIntroduction =
    'Use Table for invoice lines, summaries, comparisons and other tables whose rows you compose directly. It provides presentation, specialised cells and optional local sorting through `useTableSort`. For larger data sources with column configuration, filtering, selection or pagination, use [DataTable](/components/api/data-table), which is built on [@tanstack/vue-table](https://www.npmjs.com/package/@tanstack/vue-table).';
export const tableSummaries: Record<string, string> = {
    Table: tableSummary,
    TableHeader: 'A header section for table headings and grouped column labels.',
    TableBody: 'The body section containing the table’s data rows.',
    TableFooter: 'A footer section for totals and summary rows.',
    TableRow: 'A table row with optional hover feedback.',
    TableHead: 'A header cell with alignment and optional sorting controls.',
    TableCell: 'A table data cell with configurable alignment.',
    TableCaption: 'An accessible table caption, displayed above the header by default.',
    TableCellMoney: 'A complete table cell for a localised currency amount.',
    TableCellDateTime: 'A complete table cell for a localised date, time or both.',
    TableCellCount: 'A complete table cell for a count displayed in a circular indicator.',
    TableCellBadge: 'A complete table cell for a labelled status badge.',
    TableCellStatus: 'A complete table cell for a status dot or icon with a labelled tooltip.',
    TableCellAddress: 'A complete table cell for a structured address with copyable fields.',
    TableCellMultiCounts: 'A complete table cell for several labelled counts from one item.',
    TableCellBoolean: 'A complete table cell for a labelled boolean toggle.',
    TableMoneyValue: 'A localised currency value for use within an existing cell or custom layout.',
    TableDateTimeValue:
        'A localised date and time value for use within an existing cell or custom layout.',
    TableCountValue: 'A circular count indicator for use within an existing cell or custom layout.',
    TableBadgeValue: 'A labelled status badge for use within an existing cell or custom layout.',
    TableStatusValue:
        'A status dot or icon with a tooltip for use within an existing cell or custom layout.',
    TableAddressValue:
        'A structured address with copyable fields for use within an existing cell or custom layout.',
    TableMultiCountsValue:
        'Several labelled counts for use within an existing cell or custom layout.',
    TableMultiCountsHeader: 'Matching labels or icons for a group of count values.',
    TableBooleanToggle:
        'A labelled boolean control that reports toggle requests to the application.',
};
export function tableDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        {
            components: [
                {
                    name: 'Badge',
                    url: '/components/api/badge',
                    storybook: '/docs/components-badge--docs',
                },
                {
                    name: 'Button',
                    url: '/components/api/button',
                    storybook: '/docs/components-button--docs',
                },
                {
                    name: 'Copy',
                    url: '/components/api/copy',
                    storybook: '/docs/utilities-copy--docs',
                },
                {
                    name: 'Tooltip',
                    url: '/components/api/tooltip',
                    storybook: '/docs/overlay-tooltip--docs',
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
        },
        storybook,
    );
}
type Copy = {
    props: Record<string, string>;
    slots?: Record<string, string>;
    events?: Record<string, string>;
};
const classProp = { class: 'Additional CSS classes for this table element.' };
const align = 'Set the horizontal alignment of the cell or value.';
const moneyProps = {
    value: 'The amount in major currency units; numeric strings are accepted and missing values become zero.',
    currency: 'The ISO currency code used for formatting.',
};
const dateProps = {
    value: 'A date string, Date object or millisecond timestamp; missing or invalid values show a dash.',
    display: 'Show the date, time or both.',
    align,
};
const countProps = { value: 'The numeric count; missing or non-finite values become zero.', align };
const badgeProps = {
    value: 'The status key used to resolve its label, icon and appearance.',
    statuses:
        'Status definitions keyed by value, with labels, translation keys and optional icons.',
    translationPrefix: 'The translation key prefix used when a status has no explicit label.',
    variant: 'Override the badge appearance; otherwise it follows the status value.',
};
const statusProps = {
    value: badgeProps.value,
    statuses: 'Status definitions keyed by value, with labels, icons and colour classes.',
    translationPrefix: badgeProps.translationPrefix,
};
const multiCountProps = {
    item: 'The source item containing the fields named by each count definition.',
    counts: 'The ordered count definitions, with field keys, labels, translation keys and optional header icons.',
    align,
};
const booleanProps = {
    label: 'The accessible name and tooltip for the toggle.',
    disabled: 'Prevent the toggle from being activated.',
    activeClass: 'CSS classes applied to the active toggle.',
};
export const tableApiCopy: Record<string, Copy> = {
    Table: {
        props: {
            ...classProp,
            tableClass: 'Additional CSS classes for the native table element.',
            variant: 'Choose standard or compact header and cell spacing.',
            embedded:
                'Let the surrounding surface provide borders, rounding and horizontal scrolling.',
        },
        slots: { default: 'The table caption, header, body and footer.' },
    },
    TableHeader: { props: classProp, slots: { default: 'Rows containing column headings.' } },
    TableBody: {
        props: classProp,
        slots: { default: 'Data rows or an explicitly rendered empty-state row.' },
    },
    TableFooter: { props: classProp, slots: { default: 'Totals and summary rows.' } },
    TableRow: {
        props: { ...classProp, hover: 'Highlight the row on pointer hover.' },
        slots: { default: 'The row’s header and data cells.' },
    },
    TableHead: {
        props: {
            ...classProp,
            scope: 'Identify the rows or columns labelled by this header.',
            align,
            sortable: 'Render a sort button and expose the sort state to assistive technology.',
            sort: 'The current ascending or descending sort direction, or false for unsorted.',
            disabled: 'Prevent activation of the sort button.',
        },
        events: {
            sort: 'Emitted when the sort button is activated; update the sort state and rows in the application.',
        },
        slots: { default: 'The column or row heading.' },
    },
    TableCell: { props: { ...classProp, align }, slots: { default: 'The cell content.' } },
    TableCaption: {
        props: classProp,
        slots: { default: 'A concise description or accessible name for the table.' },
    },
    TableCellMoney: { props: { ...moneyProps, align } },
    TableMoneyValue: { props: moneyProps },
    TableCellDateTime: { props: dateProps },
    TableDateTimeValue: { props: dateProps },
    TableCellCount: { props: countProps },
    TableCountValue: { props: countProps },
    TableCellBadge: { props: { ...badgeProps, align } },
    TableBadgeValue: { props: badgeProps },
    TableCellStatus: { props: { ...statusProps, align } },
    TableStatusValue: { props: statusProps },
    TableCellAddress: {
        props: { value: 'The structured address to display; missing addresses show a dash.' },
    },
    TableAddressValue: {
        props: {
            value: 'The structured address to display; missing addresses show a dash.',
            fallbackName:
                'The recipient name used when neither company nor recipient name is supplied.',
        },
    },
    TableCellMultiCounts: { props: multiCountProps },
    TableMultiCountsValue: { props: multiCountProps },
    TableMultiCountsHeader: { props: { counts: multiCountProps.counts } },
    TableCellBoolean: {
        props: {
            ...booleanProps,
            modelValue: 'The current boolean state; bind with v-model to handle updates.',
        },
        events: {
            'update:modelValue':
                'Emitted when the toggle is activated, with the new boolean value.',
        },
        slots: { default: 'Custom toggle content; exposes the current active state.' },
    },
    TableBooleanToggle: {
        props: { ...booleanProps, active: 'The current boolean state shown by the control.' },
        events: { toggle: 'Emitted when activated; update the active state in the application.' },
        slots: { default: 'The toggle icon or content; exposes the current active state.' },
    },
};
export const tableNotes = [
    {
        title: 'Composition and local sorting',
        text: 'Compose rows and cells directly. TableHead reports sort requests; use `useTableSort` or your own ordering to update the rows. Table itself exposes no component-specific events or model bindings. For larger or more dynamic data sources, use DataTable.',
    },
    {
        title: 'Specialised cells',
        text: 'Place each `TableCell*` directly inside TableRow. Use its content-only counterpart to combine values within one TableCell. The [Table guide](/component-guides/table#specialised-cells) lists every specialised cell and explains formatting, statuses, counts, addresses and toggles.',
    },
];
