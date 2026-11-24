import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { componentDescription } from '../../stories/component-descriptions';
import { formStory, nextFormStoryId } from '../../stories/form-fixtures';
import { Label } from '../label';
import { Switch } from './index';

const meta: Meta = {
    title: 'FormFields/Switch',
    parameters: { docs: { description: { component: componentDescription('Switch') } } },
    component: Switch,
    args: { size: 'default', variant: 'default', trackPadding: 0, disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
        variant: { control: 'select', options: ['default', 'success', 'danger-success'] },
        trackPadding: { control: { type: 'number', min: 0, step: 1 } },
    },
    render: formStory(
        '<div style="display:flex;align-items:center;gap:0.5rem"><Switch :id="instanceId" v-bind="args" v-model="enabled" /><Label :for="instanceId">{{ labels.enabled }}</Label></div><output data-testid="value">{{ enabled }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const LargePadded: StoryObj = { args: { size: 'lg', trackPadding: 2 } };

export const Success: StoryObj = { args: { variant: 'success' } };
export const DangerSuccess: StoryObj = { args: { variant: 'danger-success' } };
export const Variants: StoryObj = {
    parameters: { controls: { include: ['size', 'trackPadding', 'disabled'] } },
    render: (args, { globals }) => ({
        components: { Switch, Label },
        setup: () => ({
            args,
            instanceId: nextFormStoryId(),
            labels: globals.locale === 'de' ? { on: 'An', off: 'Aus' } : { on: 'On', off: 'Off' },
            items: ref(
                ['default', 'success', 'danger-success'].map((variant) => ({
                    variant,
                    left: false,
                    right: true,
                })),
            ),
        }),
        template: `<div class="grid gap-5"><div v-for="item in items" :key="item.variant" class="flex flex-wrap items-center gap-6"><span class="w-32 text-sm">{{ item.variant }}</span><div class="flex items-center gap-2"><Switch v-bind="args" :id="instanceId + '-' + item.variant + '-off'" :variant="item.variant" v-model="item.left"/><Label :for="instanceId + '-' + item.variant + '-off'">{{ item.left ? labels.on : labels.off }}</Label></div><div class="flex items-center gap-2"><Switch v-bind="args" :id="instanceId + '-' + item.variant + '-on'" :variant="item.variant" v-model="item.right"/><Label :for="instanceId + '-' + item.variant + '-on'">{{ item.right ? labels.on : labels.off }}</Label></div></div></div>`,
    }),
};
