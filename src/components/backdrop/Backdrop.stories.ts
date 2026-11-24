import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import BackdropDemo from '../../stories/BackdropDemo.vue';
import { Backdrop } from './index';
const meta = {
    title: 'Utilities/Backdrop',
    component: Backdrop,
    parameters: {
        docs: {
            description: {
                component:
                    'Decorative fixed/absolute dimming layer, with optional uniform or radially faded blur. The HL Portal-style radial mask starts strongest at origin and fades to transparency at the farthest corner. Numeric origins are viewport pixels when fixed and container-relative pixels when absolute. interactive emits clicks; the host owns open state, dismissal and focus.',
            },
        },
    },
    args: { blur: false, faded: false, color: 'rgb(0 0 0 / 0.2)' },
    argTypes: {
        blur: { control: 'select', options: [false, true, 'sm', 'default', 'lg', 'xl'] },
        faded: { control: 'boolean' },
        color: { control: 'color' },
    },
    render: (args) => ({
        components: { BackdropDemo },
        setup: () => ({ args }),
        template: '<BackdropDemo :args="args" />',
    }),
} satisfies Meta;
export default meta;
export const Default: StoryObj = {};
export const Blur: StoryObj = { args: { blur: 'lg' } };
export const FadedBlur: StoryObj = { args: { blur: 'xl', faded: true } };
export const Popover: StoryObj = {
    args: { blur: 'lg', faded: true, color: 'rgb(0 0 0 / 0.1)' },
    render: (args) => ({
        components: { BackdropDemo },
        setup: () => ({ args }),
        template: '<BackdropDemo :args="args" mode="popover" />',
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Profile menu' }));
        const backdrop = canvasElement.querySelector<HTMLElement>('[data-slot="backdrop"]')!;
        await expect(getComputedStyle(backdrop).backdropFilter).toContain('blur');
        await expect(getComputedStyle(backdrop).maskImage).toContain('radial-gradient');
        await userEvent.click(backdrop);
        await expect(canvas.getByRole('button', { name: 'Profile menu' })).toHaveAttribute(
            'data-state',
            'closed',
        );
    },
};
