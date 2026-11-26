import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { FieldDocs } from '../../stories/FieldDocs';
import FieldPlayground from '../../stories/FieldPlayground.vue';
import { formComponentApiCopy } from '../../stories/form-components-documentation';
import FormExamples from '../../stories/FormExamples.vue';
import { Field } from './index';
const meta: Meta = {
    ...componentControls('Field'),
    title: 'Forms/Field',
    id: 'form-field',
    component: Field,
    parameters: {
        controls: { include: controlNames('Field') },
        layout: 'padded',
        docs: {
            page: FieldDocs,
            description: {
                component: componentDescription('Field'),
            },
        },
    },
    render: (args, { globals }) => ({
        components: { FormExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormExamples mode="field" :args="args" :locale="locale"/>',
    }),
};
const exampleCopy: Record<string, string> = {
    disabled: 'Disable the example control.',
    loading: 'Show loading feedback and disable the example control.',
};
Object.assign(
    meta.argTypes ?? {},
    Object.fromEntries(
        Object.entries(meta.argTypes ?? {}).map(([name, control]) => [
            name,
            {
                ...control,
                description:
                    formComponentApiCopy.Field.props[name] ??
                    exampleCopy[name] ??
                    control?.description,
                table: {
                    ...control?.table,
                    category: exampleCopy[name] ? 'Example content' : 'Field props',
                },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    render: (args, { globals }) => {
        const [, updateArgs] = useArgs();
        return {
            components: { FieldPlayground },
            setup: () => ({ args, updateArgs, locale: globals.locale || 'en' }),
            template: '<FieldPlayground :args="args" :locale="locale" @change="updateArgs" />',
        };
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');
        const toggle = async (name: string) => {
            const previous = canvas.getByRole('button', { name }).getAttribute('aria-pressed');
            await userEvent.click(canvas.getByRole('button', { name }));
            await waitFor(() =>
                expect(canvas.getByRole('button', { name })).toHaveAttribute(
                    'aria-pressed',
                    previous === 'true' ? 'false' : 'true',
                ),
            );
        };
        await expect(canvas.getAllByRole('textbox')).toHaveLength(1);
        await userEvent.type(input, 'MIRU');
        await toggle('aria-invalid');
        await expect(input).toHaveAttribute('aria-invalid', 'true');
        await expect(canvas.getByTestId('field-attributes')).toHaveTextContent(
            '"aria-invalid": true',
        );
        await toggle('aria-valid');
        await expect(input).toHaveAttribute('data-valid', 'false');
        await toggle('aria-invalid');
        await expect(input).toHaveAttribute('data-valid', 'true');
        await toggle('disabled');
        await expect(input).toBeDisabled();
        await toggle('loading');
        await expect(input).toHaveAttribute('aria-busy', 'true');
        await toggle('disabled');
        await expect(input).toBeDisabled();
        await toggle('loading');
        await expect(input).toBeEnabled();
        await expect(input).toHaveValue('MIRU');
        await toggle('aria-valid');
        await userEvent.clear(input);
    },
};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Loading: StoryObj = { args: { loading: true } };
export const Invalid: StoryObj = { args: { ariaInvalid: true } };
export const Valid: StoryObj = { args: { ariaValid: true } };
