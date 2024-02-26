import type { Meta, StoryObj } from '@storybook/vue3';

import { Info } from 'lucide-vue-next';
import BadgeStd from './BadgeStd.vue';

/**
 * Our **BadgeStd** component offers enough space to elegantly present small pieces of information,
 * such as counters, without taking too much focus away from the content itself. If you are looking 
 * for bootstrap-familiar overlaying (counter) badge, usable on top of other elements, then take a 
 * look at the **SlimBadge** component instead.
 */
const meta = {
    title: 'Components/Badges/Badge',
    component: BadgeStd,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: [null, 'primary', 'secondary', 'success', 'warning', 'danger', 'info']
        },
        label: {
            control: 'text'
        },
        icon: {
            control: 'object'
        },
        iconProps: {
            control: 'object'
        },
        iconPlacement: {
            control: 'radio',
            options: ['left', 'right', 'icon']
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg']
        },
        dot: {
            control: 'boolean'
        },
    },
    args: {
        iconPlacement: 'left',
        size: 'md',
    },
} satisfies Meta<typeof BadgeStd>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        label: 'Badge'
    },
};

/**
 * Default Variant
 */
export const Variants: Story = {
    args: {
        label: 'Badge'
    },
    render: (args: any) => ({
        components: { BadgeStd },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <BadgeStd v-bind="args" size="sm" />
                    <BadgeStd v-bind="args" size="sm" color="primary" />
                    <BadgeStd v-bind="args" size="sm" color="secondary" />
                    <BadgeStd v-bind="args" size="sm" color="success" />
                    <BadgeStd v-bind="args" size="sm" color="warning" />
                    <BadgeStd v-bind="args" size="sm" color="danger" />
                    <BadgeStd v-bind="args" size="sm" color="info" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd v-bind="args" />
                    <BadgeStd v-bind="args" color="primary" />
                    <BadgeStd v-bind="args" color="secondary" />
                    <BadgeStd v-bind="args" color="success" />
                    <BadgeStd v-bind="args" color="warning" />
                    <BadgeStd v-bind="args" color="danger" />
                    <BadgeStd v-bind="args" color="info" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd v-bind="args" size="lg" />
                    <BadgeStd v-bind="args" size="lg" color="primary" />
                    <BadgeStd v-bind="args" size="lg" color="secondary" />
                    <BadgeStd v-bind="args" size="lg" color="success" />
                    <BadgeStd v-bind="args" size="lg" color="warning" />
                    <BadgeStd v-bind="args" size="lg" color="danger" />
                    <BadgeStd v-bind="args" size="lg" color="info" />
                </div>
            </div>
        `
    })
};

/**
 * Icons
 */
export const DotIcon: Story = {
    name: 'Dots and Icons sizes',
    args: {
        label: 'Badge',
        icon: Info
    },
    render: (args: any) => ({
        components: { BadgeStd, Info },
        setup() {
            return { args };
        },
        template: `
        <div class="flex flex-col gap-2">
            <div class="flex gap-2">
                <BadgeStd v-bind="args" size="sm" dot />
                <BadgeStd v-bind="args" size="sm" icon-placement="icon" dot />
                <BadgeStd v-bind="args" size="sm" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" size="sm" />
                <BadgeStd v-bind="args" size="sm" icon-placement="icon" />
                <BadgeStd v-bind="args" size="sm" icon-placement="right" />
            </div>
            <div class="flex gap-2">
                <BadgeStd v-bind="args" dot />
                <BadgeStd v-bind="args" icon-placement="icon" dot />
                <BadgeStd v-bind="args" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" />
                <BadgeStd v-bind="args" icon-placement="icon" />
                <BadgeStd v-bind="args" icon-placement="right" />
            </div>
            <div class="flex gap-2">
                <BadgeStd v-bind="args" size="lg" dot />
                <BadgeStd v-bind="args" size="lg" icon-placement="icon" dot />
                <BadgeStd v-bind="args" size="lg" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" size="lg" dot />
                <BadgeStd v-bind="args" size="lg" icon-placement="icon" />
                <BadgeStd v-bind="args" size="lg" icon-placement="right" />
            </div>
        </div>
        `
    })
};


/**
 * DotIconVariants
 */
export const DotIconVariants: Story = {
    name: 'Dots and Icons colors',
    args: {
        label: 'Badge',
        icon: Info
    },
    render: (args: any) => ({
        components: { BadgeStd, Info },
        setup() {
            return { args };
        },
        template: `
        <div class="flex flex-col gap-2">
            <div class="flex gap-2">
                <BadgeStd v-bind="args" :icon="null" dot />
                <BadgeStd v-bind="args" :icon="null" icon-placement="icon" dot />
                <BadgeStd v-bind="args" :icon="null" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" />
                <BadgeStd v-bind="args" icon-placement="icon" />
                <BadgeStd v-bind="args" icon-placement="right" />
            </div>
            <div class="flex gap-2">
                <BadgeStd v-bind="args" :icon="null" color="primary" dot />
                <BadgeStd v-bind="args" :icon="null" color="primary" icon-placement="icon" dot />
                <BadgeStd v-bind="args" :icon="null" color="primary" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" color="primary" />
                <BadgeStd v-bind="args" color="primary" icon-placement="icon" />
                <BadgeStd v-bind="args" color="primary" icon-placement="right" />
            </div>
            <div class="flex gap-2">
                <BadgeStd v-bind="args" :icon="null" color="secondary" dot />
                <BadgeStd v-bind="args" :icon="null" color="secondary" icon-placement="icon" dot />
                <BadgeStd v-bind="args" :icon="null" color="secondary" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" color="secondary" />
                <BadgeStd v-bind="args" color="secondary" icon-placement="icon" />
                <BadgeStd v-bind="args" color="secondary" icon-placement="right" />
            </div>
            <div class="flex gap-2">
                <BadgeStd v-bind="args" :icon="null" color="success" dot />
                <BadgeStd v-bind="args" :icon="null" color="success" icon-placement="icon" dot />
                <BadgeStd v-bind="args" :icon="null" color="success" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" color="success" />
                <BadgeStd v-bind="args" color="success" icon-placement="icon" />
                <BadgeStd v-bind="args" color="success" icon-placement="right" />
            </div>
            <div class="flex gap-2">
                <BadgeStd v-bind="args" :icon="null" color="warning" dot />
                <BadgeStd v-bind="args" :icon="null" color="warning" icon-placement="icon" dot />
                <BadgeStd v-bind="args" :icon="null" color="warning" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" color="warning" />
                <BadgeStd v-bind="args" color="warning" icon-placement="icon" />
                <BadgeStd v-bind="args" color="warning" icon-placement="right" />
            </div>
            <div class="flex gap-2">
                <BadgeStd v-bind="args" :icon="null" color="danger" dot />
                <BadgeStd v-bind="args" :icon="null" color="danger" icon-placement="icon" dot />
                <BadgeStd v-bind="args" :icon="null" color="danger" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" color="danger" />
                <BadgeStd v-bind="args" color="danger" icon-placement="icon" />
                <BadgeStd v-bind="args" color="danger" icon-placement="right" />
            </div>
            <div class="flex gap-2">
                <BadgeStd v-bind="args" :icon="null" color="info" dot />
                <BadgeStd v-bind="args" :icon="null" color="info" icon-placement="icon" dot />
                <BadgeStd v-bind="args" :icon="null" color="info" icon-placement="right" dot />
                <span class="mx-4"></span>
                <BadgeStd v-bind="args" color="info" />
                <BadgeStd v-bind="args" color="info" icon-placement="icon" />
                <BadgeStd v-bind="args" color="info" icon-placement="right" />
            </div>
        </div>
        `
    })
};
