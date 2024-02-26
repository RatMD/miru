import type { Meta, StoryObj } from '@storybook/vue3';

import PaginationStd from './PaginationStd.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Pagination/PaginationStd',
    component: PaginationStd,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {

    },
} satisfies Meta<typeof PaginationStd>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
