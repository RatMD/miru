import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, fn, waitFor, within } from 'storybook/test';
import { avatarApiCopy } from '../../stories/avatar-documentation';
import { AvatarDocs } from '../../stories/AvatarDocs';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Avatar } from './index';
const meta = {
    ...componentControls('Avatar'),
    argTypes: Object.fromEntries(
        Object.entries(componentControls('Avatar').argTypes).map(([name, control]) => {
            const description = avatarApiCopy.Avatar.props?.[name];
            return [
                name,
                {
                    ...control,
                    description: description ?? 'The example initials shown in AvatarFallback.',
                    table: {
                        ...control.table,
                        category: description ? 'Avatar props' : 'Example content',
                    },
                },
            ];
        }),
    ),
    title: 'Components/Avatar',
    component: Avatar,
    parameters: {
        controls: { include: controlNames('Avatar') },
        docs: { page: AvatarDocs, description: { component: componentDescription('Avatar') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Avatar v-bind="controlProps()"><AvatarFallback>{{ args.initials }}</AvatarFallback></Avatar>',
        'Avatar',
    ),
};
export const WithImage: StoryObj<{ onImageStatus: ReturnType<typeof fn> }> = {
    args: { onImageStatus: fn() },
    parameters: { controls: { include: ['size', 'shape', 'class'] } },
    render: componentStory(
        "<Avatar v-bind=\"controlProps()\"><AvatarImage @loading-status-change=\"args.onImageStatus\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%234f46e5'/%3E%3Ctext x='40' y='50' text-anchor='middle' fill='white' font-size='24'%3ESH%3C/text%3E%3C/svg%3E\" :alt=\"labels.current\"/><AvatarFallback>SH</AvatarFallback></Avatar>",
        'Avatar',
    ),
    play: async ({ args, canvasElement }) => {
        await waitFor(() => expect(args.onImageStatus).toHaveBeenCalledWith('loaded'));
        await expect(within(canvasElement).getByRole('img')).toBeVisible();
    },
};
export const SizesAndShapes: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div v-for="shape in [\'round\',\'square\',\'squircle\',\'hexagon\']" :key="shape" class="flex flex-wrap items-end gap-4"><div v-for="size in [\'xs\',\'sm\',\'default\',\'lg\',\'xl\']" :key="size" class="grid justify-items-center gap-2"><Avatar :size="size" :shape="shape"><AvatarFallback>SH</AvatarFallback></Avatar><span class="text-xs text-muted-foreground">{{ shape }} / {{ size }}</span></div></div>',
        'Avatar',
    ),
};
export const Colors: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap gap-4"><div v-for="tone in avatarColors" :key="tone" class="grid justify-items-center gap-2"><Avatar :tone="tone" size="lg"><AvatarFallback>SH</AvatarFallback></Avatar><span class="text-xs">{{ tone }}</span></div></div>',
        'Avatar',
    ),
};
