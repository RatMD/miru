import type { Meta, StoryObj } from '@storybook/vue3';

import DateTimePicker from './DateTimePicker.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/DateTimePicker',
    component: DateTimePicker,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof DateTimePicker>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
