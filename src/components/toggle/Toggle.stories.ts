import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { formStory } from '../../stories/form-fixtures';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { Toggle } from './index';

const meta: Meta = {
    title: 'FormFields/Toggle',
    parameters: {
        docs: { page: FormFieldDocs, description: { component: componentDescription('Toggle') } },
    },
    component: Toggle,
    args: { size: 'default', disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<Toggle v-bind="args" v-model="pressed" :aria-label="labels.bold">{{ labels.bold }}</Toggle><output data-testid="value">{{ pressed }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeFormFieldControls('Toggle', meta.argTypes);
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
