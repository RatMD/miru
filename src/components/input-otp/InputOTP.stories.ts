import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { formStory } from '../../stories/form-fixtures';
import { InputOTP } from './index';

const meta: Meta = {
    title: 'FormFields/InputOtp',
    parameters: { docs: { description: { component: componentDescription('InputOTP') } } },
    component: InputOTP,
    args: { size: 'default', disabled: false, maxlength: 6, masked: false, maskCharacter: '*' },
    argTypes: {
        maxlength: { control: { type: 'number', min: 1, max: 12, step: 1 } },
        masked: { control: 'boolean' },
        maskCharacter: { control: 'text' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<InputOTP v-bind="args" v-model="otp" :aria-label="labels.code"></InputOTP><output data-testid="value">{{ otp }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const Masked: StoryObj = { args: { masked: true } };
export const FourDigits: StoryObj = { args: { maxlength: 4 } };
export const EightDigits: StoryObj = { args: { maxlength: 8 } };
