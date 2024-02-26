import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import BackdropSupport from './BackdropSupport.vue';

/**
 * The **BackdropSupport** component is used on various different other ones, such as on the Modal 
 * and Offcanvas components. It provides a consistent backdrop behavior, and is usually not used
 * directly.
 */
const meta = {
    title: 'Support/Backdrop',
    component: BackdropSupport,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
    render: (args: any) => ({
        components: { BackdropSupport },
        setup() {
            const visible = ref<boolean>(false);
            return { args, visible };
        },
        template: `
        `
    })
} satisfies Meta<typeof BackdropSupport>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
    },
};
