import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IconBell, IconMail, IconCheck } from '@tabler/icons-vue';
import { expect } from 'storybook/test';
import { ComponentDocs } from '../../stories/ComponentDocs';
import {
    indicatorSummary,
    indicatorApiCopy,
    indicatorDependencyMarkdown,
} from '../../stories/indicator-documentation';
import IndicatorDemo from '../../stories/IndicatorDemo.vue';
import { Avatar, AvatarFallback } from '../avatar';
import { Badge } from '../badge';
import { ButtonAction } from '../button-action';
import { ButtonShadow } from '../button-shadow';
import { Indicator, indicatorColors, indicatorPositions } from './index';
const meta: Meta = {
    title: 'Components/Indicator',
    component: Indicator,
    parameters: {
        layout: 'padded',
        docs: {
            page: ComponentDocs,
            description: {
                component: indicatorSummary + '\n\n' + indicatorDependencyMarkdown(true),
            },
        },
    },
    args: {
        kind: 'count',
        value: 5,
        text: 'New',
        withIcon: false,
        color: 'danger',
        size: 'default',
        overlay: true,
        position: 'top-right',
        offsetX: 0,
        offsetY: 0,
        visible: true,
        pulse: false,
        ping: false,
        max: 99,
        showZero: true,
        ariaLabel: '',
        announce: false,
        cutout: true,
        cutoutGap: 2,
    },
    argTypes: {
        kind: {
            control: 'select',
            options: ['dot', 'count', 'text', 'icon'],
            description: 'Preview content; actual API uses value, icon or the indicator slot.',
        },
        value: { control: 'number' },
        text: { control: 'text', description: 'Text preview passed through value.' },
        withIcon: { control: 'boolean', description: 'Add a Tabler icon to the preview.' },
        color: { control: 'text' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        overlay: { control: 'boolean' },
        position: { control: 'select', options: indicatorPositions },
        offsetX: { control: 'number' },
        offsetY: { control: 'number' },
        visible: { control: 'boolean' },
        pulse: { control: 'boolean' },
        ping: { control: 'boolean' },
        cutout: { control: 'boolean' },
        cutoutGap: { control: { type: 'number', min: 0, max: 12 } },
        foreground: { control: 'text' },
        max: { control: 'number' },
        showZero: { control: 'boolean' },
        ariaLabel: { control: 'text' },
        announce: { control: 'boolean' },
    },
    render: (args, { globals }) => ({
        components: { IndicatorDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<IndicatorDemo :args="args" :locale="locale" />',
    }),
};
for (const [name, control] of Object.entries(meta.argTypes ?? {})) {
    const copy =
        indicatorApiCopy.Indicator.props[name as keyof typeof indicatorApiCopy.Indicator.props];
    if (control && copy) control.description = copy;
}
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
type Story = StoryObj;
export const Default: Story = {};
export const Dot: Story = { args: { kind: 'dot', overlay: false, color: 'success' } };
export const TransparentCutout: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Indicator, Avatar, AvatarFallback, ButtonShadow, IconBell },
        template: `<div class="flex flex-wrap items-center gap-12 rounded-xl border border-border p-10" style="background: linear-gradient(120deg, var(--ui-muted), var(--ui-background) 50%, var(--ui-primary-100))"><Indicator overlay position="top-center" color="success" :cutout-gap="3"><Avatar><AvatarFallback>AM</AvatarFallback></Avatar></Indicator><Indicator overlay position="center-right" value="New" color="warning"><Avatar><AvatarFallback>AM</AvatarFallback></Avatar></Indicator><Indicator overlay :value="5" color="danger"><ButtonShadow variant="primary" label="Notifications"><IconBell /></ButtonShadow></Indicator></div>`,
    }),
    play: async ({ canvasElement }) => {
        for (const target of canvasElement.querySelectorAll<HTMLElement>(
            '[data-slot="indicator-target"]',
        ))
            await expect(getComputedStyle(target).maskImage).not.toBe('none');
        for (const bubble of canvasElement.querySelectorAll<HTMLElement>(
            '[data-slot="indicator-bubble"]',
        ))
            await expect(getComputedStyle(bubble).borderTopWidth).toBe('0px');
    },
};
export const WithoutCutout: Story = {
    args: { cutout: false },
    play: async ({ canvasElement }) => {
        await expect(
            getComputedStyle(canvasElement.querySelector('[data-slot="indicator-target"]')!)
                .maskImage,
        ).toBe('none');
    },
};
export const Count: Story = {
    args: { value: 120, max: 99, ariaLabel: '120 unread messages' },
    play: async ({ canvasElement }) => {
        const bubble = canvasElement.querySelector('[data-slot="indicator-bubble"]')!;
        await expect(bubble).toHaveTextContent('99+');
        await expect(bubble).toHaveAttribute('aria-label', '120 unread messages');
        await expect(bubble).not.toHaveAttribute('aria-hidden', 'true');
    },
};
export const Text: Story = { args: { kind: 'text', text: 'New', color: 'warning' } };
export const Icon: Story = { args: { kind: 'icon', color: 'primary', ariaLabel: 'Verified' } };
export const IconAndText: Story = {
    args: { kind: 'text', text: '1 message', withIcon: true, color: 'info' },
};
export const Pulse: Story = { args: { kind: 'dot', pulse: true, color: 'success' } };
export const Ping: Story = {
    args: { kind: 'dot', ping: true, color: 'danger' },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('[data-slot="indicator-ping"]')).toHaveClass(
            'animate-ping',
        );
        await expect(
            getComputedStyle(canvasElement.querySelector('[data-slot="indicator-fill"]')!)
                .animationName,
        ).toBe('none');
        await expect(
            getComputedStyle(canvasElement.querySelector('[data-slot="indicator-bubble"]')!)
                .borderTopWidth,
        ).toBe('0px');
    },
};
export const Positions: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Indicator, Avatar, AvatarFallback },
        setup: () => ({ positions: indicatorPositions }),
        template:
            '<div class="grid max-w-xl grid-cols-3 gap-8 p-6"><div v-for="position in positions" :key="position" class="grid justify-items-center gap-3"><Indicator overlay :position="position" color="success"><Avatar><AvatarFallback>AM</AvatarFallback></Avatar></Indicator><span class="text-xs text-muted-foreground">{{ position }}</span></div></div>',
    }),
    play: async ({ canvasElement }) => {
        for (const bubble of canvasElement.querySelectorAll<HTMLElement>(
            '[data-slot="indicator-bubble"]',
        )) {
            const root = bubble.parentElement!.getBoundingClientRect(),
                box = bubble.getBoundingClientRect();
            const position = bubble.dataset.position!;
            const centerX = box.x + box.width / 2,
                centerY = box.y + box.height / 2;
            await expect(
                Math.abs(
                    centerX -
                        (position.endsWith('left')
                            ? root.left
                            : position.endsWith('right')
                              ? root.right
                              : root.left + root.width / 2),
                ),
            ).toBeLessThan(1);
            await expect(
                Math.abs(
                    centerY -
                        (position.startsWith('top')
                            ? root.top
                            : position.startsWith('bottom')
                              ? root.bottom
                              : root.top + root.height / 2),
                ),
            ).toBeLessThan(1);
        }
    },
};
export const Notifications: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: {
            Indicator,
            ButtonShadow,
            ButtonAction,
            IconBell,
            IconMail,
            Avatar,
            AvatarFallback,
        },
        template:
            '<div class="flex flex-wrap items-center gap-12 p-6"><Indicator overlay :value="1" color="danger" aria-label="1 unread notification"><ButtonShadow variant="primary" label="Notifications"><IconBell /></ButtonShadow></Indicator><Indicator overlay value="New" color="warning"><ButtonAction title="Messages"><IconMail /></ButtonAction></Indicator><Indicator overlay value="1 message" color="info"><Avatar><AvatarFallback>AM</AvatarFallback></Avatar></Indicator></div>',
    }),
};
export const Colors: Story = {
    name: 'Colours',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Indicator, IconMail },
        setup: () => ({ colors: indicatorColors }),
        template:
            '<div class="grid max-w-3xl grid-cols-3 gap-8 p-5 sm:grid-cols-4"><div v-for="color in colors" :key="color" class="flex items-center gap-4"><Indicator overlay :value="5" :color="color"><IconMail class="size-6" /></Indicator><span class="text-xs">{{ color }}</span></div></div>',
    }),
};
export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Indicator, IconBell },
        template:
            '<div class="flex flex-wrap items-center gap-12 p-8"><div v-for="size in [\'sm\',\'default\',\'lg\']" :key="size" class="grid gap-5"><Indicator :size="size" color="success" /><Indicator :size="size" :value="9" color="danger" overlay><IconBell class="size-6" /></Indicator><Indicator :size="size" value="New" color="info" /></div></div>',
    }),
};
export const CustomColor: Story = {
    name: 'Custom colour',
    args: { color: '#ffb700', kind: 'text', text: 'New' },
    play: async ({ canvasElement }) => {
        await expect(
            getComputedStyle(canvasElement.querySelector('[data-slot="indicator-fill"]')!)
                .backgroundColor,
        ).toBe('rgb(255, 183, 0)');
        await expect(
            getComputedStyle(canvasElement.querySelector('[data-slot="indicator-content"]')!).color,
        ).toBe('rgb(0, 0, 0)');
    },
};
export const CustomContent: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Indicator, IconBell, IconMail, ButtonShadow },
        template:
            '<div class="p-8"><Indicator overlay color="primary"><ButtonShadow label="Inbox"><IconBell /></ButtonShadow><template #indicator><IconMail class="size-3" /><span>3 new</span></template></Indicator></div>',
    }),
};
export const Zero: Story = {
    args: { value: 0, showZero: true },
    play: async ({ canvasElement }) => {
        await expect(
            canvasElement.querySelector('[data-slot="indicator-bubble"]'),
        ).toHaveTextContent('0');
    },
};
export const HiddenZero: Story = {
    args: { value: 0, showZero: false },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('[data-slot="indicator-bubble"]')).toBeNull();
        await expect(
            canvasElement.querySelector('[data-slot="button-shadow"]'),
        ).toBeInTheDocument();
    },
};
export const Hidden: Story = { args: { visible: false }, play: HiddenZero.play };
export const Offset: Story = {
    args: { offsetX: 5, offsetY: -4, value: 12, position: 'bottom-left' },
};
export const AnnouncedCount: Story = {
    args: { announce: true, ariaLabel: '5 unread messages' },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('[data-slot="indicator-bubble"]')).toHaveAttribute(
            'role',
            'status',
        );
        await expect(canvasElement.querySelector('[data-slot="indicator-bubble"]')).toHaveAttribute(
            'aria-live',
            'polite',
        );
    },
};
export const ColorAnimations: Story = {
    name: 'Colour animations',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Indicator, IconMail },
        setup: () => ({ colors: [...indicatorColors, '#a855f7'] }),
        template:
            '<div class="grid grid-cols-[auto_repeat(3,minmax(3rem,1fr))] items-center gap-x-6 gap-y-5 p-3"><span class="text-xs">Color</span><span class="text-xs">Static</span><span class="text-xs">Pulse</span><span class="text-xs">Ping</span><template v-for="color in colors" :key="color"><span class="text-xs">{{ color }}</span><Indicator :color="color" overlay><IconMail class="size-5" /></Indicator><Indicator :color="color" overlay pulse><IconMail class="size-5" /></Indicator><Indicator :color="color" overlay ping><IconMail class="size-5" /></Indicator></template></div>',
    }),
};
export const Integrations: Story = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Indicator, ButtonAction, ButtonShadow, Badge, IconMail },
        template:
            '<div class="flex flex-wrap items-center gap-6 p-6"><ButtonAction variant="primary" status-dot="#a855f7" status-dot-pulse label="New messages"><IconMail /></ButtonAction><ButtonShadow variant="info" status-dot="danger" status-dot-ping label="Unread messages"><IconMail /></ButtonShadow><Badge variant="success"><Indicator color="current" pulse />Available</Badge><ButtonAction loading status-dot="danger" label="Loading"><IconMail /></ButtonAction></div>',
    }),
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelectorAll('[data-slot="indicator-bubble"]')).toHaveLength(
            3,
        );
        const badge = canvasElement.querySelector('[data-slot="badge"]')!;
        await expect(
            getComputedStyle(badge.querySelector('[data-slot="indicator-fill"]')!).backgroundColor,
        ).toBe(getComputedStyle(badge).color);
        await expect(
            getComputedStyle(badge.querySelector('[data-slot="indicator-bubble"]')!).borderTopWidth,
        ).toBe('0px');
        await expect(
            canvasElement.querySelector('[data-loading="true"] [data-slot="indicator-bubble"]'),
        ).toBeNull();
    },
};
