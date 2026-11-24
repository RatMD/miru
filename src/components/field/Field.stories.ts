import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import FormExamples from '../../stories/FormExamples.vue';
import { Field } from './index';
const meta: Meta = {
    ...componentControls('Field'),
    title: 'Form/Field',
    component: Field,
    parameters: {
        controls: { include: controlNames('Field') },
        layout: 'padded',
        docs: { description: { component: componentDescription('Field') } },
    },
    render: (args, { globals }) => ({
        components: { FormExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormExamples mode="field" :args="args" :locale="locale"/>',
    }),
};
export default meta;
export const Default: StoryObj = {};
