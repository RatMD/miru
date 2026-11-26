import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { buttonApiCopy } from '../../stories/button-documentation';
import { ButtonActionDocs } from '../../stories/ButtonActionDocs';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { ButtonAction } from './index';
const meta = {
    ...componentControls('ButtonAction'),
    title: 'Components/ButtonAction',
    component: ButtonAction,
    parameters: {
        controls: { include: controlNames('ButtonAction') },
        docs: {
            page: ButtonActionDocs,
            description: { component: componentDescription('ButtonAction') },
        },
    },
} satisfies Meta;
for (const [name, control] of Object.entries(meta.argTypes ?? {})) {
    if (!control) continue;
    const description = buttonApiCopy.ButtonAction.props[name];
    const category = 'ButtonAction props';
    Object.assign(control, { description, table: { category } });
}
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<ButtonAction v-bind="controlProps()"><IconEdit/></ButtonAction>',
        'ButtonAction',
    ),
};
export const AllVariants: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap gap-4"><div v-for="variant in actionColors" :key="variant" class="grid justify-items-center gap-2"><ButtonAction :variant="variant" :title="labels.edit"><IconEdit/></ButtonAction><span class="text-xs">{{ variant }}</span></div></div>',
        'ButtonAction',
    ),
};
export const WithLabels: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap gap-3"><ButtonAction variant="warning" :label="labels.favorite"><IconStar/></ButtonAction><ButtonAction variant="danger" :label="labels.remove"><IconTrash/></ButtonAction><ButtonAction variant="primary" :icon-only="false"><IconEdit/>{{ labels.edit }}</ButtonAction></div>',
        'ButtonAction',
    ),
};
export const BorderModes: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div v-for="borderless in [\'no\',\'effect\',\'yes\']" :key="borderless" class="flex flex-wrap items-center gap-3"><span class="w-16 text-xs">{{ borderless }}</span><ButtonAction variant="primary" :borderless="borderless" :title="labels.edit"><IconEdit/></ButtonAction><ButtonAction variant="danger" :borderless="borderless" disabled :title="labels.remove"><IconTrash/></ButtonAction><ButtonAction variant="warning" :borderless="borderless" loading :title="labels.loading"><IconStar/></ButtonAction></div>',
        'ButtonAction',
    ),
};
export const Sizes: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex items-center gap-4"><ButtonAction v-for="size in [\'xs\',\'sm\',\'default\',\'lg\']" :key="size" :size="size" variant="success" :title="labels.confirm"><IconCheck/></ButtonAction></div>',
        'ButtonAction',
    ),
};
export const AsLink: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<ButtonAction href="#activity" variant="info" :label="labels.second"><IconMail/></ButtonAction>',
        'ButtonAction',
    ),
};

export const Muted: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap gap-4"><ButtonAction v-for="variant in actionColors" :key="variant" :variant="variant" muted borderless="effect" :title="labels.edit"><IconEdit/></ButtonAction></div>',
        'ButtonAction',
    ),
};

export const StatusDot: StoryObj = { ...Default, args: { statusDot: 'danger' } };
export const StatusDotColors: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap items-center gap-6 p-3"><div v-for="color in [\'default\',\'primary\',\'secondary\',\'info\',\'success\',\'warning\',\'danger\']" :key="color" class="grid justify-items-center gap-2"><ButtonAction variant="default" :status-dot="color" :title="labels.info"><IconMail/></ButtonAction><span class="text-xs">{{ color }}</span></div></div>',
        'ButtonAction',
    ),
};
export const StatusDotSizes: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex items-center gap-6 p-3"><ButtonAction v-for="size in [\'xs\',\'sm\',\'default\',\'lg\']" :key="size" :size="size" variant="primary" status-dot="success" :title="labels.success"><IconCheck/></ButtonAction></div>',
        'ButtonAction',
    ),
};
export const StatusDotStates: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex items-center gap-6 p-3"><ButtonAction variant="warning" :status-dot="true" :title="labels.warning"><IconMail/></ButtonAction><ButtonAction disabled status-dot="danger" :title="labels.error"><IconMail/></ButtonAction></div>',
        'ButtonAction',
    ),
};

export const StatusDotWithLabel: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<ButtonAction variant="primary" status-dot="danger" :label="labels.notifications"><IconMail/></ButtonAction>',
        'ButtonAction',
    ),
};
