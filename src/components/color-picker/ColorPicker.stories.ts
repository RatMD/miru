import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import ColorPickerDemo from '../../stories/ColorPickerDemo.vue';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { ColorPicker } from './index';

const meta: Meta = {
    title: 'FormFields/ColorPicker',
    component: ColorPicker,
    parameters: {
        layout: 'padded',
        docs: {
            page: FormFieldDocs,
            description: { component: componentDescription('ColorPicker') },
        },
    },
    args: {
        modelValue: '#4f46e5',
        mode: 'rgb',
        modes: ['hex', 'rgb', 'hsl', 'hsv'],
        size: 'default',
        disabled: false,
        alpha: false,
        outputFormat: 'hex',
        swatches: [],
        showRecent: false,
        recentLimit: 8,
    },
    argTypes: {
        modelValue: { control: 'text' },
        mode: { control: 'select', options: ['hex', 'rgb', 'hsl', 'hsv'] },
        modes: { control: 'object' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
        alpha: { control: 'boolean' },
        outputFormat: { control: 'select', options: ['hex', 'rgb', 'hsl', 'hsv'] },
        swatches: { control: 'object' },
        showRecent: { control: 'boolean' },
        recentLimit: { control: 'number' },
    },
    render: (args, { globals }) => ({
        components: { ColorPickerDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<ColorPickerDemo :args="args" :locale="locale" />',
    }),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeFormFieldControls('ColorPicker', meta.argTypes);
export default meta;
const openPicker = async (canvasElement: HTMLElement) => {
    await userEvent.click(
        canvasElement.querySelector<HTMLElement>('[data-slot="color-picker-trigger"]')!,
    );
    const dialog = await within(canvasElement.ownerDocument.body).findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    return within(dialog);
};
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const popup = await openPicker(canvasElement);
        await expect(popup.getByRole('slider', { name: 'Hue' })).toBeVisible();
        await expect(popup.getByRole('textbox', { name: /HEX/ })).toHaveValue('#4f46e5');
        await expect(popup.getByLabelText('R', { exact: true })).toHaveValue('79');
        await expect(popup.getByLabelText('G', { exact: true })).toHaveValue('70');
        await expect(popup.getByLabelText('B', { exact: true })).toHaveValue('229');
        await userEvent.click(popup.getByRole('combobox'));
        await userEvent.click(
            await within(canvasElement.ownerDocument.body).findByRole('option', { name: 'HSL' }),
        );
        await expect(canvas.getByTestId('color-value')).toHaveTextContent('#4f46e5');
        await expect(popup.getByLabelText('L %')).toBeVisible();
        const hue = await popup.findByRole('slider', { name: 'Hue' });
        hue.focus();
        await userEvent.keyboard('{ArrowRight}');
        await waitFor(() =>
            expect(canvas.getByTestId('color-value')).not.toHaveTextContent('#4f46e5'),
        );
        await userEvent.keyboard('{Escape}');
    },
};
export const PresetsAndRecent: StoryObj = {
    args: {
        showRecent: true,
        recentLimit: 3,
        swatches: [
            { value: '#4f46e5', label: 'Indigo' },
            { value: '#059669', label: 'Emerald' },
            { value: '#e11d48', label: 'Rose' },
        ],
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const popup = await openPicker(canvasElement);
        await userEvent.click(popup.getByRole('option', { name: 'Emerald' }));
        await expect(canvas.getByTestId('color-value')).toHaveTextContent('#059669');
        await expect(canvas.getByTestId('color-recent')).toHaveTextContent('#059669');
        await userEvent.click(popup.getByRole('option', { name: 'Rose' }));
        await expect(canvas.getByTestId('color-recent')).toHaveTextContent('#e11d48, #059669');
        await userEvent.click(popup.getByRole('option', { name: 'Emerald' }));
        await expect(canvas.getByTestId('color-recent')).toHaveTextContent('#059669, #e11d48');
        await userEvent.keyboard('{Escape}');
    },
};
export const WithAlpha: StoryObj = {
    args: { alpha: true, modelValue: '#4f46e580' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const popup = await openPicker(canvasElement);
        const alpha = popup.getByRole('slider', { name: 'Alpha' });
        alpha.focus();
        await userEvent.keyboard('{Home}');
        await waitFor(() =>
            expect(canvas.getByTestId('color-value')).toHaveTextContent('#4f46e500'),
        );
        await userEvent.keyboard('{End}');
        await waitFor(() => expect(canvas.getByTestId('color-value')).toHaveTextContent('#4f46e5'));
        await userEvent.keyboard('{Escape}');
    },
};
export const HexOnly: StoryObj = {
    args: { modes: ['hex'], mode: 'hex' },
    play: async ({ canvasElement }) => {
        const popup = await openPicker(canvasElement);
        await expect(popup.queryByRole('combobox')).not.toBeInTheDocument();
        await waitFor(() => expect(popup.getByRole('textbox', { name: /HEX/ })).toBeVisible());
        await userEvent.keyboard('{Escape}');
    },
};
export const HsvOnly: StoryObj = {
    args: { modes: ['hsv'], mode: 'hsv', outputFormat: 'hsv' },
    play: async ({ canvasElement }) => {
        const popup = await openPicker(canvasElement);
        const brightness = popup.getByLabelText('V %');
        await userEvent.clear(brightness);
        await userEvent.type(brightness, '50');
        await userEvent.tab();
        await waitFor(() =>
            expect(within(canvasElement).getByTestId('color-value')).toHaveTextContent(/^hsv\(/),
        );
        await userEvent.keyboard('{Escape}');
    },
};
export const RgbOutput: StoryObj = { args: { outputFormat: 'rgb' } };
export const TypedColor: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');
        await userEvent.clear(input);
        await userEvent.type(input, '#zzzzzz');
        await userEvent.tab();
        await expect(input).toHaveAttribute('aria-invalid', 'true');
        await expect(canvas.getByTestId('color-value')).toHaveTextContent('#4f46e5');
        await userEvent.clear(input);
        await userEvent.type(input, '#fff');
        await userEvent.tab();
        await expect(canvas.getByTestId('color-value')).toHaveTextContent('#ffffff');
        await userEvent.clear(input);
        await userEvent.tab();
        await expect(canvas.getByTestId('color-value')).toHaveTextContent('null');
    },
};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const PersistentHistory: StoryObj = {
    args: { ...PresetsAndRecent.args, historyKey: 'miru-storybook-color-picker-history' },
};
