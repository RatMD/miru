import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { paginationApiCopy } from '../../stories/pagination-documentation';
import { PaginationDocs } from '../../stories/PaginationDocs';
import { Pagination } from './index';
const meta = {
    ...componentControls('Pagination'),
    title: 'Components/Pagination',
    component: Pagination,
    parameters: {
        controls: { include: controlNames('Pagination') },
        docs: {
            page: PaginationDocs,
            description: { component: componentDescription('Pagination') },
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
                description: paginationApiCopy.Pagination.props[name],
                table: { category: 'Pagination props' },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Pagination v-bind="controlProps()" v-model:page="page"/>',
        'Pagination',
    ),
};
export const Compact: StoryObj = {
    args: { mode: 'compact' },
    render: componentStory(
        '<Pagination v-bind="controlProps()" v-model:page="page"/>',
        'Pagination',
    ),
};
export const NavigationOnly: StoryObj = {
    args: { mode: 'navigation' },
    render: componentStory(
        '<Pagination v-bind="controlProps()" v-model:page="page"/>',
        'Pagination',
    ),
};
export const Simple: StoryObj = {
    args: { mode: 'simple' },
    render: componentStory(
        '<Pagination v-bind="controlProps()" v-model:page="page"/>',
        'Pagination',
    ),
};
export const Appearances: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div v-for="variant in [\'outline\',\'ghost\']" :key="variant" class="grid gap-3"><span class="text-sm font-medium">{{ variant }}</span><Pagination v-model:page="page" :total="100" :items-per-page="10" show-edges :variant="variant" mode="compact"/></div>',
        'Pagination',
    ),
};

export const Connected: StoryObj = {
    ...Default,
    args: { connected: true, variant: 'outline', page: 5, total: 200 },
};
export const ConnectedNavigation: StoryObj = {
    ...Default,
    args: { connected: true, variant: 'outline', mode: 'navigation' },
};
