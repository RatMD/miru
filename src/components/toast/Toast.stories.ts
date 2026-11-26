import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { describeOverlayControls } from '../../stories/overlay-documentation';
import { OverlayDocs } from '../../stories/OverlayDocs';
import ToastDemo from '../../stories/ToastDemo.vue';
import ToastLifecycleDemo from '../../stories/ToastLifecycleDemo.vue';
import { Toast } from './index';
const meta = {
    ...componentControls('Toast'),
    title: 'Overlays/Toast',
    id: 'overlay-toast',
    component: Toast,
    parameters: {
        controls: { include: controlNames('Toast') },
        docs: { page: OverlayDocs, description: { component: componentDescription('Toast') } },
    },
} satisfies Meta;
describeOverlayControls('Toast', meta.argTypes);
export default meta;
const render: StoryObj['render'] = (args, { globals }) => ({
    components: { ToastDemo },
    setup: () => ({ args, locale: globals.locale }),
    template: '<ToastDemo v-bind="args" :locale="locale"/>',
});
export const Default: StoryObj = { render };
export const Floating: StoryObj = {
    render,
    args: { inline: false, seed: false, expand: true, visibleToasts: 8 },
};
export const Flat: StoryObj = { render, args: { appearance: 'flat' } };
export const Graphite: StoryObj = { render, args: { appearance: 'graphite' } };
export const RichColors: StoryObj = { render, args: { richColors: true, appearance: 'flat' } };

function host(canvas: HTMLElement) {
    return (
        canvas.querySelector<HTMLElement>('[data-slot="toast"]') ??
        document.body.querySelector<HTMLElement>('[id^="toast-lifecycle-"][data-slot="toast"]')!
    );
}
const messages = (canvas: HTMLElement) =>
    host(canvas)?.querySelectorAll<HTMLElement>('[data-slot="toast-message"][data-state="open"]') ??
    [];
