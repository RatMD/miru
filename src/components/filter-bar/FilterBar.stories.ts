import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { computed, ref } from 'vue';
import { ComponentDocs } from '../../stories/ComponentDocs';
import CompositionDemo from '../../stories/CompositionDemo.vue';
import {
    extensionSummaries,
    extensionDependencyMarkdown,
    describeExtensionControls,
} from '../../stories/extensions-documentation';
import { FilterBar } from './index';
const meta = {
    title: 'Extensions/FilterBar',
    component: FilterBar,
    parameters: {
        layout: 'padded',
        controls: { include: ['size', 'narrow', 'disabled'] },
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    extensionSummaries.FilterBar +
                    '\n\n' +
                    extensionDependencyMarkdown('FilterBar', true),
            },
        },
    },
    args: { size: 'default', narrow: false, disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        narrow: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    render: (args, { globals }) => ({
        components: { CompositionDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<CompositionDemo mode="badges" :args="args" :locale="locale"/>',
    }),
} satisfies Meta;
describeExtensionControls('FilterBar', meta.argTypes ?? {});
meta.parameters = {
    ...meta.parameters,
    controls: { ...meta.parameters?.controls, include: Object.keys(meta.argTypes ?? {}) },
};
export default meta;
const categories: StoryObj['render'] = (args) => ({
    components: { FilterBar },
    setup() {
        const selected = ref('all');
        const items = computed(() => [
            {
                key: 'all',
                label: 'All',
                count: 95,
                removable: false,
                selected: selected.value === 'all',
            },
            {
                key: 'components',
                label: 'Components',
                count: 30,
                removable: false,
                selected: selected.value === 'components',
            },
            {
                key: 'extensions',
                label: 'Extensions',
                count: 5,
                removable: false,
                selected: selected.value === 'extensions',
            },
            {
                key: 'empty',
                label: 'Empty',
                count: 0,
                removable: false,
                selected: selected.value === 'empty',
            },
        ]);
        return { args, selected, items };
    },
    template:
        '<FilterBar :items="items" :size="args.size" :disabled="args.disabled" @select="selected = $event" />',
});
export const Default: StoryObj = {};
export const Categories: StoryObj = {
    render: categories,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const components = await canvas.findByRole('button', { name: 'Components (30)' });
        await userEvent.click(components);
        await expect(components).toHaveAttribute('aria-pressed', 'true');
        await expect(components.querySelector('[data-slot="badge-separator"]')).toBeInTheDocument();
        await expect(
            components.querySelector('[data-slot="filter-badge-count"]'),
        ).toHaveTextContent('30');
        await expect(
            canvas
                .getByRole('button', { name: 'Empty (0)' })
                .querySelector('[data-slot="filter-badge-count"]'),
        ).toHaveTextContent('0');
    },
};
export const LightMode: StoryObj = {
    render: categories,
    globals: { theme: 'light' },
    play: async ({ canvasElement }) => {
        await waitFor(() =>
            expect(
                canvasElement.querySelectorAll(
                    '[data-slot="filter-bar"] > [data-slot="filter-badge"]',
                ).length,
            ).toBeGreaterThan(0),
        );
        for (const badge of canvasElement.querySelectorAll(
            '[data-slot="filter-bar"] > [data-slot="filter-badge"]',
        )) {
            const style = getComputedStyle(badge);
            await expect(style.borderTopWidth).toBe('1px');
            await expect(style.borderTopStyle).toBe('solid');
            await expect(style.borderTopColor).not.toBe('rgba(0, 0, 0, 0)');
        }
    },
};
export const Overflow: StoryObj = { args: { narrow: true } };
export const Disabled: StoryObj = { args: { narrow: true, disabled: true } };

export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const SmallOverflow: StoryObj = { args: { narrow: true, size: 'sm' } };
export const LargeOverflow: StoryObj = { args: { narrow: true, size: 'lg' } };
