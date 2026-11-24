import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { formStory } from '../../stories/form-fixtures';
import { selectionVariantsPlay } from '../../stories/selection-checks';
import SelectionVariantsDemo from '../../stories/SelectionVariantsDemo.vue';
import { inlineColorVariants } from '../inline-variants';
import { Checkbox } from './index';

const meta: Meta = {
    title: 'FormFields/Checkbox',
    parameters: { docs: { description: { component: componentDescription('Checkbox') } } },
    component: Checkbox,
    args: { variant: 'default', size: 'default', disabled: false },
    argTypes: {
        variant: { control: 'select', options: inlineColorVariants },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<Checkbox v-bind="args" v-model="checked" :label="labels.accept" /><output data-testid="value">{{ checked }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const Variants: StoryObj = {
    parameters: { controls: { disable: true }, layout: 'padded' },
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="checkbox" />',
    }),
};
export const ItemOverrides: StoryObj = {
    parameters: { controls: { disable: true }, layout: 'padded' },
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="checkbox" overrides />',
    }),
};

export const Interaction: StoryObj = { ...Variants, play: selectionVariantsPlay('checkbox') };
