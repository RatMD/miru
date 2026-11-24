import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { OverlayNotice } from './index';
const meta = {
    ...componentControls('OverlayNotice'),
    title: 'Overlay/OverlayNotice',
    component: OverlayNotice,
    parameters: {
        controls: { include: controlNames('OverlayNotice') },
        docs: { description: { component: componentDescription('OverlayNotice') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="noticeOpen = true">{{ labels.open }}</Button><OverlayNotice v-bind="controlProps()" v-model:open="noticeOpen"><p>{{ labels.details }}</p></OverlayNotice>',
        'OverlayNotice',
    ),
};
