import type { Meta, StoryObj } from '@storybook/vue3';

import ButtonStd from '../button/ButtonStd.vue';
import ButtonGroup from './ButtonGroup.vue';

/**
 * The ButtonGroup component can be used to stylistically connect several related action buttons. 
 * At the moment, only the default [ButtonStd](/docs/components-buttons-button--docs) component is 
 * supported.
 */
const meta = {
    title: 'Form/Groups/ButtonGroup',
    component: ButtonGroup,
    tags: ['autodocs'],
    argTypes: {
        align: {
            control: 'radio',
            options: [null, 'left', 'center', 'right']
        },
        size: {
            control: 'radio',
            options: [null, 'sm', 'md', 'lg']
        },
        manually: {
            control: 'boolean'
        },
        vertical: {
            control: 'boolean'
        }
    },
    args: {
        
    },
} satisfies Meta<typeof ButtonGroup>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * The default variant of the ButtonGroup component is automatically laid out horizontally and 
 * right-aligned.
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: {  ButtonGroup, ButtonStd },
        setup() {
            return { args };
        },
        template: `
            <ButtonGroup v-bind="args">
                <ButtonStd label="Secondary Action" color="secondary" />
                <ButtonStd label="Primary Action" color="primary" />
            </ButtonGroup>
        `
    })
};

/**
 * Of course, you can pass as much or less buttons as you'd like.
 */
export const Variable: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: {  ButtonGroup, ButtonStd },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-4">     
                <ButtonGroup v-bind="args">
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Another Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
                <ButtonGroup v-bind="args">
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
            </div>
        `
    })
};

/**
 * The alignment can be changed using the `align` property. This works only on the horizontal 
 * variant of the ButtonGroup component, achieving the same on the vertical one should be done with 
 * an additional parent container, as done below.
 */
export const Alignment: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: {  ButtonGroup, ButtonStd },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-4">        
                <ButtonGroup v-bind="args" align="left">
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
                <ButtonGroup v-bind="args" align="center">
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
                <ButtonGroup v-bind="args" align="right">
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
            </div>
        `
    })
};

/**
 * With the `size` property you can additionally change the gap between the individual buttons. Of 
 * course, this option has no effect on the button size itself, which must still be set manually.
 */
export const Sizes: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: {  ButtonGroup, ButtonStd },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-4">
                <ButtonGroup v-bind="args" size="sm">
                    <ButtonStd label="Secondary Action" color="secondary" size="sm" />
                    <ButtonStd label="Primary Action" color="primary" size="sm" />
                </ButtonGroup>
                <ButtonGroup v-bind="args" size="md">
                    <ButtonStd label="Secondary Action" color="secondary" size="md" />
                    <ButtonStd label="Primary Action" color="primary" size="md" />
                </ButtonGroup>
                <ButtonGroup v-bind="args" size="lg">
                    <ButtonStd label="Secondary Action" color="secondary" size="lg" />
                    <ButtonStd label="Primary Action" color="primary" size="lg" />
                </ButtonGroup>
            </div>
        `
    })
};

/**
 * With the `vertical` property, the buttons are shown below each other instead of next to each. 
 * This can be used for the different responsive behaviors. Note that the button group still uses 
 * the full width, an parent content may be required to restricts this (as used below).
 */
export const Vertical: Story = {
    args: {
        vertical: true
    },
    render: (args: any) => ({
        components: {  ButtonGroup, ButtonStd },
        setup() {
            return { args };
        },
        template: `
            <div class="max-w-sm">
                <ButtonGroup v-bind="args">
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Another Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
            </div>
        `
    })
};

/**
 * The `manually` property is used to manually check the individual buttons itself. Those that are 
 * provided with the additional `btn-ungrouped` class are ignored (The border radius is not removed). 
 * Theoretically, this class can be used on any button within the group, but it only really makes 
 * sense at the beginning and end.
 */
export const Manually: Story = {
    args: {
        manually: true,
    },
    render: (args: any) => ({
        components: { ButtonGroup, ButtonStd },
        setup() {
            return { args };
        },
        template: `
            <ButtonGroup v-bind="args" align="center">
                <ButtonStd label="Ungrouped Action" color="secondary" class="btn-ungrouped" />
                <ButtonStd label="Secondary Action" color="secondary" />
                <ButtonStd label="Another Action" color="secondary" />
                <ButtonStd label="Primary Action" color="primary" />
            </ButtonGroup>
            
            <div class="max-w-sm mt-8 mx-auto">
                <ButtonGroup v-bind="args" vertical>
                    <ButtonStd label="Ungrouped Action" color="secondary" />
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Another Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" class="btn-ungrouped" />
                </ButtonGroup>
            </div>
        `
    })
};
