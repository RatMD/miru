import type { Meta, StoryObj } from '@storybook/vue3';

import Divider from './DividerStd.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Divider',
    component: Divider,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof Divider>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
