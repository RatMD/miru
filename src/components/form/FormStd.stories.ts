import type { Meta, StoryObj } from '@storybook/vue3';

import FormStd from './FormStd.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/FormStd',
    component: FormStd,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {

    },
} satisfies Meta<typeof FormStd>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
