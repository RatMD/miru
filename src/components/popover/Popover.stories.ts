import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { describeOverlayControls } from '../../stories/overlay-documentation';
import { OverlayDocs } from '../../stories/OverlayDocs';
import { Popover } from './index';
const meta = {
    ...componentControls('Popover'),
    title: 'Overlays/Popover',
    id: 'overlay-popover',
    component: Popover,
    parameters: {
        controls: { include: controlNames('Popover') },
        docs: { page: OverlayDocs, description: { component: componentDescription('Popover') } },
    },
} satisfies Meta;
describeOverlayControls('Popover', meta.argTypes);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Popover v-bind="controlProps()" v-model:open="open"><PopoverTrigger as-child><Button variant="outline">{{ labels.more }}</Button></PopoverTrigger><PopoverContent v-bind="controlProps(\'content\')"><p class="font-medium">{{ labels.title }}</p><p>{{ labels.description }}</p><PopoverArrow/></PopoverContent></Popover>',
        'Popover',
    ),
};
export const Positions: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="grid grid-cols-3 gap-6 py-6"><template v-for="side in [\'top\',\'right\',\'bottom\',\'left\']" :key="side"><Popover v-for="align in [\'start\',\'center\',\'end\']" :key="align"><PopoverTrigger as-child><Button variant="outline" :data-example="side + \'-\' + align">{{ side }} / {{ align }}</Button></PopoverTrigger><PopoverContent :side="side" :align="align" class="w-56"><p class="font-medium">{{ labels.title }}</p><p class="text-sm text-foreground/80">{{ labels.description }}</p><PopoverArrow/></PopoverContent></Popover></template></div>',
        'Popover',
    ),
};
export const WithTooltip: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<Popover v-model:open="open"><PopoverTrigger as-child :tooltip="labels.description" tooltip-side="bottom" :tooltip-delay-duration="0"><Button variant="outline" data-testid="popover-tooltip-trigger">{{ labels.more }}</Button></PopoverTrigger><PopoverContent data-testid="popover-tooltip-content"><p class="font-medium">{{ labels.title }}</p><p>{{ labels.description }}</p><PopoverArrow/></PopoverContent></Popover>',
        'Popover',
    ),
    play: async ({ canvasElement }) => {
        const trigger = within(canvasElement).getByTestId('popover-tooltip-trigger');
        const page = within(canvasElement.ownerDocument.body);
        await userEvent.hover(trigger);
        await page.findByRole('tooltip');
        await waitFor(() =>
            expect(
                canvasElement.ownerDocument.querySelector('[data-slot="tooltip-content"]'),
            ).toBeVisible(),
        );
        await userEvent.click(trigger);
        const content = await page.findByTestId('popover-tooltip-content');
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
        await waitFor(() => {
            const rect = content.getBoundingClientRect();
            expect(rect.top).toBeGreaterThanOrEqual(0);
            expect(rect.bottom).toBeLessThanOrEqual(
                canvasElement.ownerDocument.defaultView!.innerHeight,
            );
        });
        await waitFor(() => expect(page.queryByRole('tooltip')).not.toBeInTheDocument());
        await userEvent.keyboard('{Escape}');
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        await expect(trigger).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
        await userEvent.keyboard('{Escape}');
    },
};
