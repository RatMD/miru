import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
    generatorSummary,
    formComponentDependencies,
} from '../../stories/form-components-documentation';
import { FormGeneratorDocs } from '../../stories/FormGeneratorDocs';
import FormPreview from '../../stories/FormPreview.vue';
import FormSectionsDemo from '../../stories/FormSectionsDemo.vue';
import FormShowcase from '../../stories/FormShowcase.vue';
import { FormSectionRenderer } from './index';
const meta = {
    title: 'Forms/Generator',
    id: 'form-generator',
    component: FormSectionRenderer,
    parameters: {
        layout: 'padded',
        controls: { disable: true },
        docs: {
            page: FormGeneratorDocs,
            description: {
                component:
                    generatorSummary +
                    '\n\n' +
                    formComponentDependencies('FormSectionRenderer', true),
            },
        },
    },
} satisfies Meta;
export default meta;
export const AllFields: StoryObj = {
    render: (_, { globals }) => ({
        components: { FormShowcase, FormPreview },
        setup: () => ({ locale: globals.locale || 'en' }),
        template: '<FormPreview><FormShowcase :locale="locale" generator /></FormPreview>',
    }),
};
const section = (id: string): StoryObj => ({
    render: (_, { globals }) => ({
        components: { FormShowcase },
        setup: () => ({ locale: globals.locale || 'en', id }),
        template:
            '<div class="max-w-5xl rounded-xl border border-border bg-background p-6"><FormShowcase :locale="locale" generator :example-section="id" /></div>',
    }),
});
export const InputsAndSwitch = section('general');
export const Selection = section('selection');
export const TextAndEditors = section('content');
export const LocalizedFields = section('translations');
export const ResponsiveGrid = section('grid');
export const CustomInputs = section('special');
export const CalendarsAndRanges = section('dates');
export const FilesAndUploads = section('files');
export const RelationsAndRepeaters = section('relations');

export const SectionsAndSlots: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Reset' }));
        await expect(canvas.getByRole('textbox', { name: 'Project name' })).toHaveValue('');
        await userEvent.click(canvas.getByRole('tab', { name: 'Standalone preview' }));
        await waitFor(() => expect(canvas.getByText('Untitled project')).toBeVisible());
        await expect(canvasElement.querySelector('[data-slot="form-actions"]')).toBeNull();
        await userEvent.click(canvas.getByRole('tab', { name: 'Project' }));
        await expect(canvas.getByRole('textbox', { name: 'Project name' })).toHaveValue('');
    },
    render: () => ({
        components: { FormPreview, FormSectionsDemo },
        template: '<FormPreview><FormSectionsDemo /></FormPreview>',
    }),
};
export const NativeInputTypes = section('native');
