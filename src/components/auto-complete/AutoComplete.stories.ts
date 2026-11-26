import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import AutoCompleteDemo from '../../stories/AutoCompleteDemo.vue';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { AutoComplete } from './index';
const meta: Meta = {
    title: 'FormFields/AutoComplete',
    component: AutoComplete,
    parameters: {
        layout: 'padded',
        docs: {
            page: FormFieldDocs,
            description: {
                component: componentDescription('AutoComplete'),
            },
        },
    },
    args: {
        modelValue: '',
        disabled: false,
        clearable: true,
        loading: false,
        size: 'default',
        openOnFocus: false,
    },
    argTypes: {
        modelValue: { control: 'text' },
        disabled: { control: 'boolean' },
        clearable: { control: 'boolean' },
        loading: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        openOnFocus: { control: 'boolean' },
    },
    render: (args, { globals, parameters }) => ({
        components: { AutoCompleteDemo },
        setup: () => ({
            args,
            locale: globals.locale || 'en',
            grouped: !!parameters.grouped,
            remote: !!parameters.remote,
        }),
        template:
            '<AutoCompleteDemo :args="args" :locale="locale" :grouped="grouped" :remote="remote" />',
    }),
};
describeFormFieldControls('AutoComplete', meta.argTypes);
export default meta;
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('combobox');
        await userEvent.type(input, 'My own title');
        await userEvent.tab();
        await expect(canvas.getByTestId('autocomplete-value')).toHaveTextContent('My own title');
        await userEvent.clear(input);
        await userEvent.type(input, 'Frontend');
        const item = await within(canvasElement.ownerDocument.body).findByRole('option', {
            name: 'Frontend Developer',
        });
        await userEvent.click(item);
        await expect(canvas.getByTestId('autocomplete-value')).toHaveTextContent(
            'Frontend Developer',
        );
        await userEvent.click(canvas.getByRole('button', { name: /Clear text|Text löschen/ }));
        await expect(canvas.getByTestId('autocomplete-value')).toHaveTextContent('—');
    },
};
export const Keyboard: StoryObj = {
    play: async ({ canvasElement }) => {
        const input = within(canvasElement).getByRole('combobox');
        await userEvent.type(input, 'Backend');
        await userEvent.keyboard('{ArrowDown}{Enter}');
        await waitFor(() => expect(input).toHaveValue('Backend Developer'));
    },
};
export const Grouped: StoryObj = { parameters: { grouped: true } };
export const AsyncSuggestions: StoryObj = { parameters: { remote: true } };
export const Empty: StoryObj = { args: { modelValue: 'Unlisted role', openOnFocus: true } };
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
