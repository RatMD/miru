import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IconArrowUpRight, IconFileText, IconCloud } from '@tabler/icons-vue';
import { componentDescription } from '../../stories/component-descriptions';
import { itemApiCopy } from '../../stories/item-documentation';
import { ItemDocs } from '../../stories/ItemDocs';
import { Button } from '../button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemHeader,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from './index';
const components = {
    Button,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemHeader,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
    IconArrowUpRight,
    IconFileText,
    IconCloud,
};
const meta = {
    title: 'Components/Item',
    component: Item,
    parameters: {
        layout: 'padded',
        docs: {
            page: ItemDocs,
            description: {
                component: componentDescription('Item'),
            },
        },
    },
    args: { variant: 'outline', size: 'default', as: 'div', asChild: false, class: '' },
    argTypes: {
        as: { control: 'text' },
        asChild: { control: 'boolean' },
        class: { control: 'text' },
        variant: { control: 'select', options: ['default', 'outline', 'muted'] },
        size: { control: 'select', options: ['default', 'sm'] },
    },
    render: (args) => ({
        components,
        setup: () => ({ args }),
        template:
            '<Item v-bind="args" class="mx-auto max-w-xl"><ItemMedia variant="icon"><IconFileText /></ItemMedia><ItemContent><ItemTitle>Project notes</ItemTitle><ItemDescription>Shared information for your next release.</ItemDescription></ItemContent><ItemActions><Button variant="outline" size="sm">Open</Button></ItemActions></Item>',
    }),
} satisfies Meta;
Object.assign(
    meta.argTypes,
    Object.fromEntries(
        Object.entries(meta.argTypes).map(([name, control]) => [
            name,
            {
                ...control,
                description: itemApiCopy.Item.props[name],
                table: { category: 'Item props' },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {};
export const Variants: StoryObj = {
    render: () => ({
        components,
        template:
            '<div class="mx-auto grid max-w-xl gap-4"><Item v-for="variant in [\'default\',\'outline\',\'muted\']" :key="variant" :variant="variant"><ItemMedia variant="icon"><IconCloud /></ItemMedia><ItemContent><ItemTitle>{{ variant }}</ItemTitle><ItemDescription>Compose the content you need.</ItemDescription></ItemContent></Item></div>',
    }),
};
export const Group: StoryObj = {
    render: () => ({
        components,
        template:
            '<ItemGroup role="list" class="mx-auto max-w-xl rounded-xl border border-border"><template v-for="(name, index) in [\'Workspace\',\'Team\',\'Settings\']" :key="name"><Item role="listitem"><ItemContent><ItemTitle>{{ name }}</ItemTitle><ItemDescription>Manage your {{ name.toLowerCase() }}.</ItemDescription></ItemContent><ItemActions><Button variant="ghost" size="sm">Open</Button></ItemActions></Item><ItemSeparator v-if="index < 2" /></template></ItemGroup>',
    }),
};
export const Link: StoryObj = {
    render: () => ({
        components,
        template:
            '<Item as-child variant="outline" class="mx-auto max-w-xl"><a href="#workspace" @click.prevent><ItemContent><ItemTitle>Open workspace</ItemTitle><ItemDescription>The whole row is a keyboard-accessible link.</ItemDescription></ItemContent><ItemActions><IconArrowUpRight class="size-5" aria-hidden="true" /></ItemActions></a></Item>',
    }),
};
export const HeaderAndFooter: StoryObj = {
    render: () => ({
        components,
        template:
            '<Item variant="outline" class="mx-auto max-w-xl"><ItemHeader><span class="text-xs text-muted-foreground">PROJECT</span><span class="text-xs text-muted-foreground">Updated today</span></ItemHeader><ItemContent><ItemTitle>Release notes</ItemTitle><ItemDescription>A flexible item with header and footer content.</ItemDescription></ItemContent><ItemFooter><span class="text-xs text-muted-foreground">Shared with your team</span><Button size="sm">Review</Button></ItemFooter></Item>',
    }),
};
