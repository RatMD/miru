import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { formStory } from '../../stories/form-fixtures';
import { ToggleGroup } from './index';

const meta: Meta = {
    title: 'FormFields/ToggleGroup',
    parameters: { docs: { description: { component: componentDescription('ToggleGroup') } } },
    component: ToggleGroup,
    args: { size: 'default', disabled: false },
    argTypes: {
        orientation: { control: 'select', options: ['vertical', 'horizontal'] },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<ToggleGroup v-bind="args" v-model="selection" type="single" :aria-label="labels.choice"><ToggleGroupItem v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</ToggleGroupItem></ToggleGroup><output data-testid="value">{{ selection }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const Horizontal: StoryObj = { args: { orientation: 'horizontal' } };
export const Vertical: StoryObj = { args: { orientation: 'vertical' } };
