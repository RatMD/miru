import type { Meta, StoryObj } from '@storybook/vue3';

import BottomSheet from './BottomSheet.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Offcanvas/BottomSheet',
    component: BottomSheet,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {

    },
} satisfies Meta<typeof BottomSheet>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
