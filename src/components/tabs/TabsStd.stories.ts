import type { Meta, StoryObj } from '@storybook/vue3';

import TabsStd from './TabsStd.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Tabs/TabsStd',
    component: TabsStd,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {

    },
} satisfies Meta<typeof TabsStd>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
