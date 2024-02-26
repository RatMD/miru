import type { Meta, StoryObj } from '@storybook/vue3';

import ListTable from './ListTable.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/DataList/ListTable',
    component: ListTable,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof ListTable>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
