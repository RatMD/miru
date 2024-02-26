import type { Meta, StoryObj } from '@storybook/vue3';

import { AlignCenter, AlignLeft, AlignRight } from 'lucide-vue-next';
import { ref } from 'vue';
import BalloonSelector from './BalloonSelector.vue';

/**
 * The **BalloonSelector** form control field works similar to the [**SelectableList**](/docs/form-controls-selectablelist--docs)
 * component, but presents the specified options in a different way (also depending on the viewport 
 * size, of course). However, compared to the **SelectableList**, it is not recommended using this 
 * form control field for (many) long-labeled options.
 */
const meta = {
    title: 'Form/Controls/BalloonSelector',
    component: BalloonSelector,
    tags: ['autodocs'],
    argTypes: {
        options: {
            control: 'object',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
        },
        iconProps: {
            control: 'object',
        },
        condensed: {
            control: 'boolean',
        },
        connected: {
            control: 'boolean',
        },
        multiple: {
            control: 'boolean',
        },
        unselect: {
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
} satisfies Meta<typeof BalloonSelector>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * The default variant provides single-non-unselectable options, shown below each other on mobile 
 * devices and, starting with tablets (`768px` width, default), next to each other. Selected options 
 * receive a primary-styled color.
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { BalloonSelector },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <BalloonSelector v-bind="args" v-model="value" />
        `
    })
};

/**
 * Similar to a native HTML single select field, a selection can be changed at any time but cannot 
 * be made undone / deselected, even if no value was initially set. However, this functionality can
 * be added using the `unselect` property.
 */
export const Unselectable: Story = {
    args: {
        unselect: true
    },
    render: (args: any) => ({
        components: { BalloonSelector },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <BalloonSelector v-bind="args" v-model="value" />
        `
    })
};

/**
 * Using the `multiple` property allows to support multiple selected options at the same time. In 
 * this case, selected options can be deselected at any time, regardless of the `unselect` property.
 */
export const Multiple: Story = {
    args: {
        multiple: true
    },
    render: (args: any) => ({
        components: { BalloonSelector },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <BalloonSelector v-bind="args" v-model="value" />
        `
    })
};

/**
 * The **BalloonSelector** field supports the three control-typical sizes, similar to other form 
 * controls, of `40px`, `48px` and `56px`. Bear in mind, that the display differs on mobile devices 
 * and also depending on the length of the options and option labels.
 */
export const Sizes: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { BalloonSelector },
        setup() {
            const valueSM = ref();
            const valueMD = ref();
            const valueLG = ref();
            return { args, valueSM, valueMD, valueLG };
        },
        template: `
            <div class="flex flex-col gap-4">
                <BalloonSelector v-bind="args" size="sm" placeholder="40px height" v-model="valueSM" />
                <BalloonSelector v-bind="args" placeholder="48px height" v-model="valueMD" />
                <BalloonSelector v-bind="args" size="lg" placeholder="56px height" v-model="valueLG" />
            </div>
        `
    })
};

/**
 * Icons are supported as well and can either appear on the left or right site of the option label 
 * or also replace it completely. This configuration must be set per option item. Omitting the option 
 * label itself is not allowed, despite the "icon-only" mode, as it is still required for a11y reasons.
 */
export const Icons: Story = {
    args: {
        options: [
            {
                value: 'align-left',
                label: 'Align Left',
                icon: AlignLeft
            },
            {
                value: 'align-center',
                label: 'Align Center',
                icon: AlignCenter
            },
            {
                value: 'align-right',
                label: 'Align Right',
                icon: AlignRight
            }
        ]
    },
    render: (args: any) => ({
        components: { BalloonSelector },
        setup() {
            const valueSM = ref();
            const valueMD = ref();
            const valueLG = ref();

            const placementOptions: any = [
                {
                    value: 'align-left',
                    label: 'Align Left',
                    icon: AlignLeft,
                    placement: 'icon'
                },
                {
                    value: 'align-center',
                    label: 'Align Center',
                    icon: AlignCenter,
                    placement: 'icon'
                },
                {
                    value: 'align-right',
                    label: 'Align Right',
                    icon: AlignRight,
                    placement: 'icon'
                }
            ];

            return { args, placementOptions, valueSM, valueMD, valueLG };
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="args" :options="placementOptions" size="sm" placeholder="40px height" v-model="valueSM" />
                    <BalloonSelector v-bind="args" size="sm" placeholder="40px height" v-model="valueSM" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="args" :options="placementOptions" placeholder="48px height" v-model="valueMD" />
                    <BalloonSelector v-bind="args" placeholder="48px height" v-model="valueMD" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="args" :options="placementOptions" size="lg" placeholder="56px height" v-model="valueLG" />
                    <BalloonSelector v-bind="args" size="lg" placeholder="56px height" v-model="valueLG" />
                </div>
            </div>
        `
    })
};

/**
 * The `connected` property removes the gap between the single options and adds a negative margin 
 * of `1px` (except on the first child) to overlay the single border lines.
 */
