import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import InputPinDemo from '../../stories/InputPinDemo.vue';
import { InputPin } from './index';
const meta: Meta = {
    title: 'FormFields/InputPin',
    component: InputPin,
    parameters: {
        layout: 'padded',
        docs: { page: FormFieldDocs, description: { component: componentDescription('InputPin') } },
    },
    args: {
        modelValue: '',
        size: 'default',
        disabled: false,
        readonly: false,
        maxlength: 6,
        masked: false,
        connected: false,
        type: 'number',
        otp: true,
        maskCharacter: '●',
    },
    argTypes: {
        modelValue: { control: 'text' },
        maxlength: { control: { type: 'number', min: 1, max: 12, step: 1 } },
        masked: { control: 'boolean' },
        connected: { control: 'boolean' },
        maskCharacter: { control: 'text' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        otp: { control: 'boolean' },
    },
    render: (args, { globals, parameters }) => ({
        components: { InputPinDemo },
        setup: () => ({
            args,
            locale: globals.locale || 'en',
            layout: parameters.pinLayout || 'default',
            form: !!parameters.pinForm,
        }),
        template: '<InputPinDemo :args="args" :locale="locale" :layout="layout" :form="form" />',
    }),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeFormFieldControls('InputPin', meta.argTypes);
export default meta;
const cells = (canvas: HTMLElement) =>
    Array.from(canvas.querySelectorAll<HTMLInputElement>('[data-slot="input-pin-slot"]'));
function paste(input: HTMLInputElement, value: string) {
    const data = new DataTransfer();
    data.setData('text', value);
    input.dispatchEvent(
        new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: data }),
    );
}
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const inputs = cells(canvasElement);
        await expect(inputs).toHaveLength(6);
        await expect(canvasElement.querySelector('[data-slot="input-pin-group"]')).toHaveAttribute(
            'data-connected',
            'false',
        );
        await userEvent.type(inputs[0]!, '012345');
        await waitFor(() => expect(canvas.getByTestId('pin-value')).toHaveTextContent('012345'));
        await expect(canvas.getByTestId('pin-complete')).toHaveTextContent('012345');
        await userEvent.keyboard('{ArrowLeft}{Backspace}');
        await waitFor(() => expect(inputs[4]!).toHaveValue(''));
        await expect(inputs[5]!).toHaveValue('5');
        await userEvent.keyboard('9');
        await waitFor(() => expect(canvas.getByTestId('pin-value')).toHaveTextContent('012395'));
        await userEvent.keyboard('{ArrowLeft}4');
        await waitFor(() => expect(canvas.getByTestId('pin-value')).toHaveTextContent('012345'));
        await userEvent.click(canvas.getByRole('button', { name: 'Clear' }));
        for (const input of inputs) await expect(input).toHaveValue('');
        await userEvent.click(canvas.getByRole('button', { name: 'Fill example' }));
        await waitFor(() => expect(inputs[0]!).toHaveValue('0'));
        await expect(inputs[5]!).toHaveValue('5');
    },
};
export const Connected: StoryObj = {
    args: { connected: true },
    play: async ({ canvasElement }) => {
        const group = canvasElement.querySelector<HTMLElement>('[data-slot="input-pin-group"]')!;
        await expect(group).toHaveAttribute('data-connected', 'true');
        await expect(getComputedStyle(group).gap).toBe('0px');
        const inputs = cells(canvasElement);
        await expect(getComputedStyle(inputs[0]!).borderTopLeftRadius).not.toBe('0px');
        await expect(getComputedStyle(inputs[1]!).borderTopLeftRadius).toBe('0px');
        await expect(getComputedStyle(inputs.at(-1)!).borderTopRightRadius).not.toBe('0px');
    },
};
export const Masked: StoryObj = {
    args: { masked: true, modelValue: '123456' },
    play: async ({ canvasElement }) => {
        for (const input of cells(canvasElement))
            await expect(input).toHaveAttribute('type', 'password');
        const dots = canvasElement.querySelectorAll(
            '[data-slot="input-pin-cell"] > span[aria-hidden]',
        );
        await expect(dots).toHaveLength(6);
        for (const dot of dots) await expect(dot).toHaveTextContent('●');
        await expect(within(canvasElement).getByTestId('pin-value')).toHaveTextContent('123456');
    },
};
export const Grouped: StoryObj = {
    args: { maxlength: 8, size: 'sm' },
    parameters: { pinLayout: 'grouped' },
    play: async ({ canvasElement }) => {
        const inputs = cells(canvasElement);
        await expect(inputs).toHaveLength(8);
        await expect(
            canvasElement.querySelectorAll('[data-slot="input-pin-separator"]'),
        ).toHaveLength(1);
        inputs[0]!.focus();
        paste(inputs[0]!, '0123-4567');
        await waitFor(() =>
            expect(within(canvasElement).getByTestId('pin-value')).toHaveTextContent('01234567'),
        );
        await expect(within(canvasElement).getByTestId('pin-complete')).toHaveTextContent(
            '01234567',
        );
    },
};
export const GroupedConnected: StoryObj = { ...Grouped, args: { maxlength: 8, connected: true } };
export const MixedGroups: StoryObj = {
    args: { maxlength: 8, size: 'sm' },
    parameters: { pinLayout: 'mixed' },
    play: async ({ canvasElement }) => {
        const groups = canvasElement.querySelectorAll('[data-slot="input-pin-group"]');
        await expect(groups[0]!).toHaveAttribute('data-connected', 'true');
        await expect(groups[1]!).toHaveAttribute('data-connected', 'false');
    },
};
export const Alphanumeric: StoryObj = {
    args: { type: 'text', maxlength: 4 },
    play: async ({ canvasElement }) => {
        await userEvent.type(cells(canvasElement)[0]!, 'A0b9');
        await waitFor(() =>
            expect(within(canvasElement).getByTestId('pin-value')).toHaveTextContent('A0b9'),
        );
    },
};
export const Readonly: StoryObj = {
    args: { readonly: true, modelValue: '123456' },
    play: async ({ canvasElement }) => {
        const input = cells(canvasElement)[0]!;
        await userEvent.click(input);
        await userEvent.keyboard('{Backspace}{Delete}');
        paste(input, '999999');
        await expect(within(canvasElement).getByTestId('pin-value')).toHaveTextContent('123456');
        await expect(input).toHaveValue('1');
    },
};
export const FormIntegration: StoryObj = {
    args: { maxlength: 4 },
    parameters: { pinForm: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.type(cells(canvasElement)[0]!, '0039');
        await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
        await expect(canvas.getByTestId('pin-form')).toHaveTextContent('0039');
    },
};
export const Disabled: StoryObj = {
    args: { disabled: true },
    play: async ({ canvasElement }) => {
        for (const input of cells(canvasElement)) await expect(input).toBeDisabled();
    },
};
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
export const FourDigits: StoryObj = { args: { maxlength: 4 } };
