import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import BaseDialog from './BaseDialog.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Dialogs/BaseDialog',
    component: BaseDialog,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
    render: (args: any) => ({
        components: { ButtonStd, BaseDialog },
        setup() {
            const visible = ref<boolean>(false);
            return { args, visible };
        },
        template: `
            <ButtonStd label="Open Dialog" @click="visible = !visible" />
            <BaseDialog target="html" v-bind="args" v-model:visible="visible">
                <div>
                    {{ args.default }}
                </div>
            </BaseDialog>
        `
    })
} satisfies Meta<typeof BaseDialog>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        default: 'Dialog content'
    },
};
