import type { Meta, StoryObj } from '@storybook/vue3';

import ContextMenu from './ContextMenu.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Popovers/ContextMenu',
    component: ContextMenu,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof ContextMenu>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
