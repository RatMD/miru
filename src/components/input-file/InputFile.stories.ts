import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { formStory } from '../../stories/form-fixtures';
import { InputFile } from './index';

const meta: Meta = {
    title: 'FormFields/InputFile',
    parameters: { docs: { description: { component: componentDescription('InputFile') } } },
    component: InputFile,
    args: { size: 'default', disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<InputFile v-bind="args" :aria-label="labels.upload" @files="files = $event" /><output data-testid="value">{{ files.map(file => file.name).join(", ") }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
