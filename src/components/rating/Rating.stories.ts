import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import RatingDemo from '../../stories/RatingDemo.vue';
import { Rating } from './index';
const meta: Meta = {
    title: 'FormFields/Rating',
    component: Rating,
    parameters: {
        layout: 'padded',
        docs: {
            page: FormFieldDocs,
            description: {
                component: componentDescription('Rating'),
            },
        },
    },
    args: {
        modelValue: 2.5,
        length: 5,
        step: 0.5,
        variant: 'warning',
        mode: 'stars',
        readonly: false,
        disabled: false,
        clearable: true,
        animated: true,
        hoverable: true,
        showValue: true,
        size: 'default',
    },
    argTypes: {
        modelValue: { control: 'number' },
        length: { control: { type: 'number', min: 1, max: 50 } },
        step: { control: 'select', options: [1, 0.5, 0.25, 0.1] },
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
        mode: { control: 'select', options: ['stars', 'like-dislike'] },
        readonly: { control: 'boolean' },
        disabled: { control: 'boolean' },
        clearable: { control: 'boolean' },
        animated: { control: 'boolean' },
        hoverable: { control: 'boolean' },
        showValue: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
    },
    render: (args, { parameters }) => ({
        components: { RatingDemo },
        setup: () => ({ args, colors: !!parameters.colors }),
        template: '<RatingDemo :args="args" :colors="colors" />',
    }),
};
describeFormFieldControls('Rating', meta.argTypes);
export default meta;
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('radio', { name: /^3.5 (of|von) 5/ });
        await userEvent.click(input);
        await waitFor(() => expect(canvas.getByTestId('rating-value')).toHaveTextContent('3.5'));
        await userEvent.keyboard('{ArrowRight}');
        await waitFor(() => expect(canvas.getByTestId('rating-value')).toHaveTextContent('4'));
        await waitFor(() =>
            expect(canvas.getByRole('radio', { name: /^4 (of|von) 5/ })).toHaveAttribute(
                'data-state',
                'active',
            ),
        );
    },
};
export const ThreeStars: StoryObj = { args: { length: 3, modelValue: 1.5 } };
export const TenStars: StoryObj = { args: { length: 10, modelValue: 7.5 } };
export const HalfStarAverage: StoryObj = { args: { readonly: true, modelValue: 3.5 } };
export const LargeScale: StoryObj = {
    args: { readonly: true, length: 50, modelValue: 32.5, size: 'sm' },
};
export const Colors: StoryObj = { parameters: { colors: true, controls: { disable: true } } };
export const LikeDislike: StoryObj = {
    args: { mode: 'like-dislike', modelValue: 0 },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('radio', { name: /^(Like|Gefällt mir)$/ }));
        await expect(canvas.getByTestId('rating-value')).toHaveTextContent('1');
        await userEvent.click(canvas.getByRole('radio', { name: /^(Dislike|Gefällt mir nicht)$/ }));
        await expect(canvas.getByTestId('rating-value')).toHaveTextContent('-1');
        await userEvent.click(canvas.getByRole('radio', { name: /^(Dislike|Gefällt mir nicht)$/ }));
        await expect(canvas.getByTestId('rating-value')).toHaveTextContent('0');
    },
};
export const Disabled: StoryObj = { args: { disabled: true } };
export const QuarterSteps: StoryObj = { args: { step: 0.25, modelValue: 3.25 } };
