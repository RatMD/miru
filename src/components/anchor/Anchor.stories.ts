import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import { defineComponent, h, ref } from 'vue';
import { anchorApiCopy } from '../../stories/anchor-documentation';
import { AnchorDocs } from '../../stories/AnchorDocs';
import { componentDescription } from '../../stories/component-descriptions';
import { inlineColorVariants } from '../inline-variants';
import { Anchor } from './index';

const meta = {
    title: 'Components/Anchor',
    component: Anchor,
    parameters: {
        controls: {
            include: Object.keys(anchorApiCopy.Anchor.props).filter((name) => name !== 'asChild'),
        },
        docs: {
            page: AnchorDocs,
            description: { component: componentDescription('Anchor') },
        },
    },
    args: {
        href: '#example',
        variant: 'primary',
        underline: 'hover',
        animation: 'fade',
        disabled: false,
        external: false,
    },
    // Use the same short descriptions in controls and the extracted API reference.
    argTypes: Object.fromEntries(
        Object.entries(anchorApiCopy.Anchor.props).map(([name, description]) => [
            name,
            {
                description,
                table: { category: 'Anchor props' },
                ...(['href', 'target', 'rel', 'class'].includes(name) ? { control: 'text' } : {}),
                ...(name === 'variant' ? { control: 'select', options: inlineColorVariants } : {}),
                ...(name === 'underline'
                    ? { control: 'select', options: ['none', 'hover', 'always'] }
                    : {}),
                ...(name === 'animation' ? { control: 'select', options: ['fade', 'slide'] } : {}),
                ...(['asChild', 'disabled', 'external'].includes(name)
                    ? { control: 'boolean' }
                    : {}),
            },
        ]),
    ),
    render: (args) => ({
        components: { Anchor },
        setup: () => ({ args }),
        template:
            '<p>Continue to <Anchor v-bind="args" @click.prevent>your workspace</Anchor>.</p>',
    }),
} satisfies Meta;
export default meta;
export const Default: StoryObj = {};
export const Variants: StoryObj = {
    render: () => ({
        components: { Anchor },
        setup: () => ({ variants: inlineColorVariants }),
        template:
            '<div class="flex flex-wrap gap-5"><Anchor v-for="variant in variants" :key="variant" href="#example" :variant="variant" underline="always" @click.prevent>{{ variant }}</Anchor></div>',
    }),
};
export const Slide: StoryObj = { args: { animation: 'slide' } };
export const AlwaysUnderlined: StoryObj = { args: { underline: 'always' } };
export const WithoutUnderline: StoryObj = { args: { underline: 'none' } };
export const Disabled: StoryObj = { args: { disabled: true } };
export const NewTab: StoryObj = { args: { href: 'https://miru.at', target: '_blank' } };
export const AsChild: StoryObj = {
    render: () => ({
        components: { Anchor },
        setup: () => ({ clicks: ref(0) }),
        template:
            '<div><Anchor as-child disabled><a href="#blocked" @click="clicks++">Disabled router adapter</a></Anchor><output data-testid="clicks">{{ clicks }}</output></div>',
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('link'));
        await expect(canvas.getByTestId('clicks')).toHaveTextContent('0');
    },
};

export const External: StoryObj = { args: { external: true, href: 'https://miru.at' } };
export const AsChildExternal: StoryObj = {
    render: () => ({
        components: { Anchor },
        template:
            '<Anchor as-child external target="_blank"><a href="https://miru.at">External adapter</a></Anchor>',
    }),
    play: async ({ canvasElement }) => {
        const link = within(canvasElement).getByRole('link');
        await expect(link.querySelector('[data-slot="anchor-external-icon"]')).not.toBeNull();
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    },
};

export const RouterAdapterExternal: StoryObj = {
    render: () => ({
        components: {
            Anchor,
            RouterAdapter: defineComponent({
                setup:
                    (_, { slots }) =>
                    () =>
                        h('a', slots.default?.()),
            }),
        },
        template:
            '<Anchor as-child external href="https://miru.at" target="_blank"><RouterAdapter>External router destination</RouterAdapter></Anchor>',
    }),
    play: async ({ canvasElement }) => {
        const link = within(canvasElement).getByRole('link');
        await expect(link.querySelector('[data-slot="anchor-external-icon"]')).not.toBeNull();
        await expect(link).toHaveAttribute('href', 'https://miru.at');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    },
};
