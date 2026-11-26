import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { formStory } from '../../stories/form-fixtures';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { selectionVariantsPlay } from '../../stories/selection-checks';
import SelectionVariantsDemo from '../../stories/SelectionVariantsDemo.vue';
import { inlineColorVariants } from '../inline-variants';
import { RadioBox } from './index';

const meta: Meta = {
    title: 'FormFields/Radiobox',
    parameters: {
        docs: { page: FormFieldDocs, description: { component: componentDescription('RadioBox') } },
    },
    component: RadioBox,
    args: { variant: 'default', size: 'default', disabled: false },
    argTypes: {
        variant: { control: 'select', options: inlineColorVariants },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<RadioBox v-bind="args" v-model="selection" value="second" :label="labels.second" /><output data-testid="value">{{ selection }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeFormFieldControls('RadioBox', meta.argTypes);
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const Variants: StoryObj = {
    parameters: { controls: { disable: true }, layout: 'padded' },
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="radio" />',
    }),
};
export const ItemOverrides: StoryObj = {
    parameters: { controls: { disable: true }, layout: 'padded' },
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="radio" overrides />',
    }),
};

export const Interaction: StoryObj = { ...Variants, play: selectionVariantsPlay('radio') };
