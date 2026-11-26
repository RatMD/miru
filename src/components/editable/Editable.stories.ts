import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentDescription } from '../../stories/component-descriptions';
import EditableDemo from '../../stories/EditableDemo.vue';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { Editable } from './index';
const meta: Meta = {
    title: 'FormFields/Editable',
    component: Editable,
    parameters: {
        layout: 'padded',
        docs: {
            page: FormFieldDocs,
            description: {
                component: componentDescription('Editable'),
            },
        },
    },
    args: {
        modelValue: 'MIRU project',
        disabled: false,
        readonly: false,
        loading: false,
        buttonStyle: 'action',
        muted: true,
        size: 'default',
        activationMode: 'none',
        autoResize: true,
        minWidth: '8ch',
        maxWidth: '100%',
        multiline: true,
        rows: 1,
        actionSize: 'xs',
    },
    argTypes: {
        modelValue: { control: 'text' },
        autoResize: { control: 'boolean' },
        minWidth: { control: 'text' },
        maxWidth: { control: 'text' },
        multiline: { control: 'boolean' },
        rows: { control: { type: 'number', min: 1, max: 8 } },
        actionSize: { control: 'select', options: ['xs', 'sm'] },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        loading: { control: 'boolean' },
        buttonStyle: { control: 'select', options: ['action', 'shadow'] },
        muted: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        activationMode: { control: 'select', options: ['none', 'focus', 'dblclick'] },
    },
    render: (args, { globals, parameters }) => ({
        components: { EditableDemo },
        setup: () => ({ args, locale: globals.locale || 'en', asyncSave: !!parameters.asyncSave }),
        template: '<EditableDemo :args="args" :locale="locale" :async-save="asyncSave" />',
    }),
};
describeFormFieldControls('Editable', meta.argTypes);
export default meta;
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const area = canvasElement.querySelector<HTMLElement>('[data-slot="editable-area"]')!;
        const preview = canvasElement.querySelector<HTMLElement>('[data-slot="editable-preview"]')!;
        const before = area.getBoundingClientRect();
        const fontSize = getComputedStyle(preview).fontSize;
        await userEvent.click(canvas.getByRole('button', { name: /^(Edit|Bearbeiten)$/ }));
        const editing = area.getBoundingClientRect();
        await expect(Math.abs(editing.width - before.width)).toBeLessThan(1);
        await expect(Math.abs(editing.height - before.height)).toBeLessThan(1);
        await expect(Math.abs(editing.left - before.left)).toBeLessThan(1);
        await expect(getComputedStyle(canvas.getByRole('textbox')).fontSize).toBe(fontSize);
        await expect(getComputedStyle(canvas.getByRole('textbox')).borderTopWidth).toBe('0px');
        await expect(getComputedStyle(canvas.getByRole('textbox')).boxShadow).toBe('none');

        const input = canvas.getByRole('textbox');
        await userEvent.clear(input);
        await userEvent.type(input, 'Changed title');
        await userEvent.click(canvas.getByRole('button', { name: /^(Cancel|Abbrechen)$/ }));
        await expect(canvas.getByTestId('editable-value')).toHaveTextContent('MIRU project');
        await userEvent.click(canvas.getByRole('button', { name: /^(Edit|Bearbeiten)$/ }));
        await userEvent.clear(canvas.getByRole('textbox'));
        await userEvent.type(canvas.getByRole('textbox'), 'Saved title');
        await userEvent.keyboard('{Enter}');
        await waitFor(() =>
            expect(canvas.getByTestId('editable-value')).toHaveTextContent('Saved title'),
        );
    },
};
export const AsyncSave: StoryObj = {
    parameters: { asyncSave: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: /^(Edit|Bearbeiten)$/ }));
        const input = canvas.getByRole('textbox');
        await userEvent.clear(input);
        await userEvent.type(input, 'New title');
        await userEvent.click(canvas.getByRole('button', { name: /^(Save|Speichern)$/ }));
        await expect(canvas.getByTestId('editable-value')).toHaveTextContent('MIRU project');
        await expect(
            await canvas.findByRole('button', { name: /^(Saving|Wird gespeichert)$/ }),
        ).toHaveAttribute('aria-busy', 'true');
        await waitFor(() =>
            expect(canvas.getByTestId('editable-value')).toHaveTextContent('New title'),
        );
    },
};
export const FailedSave: StoryObj = {
    parameters: { asyncSave: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: /^(Edit|Bearbeiten)$/ }));
        await userEvent.clear(canvas.getByRole('textbox'));
        await userEvent.type(canvas.getByRole('textbox'), 'Rejected');
        await userEvent.keyboard('{Enter}');
        await expect(await canvas.findByRole('alert')).toHaveTextContent(
            'This title is already used.',
        );
        await expect(canvas.getByRole('textbox')).toHaveValue('Rejected');
        await expect(canvas.getByTestId('editable-value')).toHaveTextContent('MIRU project');
        await userEvent.clear(canvas.getByRole('textbox'));
        await userEvent.type(canvas.getByRole('textbox'), 'Accepted');
        await userEvent.keyboard('{Enter}');
        await waitFor(() =>
            expect(canvas.getByTestId('editable-value')).toHaveTextContent('Accepted'),
        );
    },
};
export const ShadowActions: StoryObj = { args: { buttonStyle: 'shadow' } };
export const DoubleClick: StoryObj = { args: { activationMode: 'dblclick' } };
export const Disabled: StoryObj = { args: { disabled: true } };
export const Readonly: StoryObj = { args: { readonly: true } };

export const Multiline: StoryObj = {
    args: { modelValue: 'Project description\nA second line of text.', maxWidth: '22rem' },
};
export const FixedWidth: StoryObj = { args: { autoResize: false, minWidth: '16rem', rows: 2 } };
export const MinimumWidth: StoryObj = { args: { modelValue: 'Hi', minWidth: '12rem' } };
export const SingleLine: StoryObj = { args: { multiline: false } };

export const ContentSizing: StoryObj = {
    args: { modelValue: 'Short', minWidth: '4ch' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const area = canvasElement.querySelector<HTMLElement>('[data-slot="editable-area"]')!;
        await userEvent.click(canvas.getByRole('button', { name: /^(Edit|Bearbeiten)$/ }));
        const input = canvas.getByRole('textbox');
        const before = area.getBoundingClientRect();
        await userEvent.clear(input);
        await userEvent.type(input, 'A considerably longer inline title');
        await waitFor(() =>
            expect(area.getBoundingClientRect().width).toBeGreaterThan(before.width),
        );
        const actions = canvasElement.querySelector<HTMLElement>('[data-slot="editable-actions"]')!;
        await expect(
            actions.getBoundingClientRect().left - area.getBoundingClientRect().right,
        ).toBeLessThan(8);
        await userEvent.keyboard('{Shift>}{Enter}{/Shift}Second line');
        await waitFor(() =>
            expect(area.getBoundingClientRect().height).toBeGreaterThan(before.height),
        );
        const areaBox = area.getBoundingClientRect();
        const actionsBox = actions.getBoundingClientRect();
        await expect(
            Math.abs(actionsBox.top + actionsBox.height / 2 - (areaBox.top + areaBox.height / 2)),
        ).toBeLessThan(1);
        await userEvent.keyboard('{Enter}');
        await waitFor(() =>
            expect(canvas.getByTestId('editable-value')).toHaveTextContent('Second line'),
        );
    },
};