const lifecycle: StoryObj['render'] = (_args, { parameters }) => ({
    components: { ToastLifecycleDemo },
    setup: () => ({
        mode: parameters.toastMode || 'lifecycle',
        floating: !!parameters.toastFloating,
    }),
    template: '<ToastLifecycleDemo :mode="mode" :floating="floating" />',
});
export const Lifecycle: StoryObj = {
    render: lifecycle,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Loading' }));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(1));
        const id = messages(canvasElement)[0]!.dataset.toastId;
        await userEvent.click(canvas.getByRole('button', { name: 'Finish loading' }));
        await waitFor(() => expect(messages(canvasElement)[0]).toHaveTextContent('Finished'));
        await expect(messages(canvasElement)[0]).toHaveAttribute('data-toast-id', id);
        await expect(messages(canvasElement)[0]).toHaveAttribute('data-type', 'success');
        await userEvent.click(canvas.getByRole('button', { name: 'Update' }));
        await waitFor(() =>
            expect(messages(canvasElement)[0]).toHaveTextContent('Updated explicitly'),
        );
        await userEvent.click(
            within(host(canvasElement)).getByRole('button', { name: /Close|Schließen/ }),
        );
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(0));
        await expect(canvas.getByTestId('toast-dismissed')).toHaveTextContent('1');
    },
};
export const TimedDismissal: StoryObj = {
    render: lifecycle,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Timed' }));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(1));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(0), { timeout: 2500 });
        await expect(canvas.getByTestId('toast-expired')).toHaveTextContent('1');
        await expect(canvas.getByTestId('toast-dismissed')).toHaveTextContent('0');
    },
};
export const NonDismissible: StoryObj = {
    render: lifecycle,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Locked' }));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(1));
        await expect(
            within(host(canvasElement)).queryByRole('button', { name: /Close|Schließen/ }),
        ).toBeNull();
        messages(canvasElement)[0]!.focus();
        await userEvent.keyboard('{Escape}');
        await expect(messages(canvasElement)).toHaveLength(1);
        await userEvent.click(canvas.getByRole('button', { name: 'Dismiss this host' }));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(0));
    },
};
export const Actions: StoryObj = {
    render: lifecycle,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Actions' }));
        await userEvent.click(within(host(canvasElement)).getByRole('button', { name: 'Confirm' }));
        await expect(canvas.getByTestId('toast-feedback')).toHaveTextContent('Confirmed');
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(0));
        await userEvent.click(canvas.getByRole('button', { name: 'Keep-open action' }));
        await userEvent.click(
            within(host(canvasElement)).getByRole('button', { name: 'Keep open' }),
        );
        await expect(messages(canvasElement)).toHaveLength(1);
        await expect(canvas.getByTestId('toast-feedback')).toHaveTextContent('Action performed');
    },
};
export const PromiseStates: StoryObj = {
    render: lifecycle,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Promise success' }));
        await waitFor(() =>
            expect(messages(canvasElement)[0]).toHaveAttribute('data-type', 'loading'),
        );
        await waitFor(() => expect(messages(canvasElement)[0]).toHaveTextContent('Document saved'));
        await waitFor(() =>
            expect(canvas.getByTestId('toast-promise-result')).toHaveTextContent('Document saved'),
        );
        await userEvent.click(canvas.getByRole('button', { name: 'Promise failure' }));
        await waitFor(() => expect(messages(canvasElement)[0]).toHaveTextContent('Request failed'));
        await expect(messages(canvasElement)[0]).toHaveAttribute('data-type', 'error');
        await waitFor(() =>
            expect(canvas.getByTestId('toast-promise-result')).toHaveTextContent('rejected'),
        );
    },
};
export const Stacked: StoryObj = {
    render: lifecycle,
    parameters: { toastFloating: true },
    play: async ({ canvasElement }) => {
        await userEvent.click(within(canvasElement).getByRole('button', { name: 'Send batch' }));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(4));
        await waitFor(() =>
            expect(host(canvasElement).querySelectorAll('[data-limited]')).toHaveLength(1),
        );
        await expect(host(canvasElement).querySelector('[data-limited]')).toHaveAttribute('inert');
        const front = [...messages(canvasElement)].find(
            (element) =>
                getComputedStyle(element).getPropertyValue('--reka-toast-index').trim() === '0',
        )!;
        await userEvent.hover(front);
        await waitFor(() => expect(host(canvasElement)).toHaveAttribute('data-expanded'));
    },
};
export const MultipleHosts: StoryObj = {
    render: lifecycle,
    parameters: { toastMode: 'hosts' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
        await userEvent.click(canvas.getByRole('button', { name: 'Send to second host' }));
        const hosts = canvasElement.querySelectorAll('[data-slot="toast"]');
        await waitFor(() => expect(hosts[0]).toHaveTextContent('Saved changes'));
        await expect(hosts[1]).toHaveTextContent('Second host');
        await userEvent.click(canvas.getByRole('button', { name: 'Dismiss this host' }));
        await waitFor(() => expect(hosts[0]!.querySelector('[data-state="open"]')).toBeNull());
        await expect(hosts[1]!.querySelector('[data-state="open"]')).not.toBeNull();
    },
};
export const RootIntegration: StoryObj = {
    render: lifecycle,
    parameters: { toastMode: 'root' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Server notice' }));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(1));
        await userEvent.click(canvas.getByRole('button', { name: 'Server notice' }));
        await expect(messages(canvasElement)).toHaveLength(1);
        await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(2));
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle root toasts' }));
        await waitFor(() => expect(canvasElement.querySelector('[data-slot="toast"]')).toBeNull());
    },
};
export const HostLifecycle: StoryObj = {
    render: lifecycle,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Start deferred request' }));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(1));
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle host' }));
        await waitFor(() => expect(canvasElement.querySelector('[data-slot="toast"]')).toBeNull());
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle host' }));
        await userEvent.click(canvas.getByRole('button', { name: 'Resolve deferred request' }));
        await expect(messages(canvasElement)).toHaveLength(0);
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle host' }));
        await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
        await userEvent.click(canvas.getByRole('button', { name: 'Toggle host' }));
        await waitFor(() => expect(messages(canvasElement)).toHaveLength(1));
    },
};
