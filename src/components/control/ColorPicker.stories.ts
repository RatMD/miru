import type { Meta, StoryObj } from '@storybook/vue3';

import ColorPicker from './ColorPicker.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/ColorPicker',
    component: ColorPicker,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof ColorPicker>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
