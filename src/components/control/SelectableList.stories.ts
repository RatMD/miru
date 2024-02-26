import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import SelectableList from './SelectableList.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/SelectableList',
    component: SelectableList,
    tags: ['autodocs'],
    argTypes: {
        options: {
            control: 'object',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
        },
        multiple: {
            control: 'boolean',
        },


        // Shared Properties
        id: {
            control: 'text',
            table: {
                category: 'Shared Props',
            },
        },
        name: {
            control: 'text',
            table: {
                category: 'Shared Props',
            },
        },
        modelValue: {
            control: 'text',
            table: {
                category: 'Shared Props',
                disable: true,
            },
        },
        validation: {
            control: 'radio',
            options: ['invalid', 'valid'],
            table: {
                category: 'Shared Props',
            },
        },
        validationMessage: {
            control: 'text',
            table: {
                category: 'Shared Props',
            },
        },
        disabled: {
            control: 'boolean',
            table: {
                category: 'Shared Props',
            },
        },
        readonly: {
            control: 'boolean',
            table: {
                category: 'Shared Props',
            }
        },
        required: {
            control: 'boolean',
            table: {
                category: 'Shared Props',
            }
        },
    },
    args: {
        options: [
            ['a', 'Option A'],
            ['b', 'Option B'],
            ['c', 'Option C'],
            {
                value: 'd',
                label: 'Disabled',
                disabled: true
            }
        ],
        size: 'md',
    },
} satisfies Meta<typeof SelectableList>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { SelectableList },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <SelectableList v-bind="args" v-model="value" />
        `
    })
};

/**
 * Default Variant
 */
export const Multiple: Story = {
    args: {
        multiple: true
    },
    render: (args: any) => ({
        components: { SelectableList },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <SelectableList v-bind="args" v-model="value" />
        `
    })
};

/**
 * Default Variant
 */
export const Sizes: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { SelectableList },
        setup() {
            const valueSM = ref();
            const valueSMM = ref();
            const valueMD = ref();
            const valueMDM = ref();
            const valueLG = ref();
            const valueLGM = ref();
            return { args, valueSM, valueSMM, valueMD, valueMDM, valueLG, valueLGM };
        },
        template: `
            <div class="flex flex-col gap-8">
                <div class="flex flex-row gap-16">
                    <SelectableList v-bind="args" v-model="valueSM" size="sm" />
                    <SelectableList v-bind="args" v-model="valueSMM" size="sm" multiple />
                </div>
                <div class="flex flex-row gap-16">
                    <SelectableList v-bind="args" v-model="valueMD" />
                    <SelectableList v-bind="args" v-model="valueMDM" multiple />
                </div>
                <div class="flex flex-row gap-16">
                    <SelectableList v-bind="args" v-model="valueLG" size="lg" />
                    <SelectableList v-bind="args" v-model="valueLGM" size="lg" multiple />
                </div>
            </div>
        `
    })
};
