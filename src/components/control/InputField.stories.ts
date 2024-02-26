import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import FormControl from '../form/FormControl.vue';
import InputField from './InputField.vue';

/**
 * Title
 * 
 * <details>
 *   <summary class="cursor-pointer">Unsupported Types</summary>
 *   - <code class="font-semibold">button</code> – Use the [**ButtonStd**](/docs/components-buttons-button--docs) component instead.
 *   - <code class="font-semibold">checkbox</code> – Use the [**CheckboxField**](/docs/form-controls-checkboxfield--docs), [**SwitchField**](/docs/form-controls-switchfield--docs) or [**SelectableList**](/docs/form-controls-selectablelist--docs) component instead.
 *   - <code class="font-semibold">color</code> – Use the [**ColorPicker**](/docs/form-controls-colorpicker--docs) component instead.
 *   - <code class="font-semibold">hidden</code> – Use the native `<input type="hidden" />` element instead.
 *   - <code class="font-semibold">image</code> – You're joking, right?
 *   - <code class="font-semibold">radio</code> – Use the [**RadioField**](/docs/form-controls-radiofield--docs), [**BalloonSelector**](/docs/form-controls-balloonselector--docs) or [**SelectableList**](/docs/form-controls-selectablelist--docs) component instead.
 *   - <code class="font-semibold">range</code> – Use the [**RangeSlider**](/docs/form-controls-rangeslider--docs) component instead.
 *   - <code class="font-semibold">reset</code> – Use the [**ButtonStd**](/docs/components-buttons-button--docs) with `type="reset"` component instead.
 *   - <code class="font-semibold">submit</code> – Use the [**ButtonStd**](/docs/components-buttons-button--docs) with `type="submit"` component instead.
 * </details>
 * 
 * <details>
 *   <summary class="cursor-pointer">Semi-Supported Types</summary>
 *   - <code class="font-semibold">date</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) or [**CalendarField**](/docs/form-controls-calendarfield--docs) component instead.
 *   - <code class="font-semibold">datetime-local</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) or [**CalendarField**](/docs/form-controls-calendarfield--docs) component instead.
 *   - <code class="font-semibold">month</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) component instead.
 *   - <code class="font-semibold">number</code> – Use the [**NumberField**](/docs/form-controls-numberfield--docs) or [**PriceField**](/docs/form-controls-pricefield--docs) component instead.
 *   - <code class="font-semibold">password</code> – Use the [**PasswordField**](/docs/form-controls-passwordfield--docs) component instead.
 *   - <code class="font-semibold">time</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) or [**TimeFrameField**](/docs/form-controls-timeframefield--docs) component instead.
 *   - <code class="font-semibold">week</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) component instead.
 * </details>
 * 
 * <details>
 *   <summary class="cursor-pointer">Supported Types</summary>
 *   - <code class="font-semibold">email</code>
 *   - <code class="font-semibold">file</code>
 *   - <code class="font-semibold">search</code>
 *   - <code class="font-semibold">tel</code>
 *   - <code class="font-semibold">text</code>
 *   - <code class="font-semibold">url</code>
 * </details>
 */
const meta = {
    title: 'Form/Controls/InputField',
    component: InputField,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: [
                'date',
                'datetime',
                'email',
                'month',
                'number',
                'password',
                'search',
                'tel',
                'text',
                'time',
                'url',
                'week'
            ]
        },
        placeholder: {
            control: 'text',
        },
        inputmode: {
            control: 'select',
            options: [
                'none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'
            ]
        },
        autocomplete: {
            control: 'text'
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
        type: 'text',
        size: 'md',
        placeholder: 'Placeholder'
    },
} satisfies Meta<typeof InputField>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { InputField },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <InputField v-bind="args" v-model="value" />
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
        components: { InputField },
        setup() {
            const valueSM = ref();
            const valueMD = ref();
            const valueLG = ref();
            return { args, valueSM, valueMD, valueLG };
        },
        template: `
            <div class="flex flex-col gap-4">
                <InputField v-bind="args" size="sm" placeholder="40px height" v-model="valueSM" />
                <InputField v-bind="args" placeholder="48px height" v-model="valueMD" />
                <InputField v-bind="args" size="lg" placeholder="56px height" v-model="valueLG" />
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
        components: { InputField },
        setup() {
            const placeholderValueNormal = ref<string>('');
            const placeholderValueDisabled = ref<string>('');
            const placeholderValueReadonly = ref<string>('');
            const placeholderValueValid = ref<string>('');
            const placeholderValueInvalid = ref<string>('');

            const valueNormal = ref<string>('Default State');
            const valueDisabled = ref<string>('Disabled State');
            const valueReadonly = ref<string>('Readonly State');
            const valueValid = ref<string>('Valid State');
            const valueInvalid = ref<string>('Invalid State');
            return { 
                args,
                placeholderValueNormal,
                placeholderValueDisabled,
                placeholderValueReadonly,
                placeholderValueValid,
                placeholderValueInvalid,
                valueNormal,
                valueDisabled,
                valueReadonly,
                valueValid,
                valueInvalid
            };
        },
        template: `
            <div class="flex flex-row gap-4">
                <div class="flex flex-col gap-4 flex-1">
                    <InputField v-bind="args" placeholder="Default State" v-model="placeholderValueNormal" />
                    <InputField v-bind="args" placeholder="Disabled State" disabled v-model="placeholderValueDisabled" />
                    <InputField v-bind="args" placeholder="Readonly State" readonly v-model="placeholderValueReadonly" />
                    <InputField v-bind="args" placeholder="Valid State" validation="valid" v-model="placeholderValueValid" />
                    <InputField v-bind="args" placeholder="Invalid State" validation="invalid" v-model="placeholderValueInvalid" />
                </div>
                <div class="flex flex-col gap-4 flex-1">
                    <InputField v-bind="args" v-model="valueNormal" />
                    <InputField v-bind="args" v-model="valueDisabled" disabled />
                    <InputField v-bind="args" v-model="valueReadonly" readonly />
                    <InputField v-bind="args" v-model="valueValid" validation="valid" />
                    <InputField v-bind="args" v-model="valueInvalid" validation="invalid" />
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
        components: { FormControl, InputField },
        setup() {
            const value = ref<string>('');
            return { args, value };
        },
        template: `
            <FormControl label="FormControl Label" description="FormControl Description">
                <InputField v-bind="args" v-model="value" />
            </FormControl>
        `
    })
};
