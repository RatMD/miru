import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import AttachmentExamples from '../../stories/AttachmentExamples.vue';
import AttachmentFormDemo from '../../stories/AttachmentFormDemo.vue';
import { componentDescription } from '../../stories/component-descriptions';
import { Attachment } from './index';
const boolean = { control: 'boolean' as const };
const select = (options: readonly string[]) => ({
    control: 'select' as const,
    options,
});

const meta: Meta = {
    title: 'Components/Attachment',
    component: Attachment,
    parameters: {
        layout: 'padded',
        docs: { description: { component: componentDescription('Attachment') } },
    },
    args: {
        orientation: 'horizontal',
        size: 'default',
        aspectRatio: 1,
        status: 'idle',
        progress: 64,
        primary: false,
        showType: true,
        showMime: false,
        showSize: true,
        sizeMetric: false,
        sizeDigits: 1,
        showStatus: true,
        showProgress: true,
        removable: false,
        editable: false,
        dragHandle: false,
        moveButtons: false,
        disabled: false,
    },
    argTypes: {
        orientation: select(['horizontal', 'vertical']),
        size: select(['sm', 'default', 'lg']),
        aspectRatio: { control: 'number' },
        maxWidth: { control: 'text' },
        maxPreviewHeight: { control: { type: 'number', min: 64, max: 640 } },
        status: select(['idle', 'uploading', 'processing', 'success', 'error']),
        progress: { control: { type: 'range', min: 0, max: 100 } },
        primary: boolean,
        showType: boolean,
        showMime: boolean,
        showSize: boolean,
        sizeMetric: boolean,
        sizeDigits: { control: { type: 'number', min: 0, max: 4 } },
        showStatus: boolean,
        showProgress: boolean,
        removable: boolean,
        editable: boolean,
        dragHandle: boolean,
        moveButtons: boolean,
        disabled: boolean,
        item: { table: { disable: true } },
        locales: { table: { disable: true } },
        activeLocale: { table: { disable: true } },
    },
    render: (args, { globals }) => ({
        components: { AttachmentExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<AttachmentExamples :args="args" :locale="locale"/>',
    }),
};
export default meta;
export const Default: StoryObj = {};
export const Image: StoryObj = {
    args: {
        image: true,
        orientation: 'vertical',
        primary: true,
        removable: true,
        showMime: true,
    },
    parameters: { layout: 'padded' },
};
export const Compact: StoryObj = {
    args: { size: 'sm', showType: false, removable: true },
};
export const Large: StoryObj = { args: { size: 'lg', showMime: true } };
export const Types: StoryObj = {
    render: (args, { globals }) => ({
        components: { AttachmentExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<AttachmentExamples mode="types" :args="args" :locale="locale"/>',
    }),
};
export const States: StoryObj = {
    render: (args, { globals }) => ({
        components: { AttachmentExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<AttachmentExamples mode="states" :args="args" :locale="locale"/>',
    }),
};
export const Uploading: StoryObj = {
    args: { status: 'uploading', progress: 64 },
};
export const Processing: StoryObj = {
    args: { status: 'processing', progress: undefined },
};
export const Success: StoryObj = { args: { status: 'success' } };
export const Error: StoryObj = { args: { status: 'error', removable: true } };
export const LongMime: StoryObj = { args: { longMime: true, showMime: true } };
export const MetadataEditing: StoryObj = {
    args: { editable: true, removable: true },
};
export const MultilingualMetadata: StoryObj = {
    args: { editable: true, multilingual: true },
};
export const Disabled: StoryObj = {
    args: { editable: true, removable: true, disabled: true },
};
export const SimulatedUpload: StoryObj = {
    parameters: { controls: { disable: true } },
    render: (_, { globals }) => ({
        components: { AttachmentExamples },
        setup: () => ({ locale: globals.locale || 'en' }),
        template: '<AttachmentExamples mode="upload" :args="{}" :locale="locale"/>',
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(
            canvas.getByRole('button', {
                name: /^(Simulate upload|Upload simulieren)$/,
            }),
        );
        await waitFor(() =>
            expect(canvasElement.querySelector('[data-slot="attachment"]')).toHaveAttribute(
                'data-status',
                'uploading',
            ),
        );
        await expect(canvas.getByRole('progressbar')).toBeVisible();
        await waitFor(
            () =>
                expect(canvasElement.querySelector('[data-slot="attachment"]')).toHaveAttribute(
                    'data-status',
                    'success',
                ),
            { timeout: 4000 },
        );
    },
};
export const WithForm: StoryObj = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'The fields slot binds real useForm/TanStack fields with Zod validation and independent EN/DE metadata. Validation is local; no request is sent.',
            },
        },
    },
    render: (_, { globals }) => ({
        components: { AttachmentFormDemo },
        setup: () => ({ locale: globals.locale || 'en' }),
        template: '<AttachmentFormDemo :locale="locale"/>',
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox', { name: /^(Title|Titel)/ });
        await userEvent.clear(input);
        await userEvent.click(canvas.getByRole('button', { name: /^(Validate|Prüfen)$/ }));
        await waitFor(() => expect(input).toHaveAttribute('aria-invalid', 'true'));
        await userEvent.type(input, 'Project');
        await userEvent.click(canvas.getByRole('button', { name: /^(Validate|Prüfen)$/ }));
        await waitFor(() =>
            expect(canvas.getByTestId('attachment-form-result')).toHaveTextContent(
                /^(Valid|Gültig)/,
            ),
        );
    },
};
