import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect } from 'storybook/test';
import { avatarApiCopy } from '../../stories/avatar-documentation';
import { AvatarStackDocs } from '../../stories/AvatarStackDocs';
import { componentDescription } from '../../stories/component-descriptions';
import { Avatar, AvatarFallback, AvatarImage, AvatarStack } from './index';

const names = [
    'Ada Lovelace',
    'Grace Hopper',
    'Alan Turing',
    'Margaret Hamilton',
    'Linus Torvalds',
];
const initials = ['AL', 'GH', 'AT', 'MH', 'LT'];
const tones = ['primary', 'success', 'info', 'warning', 'secondary'];

const meta = {
    title: 'Components/AvatarStack',
    component: AvatarStack,
    args: { size: 'lg', shape: 'round', overlap: 0.25, max: 3, label: 'Project team' },
    argTypes: {
        size: { control: 'select', options: ['xs', 'sm', 'default', 'lg', 'xl'] },
        shape: { control: 'select', options: ['round', 'square', 'squircle', 'hexagon'] },
        overlap: {
            control: { type: 'range', min: 0, max: 0.75, step: 0.05 },
            description:
                'Overlap as a fraction of avatar size: 0 = none, .5 = half. Presets sm/default/lg also work.',
        },
        max: { control: { type: 'number', min: 0, step: 1 } },
        label: { control: 'text' },
    },
    parameters: {
        docs: {
            page: AvatarStackDocs,
            description: { component: componentDescription('AvatarStack') },
        },
    },
    render: (args) => ({
        components: { Avatar, AvatarFallback, AvatarStack },
        setup: () => ({ args, names, initials, tones }),
        template: `<AvatarStack v-bind="args">
            <Avatar v-for="(name, index) in names" :key="name" :aria-label="name" :tone="tones[index]">
                <AvatarFallback>{{ initials[index] }}</AvatarFallback>
            </Avatar>
        </AvatarStack>`,
    }),
} satisfies Meta;

for (const [name, description] of Object.entries(avatarApiCopy.AvatarStack.props ?? {})) {
    const controls = meta.argTypes as Record<string, object>;
    controls[name] = {
        ...controls[name],
        description,
        ...(name === 'class' ? { control: 'text' } : {}),
        table: { category: 'AvatarStack props' },
    };
}
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const stack = canvasElement.querySelector('[data-slot="avatar-stack"]')!;
        const items = stack.querySelectorAll('[data-slot="avatar-stack-item"]');
        await expect(items).toHaveLength(3);
        await expect(stack.querySelector('[data-slot="avatar-stack-overflow"]')).toHaveTextContent(
            '+2',
        );
        const first = items[0]!.getBoundingClientRect();
        const second = items[1]!.getBoundingClientRect();
        await expect(second.left).toBeLessThan(first.right);
        await expect(second.left).toBeGreaterThan(first.left);
    },
};

export const AllAvatars: Story = { args: { max: undefined } };
export const Squircle: Story = { args: { shape: 'squircle' } };
export const Hexagon: Story = {
    args: { shape: 'hexagon' },
    play: async ({ canvasElement }) => {
        const avatar = canvasElement.querySelector('[data-slot="avatar"]')!;
        await expect(avatar).toHaveAttribute('data-shape', 'hexagon');
        await expect(getComputedStyle(avatar).maskImage).toContain('data:image/svg+xml');
        await expect(
            canvasElement.querySelector('[data-slot="avatar-stack-overflow"]'),
        ).toHaveTextContent('+2');
    },
};
export const OverflowOnly: Story = { args: { max: 0 } };
export const RightToLeft: Story = {
    decorators: [() => ({ template: '<div dir="rtl"><story /></div>' })],
    play: async ({ canvasElement }) => {
        const items = canvasElement.querySelectorAll('[data-slot="avatar-stack-item"]');
        const first = items[0]!.getBoundingClientRect();
        const second = items[1]!.getBoundingClientRect();
        await expect(second.right).toBeGreaterThan(first.left);
        await expect(second.right).toBeLessThan(first.right);
    },
};

export const ImagesAndCustomOverflow: Story = {
    render: (args) => ({
        components: { Avatar, AvatarFallback, AvatarImage, AvatarStack },
        setup: () => ({
            args,
            names,
            initials,
            portrait:
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23c7d2fe'/%3E%3Ccircle cx='50' cy='38' r='20' fill='%234338ca'/%3E%3Cpath d='M10 100a40 40 0 0 1 80 0' fill='%234338ca'/%3E%3C/svg%3E",
        }),
        template: `<AvatarStack v-bind="args">
            <Avatar v-for="(name, index) in names" :key="name" :aria-label="name">
                <AvatarImage :src="portrait" :alt="name" />
                <AvatarFallback>{{ initials[index] }}</AvatarFallback>
            </Avatar>
            <template #overflow="{ count }"><span :aria-label="count + ' more members'">+{{ count }}</span></template>
        </AvatarStack>`,
    }),
};

