import type { Meta, StoryObj } from '@storybook/vue3';

import PopoverStd from './PopoverStd.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Popovers/PopoverStd',
    component: PopoverStd,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof PopoverStd>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
};
