import type { Meta, StoryObj } from '@storybook/vue3';

import TabPane from './TabPane.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Tabs/TabPane',
    component: TabPane,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {

    },
} satisfies Meta<typeof TabPane>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
