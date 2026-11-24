import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { formStory } from '../../stories/form-fixtures';
import { InputNumber } from './index';

const meta: Meta = {
    title: 'FormFields/InputNumber',
    parameters: { docs: { description: { component: componentDescription('InputNumber') } } },
    component: InputNumber,
    args: { size: 'default', disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<InputNumber v-bind="args" v-model="number" :min="0" :max="10" :locale="locale"><InputNumberContent><InputNumberDecrement :aria-label="labels.first" /><InputNumberInput :size="args.size" :aria-label="labels.input" /><InputNumberIncrement :aria-label="labels.second" /></InputNumberContent></InputNumber><output data-testid="value">{{ number }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
