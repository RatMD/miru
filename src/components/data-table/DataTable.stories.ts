import type { Meta, StoryObj } from '@storybook/vue3-vite';
import type { ComponentOptions } from 'vue';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import DataTableAdaptersDemo from '../../stories/DataTableAdaptersDemo.vue';
import DataTableAdvancedDemo from '../../stories/DataTableAdvancedDemo.vue';
import DataTableDemo from '../../stories/DataTableDemo.vue';
import DataTableMigrationDemo from '../../stories/DataTableMigrationDemo.vue';
import { DataTable } from './index';
const meta = {
    ...componentControls('DataTable'),
    title: 'Extensions/DataTable',
    component: DataTable as unknown as ComponentOptions,
    parameters: {
        layout: 'padded',
        controls: { include: controlNames('DataTable') },
        docs: { description: { component: componentDescription('DataTable') } },
    },
} satisfies Meta;
export default meta;
type Story = StoryObj;
const render =
    (props: Record<string, boolean> = {}): Story['render'] =>
    (args, { globals }) => ({
        components: { DataTableDemo },
        setup: () => ({ locale: globals.locale, props, args }),
        template: '<DataTableDemo :locale="locale" v-bind="{ ...args, ...props }"/>',
    });
export const SearchFiltersAndSorting: Story = { render: render() };
export const ExpandableRows: Story = { render: render({ expandable: true }) };
export const CompactToolbar: Story = { render: render({ compact: true }) };
const adapterRender =
    (backend: 'laravel' | 'lucid' | 'custom'): Story['render'] =>
    () => ({
        components: { DataTableAdaptersDemo },
        setup: () => ({ backend }),
        template: '<DataTableAdaptersDemo :backend="backend" />',
    });
export const LaravelAdapter: Story = { render: adapterRender('laravel') };
export const LucidAdapter: Story = { render: adapterRender('lucid') };
export const CustomAdapter: Story = { render: adapterRender('custom') };
export const Empty: Story = { render: render({ empty: true }) };

const advanced =
    (scenario: string): Story['render'] =>
    (args, { globals }) => ({
        components: { DataTableAdvancedDemo },
        setup: () => ({ args, scenario, locale: globals.locale || 'en' }),
        template: '<DataTableAdvancedDemo v-bind="args" :scenario="scenario" :locale="locale"/>',
    });
export const NativeCounters: Story = { render: advanced('counters') };
export const NativeValueColumns: Story = { render: advanced('values') };
export const SortOrder: Story = { render: advanced('sort') };
export const GroupedSubColumns: Story = { render: advanced('groups') };
export const SubColumns: Story = { render: advanced('subcolumns') };
export const SubTables: Story = { render: advanced('subtables') };
export const RemainingWidth: Story = { render: advanced('fill') };
export const RowSlots: Story = { render: advanced('slots') };
export const RowActions: Story = { render: advanced('actions') };
export const Embedded: Story = { render: advanced('embedded') };
export const CustomContent: Story = { render: advanced('cards') };

export const ActiveFilterOverflow: Story = {
    render: (args, { globals }) => ({
        components: { DataTableDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template:
            '<div class="w-full max-w-2xl"><DataTableDemo v-bind="args" :locale="locale" :initial-filters="{status: \'active\',team: \'MIRU\',search: \'Project\'}"/></div>',
    }),
};

export const CompactActiveFilterOverflow: Story = {
    ...ActiveFilterOverflow,
    args: { variant: 'compact' },
};

/** Exercise the integration contract with real Vue Table, Reka controls and portalled filters. */
export const LucidSelectionAndFilters: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { DataTableMigrationDemo },
        template: '<DataTableMigrationDemo />',
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(canvasElement.ownerDocument.body);
        const checkboxes = canvasElement.querySelectorAll<HTMLElement>('[data-slot="checkbox"]');
        const alphaAction = () =>
            canvas
                .getByText('Alpha')
                .closest('tr')!
                .querySelector<HTMLElement>('button[aria-label="Open item"]')!;
        await expect(checkboxes[2]).toBeDisabled();
        await userEvent.click(checkboxes[1]!);
        await expect(canvas.getByTestId('migration-selection')).toHaveTextContent('alpha');
        await userEvent.click(canvas.getByRole('button', { name: 'Reverse rows' }));
        await waitFor(() =>
            expect(
                within(canvas.getByText('Alpha').closest('tr')!).getByRole('checkbox'),
            ).toBeChecked(),
        );
        await userEvent.click(canvas.getByRole('button', { name: 'Clear selection' }));
        await waitFor(() =>
            expect(canvas.getByTestId('migration-selection')).toHaveTextContent('none'),
        );
        await userEvent.click(alphaAction());
        await expect(canvas.getByTestId('migration-actions')).toHaveTextContent('1');
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle disabled' }));
        await expect(canvasElement.querySelector('thead button')!).toBeDisabled();
        await expect(alphaAction()).toBeDisabled();
        for (const checkbox of canvasElement.querySelectorAll('[data-slot="checkbox"]'))
            await expect(checkbox).toBeDisabled();
        await expect(canvas.getByTestId('migration-visits')).toHaveTextContent('0');
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle disabled' }));
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle loading' }));
        await expect(canvas.getByText('Fetching records')).toBeVisible();
        await expect(canvas.queryByText('Alpha')).not.toBeInTheDocument();
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle loading' }));
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle empty' }));
        await expect(canvas.getByText('No records for this query')).toBeVisible();
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle empty' }));
        await userEvent.click(canvas.getByRole('button', { name: 'Filters' }));
        const dialog = within(await body.findByRole('dialog', { name: 'Filters' }));
        await userEvent.click(dialog.getByRole('button', { name: 'Status' }));
        await userEvent.click(await body.findByRole('checkbox', { name: 'Active' }));
        await expect(body.getByRole('checkbox', { name: 'Blocked' })).toBeDisabled();
        await userEvent.keyboard('{Escape}');
        await fireEvent.input(dialog.getByLabelText('Created: From'), {
            target: { value: '2026-11-02' },
        });
        await fireEvent.input(dialog.getByLabelText('Created: To'), {
            target: { value: '2026-11-01' },
        });
        await waitFor(() =>
            expect(dialog.getByRole('button', { name: 'Apply filters' })).toBeDisabled(),
        );
        await fireEvent.input(dialog.getByLabelText('Created: To'), {
            target: { value: '2026-11-03' },
        });
        await fireEvent.input(dialog.getByLabelText('Size: From'), { target: { value: '0' } });
        await expect(canvas.getByTestId('migration-visits')).toHaveTextContent('0');
        await userEvent.click(dialog.getByRole('button', { name: 'Apply filters' }));
        await waitFor(() => expect(canvas.getByTestId('migration-visits')).toHaveTextContent('1'));
        const values = JSON.parse(canvas.getByTestId('migration-filters').textContent!);
        await expect(values.status).toEqual(['active']);
        await expect(values.created).toEqual({ from: '2026-11-02', to: '2026-11-03' });
        await expect(String(values.size.from)).toBe('0');
    },
};
