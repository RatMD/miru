import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentDescription } from '../../stories/component-descriptions';
import EditorExamples from '../../stories/EditorExamples.vue';
import { EditorJson } from './index';
const meta = {
    title: 'FormFields/EditorJSON',
    component: EditorJson,
    parameters: {
        layout: 'padded',
        docs: { description: { component: componentDescription('EditorJson') } },
    },
    args: {
        counter: false,
        counterMode: 'limit',
        disabled: false,
        readonly: false,
        allowEmpty: true,
        preview: true,
        previewMaxHeight: 320,
        lineNumbers: true,
        rows: 10,
        indent: 2,
        maxlength: 65000,
    },
    argTypes: {
        counter: { control: 'boolean' },
        counterMode: { control: 'select', options: ['limit', 'count', 'remaining'] },
        locale: { control: 'select', options: [undefined, 'en', 'de'] },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        allowEmpty: { control: 'boolean' },
        preview: { control: 'boolean' },
        lineNumbers: { control: 'boolean' },
        previewMaxHeight: { control: { type: 'number', min: 120, max: 800 } },
        maxlength: { control: { type: 'number', min: 0 } },
        rows: { control: { type: 'number', min: 3, max: 30 } },
        indent: { control: { type: 'number', min: 0, max: 10 } },
    },
    render: (args) => ({
        components: { EditorExamples },
        setup: () => ({ args }),
        template: '<EditorExamples kind="json" :args="args"/>',
    }),
} satisfies Meta;
export default meta;
export const Default: StoryObj = {};
export const Invalid: StoryObj = { args: { invalidExample: true } };
export const Readonly: StoryObj = { args: { readonly: true } };

export const WithCounter: StoryObj = { args: { counter: true } };
export const RemainingCharacters: StoryObj = { args: { counter: true, counterMode: 'remaining' } };

/** A first interaction test: formatting, minification and invalid-input guards. */
export const Editing: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');
        const format = canvas.getByRole('button', { name: /^(Format JSON|JSON formatieren)$/ });
        const minify = canvas.getByRole('button', { name: /^(Minify JSON|JSON minimieren)$/ });
        const source = (input as HTMLTextAreaElement).value;
        await userEvent.click(format);
        await waitFor(() => expect(input).toHaveValue(JSON.stringify(JSON.parse(source), null, 2)));
        await userEvent.click(minify);
        await waitFor(() => expect(input).toHaveValue(JSON.stringify(JSON.parse(source))));
        await userEvent.clear(input);
        await userEvent.type(input, 'invalid JSON');
        await waitFor(() => expect(input).toHaveAttribute('aria-invalid', 'true'));
        await expect(format).toBeDisabled();
        await expect(minify).toBeDisabled();
        await expect(canvas.getByRole('alert')).toBeVisible();
    },
};

/** Preview occupies the editable surface and must never rewrite the source on toggle. */
export const Preview: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox') as HTMLTextAreaElement;
        const source = input.value;
        await userEvent.click(canvas.getByRole('button', { name: /^(Preview|Vorschau)$/ }));
        await waitFor(() => expect(input).not.toBeVisible());
        const preview = canvasElement.querySelector('[data-slot="json-preview"]');
        await expect(preview).toBeVisible();
        await expect(preview?.closest('[data-slot="editor-frame"]')).not.toBeNull();
        await expect(preview?.querySelector('code')?.textContent).toBe(
            JSON.stringify(JSON.parse(source), null, 2),
        );
        await expect(input).toHaveValue(source);
        await userEvent.click(canvas.getByRole('button', { name: /^(Edit|Bearbeiten)$/ }));
        await waitFor(() => expect(input).toBeVisible());
        await expect(input).toHaveValue(source);
        await expect(input).toHaveFocus();
    },
};

export const WithoutLineNumbers: StoryObj = { args: { lineNumbers: false } };
