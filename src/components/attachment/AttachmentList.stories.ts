import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import AttachmentExamples from '../../stories/AttachmentExamples.vue';
import { componentDescription } from '../../stories/component-descriptions';
import { AttachmentList } from './index';
const boolean = { control: 'boolean' as const };
const select = (options: readonly string[]) => ({
    control: 'select' as const,
    options,
});

const meta: Meta = {
    title: 'Components/AttachmentList',
    component: AttachmentList,
    parameters: {
        layout: 'padded',
        docs: {
            description: { component: componentDescription('AttachmentList') },
        },
    },
    args: {
        layout: 'list',
        sortable: false,
        dragHandle: true,
        moveButtons: true,
        removable: false,
        editable: false,
        disabled: false,
        showPrimary: false,
        showType: true,
        showMime: true,
        showSize: true,
    },
    argTypes: {
        layout: select(['list', 'grid', 'row']),
        sortable: boolean,
        dragHandle: boolean,
        moveButtons: boolean,
        removable: boolean,
        editable: boolean,
        disabled: boolean,
        showPrimary: boolean,
        showType: boolean,
        showMime: boolean,
        showSize: boolean,
        modelValue: { table: { disable: true } },
        locales: { table: { disable: true } },
    },
    render: (args, { globals }) => ({
        components: { AttachmentExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<AttachmentExamples mode="list" :args="args" :locale="locale"/>',
    }),
};
export default meta;
export const Default: StoryObj = {};
export const Grid: StoryObj = { args: { layout: 'grid', showPrimary: true } };
export const HorizontalRow: StoryObj = {
    args: { layout: 'row', showPrimary: true },
};
export const Sortable: StoryObj = {
    args: { sortable: true, removable: true },
    play: async ({ canvasElement }) => {
        const list = canvasElement.querySelector('[data-slot="attachment-list-items"]')!;
        const first = list.querySelector('[data-id]')!;
        await userEvent.click(
            within(first as HTMLElement).getByRole('button', {
                name: /Move .* later|nach hinten verschieben/,
            }),
        );
        await waitFor(() => expect(list.children[1]).toHaveAttribute('data-id', 'image'));
        const handle = list.children[1]!.querySelector('[data-slot="attachment-drag-handle"]')!;
        await userEvent.click(handle);
        await userEvent.keyboard('{ArrowLeft}');
        await waitFor(() => expect(list.children[0]).toHaveAttribute('data-id', 'image'));
        await userEvent.click(list.children[0]!.querySelector('[data-slot="attachment-remove"]')!);
        await waitFor(() => expect(list.children).toHaveLength(5));
    },
};
export const MoveButtonsOnly: StoryObj = {
    args: { sortable: true, dragHandle: false, moveButtons: true },
};
export const DragHandleOnly: StoryObj = {
    args: { layout: 'grid', sortable: true, moveButtons: false },
};
export const Editable: StoryObj = {
    args: { layout: 'grid', editable: true, removable: true },
};
export const Multilingual: StoryObj = {
    args: { editable: true, multilingual: true },
};
export const Disabled: StoryObj = {
    args: { sortable: true, removable: true, disabled: true },
};
