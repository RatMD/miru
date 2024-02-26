import type { Meta, StoryObj } from '@storybook/vue3';

import ListTableColumn from './ListTableColumn.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/DataList/ListTableColumn',
    component: ListTableColumn,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof ListTableColumn>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
