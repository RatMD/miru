import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentStory } from '../../stories/component-fixtures';
import { ComponentDocs } from '../../stories/ComponentDocs';
import {
    utilitySummaries,
    utilityDependencyMarkdown,
    describeUtilityControls,
} from '../../stories/utilities-documentation';
import { DropdownMenu } from './index';
const meta = {
    ...componentControls('DropdownMenu'),
    title: 'Utilities/DropdownMenu',
    component: DropdownMenu,
    parameters: {
        controls: { include: controlNames('DropdownMenu') },
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    utilitySummaries.DropdownMenu +
                    '\n\n' +
                    utilityDependencyMarkdown('DropdownMenu', true),
            },
        },
    },
} satisfies Meta;
describeUtilityControls('DropdownMenu', meta.argTypes ?? {}, meta);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<DropdownMenu v-bind="controlProps()" v-model:open="open"><DropdownMenuTrigger as-child><Button variant="outline">{{ labels.choose }}</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>{{ labels.title }}</DropdownMenuLabel><DropdownMenuItem @select="feedback = labels.edit">{{ labels.edit }}</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuCheckboxItem v-model="checked">{{ labels.notifications }}</DropdownMenuCheckboxItem><DropdownMenuSub><DropdownMenuSubTrigger>{{ labels.more }}</DropdownMenuSubTrigger><DropdownMenuSubContent><DropdownMenuItem>{{ labels.archive }}</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub></DropdownMenuContent></DropdownMenu><output>{{ feedback }}</output>',
        'DropdownMenu',
    ),
};
