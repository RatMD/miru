import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { provide } from 'vue';
import { miruOptionsKey } from '../../miru';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { formComponentApiCopy } from '../../stories/form-components-documentation';
import FormAdapterDemo from '../../stories/FormAdapterDemo.vue';
import { FormDocs } from '../../stories/FormDocs';
import FormPreview from '../../stories/FormPreview.vue';
import FormShowcase from '../../stories/FormShowcase.vue';
import { Form } from './index';
const meta: Meta = {
    ...componentControls('Form'),
    title: 'Forms/Form',
    id: 'form-form',
    component: Form,
    parameters: {
        controls: { include: controlNames('Form') },
        layout: 'padded',
        docs: { page: FormDocs, description: { component: componentDescription('Form') } },
    },
    decorators: [
        (story) => ({
            components: { story, FormPreview },
            template: '<FormPreview><story /></FormPreview>',
        }),
    ],
    render: (args, { globals }) => ({
        components: { FormShowcase },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormShowcase v-bind="args" :locale="locale"/>',
    }),
};
const exampleCopy: Record<string, string> = {};
Object.assign(
    meta.argTypes ?? {},
    Object.fromEntries(
        Object.entries(meta.argTypes ?? {}).map(([name, control]) => [
            name,
            {
                ...control,
                description:
                    formComponentApiCopy.Form.props[name] ??
                    exampleCopy[name] ??
                    control?.description,
                table: {
                    ...control?.table,
                    category: exampleCopy[name] ? 'Example content' : 'Form props',
                },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const tabs = canvas.getByRole('tablist');
        await waitFor(() => expect(tabs).toHaveAttribute('aria-orientation', 'vertical'));
        await expect(canvasElement.querySelector('[data-slot="tabs"]')).toHaveAttribute(
            'data-appearance',
            'buttons',
        );
        await expect(canvasElement.querySelector('[data-slot="form-actions"]')).toBeVisible();
        await userEvent.click(canvas.getByRole('button', { name: 'Mobile' }));
        await waitFor(() => expect(tabs).toHaveAttribute('aria-orientation', 'horizontal'));
        await expect(
            canvasElement.querySelector('[data-slot="form-mobile-actions"]'),
        ).toBeVisible();
        await userEvent.click(canvas.getByRole('button', { name: 'Desktop' }));
        await waitFor(() => expect(tabs).toHaveAttribute('aria-orientation', 'vertical'));
    },
};

export const AdapterValidation: StoryObj = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { FormAdapterDemo },
        setup() {
            provide(miruOptionsKey, {
                formAdapter: {
                    async submit({ values }) {
                        return values.name === 'Rejected'
                            ? {
                                  status: 'error',
                                  source: 'server',
                                  errors: { name: ['That name is already used.'] },
                              }
                            : { status: 'success', result: values };
                    },
                },
            });
        },
        template: '<FormAdapterDemo />',
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const save = canvas.getByRole('button', { name: 'Save' });
        const input = canvas.getByLabelText('Name');
        await userEvent.click(save);
        await expect(await canvas.findByRole('alert')).toHaveTextContent('Enter a name.');
        await userEvent.type(input, 'Rejected');
        await userEvent.click(save);
        await expect(await canvas.findByRole('alert')).toHaveTextContent(
            'That name is already used.',
        );
        await userEvent.clear(input);
        await userEvent.type(input, 'Grace');
        await userEvent.click(save);
        await expect(await canvas.findByRole('status')).toHaveTextContent('Saved Grace');
        await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    },
};

export const WithSectionErrors: StoryObj = {
    play: async ({ canvasElement }) => {
        const body = within(canvasElement.ownerDocument.body);
        await waitFor(() =>
            expect(canvasElement.querySelectorAll('[data-slot="form-error-badge"]')).toHaveLength(
                2,
            ),
        );
        const badge = canvasElement.querySelector<HTMLElement>('[data-slot="form-error-badge"]')!;
        await expect(badge.closest('[data-slot="tabs-action"]')).not.toBeNull();
        await expect(badge.closest('[role="tab"]')).toBeNull();
        await expect(
            canvasElement.querySelector('[role="tabpanel"] [data-slot="form-error-badge"]'),
        ).toBeNull();
        await userEvent.click(badge);
        await expect(await body.findByRole('dialog')).toHaveTextContent('email');
        await userEvent.keyboard('{Escape}');
    },
    render: (args, { globals }) => ({
        components: { FormShowcase },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormShowcase v-bind="args" :locale="locale" with-errors/>',
    }),
};
