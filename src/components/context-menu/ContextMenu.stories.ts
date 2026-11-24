import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import ContextMenuDemo from '../../stories/ContextMenuDemo.vue';
import { ContextMenu } from './index';
const meta = {
    title: 'Overlay/ContextMenu',
    component: ContextMenu,
    parameters: {
        docs: {
            description: {
                component:
                    'Context menu adapted from Spottle using the already installed Reka primitives and Miru surfaces. Includes portal, groups, labels, shortcuts, disabled/danger items, checkbox/radio items and nested submenus. Trigger supports native contextmenu events and touch behavior; use an accessible focusable trigger. Selection events may be prevented to keep the menu open.',
            },
        },
    },
    args: { modal: true },
    argTypes: { modal: { control: 'boolean' } },
    render: (args) => ({
        components: { ContextMenuDemo },
        setup: () => ({ args }),
        template: '<ContextMenuDemo v-bind="args" />',
    }),
} satisfies Meta;
export default meta;
export const Default: StoryObj = {};
export const NonModal: StoryObj = { args: { modal: false } };
export const Selection: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(canvasElement.ownerDocument.body);
        const trigger = canvas.getByRole('button');
        await fireEvent.contextMenu(trigger, { clientX: 150, clientY: 150 });
        await body.findByRole('menu');
        await expect(body.getByRole('menuitem', { name: 'Unavailable action' })).toHaveAttribute(
            'aria-disabled',
            'true',
        );
        await userEvent.click(body.getByRole('menuitemcheckbox', { name: 'Show details' }));
        await expect(canvas.getByTestId('context-state')).toHaveTextContent('details:false');
        await userEvent.click(body.getByRole('menuitemradio', { name: 'List view' }));
        await expect(canvas.getByTestId('context-state')).toHaveTextContent('view:list');
        await userEvent.click(body.getByRole('menuitem', { name: /^Rename/ }));
        await expect(canvas.getByTestId('context-state')).toHaveTextContent('action:rename');
        await waitFor(() => expect(body.queryByRole('menu')).not.toBeInTheDocument());
    },
};
