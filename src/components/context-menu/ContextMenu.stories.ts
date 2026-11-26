import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import { componentDescription } from '../../stories/component-descriptions';
import ContextMenuDemo from '../../stories/ContextMenuDemo.vue';
import { describeOverlayControls } from '../../stories/overlay-documentation';
import { OverlayDocs } from '../../stories/OverlayDocs';
import { ContextMenu } from './index';
const meta = {
    title: 'Overlays/ContextMenu',
    id: 'overlay-contextmenu',
    component: ContextMenu,
    parameters: {
        docs: {
            page: OverlayDocs,
            description: {
                component: componentDescription('ContextMenu'),
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
describeOverlayControls('ContextMenu', meta.argTypes);
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
