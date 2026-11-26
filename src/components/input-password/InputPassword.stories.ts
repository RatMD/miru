import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { formStory } from '../../stories/form-fixtures';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { InputPassword } from './index';

const meta: Meta = {
    title: 'FormFields/InputPassword',
    parameters: {
        docs: {
            page: FormFieldDocs,
            description: { component: componentDescription('InputPassword') },
        },
    },
    component: InputPassword,
    args: { size: 'default', disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<InputPassword v-bind="args" v-model="password" show-icon :aria-label="labels.password" :placeholder="labels.password" /><output data-testid="value">{{ password }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeFormFieldControls('InputPassword', meta.argTypes);
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
