import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { defineComponent, h } from 'vue';
import { ComponentDocs } from '../../stories/ComponentDocs';
import DeferredDemo from '../../stories/DeferredDemo.vue';
import DeferredReplaceDemo from '../../stories/DeferredReplaceDemo.vue';
import {
    utilitySummaries,
    utilityDependencyMarkdown,
    describeUtilityControls,
} from '../../stories/utilities-documentation';
import { Deferred } from './index';
const meta = {
    title: 'Utilities/Deferred',
    component: Deferred,
    parameters: {
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    utilitySummaries.Deferred +
                    '\n\n' +
                    utilityDependencyMarkdown('Deferred', true),
            },
        },
    },
    args: { duration: 500, delay: 100, timeout: 3000 },
    argTypes: {
        delay: { control: 'number' },
        timeout: { control: 'number' },
        duration: { control: 'number', table: { category: 'Example' } },
    },
    render: (args) => ({
        components: { DeferredDemo },
        setup: () => ({ args }),
        template: '<DeferredDemo v-bind="args" />',
    }),
} satisfies Meta;
describeUtilityControls('Deferred', meta.argTypes ?? {}, meta);
export default meta;
export const Default: StoryObj = {};
export const Retry: StoryObj = {
    args: { failFirst: true, duration: 80, delay: 0 },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await canvas.findByRole('alert');
        await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
        await canvas.findByTestId('deferred-result');
        await expect(canvas.getByTestId('events')).toHaveTextContent('loaded:1 errors:1');
    },
};
export const Timeout: StoryObj = {
    args: { duration: 1500, timeout: 50, delay: 0 },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await canvas.findByRole('alert');
        await expect(canvas.queryByTestId('deferred-result')).not.toBeInTheDocument();
        await waitFor(() =>
            expect(canvas.getByTestId('events')).toHaveTextContent('loaded:0 errors:1'),
        );
    },
};
export const AsyncSlot: StoryObj = {
    render: () => ({
        components: {
            Deferred,
            AsyncContent: defineComponent({
                async setup() {
                    await new Promise((resolve) => setTimeout(resolve, 250));
                    return () => h('p', 'Async setup content ready');
                },
            }),
        },
        template:
            '<Deferred :delay="0"><AsyncContent /><template #loading>Loading async slot…</template></Deferred>',
    }),
};
export const ReplacePendingLoader: StoryObj = {
    render: () => ({ components: { DeferredReplaceDemo }, template: '<DeferredReplaceDemo />' }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Load other content' }));
        await canvas.findByTestId('replaced-result');
        await expect(canvas.getByTestId('replaced-result')).toHaveTextContent('Selection 2');
        await new Promise((resolve) => setTimeout(resolve, 750));
        await expect(canvas.getByTestId('replaced-result')).toHaveTextContent('Selection 2');
        await expect(canvas.getByTestId('load-count')).toHaveTextContent('1');
    },
};
