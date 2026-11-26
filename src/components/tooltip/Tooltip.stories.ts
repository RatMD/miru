import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { describeOverlayControls } from '../../stories/overlay-documentation';
import { OverlayDocs } from '../../stories/OverlayDocs';
import { Tooltip } from './index';
const meta = {
    ...componentControls('Tooltip'),
    title: 'Overlays/Tooltip',
    id: 'overlay-tooltip',
    component: Tooltip,
    parameters: {
        controls: { include: controlNames('Tooltip') },
        docs: { page: OverlayDocs, description: { component: componentDescription('Tooltip') } },
    },
} satisfies Meta;
describeOverlayControls('Tooltip', meta.argTypes);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<TooltipProvider><Tooltip v-bind="controlProps()" v-model:open="open"><TooltipTrigger as-child><Button variant="outline">{{ labels.help }}</Button></TooltipTrigger><TooltipContent v-bind="controlProps(\'content\')">{{ labels.description }}</TooltipContent></Tooltip></TooltipProvider>',
        'Tooltip',
    ),
};
export const Positions: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="grid grid-cols-3 gap-8 py-8"><template v-for="side in [\'top\',\'right\',\'bottom\',\'left\']" :key="side"><TooltipProvider v-for="align in [\'start\',\'center\',\'end\']" :key="align" :delay-duration="100"><Tooltip><TooltipTrigger as-child><Button variant="outline" :data-example="side + \'-\' + align">{{ side }} / {{ align }}</Button></TooltipTrigger><TooltipContent :side="side" :align="align">{{ labels.help }}</TooltipContent></Tooltip></TooltipProvider></template></div>',
        'Tooltip',
    ),
};
export const Colors: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap justify-center gap-6 py-6"><TooltipProvider v-for="variant in colors" :key="variant" :delay-duration="100"><Tooltip><TooltipTrigger as-child><Button variant="outline" :data-example="variant">{{ variant }}</Button></TooltipTrigger><TooltipContent :variant="variant">{{ variant }} — {{ labels.help }}</TooltipContent></Tooltip></TooltipProvider></div>',
        'Tooltip',
    ),
};
