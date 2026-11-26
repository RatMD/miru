import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import {
    tableSummary,
    tableApiCopy,
    tableDependencyMarkdown,
} from '../../stories/table-documentation';
import TableDemo from '../../stories/TableDemo.vue';
import { TableDocs } from '../../stories/TableDocs';
import TableSpecialCellsDemo from '../../stories/TableSpecialCellsDemo.vue';
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
    TableCellMoney,
    TableCellDateTime,
    TableCellBadge,
    TableCellStatus,
    TableCellCount,
    TableCellMultiCounts,
    TableCellAddress,
    TableCellBoolean,
} from './index';

const meta = {
    title: 'Components/Table',
    component: Table,
    subcomponents: {
        TableHeader,
        TableBody,
        TableFooter,
        TableRow,
        TableHead,
        TableCell,
        TableCaption,
        TableCellMoney,
        TableCellDateTime,
        TableCellBadge,
        TableCellStatus,
        TableCellCount,
        TableCellMultiCounts,
        TableCellAddress,
        TableCellBoolean,
    },
    parameters: {
        layout: 'padded',
        docs: {
            page: TableDocs,
            description: {
                component: tableSummary + '\n\n' + tableDependencyMarkdown(true),
            },
        },
    },
    args: { variant: 'default', embedded: false },
    argTypes: {
        variant: { control: 'select', options: ['default', 'compact'] },
        embedded: { control: 'boolean' },
    },
    render: (args, { globals }) => ({
        components: { TableDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<TableDemo v-bind="args" :locale="locale" />',
    }),
} satisfies Meta;
Object.assign(
    meta.argTypes,
    Object.fromEntries(
        Object.entries(meta.argTypes).map(([name, control]) => [
            name,
            {
                ...control,
                description: tableApiCopy.Table.props[name],
                table: { category: 'Table props' },
            },
        ]),
    ),
);
export default meta;
type Story = StoryObj;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const caption = canvasElement.querySelector('caption')!;
        await expect(getComputedStyle(caption).position).toBe('absolute');
        const table = canvasElement.querySelector('[data-slot="table"]')!;
        const footer = canvasElement.querySelector('tfoot')!;
        await expect(table.getBoundingClientRect().bottom).toBe(
            footer.getBoundingClientRect().bottom,
        );
    },
};
export const WithCaption: Story = {
    args: { caption: true },
    play: async ({ canvasElement }) => {
        const caption = canvasElement.querySelector('caption')!;
        const header = canvasElement.querySelector('[data-slot="table-header"]')!;
        await expect(getComputedStyle(caption).captionSide).toBe('top');
        await expect(getComputedStyle(caption).fontWeight).toBe('600');
        await expect(getComputedStyle(caption).borderBottomWidth).toBe('1px');
        await expect(getComputedStyle(caption).backgroundColor).toBe(
            getComputedStyle(header).backgroundColor,
        );
        await expect(caption.getBoundingClientRect().bottom).toBeLessThanOrEqual(
            header.getBoundingClientRect().top,
        );
    },
};
export const Compact: Story = { args: { variant: 'compact' } };
export const Embedded: Story = {
    args: { embedded: true },
    play: async ({ canvasElement }) => {
        const container = canvasElement.querySelector('[data-slot="table-container"]')!;
        const card = container.parentElement!;
        await expect(getComputedStyle(container).borderTopWidth).toBe('0px');
        await expect(getComputedStyle(card).borderTopWidth).toBe('1px');
        // Resolve the theme token through CSS, independent of light/dark mode.
        const probe = canvasElement.ownerDocument.createElement('div');
        probe.style.color = 'var(--ui-border)';
        card.append(probe);
        try {
            await expect(getComputedStyle(card).borderTopColor).toBe(getComputedStyle(probe).color);
        } finally {
            probe.remove();
        }
    },
};
export const Empty: Story = { args: { empty: true } };
export const LocalSorting: Story = {
    args: { sortable: true },
    play: async ({ canvasElement, globals }) => {
        const canvas = within(canvasElement);
        const amount = canvas.getByRole('button', {
            name: globals.locale === 'de' ? 'Betrag' : 'Amount',
        });
        const firstName = () => canvasElement.querySelector('tbody tr td')!;
        const header = amount.closest('th')!;
        await expect(firstName()).toHaveTextContent('Hosting');
        await userEvent.click(amount);
        await expect(header).toHaveAttribute('aria-sort', 'ascending');
        await expect(firstName()).toHaveTextContent('Support');
        await userEvent.click(amount);
        await expect(header).toHaveAttribute('aria-sort', 'descending');
        await expect(firstName()).toHaveTextContent('Design');
        // Native button keyboard activation also cycles back to the original order.
        amount.focus();
        await userEvent.keyboard('{Enter}');
        await expect(header).toHaveAttribute('aria-sort', 'none');
        await expect(firstName()).toHaveTextContent('Hosting');
        await userEvent.click(canvas.getByRole('button', { name: 'Position' }));
        await expect(firstName()).toHaveTextContent('Design');
        await expect(header).toHaveAttribute('aria-sort', 'none');
    },
};
export const DisabledSorting: Story = {
    args: { sortable: true, disabled: true },
    play: async ({ canvasElement }) => {
        for (const button of within(canvasElement).getAllByRole('button')) {
            await expect(button).toBeDisabled();
        }
    },
};
export const GroupedHeaders: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption },
        template: `<Table>
            <TableCaption>Quarterly revenue in EUR</TableCaption>
            <TableHeader>
                <TableRow :hover="false"><TableHead :rowspan="2">Team</TableHead><TableHead :colspan="2" scope="colgroup" align="right">2026</TableHead></TableRow>
                <TableRow :hover="false"><TableHead align="right">Q1</TableHead><TableHead align="right">Q2</TableHead></TableRow>
            </TableHeader>
            <TableBody>
                <TableRow><TableHead scope="row">Design</TableHead><TableCell align="right">12,000</TableCell><TableCell align="right">15,000</TableCell></TableRow>
                <TableRow><TableHead scope="row">Development</TableHead><TableCell align="right">24,000</TableCell><TableCell align="right">28,000</TableCell></TableRow>
            </TableBody>
        </Table>`,
    }),
};

