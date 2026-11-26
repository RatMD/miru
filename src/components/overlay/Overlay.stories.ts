import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { describeOverlayControls } from '../../stories/overlay-documentation';
import { OverlayDocs } from '../../stories/OverlayDocs';
import { Overlay } from './index';
const meta = {
    ...componentControls('Overlay'),
    title: 'Overlays/Overlay',
    id: 'overlay-overlay',
    component: Overlay,
    parameters: {
        controls: { include: controlNames('Overlay') },
        docs: { page: OverlayDocs, description: { component: componentDescription('Overlay') } },
    },
} satisfies Meta;
describeOverlayControls('Overlay', meta.argTypes);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="open = true">{{ labels.open }}</Button><Overlay v-bind="controlProps()" v-model:open="open"><p>{{ labels.details }}</p><template #footer="{ close }"><div class="flex justify-end"><Button variant="outline" @click="close">{{ labels.cancel }}</Button></div></template></Overlay>',
        'Overlay',
    ),
};
export const FixedFrame: StoryObj = {
    args: { fixedFrame: true, wide: true },
    render: componentStory(
        '<Button class="w-auto justify-self-center" @click="open = true">{{ labels.open }}</Button><Overlay v-bind="controlProps()" v-model:open="open"><p>{{ labels.details }}</p><template #footer="{ close }"><div class="flex justify-end"><Button variant="outline" @click="close">{{ labels.cancel }}</Button></div></template></Overlay>',
        'Overlay',
    ),
};
export const WithTrigger: StoryObj = {
    render: componentStory(
        '<Overlay v-bind="controlProps()" v-model:open="open"><template #trigger><OverlayTrigger as-child><Button class="w-auto justify-self-center">{{ labels.open }}</Button></OverlayTrigger></template><p>{{ labels.details }}</p></Overlay>',
        'Overlay',
    ),
};

export const LoadingLocked: StoryObj = { ...Default, args: { loading: true } };
export const NonDismissible: StoryObj = { ...Default, args: { dismissible: false } };
