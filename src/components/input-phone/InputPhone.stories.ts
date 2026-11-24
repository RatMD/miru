import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { formStory } from '../../stories/form-fixtures';
import { InputPhone } from './index';

const meta: Meta = {
    title: 'FormFields/InputPhone',
    parameters: { docs: { description: { component: componentDescription('InputPhone') } } },
    component: InputPhone,
    args: { size: 'default', disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<InputPhone v-bind="args" v-model="phone" :countries="countries" :country-code-label="labels.country" :placeholder="labels.phone" :aria-label="labels.phone" /><output data-testid="value">{{ phone }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