const specialCells =
    (scenario: string): Story['render'] =>
    (args, { globals }) => ({
        components: { TableSpecialCellsDemo },
        setup: () => ({ args, scenario, locale: globals.locale || 'en' }),
        template: '<TableSpecialCellsDemo v-bind="args" :scenario="scenario" :locale="locale" />',
    });

export const MoneyAndDates: Story = {
    render: specialCells('values'),
    play: async ({ canvasElement, globals }) => {
        const canvas = within(canvasElement);
        const host = canvas.getByText('Hosting').closest('tr')!;
        const design = canvas.getByText('Design').closest('tr')!;
        const support = canvas.getByText('Support').closest('tr')!;
        const locale = globals.locale || 'en';
        await expect(host.querySelector('[data-cell-type="money"]')!).toHaveTextContent(
            new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(29.9),
        );
        await expect(design.querySelector('[data-cell-type="money"]')!).toHaveTextContent(
            new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(120),
        );
        await expect(host.querySelector('[data-cell-type="date-time"]')!).toHaveTextContent(
            new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(
                new Date('2026-11-24T10:30:00+01:00'),
            ),
        );
        for (const cell of support.querySelectorAll('[data-cell-type]')) {
            await expect(cell).toHaveTextContent('—');
        }
        await expect(canvasElement.querySelector('td td')).toBeNull();
    },
};
export const BadgesAndStatus: Story = {
    render: specialCells('statuses'),
    play: async ({ canvasElement, globals }) => {
        const canvas = within(canvasElement);
        const labels =
            globals.locale === 'de'
                ? ['Aktiv', 'Ausstehend', 'Gesperrt']
                : ['Active', 'Pending', 'Blocked'];
        for (const label of labels) {
            await expect(canvas.getByText(label)).toBeVisible();
            await expect(canvas.getByLabelText(label)).toHaveAttribute('tabindex', '0');
        }
    },
};
export const Counters: Story = {
    render: specialCells('counts'),
    play: async ({ canvasElement, globals }) => {
        const canvas = within(canvasElement);
        const host = canvas.getByText('Hosting').closest('tr')!;
        const support = canvas.getByText('Support').closest('tr')!;
        await expect(host.querySelector('[data-cell-type="count"]')!).toHaveTextContent('12');
        await expect(host.querySelector('[data-cell-type="multi-counts"]')!).toHaveTextContent(
            '12/8',
            { normalizeWhitespace: true },
        );
        await expect(support.querySelector('[data-cell-type="count"]')!).toHaveTextContent('0');
        host.querySelector<HTMLElement>('[data-cell-type="multi-counts"] strong')!.focus();
        const body = within(canvasElement.ownerDocument.body);
        await expect(await body.findByRole('tooltip')).toHaveTextContent(
            globals.locale === 'de' ? 'Bestellt' : 'Ordered',
        );
    },
};
export const Addresses: Story = {
    render: specialCells('addresses'),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('MIRU Studio')).toBeVisible();
        await expect(canvas.getByText('Musterstraße 12')).toBeVisible();
        await expect(canvas.getByText('Floor 2')).toBeVisible();
        const support = canvas.getByText('Support').closest('tr')!;
        await expect(support.querySelector('[data-cell-type="address"]')!).toHaveTextContent('—');
    },
};
export const BooleanCells: Story = {
    render: specialCells('booleans'),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const host = within(canvas.getByText('Hosting').closest('tr')!).getByRole('button');
        const locked = within(canvas.getByText('Support').closest('tr')!).getByRole('button');
        await expect(host).toHaveAttribute('aria-pressed', 'true');
        await userEvent.click(host);
        await expect(host).toHaveAttribute('aria-pressed', 'false');
        host.focus();
        await userEvent.keyboard('{Enter}');
        await expect(host).toHaveAttribute('aria-pressed', 'true');
        await expect(locked).toBeDisabled();
        await userEvent.click(locked);
        await expect(locked).toHaveAttribute('aria-pressed', 'false');
    },
};
export const CompactSpecialCells: Story = {
    render: specialCells('values'),
    args: { variant: 'compact' },
};
