import type { Meta, StoryObj } from '@storybook/vue3';

import InputGroup from './InputGroup.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Groups/InputGroup',
    component: InputGroup,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {

    },
} satisfies Meta<typeof InputGroup>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
