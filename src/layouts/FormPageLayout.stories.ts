import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import FormPageLayoutDemo from '../stories/FormPageLayoutDemo.vue';
import { FormPageLayout } from './index';

const meta = {
    title: 'Layout/FormPage',
    component: FormPageLayout,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Shared responsive form page: tabs on the left, content in the center and actions on the right. Compact layouts move tabs to the top and dock actions above an optional FloatingAppBar. See Guide for integration, slots and migration.',
            },
        },
    },
    args: { loading: false },
    argTypes: {
        loading: { control: 'boolean' },
        tabs: { control: false },
        additionalActions: { control: false },
        modelValue: { control: false },
    },
    render: (args, { globals, parameters }) => ({
        components: { FormPageLayoutDemo },
        setup: () => ({
            args,
            locale: globals.locale || 'en',
            preset: parameters.layoutDemo ?? {},
        }),
        template:
            '<div class="p-6"><FormPageLayoutDemo v-bind="preset" :loading="args.loading" :locale="locale" /></div>',
    }),
} satisfies Meta<typeof FormPageLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Desktop: Story = { parameters: { layoutDemo: { device: 'desktop' } } };
export const Tablet: Story = { parameters: { layoutDemo: { device: 'tablet' } } };
export const Smartphone: Story = {
    parameters: { layoutDemo: { device: 'mobile' } },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dock = canvasElement.querySelector(
            '[data-slot="form-mobile-actions"]',
        ) as HTMLElement;
        await waitFor(() => expect(dock).toBeVisible());
        const buttons = within(dock).getAllByRole('button');
        await expect(buttons).toHaveLength(3);
        await userEvent.click(buttons[0]!);
        const body = within(canvasElement.ownerDocument.body);
        const dialog = await body.findByRole('dialog');
        await userEvent.click(within(dialog).getByRole('button', { name: /Preview|Vorschau/ }));
        await waitFor(() => expect(dialog).not.toBeVisible());
        await expect(canvas.getByRole('status')).toHaveTextContent('preview');
        const name = canvas.getByRole('textbox', { name: /^Name$/ });
        await userEvent.clear(name);
        await userEvent.type(name, 'Preserved value');
        await userEvent.click(canvas.getByRole('tab', { name: /Contact|Kontakt/ }));
        await userEvent.click(canvas.getByRole('tab', { name: /General|Allgemein/ }));
        await expect(name).toHaveValue('Preserved value');
        await userEvent.click(buttons[2]!);
        await expect(canvas.getByRole('status')).toHaveTextContent(/saved|gespeichert/);
    },
};
export const WithoutAdditionalActions: Story = {
    parameters: { layoutDemo: { device: 'mobile', additionalActions: false } },
    play: async ({ canvasElement }) => {
        const dock = canvasElement.querySelector(
            '[data-slot="form-mobile-actions"]',
        ) as HTMLElement;
        await waitFor(() => expect(within(dock).getAllByRole('button')).toHaveLength(2));
    },
};
export const WithFloatingAppBar: Story = {
    parameters: { layoutDemo: { device: 'mobile', floatingAppBar: true } },
    play: async ({ canvasElement }) => {
        const dock = canvasElement.querySelector('[data-slot="form-page-dock"]') as HTMLElement;
        const actions = dock.querySelector('[data-slot="form-mobile-actions"]') as HTMLElement;
        const bar = dock.querySelector('[data-slot="floating-app-bar"]') as HTMLElement;
        await waitFor(() => expect(bar).toBeVisible());
        await expect(bar).toHaveAttribute('data-orientation', 'horizontal');
        await expect(bar.classList.contains('ui-floating-app-bar-fixed')).toBe(false);
        await expect(actions.getBoundingClientRect().bottom).toBeLessThanOrEqual(
            bar.getBoundingClientRect().top,
        );
    },
};
export const Hexagon: Story = {
    parameters: { layoutDemo: { device: 'mobile', floatingAppBar: true, hexagon: true } },
};
export const Loading: Story = {
    args: { loading: true },
    parameters: { layoutDemo: { device: 'mobile' } },
    play: async ({ canvasElement }) => {
        const dock = canvasElement.querySelector(
            '[data-slot="form-mobile-actions"]',
        ) as HTMLElement;
        for (const button of within(dock).getAllByRole('button'))
            await expect(button).toBeDisabled();
    },
};
export const StandaloneSection: Story = {
    parameters: { layoutDemo: { device: 'tablet', standalone: true, floatingAppBar: true } },
    play: async ({ canvasElement }) => {
        await userEvent.click(
            within(canvasElement).getByRole('tab', {
                name: /Standalone content|Eigenständiger Inhalt/,
            }),
        );
        await waitFor(() =>
            expect(canvasElement.querySelector('[data-slot="form-mobile-actions"]')).toBeNull(),
        );
        await expect(canvasElement.querySelector('[data-slot="floating-app-bar"]')).toBeVisible();
    },
};
