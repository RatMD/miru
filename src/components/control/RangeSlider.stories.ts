import type { Meta, StoryObj } from '@storybook/vue3';

import RangeSlider from './RangeSlider.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/RangeSlider',
    component: RangeSlider,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof RangeSlider>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
