import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import FormControl from '../form/FormControl.vue';
import SelectField from './SelectField.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/SelectField',
    component: SelectField,
    tags: ['autodocs'],
    argTypes: {
        options: {
            control: 'object',
        },
        placeholder: {
            control: 'text',
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
        size: 'md',
        placeholder: 'Select an option',
        options: [
            ['a', 'Option A'],
            ['b', 'Option B'],
            ['c', 'Option C']
        ]
    },
} satisfies Meta<typeof SelectField>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: { },
    render: (args: any) => ({
        components: { SelectField },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <SelectField v-bind="args" v-model="value" />
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
        components: { SelectField },
        setup() {
            const valueSM = ref();
            const valueMD = ref();
            const valueLG = ref();
            return { args, valueSM, valueMD, valueLG };
        },
        template: `
            <div class="flex flex-col gap-4">
                <SelectField v-bind="args" size="sm" placeholder="40px height" v-model="valueSM" />
                <SelectField v-bind="args" placeholder="48px height" v-model="valueMD" />
                <SelectField v-bind="args" size="lg" placeholder="56px height" v-model="valueLG" />
            </div>
        `
    })
};

/**
 * Default Variant
 */
export const States: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { SelectField },
        setup() {
            const placeholderValueNormal = ref<string>('');
            const placeholderValueDisabled = ref<string>('');
            const placeholderValueValid = ref<string>('');
            const placeholderValueInvalid = ref<string>('');

            const valueNormal = ref<string>('a');
            const valueDisabled = ref<string>('a');
            const valueValid = ref<string>('a');
            const valueInvalid = ref<string>('a');
            return { 
                args,
                placeholderValueNormal,
                placeholderValueDisabled,
                placeholderValueValid,
                placeholderValueInvalid,
                valueNormal,
                valueDisabled,
                valueValid,
                valueInvalid
            };
        },
        template: `
            <div class="flex flex-row gap-4">
                <div class="flex flex-col gap-4 flex-1">
                    <SelectField v-bind="args" placeholder="Default State" v-model="placeholderValueNormal" />
                    <SelectField v-bind="args" placeholder="Disabled State" disabled v-model="placeholderValueDisabled" />
                    <SelectField v-bind="args" placeholder="Valid State" validation="valid" v-model="placeholderValueValid" />
                    <SelectField v-bind="args" placeholder="Invalid State" validation="invalid" v-model="placeholderValueInvalid" />
                </div>
                <div class="flex flex-col gap-4 flex-1">
                    <SelectField v-bind="args" v-model="valueNormal" />
                    <SelectField v-bind="args" v-model="valueDisabled" disabled />
                    <SelectField v-bind="args" v-model="valueValid" validation="valid" />
                    <SelectField v-bind="args" v-model="valueInvalid" validation="invalid" />
                </div>
            </div>
        `
    })
};

/**
 * FormControl
 */
export const FormControlVariant: Story = {
    name: 'Form Control',
    args: {
        
    },
    render: (args: any) => ({
        components: { FormControl, SelectField },
        setup() {
            const value = ref<string>('');
            return { args, value };
        },
        template: `
            <FormControl label="FormControl Label" description="FormControl Description">
                <SelectField v-bind="args" v-model="value" />
            </FormControl>
        `
    })
};
