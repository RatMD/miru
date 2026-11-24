import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import FormExamples from '../../stories/FormExamples.vue';
import { Label } from './index';
const meta: Meta = {
    ...componentControls('Label'),
    title: 'Form/Label',
    component: Label,
    parameters: {
        controls: { include: controlNames('Label') },
        layout: 'padded',
        docs: { description: { component: componentDescription('Label') } },
    },
    render: (args, { globals }) => ({
        components: { FormExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<FormExamples mode="label" :args="args" :locale="locale"/>',
    }),
};
export default meta;
export const Default: StoryObj = {};
