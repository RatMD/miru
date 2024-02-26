import type { Meta, StoryObj } from '@storybook/vue3';

import TooltipStd from './TooltipStd.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Tooltip/Tooltip',
    component: TooltipStd,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: [null, 'primary', 'secondary', 'success', 'warning', 'danger', 'info']
        },
        //@ts-ignore    //@todo temporary solution, since storybook does not support props / slots with the same name
        'label ': {
            control: 'text',
            description: 'The desired label text for this tooltip, used when no slot is passed.',
            table: {
                category: 'props'
            }
        },
        delay: {
            control: {
                type: 'number',
                min: 0
            }
        },
        placement: {
            control: 'select',
            options: [
                null, 
                "top", 
                "top-start",
                "top-end",
                "right", 
                "right-start",
                "right-end",
                "bottom", 
                "bottom-start",
                "bottom-end",
                "left",
                "left-start",
                "left-end"
            ]
        },
        offset: {
            control: {
                type: 'number',
                min: 0
            }
        }
    },
    args: {
        //@ts-ignore    //@todo temporary solution, since storybook does not support props / slots with the same name
        'label ': 'Tooltip'
    },
} satisfies Meta<typeof TooltipStd>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { TooltipStd },
        setup() {
            return { args };
        },
        template: `
            <TooltipStd v-bind="args" :label="args['label ']" v-slot="{ show, hide }">
                <span class="bg-yellow-200/50" @mouseover="show" @mouseout="hide">Tooltip Text</span>
            </TooltipStd>
        `
    })
};

/**
 * Placements
 */
export const Placements: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { TooltipStd },
        setup() {
            const placements = [
                {
                    'top': 'Top Tooltip',
                    'top-start': 'Top-Start Tooltip',
                    'top-end': 'Top-End Tooltip',
                },
                {
                    'right': 'Right Tooltip',
                    'right-start': 'Right-Start Tooltip',
                    'right-end': 'Right-End Tooltip',
                },
                {
                    'bottom': 'Bottom Tooltip',
                    'bottom-start': 'Bottom-Start Tooltip',
                    'bottom-end': 'Bottom-End Tooltip',
                },
                {
                    'left': 'Left Tooltip',
                    'left-start': 'Left-Start Tooltip',
                    'left-end': 'Left-End Tooltip',
                },
            ]
            return { args, placements };
        },
        template: `
            <div class="flex flex-col gap-4 items-center">

            <template v-for="(items, idx) of placements" :key="idx">
                <div class="flex flex-row gap-4">
                    <template v-for="([key, label], id2) of Object.entries(items)" :key="id2">
                        <TooltipStd v-bind="args" :label="label" :placement="key" v-slot="{ show, hide }">
                            <div class="m-4 w-48 h-16 rounded-md border border-solid border-gray-300 bg-gray-50 flex items-center justify-center" 
                                @mouseover="show" @mouseout="hide">
                                {{ key }}
                            </div>
                        <TooltipStd>
                    </template>
                </div>
            </template>
        `
    })
};
