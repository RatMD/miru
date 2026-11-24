import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { ButtonShadow } from './index';
const meta = {
    ...componentControls('ButtonShadow'),
    title: 'Components/ButtonShadow',
    component: ButtonShadow,
    parameters: {
        controls: { include: controlNames('ButtonShadow') },
        docs: { description: { component: componentDescription('ButtonShadow') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<ButtonShadow v-bind="controlProps()"><IconEdit/></ButtonShadow>',
        'ButtonShadow',
    ),
};
export const AllVariants: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap gap-6 p-3"><div v-for="variant in colors" :key="variant" class="grid justify-items-center gap-3"><ButtonShadow :variant="variant" :label="labels.edit"><IconStar/></ButtonShadow><span class="text-xs">{{ variant }}</span></div></div>',
        'ButtonShadow',
    ),
};
export const Muted: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap gap-6 p-3"><ButtonShadow v-for="variant in colors" :key="variant" :variant="variant" muted :label="labels.edit"><IconEdit/></ButtonShadow></div>',
        'ButtonShadow',
    ),
};
export const Sizes: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex items-center gap-6 p-3"><ButtonShadow v-for="size in [\'xs\',\'sm\',\'default\',\'lg\']" :key="size" :size="size" variant="primary" :label="labels.edit"><IconEdit/></ButtonShadow></div>',
        'ButtonShadow',
    ),
};
export const DisabledAndLoading: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex items-center gap-6 p-3"><ButtonShadow variant="danger" disabled :label="labels.remove"><IconTrash/></ButtonShadow><ButtonShadow variant="primary" loading :label="labels.loading"><IconEdit/></ButtonShadow></div>',
        'ButtonShadow',
    ),
};
export const AsLink: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<ButtonShadow href="#activity" variant="info" :label="labels.second"><IconMail/></ButtonShadow>',
        'ButtonShadow',
    ),
};

export const StatusRing: StoryObj = {
    args: { statusRing: 'success', iconColor: 'success' },
    render: componentStory(
        '<ButtonShadow v-bind="controlProps()"><IconCheck/></ButtonShadow>',
        'ButtonShadow',
    ),
};
export const TimerRing: StoryObj = {
    args: { timerRing: true, iconColor: 'primary', timerColor: 'primary' },
    render: componentStory(
        '<div class="flex items-center gap-6 p-3"><ButtonShadow ref="timerButton" v-bind="controlProps()" @timer-end="feedback = labels.timerEnded"><IconStar/></ButtonShadow><Button variant="outline" @click="feedback = \'\'; timerButton?.restartTimer()">{{ labels.restart }}</Button><output>{{ feedback }}</output></div>',
        'ButtonShadow',
    ),
};
export const ControlledTimer: StoryObj = {
    args: { timerRing: true, timerProgress: 75, timerColor: 'primary', iconColor: 'primary' },
    render: componentStory(
        '<ButtonShadow v-bind="controlProps()"><IconStar/></ButtonShadow>',
        'ButtonShadow',
    ),
};

export const StatusDot: StoryObj = { ...Default, args: { statusDot: 'danger' } };
export const StatusDotColors: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap items-center gap-6 p-3"><div v-for="color in [\'default\',\'primary\',\'secondary\',\'info\',\'success\',\'warning\',\'danger\']" :key="color" class="grid justify-items-center gap-2"><ButtonShadow variant="default" :status-dot="color" :label="labels.info"><IconMail/></ButtonShadow><span class="text-xs">{{ color }}</span></div></div>',
        'ButtonShadow',
    ),
};
export const StatusDotSizes: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex items-center gap-6 p-3"><ButtonShadow v-for="size in [\'xs\',\'sm\',\'default\',\'lg\']" :key="size" :size="size" variant="primary" status-dot="success" :label="labels.success"><IconCheck/></ButtonShadow></div>',
        'ButtonShadow',
    ),
};
export const StatusDotStates: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex items-center gap-6 p-3"><ButtonShadow variant="warning" :status-dot="true" :label="labels.warning"><IconMail/></ButtonShadow><ButtonShadow disabled status-dot="danger" :label="labels.error"><IconMail/></ButtonShadow><ButtonShadow loading status-dot="info" :label="labels.loading"><IconMail/></ButtonShadow></div>',
        'ButtonShadow',
    ),
};

export const StatusDotWithRings: StoryObj = {
    args: { statusDot: 'danger', statusRing: 'success', iconColor: 'success' },
    render: componentStory(
        '<ButtonShadow v-bind="controlProps()"><IconCheck/></ButtonShadow>',
        'ButtonShadow',
    ),
};
