import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { formComponentApiCopy } from '../../stories/form-components-documentation';
import { InputGroupDocs } from '../../stories/InputGroupDocs';
import InputGroupExamples from '../../stories/InputGroupExamples.vue';
import { InputGroup } from './index';
const meta: Meta = {
    ...componentControls('InputGroup'),
    title: 'Forms/InputGroup',
    id: 'form-inputgroup',
    component: InputGroup,
    parameters: {
        controls: { include: controlNames('InputGroup') },
        layout: 'padded',
        docs: {
            page: InputGroupDocs,
            description: { component: componentDescription('InputGroup') },
        },
    },
    render: (args, { globals }) => ({
        components: { InputGroupExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<InputGroupExamples :args="args" :locale="locale" />',
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
                    formComponentApiCopy.InputGroup.props[name] ??
                    exampleCopy[name] ??
                    control?.description,
                table: {
                    ...control?.table,
                    category: exampleCopy[name] ? 'Example content' : 'InputGroup props',
                },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button'));
        await expect(canvas.getByRole('textbox')).toHaveValue('');
    },
};
const example = (name: string): StoryObj => ({
    render: (args, { globals }) => ({
        components: { InputGroupExamples },
        setup: () => ({ args, name, locale: globals.locale || 'en' }),
        template: '<InputGroupExamples :args="args" :locale="locale" :example="name" />',
    }),
});
export const PrefixAndSuffix = example('prefix');
export const PasswordVisibility: StoryObj = {
    ...example('password'),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input')!;
        await expect(input).toHaveAttribute('type', 'password');
        await userEvent.click(canvas.getByRole('button'));
        await expect(input).toHaveAttribute('type', 'text');
        await expect(input).toHaveValue('MIRU');
    },
};
export const TextareaToolbar: StoryObj = {
    ...example('textarea'),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const send = canvas.getByRole('button');
        await expect(send).toBeDisabled();
        await userEvent.type(canvas.getByRole('textbox'), 'Hello MIRU');
        await userEvent.click(send);
        await expect(canvas.getByRole('status')).toHaveTextContent('✓');
    },
};
export const Sizes = example('sizes');
export const Disabled = example('disabled');
export const Invalid: StoryObj = {
    render: (args, { globals }) => ({
        components: { InputGroupExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<InputGroupExamples :args="args" :locale="locale" invalid />',
    }),
};
