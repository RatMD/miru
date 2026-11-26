import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { describeOverlayControls } from '../../stories/overlay-documentation';
import { OverlayDocs } from '../../stories/OverlayDocs';
import { Dialog } from './index';
const meta = {
    ...componentControls('Dialog'),
    title: 'Overlays/Dialog',
    id: 'overlay-dialog',
    component: Dialog,
    parameters: {
        controls: { include: controlNames('Dialog') },
        docs: { page: OverlayDocs, description: { component: componentDescription('Dialog') } },
    },
} satisfies Meta;
describeOverlayControls('Dialog', meta.argTypes);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Dialog v-bind="controlProps()" v-model:open="open"><DialogTrigger as-child><Button class="w-auto justify-self-center">{{ labels.open }}</Button></DialogTrigger><DialogContent :size="args.size" :close-label="labels.cancel"><DialogTitle>{{ args.title }}</DialogTitle><DialogDescription>{{ args.description }}</DialogDescription><p>{{ labels.details }}</p><DialogFooter :border="args.footerBorder"><DialogClose as-child><Button variant="outline">{{ labels.cancel }}</Button></DialogClose><DialogClose as-child><Button variant="success">{{ labels.confirm }}</Button></DialogClose></DialogFooter></DialogContent></Dialog>',
        'Dialog',
    ),
};

/** One canvas with explicit size triggers; each Dialog owns its own open state. */
export const Sizes: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        `<div class="flex flex-wrap gap-2"><Dialog v-for="size in ['sm','md','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl','full']" :key="size"><DialogTrigger as-child><Button variant="outline" :data-size-trigger="size">{{ size.toUpperCase() }} · {{ labels.open }}</Button></DialogTrigger><DialogContent :size="size" :close-label="labels.cancel"><DialogTitle>{{ args.title }} · {{ size.toUpperCase() }}</DialogTitle><DialogDescription>{{ args.description }}</DialogDescription><p>{{ labels.details }}</p><DialogFooter><DialogClose as-child><Button variant="outline">{{ labels.cancel }}</Button></DialogClose></DialogFooter></DialogContent></Dialog></div>`,
        'Dialog',
    ),
    play: async ({ canvasElement }) => {
        const body = within(canvasElement.ownerDocument.body);
        for (const [size, width] of [
            ['sm', 384],
            ['md', 448],
            ['lg', 512],
        ] as const) {
            const trigger = canvasElement.querySelector(
                '[data-size-trigger="' + size + '"]',
            ) as HTMLElement;
            await userEvent.click(trigger);
            const dialog = await body.findByRole('dialog');
            await expect(dialog).toHaveAttribute('data-size', size);
            await waitFor(() => expect(getComputedStyle(dialog).maxWidth).toBe(width + 'px'));
            await userEvent.keyboard('{Escape}');
            await waitFor(() => expect(body.queryByRole('dialog')).toBeNull());
        }
    },
};
export const FooterBorder: StoryObj = { ...Default, args: { footerBorder: true } };

export const Small: StoryObj = { ...Default, args: { size: 'sm' } };
export const Medium: StoryObj = { ...Default, args: { size: 'md' } };
export const Large: StoryObj = { ...Default, args: { size: 'lg' } };
export const ExtraLarge: StoryObj = { ...Default, args: { size: 'xl' } };
export const TwoExtraLarge: StoryObj = { ...Default, args: { size: '2xl' } };
export const ThreeExtraLarge: StoryObj = { ...Default, args: { size: '3xl' } };
export const FourExtraLarge: StoryObj = { ...Default, args: { size: '4xl' } };
export const FiveExtraLarge: StoryObj = { ...Default, args: { size: '5xl' } };
export const SixExtraLarge: StoryObj = { ...Default, args: { size: '6xl' } };
export const SevenExtraLarge: StoryObj = { ...Default, args: { size: '7xl' } };
export const FullWidth: StoryObj = { ...Default, args: { size: 'full' } };
