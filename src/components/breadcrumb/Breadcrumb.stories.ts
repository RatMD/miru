import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Breadcrumb } from './index';
const meta = {
    ...componentControls('Breadcrumb'),
    title: 'Components/Breadcrumbs',
    component: Breadcrumb,
    parameters: {
        controls: { include: controlNames('Breadcrumb') },
        docs: { description: { component: componentDescription('Breadcrumb') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Breadcrumb v-bind="controlProps()"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#home">{{ labels.home }}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem v-if="args.showOverflow"><BreadcrumbEllipsis/></BreadcrumbItem><BreadcrumbItem v-else><BreadcrumbLink href="#projects">{{ labels.projects }}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbMenu v-if="args.showMenu" v-model="breadcrumbValue" :label="args.current" :show-arrow="args.showArrow" :align="args.align" :items="[{ value: \'overview\', label: labels.first, href: \'#overview\' }, { value: \'activity\', label: labels.second, href: \'#activity\' }, { value: \'settings\', label: labels.third, href: \'#settings\' }]"/><BreadcrumbPage v-else>{{ args.current }}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>',
        'Breadcrumb',
    ),
};
