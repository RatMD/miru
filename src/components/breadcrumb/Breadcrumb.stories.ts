import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { breadcrumbApiCopy } from '../../stories/breadcrumb-documentation';
import { BreadcrumbDocs } from '../../stories/BreadcrumbDocs';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Breadcrumb } from './index';
const meta = {
    ...componentControls('Breadcrumb'),
    title: 'Components/Breadcrumb',
    id: 'components-breadcrumbs',
    component: Breadcrumb,
    parameters: {
        controls: { include: controlNames('Breadcrumb') },
        docs: {
            page: BreadcrumbDocs,
            description: { component: componentDescription('Breadcrumb') },
        },
    },
} satisfies Meta;
for (const [name, control] of Object.entries(meta.argTypes ?? {})) {
    if (!control) continue;
    const rootDescription = breadcrumbApiCopy.Breadcrumb.props[name];
    const menuDescription = breadcrumbApiCopy.BreadcrumbMenu.props[name];
    const examples: Record<string, string> = {
        current: 'The example current page label.',
        showOverflow: 'Show an indicator for omitted items in the example.',
        showMenu: 'Use a contextual menu for the example current page.',
    };
    const description = rootDescription ?? menuDescription ?? examples[name];
    const category = rootDescription
        ? 'Breadcrumb props'
        : menuDescription
          ? 'BreadcrumbMenu props'
          : 'Example content';
    Object.assign(control, { description, table: { category } });
}
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Breadcrumb v-bind="controlProps()"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#home">{{ labels.home }}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem v-if="args.showOverflow"><BreadcrumbEllipsis/></BreadcrumbItem><BreadcrumbItem v-else><BreadcrumbLink href="#projects">{{ labels.projects }}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbMenu v-if="args.showMenu" v-model="breadcrumbValue" :label="args.current" :show-arrow="args.showArrow" :align="args.align" :items="[{ value: \'overview\', label: labels.first, href: \'#overview\' }, { value: \'activity\', label: labels.second, href: \'#activity\' }, { value: \'settings\', label: labels.third, href: \'#settings\' }]"/><BreadcrumbPage v-else>{{ args.current }}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>',
        'Breadcrumb',
    ),
};
