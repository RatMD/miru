import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ref } from 'vue';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { Slider } from './index';

const meta = {
    title: 'FormFields/Slider',
    component: Slider,
    parameters: {
        docs: {
            page: FormFieldDocs,
            description: {
                component: componentDescription('Slider'),
            },
        },
    },
    args: {
        min: 0,
        max: 100,
        step: 1,
        variant: 'primary',
        size: 'default',
        disabled: false,
        showSteps: false,
    },
    argTypes: {
        min: { control: 'number' },
        max: { control: 'number' },
        step: { control: 'number' },
        variant: {
            control: 'select',
            options: [
                'default',
                'primary',
                'secondary',
                'accent',
                'info',
                'success',
                'warning',
                'danger',
            ],
        },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        showSteps: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    render: (args) => ({
        components: { Slider },
        setup: () => ({ args, value: ref(args.initialRange ? [20, 80] : [40]) }),
        template:
            '<div class="grid w-80 max-w-full gap-5 p-3"><Slider v-bind="args" v-model="value" label="Value" :thumb-labels="value.length === 2 ? [\'From\', \'Until\'] : [\'Value\']" /><output data-testid="value">{{ value }}</output></div>',
    }),
} satisfies Meta;
describeFormFieldControls('Slider', meta.argTypes);
export default meta;
export const Default: StoryObj = {};
export const Steps: StoryObj = { args: { step: 10, showSteps: true } };
export const Range: StoryObj = {
    args: { initialRange: true, step: 5, showSteps: true, minStepsBetweenThumbs: 2 },
};
export const Disabled: StoryObj = { args: { disabled: true, initialRange: true } };
export const Vertical: StoryObj = {
    args: { orientation: 'vertical', initialRange: true, step: 10, showSteps: true },
};
export const Keyboard: StoryObj = {
    args: { initialRange: true, step: 5, minStepsBetweenThumbs: 2 },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const start = canvas.getByRole('slider', { name: 'From' });
        await userEvent.tab();
        await expect(start).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}');
        await expect(start).toHaveAttribute('aria-valuenow', '25');
        for (let attempt = 0; attempt < 10; attempt++) {
            await userEvent.keyboard('{ArrowRight}');
        }
        await expect(start).toHaveAttribute('aria-valuenow', '70');
        await expect(canvas.getByRole('slider', { name: 'Until' })).toHaveAttribute(
            'aria-valuenow',
            '80',
        );
    },
};
