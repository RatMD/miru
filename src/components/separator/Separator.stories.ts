import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { separatorApiCopy } from '../../stories/separator-documentation';
import { SeparatorDocs } from '../../stories/SeparatorDocs';
import { Separator } from './index';
const meta = {
    ...componentControls('Separator'),
    title: 'Components/Separator',
    component: Separator,
    parameters: {
        controls: { include: controlNames('Separator') },
        docs: {
            page: SeparatorDocs,
            description: { component: componentDescription('Separator') },
        },
    },
} satisfies Meta;
Object.assign(
    meta.argTypes,
    Object.fromEntries(
        Object.entries(meta.argTypes).map(([name, control]) => [
            name,
            {
                ...control,
                description: separatorApiCopy.Separator.props[name],
                table: { category: 'Separator props' },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        "<div :style=\"{height:args.orientation === 'vertical' ? '6rem' : '1rem'}\"><Separator v-bind=\"controlProps()\"/></div>",
        'Separator',
    ),
};
export const Vertical: StoryObj = {
    args: { orientation: 'vertical' },
    render: (args) => ({
        components: { Separator },
        setup: () => ({ args }),
        template:
            '<div class="flex h-8 items-center gap-4 text-sm"><span>Overview</span><Separator v-bind="args" :decorative="false" /><span>Activity</span><Separator v-bind="args" /><span>Settings</span></div>',
    }),
    play: async ({ canvasElement }) => {
        const separator = within(canvasElement).getByRole('separator');
        await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
        await expect(separator.getBoundingClientRect().width).toBe(1);
        await expect(separator.getBoundingClientRect().height).toBeGreaterThan(20);
    },
};
