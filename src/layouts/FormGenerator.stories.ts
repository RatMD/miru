import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { FormLayout } from '../components/form';
import FormShowcase from '../stories/FormShowcase.vue';

const meta: Meta = {
    title: 'Extensions/FormGenerator',
    component: FormLayout,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'The existing FormLayout now uses FormPageLayout internally. Sections, responsive field spans, localization, custom field slots, validation and additional actions stay owned by the form system.',
            },
        },
    },
    render: (args, { globals }) => ({
        components: { FormShowcase },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormShowcase v-bind="args" :locale="locale" />',
    }),
};
export default meta;
type Story = StoryObj;
export const GeneratedForm: Story = {};
export const WithValidationErrors: Story = {
    render: (args, { globals }) => ({
        components: { FormShowcase },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormShowcase v-bind="args" :locale="locale" with-errors />',
    }),
};
