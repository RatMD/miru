import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import FormExamples from '../../stories/FormExamples.vue';
import { InputGroup } from './index';
const meta: Meta = {
    ...componentControls('InputGroup'),
    title: 'Form/InputGroup',
    component: InputGroup,
    parameters: {
        controls: { include: controlNames('InputGroup') },
        layout: 'padded',
        docs: { description: { component: componentDescription('InputGroup') } },
    },
    render: (args, { globals }) => ({
        components: { FormExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormExamples mode="groups" :args="args" :locale="locale"/>',
    }),
};
export default meta;
export const Default: StoryObj = {};
