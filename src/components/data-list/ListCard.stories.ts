import type { Meta, StoryObj } from '@storybook/vue3';

import ListCard from './ListCard.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/DataList/ListCard',
    component: ListCard,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof ListCard>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
