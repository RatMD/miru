import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import CollapseSupport from './CollapseSupport.vue';

/**
 * Title
 */
const meta = {
    title: 'Support/Collapse',
    component: CollapseSupport,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
    render: (args: any) => ({
        components: { CollapseSupport },
        setup() {
            const visible = ref<boolean>(false);
            return { args, visible };
        },
        template: `
        `
    })
} satisfies Meta<typeof CollapseSupport>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
    },
};
