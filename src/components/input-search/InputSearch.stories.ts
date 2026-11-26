import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { formStory } from '../../stories/form-fixtures';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { InputSearch } from './index';

const meta: Meta = {
    title: 'FormFields/InputSearch',
    parameters: {
        docs: {
            page: FormFieldDocs,
            description: { component: componentDescription('InputSearch') },
        },
    },
    component: InputSearch,
    args: { size: 'default', disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<InputSearch v-bind="args" v-model="search" :aria-label="labels.search" :placeholder="labels.search" /><output data-testid="value">{{ search }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeFormFieldControls('InputSearch', meta.argTypes);
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
