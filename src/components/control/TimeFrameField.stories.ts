import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import TimeFrameField from './TimeFrameField.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/TimeFrameField',
    component: TimeFrameField,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof TimeFrameField>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { TimeFrameField },
        setup() {
            const value = ref<string>('');
            return { args, value };
        },
        template: `
            <TimeFrameField v-bind="args" v-model="value" />
        `
    })
};

/**
 * Default Variant
 */
export const Between: Story = {
    args: {
        between: '03:00:00'
    },
    render: (args: any) => ({
        components: { TimeFrameField },
        setup() {
            const value = ref<string>('');
            return { args, value };
        },
        template: `
            <TimeFrameField v-bind="args" v-model="value" />
        `
    })
};
