import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { describeOverlayControls } from '../../stories/overlay-documentation';
import { OverlayDocs } from '../../stories/OverlayDocs';
import { OverlayChoice } from './index';
const meta = {
    ...componentControls('OverlayChoice'),
    title: 'Overlays/OverlayChoice',
    id: 'overlay-overlaychoice',
    component: OverlayChoice,
    parameters: {
        controls: { include: controlNames('OverlayChoice') },
        docs: {
            page: OverlayDocs,
            description: { component: componentDescription('OverlayChoice') },
        },
    },
} satisfies Meta;
describeOverlayControls('OverlayChoice', meta.argTypes);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="choiceOpen = true">{{ labels.open }}</Button><OverlayChoice v-bind="controlProps()" v-model:open="choiceOpen" :primary="{label:labels.confirm}" @confirm="feedback = labels.closed"/><output>{{ feedback }}</output>',
        'OverlayChoice',
    ),
};
export const Danger: StoryObj = {
    args: { variant: 'danger' },
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="choiceOpen = true">{{ labels.open }}</Button><OverlayChoice v-bind="controlProps()" v-model:open="choiceOpen" :primary="{label:labels.confirm}" @confirm="feedback = labels.closed"/><output>{{ feedback }}</output>',
        'OverlayChoice',
    ),
};
export const AsyncError: StoryObj = {
    args: { closeOnConfirm: false, error: 'Unable to save' },
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="choiceOpen = true">{{ labels.open }}</Button><OverlayChoice v-bind="controlProps()" v-model:open="choiceOpen" :primary="{label:labels.confirm}" @confirm="feedback = labels.closed"/><output>{{ feedback }}</output>',
        'OverlayChoice',
    ),
};
