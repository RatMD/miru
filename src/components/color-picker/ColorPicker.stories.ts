import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { formStory } from '../../stories/form-fixtures';
import { ColorPicker } from './index';

const meta: Meta = {
    title: 'FormFields/ColorPicker',
    parameters: { docs: { description: { component: componentDescription('ColorPicker') } } },
    component: ColorPicker,
    args: { size: 'default', disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<ColorPicker v-bind="args" v-model="color" :aria-label="labels.color" /><output data-testid="value">{{ color }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