export const Connected: Story = {
    args: {
        connected: true,
        options: [
            {
                value: 'align-left',
                label: 'Align Left',
                icon: AlignLeft
            },
            {
                value: 'align-center',
                label: 'Align Center',
                icon: AlignCenter
            },
            {
                value: 'align-right',
                label: 'Align Right',
                icon: AlignRight
            }
        ]
    },
    render: (args: any) => ({
        components: { BalloonSelector },
        setup() {
            const valueSM = ref();
            const valueMD = ref();
            const valueLG = ref();

            const placementOptions: any = [
                {
                    value: 'align-left',
                    label: 'Align Left',
                    icon: AlignLeft,
                    placement: 'icon'
                },
                {
                    value: 'align-center',
                    label: 'Align Center',
                    icon: AlignCenter,
                    placement: 'icon'
                },
                {
                    value: 'align-right',
                    label: 'Align Right',
                    icon: AlignRight,
                    placement: 'icon'
                }
            ];

            return { args, placementOptions, valueSM, valueMD, valueLG };
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="args" :options="placementOptions" size="sm" placeholder="40px height" v-model="valueSM" />
                    <BalloonSelector v-bind="args" size="sm" placeholder="40px height" v-model="valueSM" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="args" :options="placementOptions" placeholder="48px height" v-model="valueMD" />
                    <BalloonSelector v-bind="args" placeholder="48px height" v-model="valueMD" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="args" :options="placementOptions" size="lg" placeholder="56px height" v-model="valueLG" />
                    <BalloonSelector v-bind="args" size="lg" placeholder="56px height" v-model="valueLG" />
                </div>
            </div>
        `
    })
};

/**
 * The `condensed` property applies the condensed stylings, as available on many other form control
 * components. 
 */
export const Condensed: Story = {
    args: {
        condensed: true
    },
    render: (args: any) => ({
        components: { BalloonSelector },
        setup() {
            const valueSM = ref();
            const valueMD = ref();
            const valueLG = ref();

            const placementOptions: any = [
                {
                    value: 'align-left',
                    label: 'Align Left',
                    icon: AlignLeft,
                    placement: 'icon'
                },
                {
                    value: 'align-center',
                    label: 'Align Center',
                    icon: AlignCenter,
                    placement: 'icon'
                },
                {
                    value: 'align-right',
                    label: 'Align Right',
                    icon: AlignRight,
                    placement: 'icon'
                }
            ];

            return { args, placementOptions, valueSM, valueMD, valueLG };
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="args" :options="placementOptions" connected size="sm" placeholder="40px height" v-model="valueSM" />
                    <BalloonSelector v-bind="args" size="sm" placeholder="40px height" v-model="valueSM" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="args" :options="placementOptions" connected placeholder="48px height" v-model="valueMD" />
                    <BalloonSelector v-bind="args" placeholder="48px height" v-model="valueMD" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="args" :options="placementOptions" connected size="lg" placeholder="56px height" v-model="valueLG" />
                    <BalloonSelector v-bind="args" size="lg" placeholder="56px height" v-model="valueLG" />
                </div>
            </div>
        `
    })
};

/**
 * The general, shared states `disabled`, `invalid` and `valid` are supported as well. Keep in mind,
 * that you can also disable single options itself.
 */
export const States: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { BalloonSelector },
        setup() {
            const valueNormal = ref<string>();
            const valueSelected = ref<string>('a');
            const valueDisabled = ref<string>();
            const valueDisabledSelected = ref<string>('a');
            const valueValid = ref<string>();
            const valueValidSelected = ref<string>('a');
            const valueInvalid = ref<string>();
            const valueInvalidSelected = ref<string>('a');
            return { 
                args,
                valueNormal,
                valueSelected,
                valueDisabled,
                valueDisabledSelected,
                valueValid,
                valueValidSelected,
                valueInvalid,
                valueInvalidSelected,
            };
        },
        template: `
            <div class="flex flex-col gap-4 flex-1">
                <div class="flex flex-row gap-4 flex-1 items-center">
                    <div class="basis-36">Default</div>
                    <BalloonSelector v-bind="args" v-model="valueNormal" />
                </div>
                <div class="flex flex-row gap-4 flex-1 items-center">
                    <div class="basis-36">Selected</div>
                    <BalloonSelector v-bind="args" v-model="valueSelected" />
                </div>
                <div class="flex flex-row gap-4 flex-1 items-center">
                    <div class="basis-36">Disabled</div>
                    <BalloonSelector v-bind="args" disabled v-model="valueDisabled" />
                </div>
                <div class="flex flex-row gap-4 flex-1 items-center">
                    <div class="basis-36">Disabled Selected</div>
                    <BalloonSelector v-bind="args" disabled v-model="valueDisabledSelected" />
                </div>
                <div class="flex flex-row gap-4 flex-1 items-center">
                    <div class="basis-36">Valid</div>
                    <BalloonSelector v-bind="args" validation="valid" v-model="valueValid" />
                </div>
                <div class="flex flex-row gap-4 flex-1 items-center">
                    <div class="basis-36">Valid Selected</div>
                    <BalloonSelector v-bind="args" validation="valid" v-model="valueValidSelected" />
                </div>
                <div class="flex flex-row gap-4 flex-1 items-center">
                    <div class="basis-36">Invalid</div>
                    <BalloonSelector v-bind="args" validation="invalid" v-model="valueInvalid" />
                </div>
                <div class="flex flex-row gap-4 flex-1 items-center">
                    <div class="basis-36">Invalid Selected</div>
                    <BalloonSelector v-bind="args" validation="invalid" v-model="valueInvalidSelected" />
                </div>
            </div>
        `
    })
};
