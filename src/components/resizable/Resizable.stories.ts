import type { Meta, StoryObj, StoryContext } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ComponentDocs } from '../../stories/ComponentDocs';
import ResizableDemo from '../../stories/ResizableDemo.vue';
import {
    utilitySummaries,
    utilityDependencyMarkdown,
    describeUtilityControls,
} from '../../stories/utilities-documentation';
import { Resizable } from './index';

function sourceExample(
    args: Record<string, unknown>,
    preset = 'basic',
    targetNext = false,
    persist = false,
) {
    const flag = (value: unknown, name: string) => (value ? ` ${name}` : '');
    const handle = `<ResizableHandle${flag(args.showGrip, 'show-grip')}${flag(args.showToggle, 'show-toggle')}${targetNext ? ' toggle-target="content"' : ''} />`;
    const content =
        preset === 'nested'
            ? `<Resizable direction="vertical">
      <ResizablePanel :default-size="55" :min-size="20">Editor</ResizablePanel>
      <ResizableHandle${flag(args.showGrip, 'show-grip')} />
      <ResizablePanel :min-size="20">Preview</ResizablePanel>
    </Resizable>`
            : 'Content';
    return `<div style="height: ${args.height}px">
  <Resizable direction="${args.direction}" :keyboard-resize-by="${args.keyboardResizeBy}"${flag(args.disabled, 'disabled')}${persist ? ' id="workspace" auto-save-id="workspace-layout"' : ''}>
    <ResizablePanel id="navigation" :default-size="${args.defaultSize}" :min-size="${args.minSize}" :max-size="${args.maxSize}" size-unit="${args.sizeUnit}"${flag(args.collapsible, 'collapsible')}${args.collapsible ? ` :collapsed-size="${args.collapsedSize}"` : ''}>Navigation</ResizablePanel>
    ${handle}
    <ResizablePanel id="content" :min-size="15"${targetNext ? ' collapsible :collapsed-size="0"' : ''}>${content}</ResizablePanel>${
        preset === 'three'
            ? `
    <ResizableHandle${flag(args.showGrip, 'show-grip')} />
    <ResizablePanel :default-size="20" :min-size="10">Details</ResizablePanel>`
            : ''
    }
  </Resizable>
</div>`;
}
const meta: Meta = {
    title: 'Utilities/Resizable',
    component: Resizable,
    parameters: {
        layout: 'padded',
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    utilitySummaries.Resizable +
                    '\n\n' +
                    utilityDependencyMarkdown('Resizable', true),
            },
            source: {
                language: 'html',
                transform: (_source: string, context: StoryContext) =>
                    sourceExample(
                        context.args,
                        context.parameters.resizablePreset,
                        context.parameters.resizableTargetNext,
                        context.parameters.resizablePersist,
                    ),
            },
        },
    },
    args: {
        direction: 'horizontal',
        showGrip: true,
        showToggle: false,
        disabled: false,
        collapsible: false,
        defaultSize: 35,
        minSize: 20,
        maxSize: 75,
        collapsedSize: 0,
        keyboardResizeBy: 5,
        height: 280,
        sizeUnit: '%',
    },
    argTypes: {
        direction: { control: 'select', options: ['horizontal', 'vertical'] },
        keyboardResizeBy: { control: { type: 'number', min: 1, max: 25 } },
        disabled: { control: 'boolean' },
        showGrip: { control: 'boolean', table: { category: 'Handle' } },
        showToggle: { control: 'boolean', table: { category: 'Handle' } },
        collapsible: { control: 'boolean', table: { category: 'Panel' } },
        defaultSize: { control: 'number', table: { category: 'Panel' } },
        minSize: { control: 'number', table: { category: 'Panel' } },
        maxSize: { control: 'number', table: { category: 'Panel' } },
        collapsedSize: { control: 'number', table: { category: 'Panel' } },
        sizeUnit: { control: 'select', options: ['%', 'px'], table: { category: 'Panel' } },
        height: { control: { type: 'number', min: 160, max: 640 }, table: { category: 'Preview' } },
    },
    render: (args, { globals, parameters }) => ({
        components: { ResizableDemo },
        setup: () => ({
            args,
            locale: globals.locale || 'en',
            preset: parameters.resizablePreset || 'basic',
            persist: !!parameters.resizablePersist,
            targetNext: !!parameters.resizableTargetNext,
        }),
        template:
            '<ResizableDemo :args="args" :locale="locale" :preset="preset" :persist="persist" :target-next="targetNext" />',
    }),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeUtilityControls('Resizable', meta.argTypes ?? {}, meta);
