import type { Meta, StoryObj } from '@storybook/vue3';

import BasePopover from './BasePopover.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Popovers/BasePopover',
    component: BasePopover,
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
        },
        arrow: {
            control: 'select',
            options: [
                null,
                false,
                true,
                'top',
                'right',
                'bottom',
                'left'
            ]
        },
        arrowStyles: {
            control: 'object',
        },
        size: {
            control: 'radio',
            options: [
                null,
                'sm',
                'md',
                'lg'
            ]
        },
    },
    args: {
        
    },
    render: (args: any) => ({
        components: { BasePopover },
        setup() {
            return { args };
        },
        template: `
            <BasePopover v-bind="args">
                <template #popover v-if="args.popover">{{ args.popover }}</template>
                <template #content v-if="args.content">{{ args.content }}</template>
                <template #header v-if="args.header">{{ args.header }}</template>
                <template #default v-if="args.default">{{ args.default }}</template>
                <template #footer v-if="args.footer">{{ args.footer }}</template>
            </BasePopover>
        `
    })
} satisfies Meta<typeof BasePopover>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        default: 'Dialog content',
    },
};
