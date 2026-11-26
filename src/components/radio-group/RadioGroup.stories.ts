import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { formStory } from '../../stories/form-fixtures';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { inlineColorVariants } from '../inline-variants';
import { RadioGroup } from './index';

const meta: Meta = {
    title: 'FormFields/RadioGroup',
    parameters: {
        docs: {
            page: FormFieldDocs,
            description: { component: componentDescription('RadioGroup') },
        },
    },
    component: RadioGroup,
    args: { variant: 'default', size: 'default', disabled: false },
    argTypes: {
        variant: { control: 'select', options: inlineColorVariants },
        orientation: { control: 'select', options: ['vertical', 'horizontal'] },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<RadioGroup v-bind="args" v-model="selection" :options="options" :aria-label="labels.choice" /><output data-testid="value">{{ selection }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeFormFieldControls('RadioGroup', meta.argTypes);
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const Horizontal: StoryObj = { args: { orientation: 'horizontal' } };
export const Vertical: StoryObj = { args: { orientation: 'vertical' } };
