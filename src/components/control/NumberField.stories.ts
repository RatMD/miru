import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import FormControl from '../form/FormControl.vue';
import NumberField from './NumberField.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/NumberField',
    component: NumberField,
    tags: ['autodocs'],
    argTypes: {
        min: {
            control: 'number',
        },
        max: {
            control: 'number',
        },
        step: {
            control: 'number',
        },
        integer: {
            control: 'boolean',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
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
            options: [null, 'invalid', 'valid'],
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
        size: 'md'
    },
} satisfies Meta<typeof NumberField>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { NumberField },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <NumberField v-bind="args" v-model="value" />
        `
    })
};
