import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import BaseOffcanvas from './BaseOffcanvas.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Offcanvas/BaseOffcanvas',
    component: BaseOffcanvas,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
    render: (args: any) => ({
        components: { ButtonStd, BaseOffcanvas },
        setup() {
            const visible = ref<boolean>(false);
            return { args, visible };
        },
        template: `
            <ButtonStd label="Open Offcanvas" @click="visible = !visible" />
            <BaseOffcanvas target="html" v-bind="args" v-model:visible="visible">
                <div>
                    {{ args.default }}
                </div>
            </BaseOffcanvas>
        `
    })
} satisfies Meta<typeof BaseOffcanvas>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        default: 'Dialog content',
        backdrop: true
    },
};