export default meta;
function firstPanel(canvas: HTMLElement) {
    return canvas.querySelector<HTMLElement>('[data-slot="resizable-panel"]')!;
}
function handle(canvas: HTMLElement) {
    return canvas.querySelector<HTMLElement>('[data-slot="resizable-handle"]')!;
}
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const separator = handle(canvasElement);
        await waitFor(() =>
            expect(Number(firstPanel(canvasElement).dataset.panelSize)).toBeGreaterThan(0),
        );
        const before = Number(firstPanel(canvasElement).dataset.panelSize);
        separator.focus();
        await userEvent.keyboard('{ArrowRight}');
        await waitFor(() =>
            expect(Number(firstPanel(canvasElement).dataset.panelSize)).toBeGreaterThan(before),
        );
        await userEvent.keyboard('{Home}');
        await waitFor(() =>
            expect(Number(firstPanel(canvasElement).dataset.panelSize)).toBeCloseTo(20, 0),
        );
        await userEvent.keyboard('{End}');
        await waitFor(() =>
            expect(Number(firstPanel(canvasElement).dataset.panelSize)).toBeCloseTo(75, 0),
        );
        await userEvent.click(
            canvas.getByRole('button', { name: /Reset size|Größe zurücksetzen/ }),
        );
        await waitFor(() =>
            expect(Number(firstPanel(canvasElement).dataset.panelSize)).toBeCloseTo(35, 0),
        );
    },
};
export const WithoutGrip: StoryObj = {
    args: { showGrip: false },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('[data-slot="resizable-grip"]')).toBeNull();
        await expect(handle(canvasElement)).toHaveAttribute('role', 'separator');
    },
};
export const Vertical: StoryObj = {
    args: { direction: 'vertical', height: 400 },
    play: async ({ canvasElement }) => {
        await waitFor(() =>
            expect(Number(firstPanel(canvasElement).dataset.panelSize)).toBeGreaterThan(0),
        );
        const before = Number(firstPanel(canvasElement).dataset.panelSize);
        handle(canvasElement).focus();
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() =>
            expect(Number(firstPanel(canvasElement).dataset.panelSize)).toBeGreaterThan(before),
        );
    },
};
export const Collapsible: StoryObj = {
    args: { collapsible: true, showToggle: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvasElement.querySelector<HTMLElement>('[data-slot="resizable-toggle"]')!;
        await userEvent.click(button);
        await waitFor(() =>
            expect(firstPanel(canvasElement)).toHaveAttribute('data-state', 'collapsed'),
        );
        await expect(firstPanel(canvasElement)).toHaveAttribute('inert');
        await expect(button).toHaveAttribute('aria-expanded', 'false');
        await expect(canvas.getByTestId('resizable-dragging')).toHaveTextContent('false');
        await userEvent.click(button);
        await waitFor(() =>
            expect(firstPanel(canvasElement)).toHaveAttribute('data-state', 'expanded'),
        );
        await expect(firstPanel(canvasElement)).not.toHaveAttribute('inert');
        await expect(button).toHaveAttribute('aria-expanded', 'true');
        await expect(Number(firstPanel(canvasElement).dataset.panelSize)).toBeCloseTo(35, 0);
    },
};
export const ToggleWithoutGrip: StoryObj = {
    ...Collapsible,
    args: { collapsible: true, showToggle: true, showGrip: false },
};
export const VerticalCollapsible: StoryObj = {
    ...Collapsible,
    args: { collapsible: true, showToggle: true, direction: 'vertical', height: 400 },
};
export const ToggleNextPanel: StoryObj = {
    args: { showToggle: true, maxSize: 100 },
    parameters: { resizableTargetNext: true },
    play: async ({ canvasElement }) => {
        const panels = canvasElement.querySelectorAll('[data-slot="resizable-panel"]');
        const button = canvasElement.querySelector<HTMLElement>('[data-slot="resizable-toggle"]')!;
        await userEvent.click(button);
        await waitFor(() => expect(panels[1]!).toHaveAttribute('data-state', 'collapsed'));
        await expect(button).toHaveAttribute('aria-controls', panels[1]!.id);
        await userEvent.click(button);
        await waitFor(() => expect(panels[1]!).toHaveAttribute('data-state', 'expanded'));
    },
};
export const Nested: StoryObj = { parameters: { resizablePreset: 'nested' } };
export const ThreePanels: StoryObj = {
    args: { defaultSize: 25, minSize: 15, maxSize: 60 },
    parameters: { resizablePreset: 'three' },
};
export const PixelSidebar: StoryObj = {
    args: { sizeUnit: 'px', defaultSize: 240, minSize: 140, maxSize: 360 },
    play: async ({ canvasElement }) => {
        await waitFor(() =>
            expect(firstPanel(canvasElement).getBoundingClientRect().width).toBeGreaterThan(230),
        );
        await expect(firstPanel(canvasElement).getBoundingClientRect().width).toBeLessThan(250);
    },
};
export const CollapsedRail: StoryObj = {
    ...Collapsible,
    args: { collapsible: true, showToggle: true, collapsedSize: 8 },
    play: async ({ canvasElement }) => {
        const button = canvasElement.querySelector<HTMLElement>('[data-slot="resizable-toggle"]')!;
        await userEvent.click(button);
        await waitFor(() =>
            expect(firstPanel(canvasElement)).toHaveAttribute('data-state', 'collapsed'),
        );
        await expect(firstPanel(canvasElement)).not.toHaveAttribute('inert');
        await expect(Number(firstPanel(canvasElement).dataset.panelSize)).toBeCloseTo(8, 0);
        await userEvent.click(button);
    },
};
export const Disabled: StoryObj = {
    args: { disabled: true, collapsible: true, showToggle: true },
    play: async ({ canvasElement }) => {
        await expect(handle(canvasElement)).toHaveAttribute('tabindex', '-1');
        await expect(handle(canvasElement)).toHaveAttribute('data-disabled');
        await expect(canvasElement.querySelector('[data-slot="resizable-toggle"]')).toBeDisabled();
    },
};
export const PersistentLayout: StoryObj = { parameters: { resizablePersist: true } };
