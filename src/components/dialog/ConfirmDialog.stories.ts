import type { Meta, StoryObj } from '@storybook/vue3';

import ConfirmDialog from './ConfirmDialog.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Dialogs/ConfirmDialog',
    component: ConfirmDialog,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof ConfirmDialog>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
