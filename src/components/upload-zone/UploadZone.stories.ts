import type { Meta, StoryObj } from '@storybook/vue3-vite';
import AttachmentDropzoneDemo from '../../stories/AttachmentDropzoneDemo.vue';
import { componentDescription } from '../../stories/component-descriptions';
import EditorExamples from '../../stories/EditorExamples.vue';
import { formStory } from '../../stories/form-fixtures';
import { imageProcessingStory } from '../../stories/upload-processing';
import { UploadZone } from './index';

const meta: Meta = {
    title: 'FormFields/UploadZone',
    parameters: { docs: { description: { component: componentDescription('UploadZone') } } },
    component: UploadZone,
    args: { size: 'default', disabled: false },
    argTypes: {
        gallery: { control: 'boolean' },
        sortable: { control: 'boolean' },
        showPrimary: { control: 'boolean' },
        maxFiles: { control: 'number' },
        multiple: { control: 'boolean' },
        busy: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<UploadZone v-bind="args" :title="labels.upload" :description="labels.uploadDescription" accept=".png,.jpg,.jpeg" :max-size-mi-b="1" @files="files = $event" /><output data-testid="value">{{ files.map(file => file.name).join(", ") }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const ImageGallery: StoryObj = {
    args: { gallery: true, sortable: true, showPrimary: true, maxFiles: 12 },
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Opt-in image gallery: local previews, primary image, removal, drag-and-drop and keyboard/button ordering. Dependencies: SortableImageGallery and SortableJS (lazy-loaded). v-model contains ordered UploadImage entries; files emits only newly accepted Files. The host owns actual uploads, persistence and server validation. Existing remote entries can be mixed with local File entries. Locally created object URLs are revoked on removal/unmount; host URLs stay host-owned.',
            },
        },
    },
    render: (args) => ({
        components: { EditorExamples },
        setup: () => ({ args }),
        template: '<EditorExamples kind="gallery" :args="args"/>',
    }),
};
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const Multiple: StoryObj = { args: { multiple: true } };
export const ImageDimensions: StoryObj = {
    args: { minDimensions: { width: 64, height: 64 }, maxDimensions: { width: 256, height: 256 } },
};

export const AttachmentMetadata: StoryObj = {
    parameters: { controls: { disable: true } },
    render: (_, { globals }) => ({
        components: { AttachmentDropzoneDemo },
        setup: () => ({ locale: globals.locale || 'en' }),
        template: '<AttachmentDropzoneDemo :locale="locale"/>',
    }),
};

export const ImageProcessing: StoryObj = imageProcessingStory;
