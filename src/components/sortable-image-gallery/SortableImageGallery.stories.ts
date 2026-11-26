import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { componentSummary } from '../../stories/component-documentation';
import SortableImageGalleryDemo from '../../stories/SortableImageGalleryDemo.vue';
import { SortableImageGallery } from './index';

const meta = {
    title: 'Utilities/SortableImageGallery',
    component: SortableImageGallery,
    parameters: {
        layout: 'padded',
        docs: { description: { component: componentSummary('SortableImageGallery') } },
    },
    args: {
        modelValue: [],
        sortable: true,
        moveButtons: true,
        removable: true,
        showPrimary: true,
        disabled: false,
    },
    argTypes: {
        modelValue: { control: false },
        sortable: { control: 'boolean' },
        moveButtons: { control: 'boolean' },
        removable: { control: 'boolean' },
        showPrimary: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    render: (args) => ({
        components: { SortableImageGalleryDemo },
        setup: () => ({ args }),
        template: '<SortableImageGalleryDemo :args="args" />',
    }),
} satisfies Meta<typeof SortableImageGallery>;
export default meta;
export const Default: StoryObj<typeof meta> = {
    play: async ({ canvasElement }) => {
        const next = canvasElement.querySelector<HTMLElement>(
            '[data-id="cover"] [data-slot="attachment-move-next"]',
        )!;
        await userEvent.click(next);
        await waitFor(() =>
            expect(
                canvasElement.querySelector('output[aria-label="Image order"]'),
            ).toHaveTextContent('detail, cover, workspace'),
        );
    },
};
export const Disabled: StoryObj<typeof meta> = { args: { disabled: true } };
