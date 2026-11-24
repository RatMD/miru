import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import { formStory } from '../../stories/form-fixtures';
import { Select } from './index';

const meta: Meta = {
    title: 'FormFields/Select',
    parameters: { docs: { description: { component: componentDescription('Select') } } },
    component: Select,
    args: { size: 'default', shape: 'default', disabled: false, clearable: false },
    argTypes: {
        clearable: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        shape: { control: 'select', options: ['default', 'round'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<Select :shape="args.shape" v-model="selection" :disabled="args.disabled"><div class="flex w-full items-center gap-2"><SelectTrigger class="flex-1" :size="args.size" :aria-label="labels.choice"><SelectValue :placeholder="labels.choice" /></SelectTrigger><SelectClear v-if="args.clearable" :size="args.size" /></div><SelectContent><SelectItem v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</SelectItem></SelectContent></Select><output data-testid="value">{{ selection }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
export const Round: StoryObj = { args: { shape: 'round' } };

export const Clearable: StoryObj = { args: { clearable: true } };
export const Multiple: StoryObj = {
    args: { clearable: true },
    render: formStory(
        '<Select :shape="args.shape" multiple v-model="checks" :disabled="args.disabled"><div class="flex w-full items-center gap-2"><SelectTrigger class="flex-1" :size="args.size" :aria-label="labels.choice"><SelectValue :placeholder="labels.choice" /></SelectTrigger><SelectClear v-if="args.clearable" :size="args.size" /></div><SelectContent><SelectItem v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</SelectItem></SelectContent></Select><output data-testid="value">{{ checks }}</output>',
    ),
};

export const Searchable: StoryObj = {
    render: formStory(
        '<SelectSearch :shape="args.shape" v-model="selection" :options="options" :label="labels.choice" :placeholder="labels.choice" :disabled="args.disabled" :size="args.size"/><output data-testid="value">{{ selection }}</output>',
    ),
};
export const SearchableDisabled: StoryObj = { ...Searchable, args: { disabled: true } };
export const SearchableEmpty: StoryObj = {
    render: formStory(
        '<SelectSearch :shape="args.shape" :options="[]" :label="labels.choice" :disabled="args.disabled" :size="args.size"/>',
    ),
};
