import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { formComponentApiCopy } from '../../stories/form-components-documentation';
import FormExamples from '../../stories/FormExamples.vue';
import { LabelDocs } from '../../stories/LabelDocs';
import LabelPlayground from '../../stories/LabelPlayground.vue';
import { Checkbox } from '../checkbox';
import { Label } from './index';
const meta: Meta = {
    ...componentControls('Label'),
    title: 'Forms/Label',
    id: 'form-label',
    component: Label,
    parameters: {
        controls: { include: controlNames('Label') },
        layout: 'padded',
        docs: { page: LabelDocs, description: { component: componentDescription('Label') } },
    },
    render: (args, { globals }) => ({
        components: { FormExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormExamples mode="label" :args="args" :locale="locale"/>',
    }),
};
const exampleCopy: Record<string, string> = {
    label: 'The visible label text used in this example.',
};
Object.assign(
    meta.argTypes ?? {},
    Object.fromEntries(
        Object.entries(meta.argTypes ?? {}).map(([name, control]) => [
            name,
            {
                ...control,
                description:
                    formComponentApiCopy.Label.props[name] ??
                    exampleCopy[name] ??
                    control?.description,
                table: {
                    ...control?.table,
                    category: exampleCopy[name] ? 'Example content' : 'Label props',
                },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    args: { showValidation: true },
    render: (args, { globals }) => {
        const [, updateArgs] = useArgs();
        return {
            components: { LabelPlayground },
            setup: () => ({ args, updateArgs, locale: globals.locale || 'en' }),
            template: '<LabelPlayground :args="args" :locale="locale" @change="updateArgs" />',
        };
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');
        await userEvent.click(canvasElement.querySelector('label')!);
        await expect(input).toHaveFocus();
        await userEvent.click(canvas.getByRole('button', { name: 'required' }));
        await waitFor(() => expect(input).toBeRequired());
        await userEvent.click(canvas.getByRole('button', { name: 'valid' }));
        await waitFor(() =>
            expect(
                canvasElement.querySelector('[data-slot="label-valid-icon"]'),
            ).toBeInTheDocument(),
        );
        await userEvent.click(canvas.getByRole('button', { name: 'invalid' }));
        await waitFor(() =>
            expect(
                canvasElement.querySelector('[data-slot="label-invalid-icon"]'),
            ).toBeInTheDocument(),
        );
        await expect(
            canvasElement.querySelector('[data-slot="label-valid-icon"]'),
        ).not.toBeInTheDocument();
    },
};
export const Required: StoryObj = { args: { required: true } };
export const Valid: StoryObj = { args: { valid: true, showValidation: true } };
export const Invalid: StoryObj = { args: { invalid: true, showValidation: true } };
export const ClickableLabel: StoryObj = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Label, Checkbox },
        template:
            '<div class="flex items-center gap-3"><Checkbox id="label-notifications" /><Label for="label-notifications">Send me notifications</Label></div>',
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByText('Send me notifications'));
        await expect(canvas.getByRole('checkbox')).toBeChecked();
    },
};