export const AllShapes: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Avatar, AvatarFallback, AvatarStack },
        setup: () => ({ names, initials, tones }),
        template: `<div class="grid gap-8 p-4">
            <div v-for="shape in ['round', 'square', 'squircle', 'hexagon']" :key="shape" class="grid gap-2">
                <span class="text-sm text-muted-foreground">{{ shape }}</span>
                <AvatarStack size="xl" :shape="shape" :max="3" :label="shape + ' team'">
                    <Avatar v-for="(name, index) in names" :key="name" :aria-label="name" :tone="tones[index]">
                        <AvatarFallback>{{ initials[index] }}</AvatarFallback>
                    </Avatar>
                </AvatarStack>
            </div>
        </div>`,
    }),
};

export const TransparentCutouts: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Avatar, AvatarFallback, AvatarStack },
        setup: () => ({ names, initials, tones }),
        template: `<div class="grid gap-4">
            <div v-for="background in ['#f88379', 'linear-gradient(110deg, #4f46e5, #ec4899, #f59e0b)']" :key="background" :style="{ background }" class="grid gap-5 rounded-xl p-8">
                <AvatarStack v-for="shape in ['round', 'square', 'squircle', 'hexagon']" :key="shape" size="lg" :shape="shape" :max="3" :label="shape + ' team'">
                    <Avatar v-for="(name, index) in names" :key="name" :aria-label="name" :tone="tones[index]">
                        <AvatarFallback>{{ initials[index] }}</AvatarFallback>
                    </Avatar>
                </AvatarStack>
            </div>
        </div>`,
    }),
    play: async ({ canvasElement }) => {
        const items = canvasElement.querySelectorAll('[data-slot="avatar-stack-item"]');
        await expect(items).toHaveLength(24);
        for (const item of items) {
            const style = getComputedStyle(item);
            if (item.getAttribute('data-cutout-shape') === 'square') {
                await expect(style.maskImage).toContain('linear-gradient');
                await expect(style.maskComposite).toMatch(/^subtract/);
            } else {
                await expect(style.maskImage).toContain('data:image/svg+xml');
            }
            await expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
            await expect(style.paddingTop).toBe('0px');
            await expect(style.borderTopWidth).toBe('0px');
        }
    },
};

export const SquareRadiiAndSizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Avatar, AvatarFallback, AvatarStack },
        setup: () => ({ names, initials, tones }),
        template: `<div class="grid gap-4">
            <div v-for="radius in ['0px', '8px', '16px']" :key="radius" :style="{ '--ui-radius': radius, background: 'linear-gradient(110deg, #f88379, #f7bb83)' }" class="grid gap-4 rounded-xl p-6">
                <AvatarStack v-for="size in ['default', 'lg', 'xl']" :key="size" :size="size" shape="square" :max="3" :label="size + ' team'">
                    <Avatar v-for="(name, index) in names" :key="name" :aria-label="name" :tone="tones[index]">
                        <AvatarFallback>{{ initials[index] }}</AvatarFallback>
                    </Avatar>
                </AvatarStack>
                <div dir="rtl">
                    <AvatarStack shape="square" size="lg" :max="3" label="RTL team">
                        <Avatar v-for="(name, index) in names" :key="name" :aria-label="name" :tone="tones[index]">
                            <AvatarFallback>{{ initials[index] }}</AvatarFallback>
                        </Avatar>
                    </AvatarStack>
                </div>
            </div>
        </div>`,
    }),
    play: async ({ canvasElement }) => {
        const items = canvasElement.querySelectorAll('[data-slot="avatar-stack-item"]');
        await expect(items).toHaveLength(36);
        for (const item of items) {
            const style = getComputedStyle(item);
            await expect(style.maskComposite).toMatch(/^subtract/);
            await expect(style.getPropertyValue('--cutout-gap').trim()).toBe('4px');
        }
    },
};

export const Density: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Avatar, AvatarFallback, AvatarStack },
        setup: () => ({ names, initials, tones }),
        template: `<div class="grid gap-5">
            <div v-for="overlap in [0, .15, .25, .4, .6]" :key="overlap" class="grid justify-items-start gap-2">
                <span class="text-sm text-muted-foreground">overlap: {{ overlap }} ({{ Math.round(overlap * 100) }}%)</span>
                <AvatarStack size="lg" :overlap="overlap" :max="3" label="Project team">
                    <Avatar v-for="(name, index) in names" :key="name" :aria-label="name" :tone="tones[index]">
                        <AvatarFallback>{{ initials[index] }}</AvatarFallback>
                    </Avatar>
                </AvatarStack>
            </div>
        </div>`,
    }),
    play: async ({ canvasElement }) => {
        const ratios = [0, 0.15, 0.25, 0.4, 0.6];
        const stacks = canvasElement.querySelectorAll('[data-slot="avatar-stack"]');
        await expect(stacks).toHaveLength(ratios.length);
        for (const [index, stack] of Array.from(stacks).entries()) {
            const size = stack.querySelector('[data-slot="avatar"]')!.getBoundingClientRect().width;
            await expect(stack.getBoundingClientRect().width).toBeCloseTo(
                size * (4 - 3 * ratios[index]!),
                0,
            );
        }
    },
};
