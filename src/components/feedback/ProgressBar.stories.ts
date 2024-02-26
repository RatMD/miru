import type { Meta, StoryObj } from '@storybook/vue3';

import ProgressBar from './ProgressBar.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Feedback/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof ProgressBar>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
