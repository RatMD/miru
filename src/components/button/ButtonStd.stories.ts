import type { Meta, StoryObj } from '@storybook/vue3';
import { markRaw, type Component } from 'vue';

import { Check } from 'lucide-vue-next';
import ButtonStd from './ButtonStd.vue';

/**
 * The standard set of buttons for your website or application. The button bellow supports different 
 * colors and sizes, all browser-native states including an additional `loading` one as well as a 
 * general icon and label handling. However, compared to other Vue Frameworks, you aren't able to 
 * push content using a Slot, everything is done using properties only.
 */
const meta = {
    title: 'Components/Buttons/Button',
    component: ButtonStd,
    tags: ['autodocs'],
    argTypes: {
        color: { control: 'select', options: [null, 'primary', 'secondary', 'danger', 'warning', 'success', 'info'] },
        label: { control: 'text' },
        icon: { control: 'object' },
        iconLoading: { control: 'object' },
        iconProps: { control: 'object' },
        iconPlacement: { control: 'select', options: ['left', 'right', 'icon'] },
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
        type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
        title: { control: 'text' },
        fullwidth: { control: 'boolean' },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' }
    },
    args: {
    },
} satisfies Meta<typeof ButtonStd>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Shared Color Renderer
 * @param args 
 * @returns 
 */
const sharedColorRenderer = (args: any) => ({
    components: { ButtonStd, Check },
    setup() {
        return { args };
    },
    template: `
        <div class="flex flex-col gap-2">
            <div class="flex gap-2">
                <ButtonStd v-bind="args" size="sm" :label="null" />
                <ButtonStd v-bind="args" :icon="null" size="sm" />
                <ButtonStd v-bind="args" :icon="null" size="sm" disabled />
                <ButtonStd v-bind="args" size="sm" loading />
            </div>
            <div class="flex gap-2">
                <ButtonStd v-bind="args" :label="null" />
                <ButtonStd v-bind="args" :icon="null" />
                <ButtonStd v-bind="args" :icon="null" disabled />
                <ButtonStd v-bind="args" loading />
            </div>
            <div class="flex gap-2">
                <ButtonStd v-bind="args" size="lg" :label="null" />
                <ButtonStd v-bind="args" :icon="null" size="lg" />
                <ButtonStd v-bind="args" :icon="null" size="lg" disabled />
                <ButtonStd v-bind="args" size="lg" loading />
            </div>
        </div>
    `
});

/**
 * The default, primary button variation.
 */
export const Default: Story = {
    args: {
        color: 'primary',
        label: 'Button',
    },
};

/**
 * The black/white colored default button set.
 */
export const DefaultSet: Story = {
    args: {
        label: 'Default Button',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The indigo-coloured primary button set.
 */
export const PrimarySet: Story = {
    args: {
        label: 'Primary Button',
        color: 'primary',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The bordered secondary button set.
 */
export const SecondarySet: Story = {
    args: {
        label: 'Secondary Button',
        color: 'secondary',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The red-coloured danger button set.
 */
export const DangerSet: Story = {
    args: {
        label: 'Danger Button',
        color: 'danger',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The amber-coloured warning button set.
 */
export const WarningSet: Story = {
    args: {
        label: 'Warning Button',
        color: 'warning',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The emerald-coloured success button set.
 */
export const SuccessSet: Story = {
    args: {
        label: 'Success Button',
        color: 'success',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The sky-coloured info button set.
 */
export const InfoSet: Story = {
    args: {
        label: 'Info Button',
        color: 'info',
        icon: Check,
    },
    render: sharedColorRenderer
};
