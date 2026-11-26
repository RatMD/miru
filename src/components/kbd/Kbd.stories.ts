import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IconCommand, IconArrowUp, IconCornerDownLeft } from '@tabler/icons-vue';
import { componentDescription } from '../../stories/component-descriptions';
import { kbdApiCopy } from '../../stories/kbd-documentation';
import { KbdDocs } from '../../stories/KbdDocs';
import { Kbd, KbdGroup } from './index';

const meta = {
    title: 'Components/Kbd',
    component: Kbd,
    parameters: {
        docs: {
            page: KbdDocs,
            description: {
                component: componentDescription('Kbd'),
            },
        },
    },
    args: { size: 'default', class: '' },
    argTypes: {
        class: { control: 'text' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
    },
    render: (args) => ({
        components: { Kbd },
        setup: () => ({ args }),
        template: '<Kbd v-bind="args">Esc</Kbd>',
    }),
} satisfies Meta;
Object.assign(
    meta.argTypes,
    Object.fromEntries(
        Object.entries(meta.argTypes).map(([name, control]) => [
            name,
            {
                ...control,
                description: kbdApiCopy.Kbd.props[name],
                table: { category: 'Kbd props' },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {};
export const Shortcuts: StoryObj = {
    render: () => ({
        components: { Kbd, KbdGroup },
        template:
            '<div class="grid gap-5"><p class="flex items-center gap-3">Search <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>K</Kbd></KbdGroup></p><p class="flex items-center gap-3">Save <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>Shift</Kbd><span>+</span><Kbd>S</Kbd></KbdGroup></p></div>',
    }),
};
export const Icons: StoryObj = {
    render: () => ({
        components: { Kbd, KbdGroup, IconCommand, IconArrowUp, IconCornerDownLeft },
        template:
            '<KbdGroup aria-label="Command Shift Enter"><Kbd><IconCommand aria-hidden="true" /></Kbd><Kbd><IconArrowUp aria-hidden="true" /></Kbd><Kbd><IconCornerDownLeft aria-hidden="true" /></Kbd></KbdGroup>',
    }),
};
export const Sizes: StoryObj = {
    render: () => ({
        components: { Kbd },
        template:
            '<div class="flex items-center gap-4"><Kbd size="sm">Esc</Kbd><Kbd>Esc</Kbd><Kbd size="lg">Esc</Kbd></div>',
    }),
};
