import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { describeOverlayControls } from '../../stories/overlay-documentation';
import { OverlayDocs } from '../../stories/OverlayDocs';
import { OverlayNotice } from './index';
const meta = {
    ...componentControls('OverlayNotice'),
    title: 'Overlays/OverlayNotice',
    id: 'overlay-overlaynotice',
    component: OverlayNotice,
    parameters: {
        controls: { include: controlNames('OverlayNotice') },
        docs: {
            page: OverlayDocs,
            description: { component: componentDescription('OverlayNotice') },
        },
    },
} satisfies Meta;
describeOverlayControls('OverlayNotice', meta.argTypes);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="noticeOpen = true">{{ labels.open }}</Button><OverlayNotice v-bind="controlProps()" v-model:open="noticeOpen"><p>{{ labels.details }}</p></OverlayNotice>',
        'OverlayNotice',
    ),
};
