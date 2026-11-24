import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import FormShowcase from '../../stories/FormShowcase.vue';
import { FormLayout } from './index';
const meta: Meta = {
    ...componentControls('FormLayout'),
    title: 'Form/Form',
    component: FormLayout,
    parameters: {
        controls: { include: controlNames('FormLayout') },
        layout: 'padded',
        docs: { description: { component: componentDescription('FormLayout') } },
    },
    render: (args, { globals }) => ({
        components: { FormShowcase },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormShowcase v-bind="args" :locale="locale"/>',
    }),
};
export default meta;
export const Default: StoryObj = {};

export const WithSectionErrors: StoryObj = {
    render: (args, { globals }) => ({
        components: { FormShowcase },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormShowcase v-bind="args" :locale="locale" with-errors/>',
    }),
};
