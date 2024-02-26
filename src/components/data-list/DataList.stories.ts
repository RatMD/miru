import type { Meta, StoryObj } from '@storybook/vue3';

import DataList from './DataList.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/DataList/DataList',
    component: DataList,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof DataList>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
