import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { OverlayDetails } from './index';
const meta = {
    ...componentControls('OverlayDetails'),
    title: 'Overlay/OverlayDetail',
    component: OverlayDetails,
    parameters: {
        controls: { include: controlNames('OverlayDetails') },
        docs: { description: { component: componentDescription('OverlayDetails') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="open = true">{{ labels.open }}</Button><OverlayDetails v-bind="controlProps()" v-model:open="open" :sections="detailSections"/>',
        'OverlayDetails',
    ),
};
export const SingleSection: StoryObj = {
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="open = true">{{ labels.open }}</Button><OverlayDetails v-bind="controlProps()" v-model:open="open" :sections="detailSections.slice(0,1)"/>',
        'OverlayDetails',
    ),
};
export const Empty: StoryObj = {
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="open = true">{{ labels.open }}</Button><OverlayDetails v-bind="controlProps()" v-model:open="open" :sections="[]"/>',
        'OverlayDetails',
    ),
};
export const LongContent: StoryObj = {
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="open = true">{{ labels.open }}</Button><OverlayDetails v-bind="controlProps()" v-model:open="open" :sections="[{ id: \'rows\', label: labels.details, language: \'json\', value: Array.from({ length: 100 }, (_,id) => ({ id, status: \'ready\' })) }]"/>',
        'OverlayDetails',
    ),
};
