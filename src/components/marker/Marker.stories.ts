import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Marker } from './index';
const meta = {
    ...componentControls('Marker'),
    title: 'Components/Marker',
    component: Marker,
    parameters: {
        controls: { include: controlNames('Marker') },
        docs: { description: { component: componentDescription('Marker') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Marker v-bind="controlProps()"><MarkerIcon v-if="args.showIcon"><IconCheck/></MarkerIcon><MarkerContent><strong>{{ args.title }}</strong><p>{{ args.description }}</p></MarkerContent></Marker>',
        'Marker',
    ),
};
export const History: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<ol role="list" class="m-0 grid list-none p-0"><li v-for="(entry,index) in [{ icon: \'IconPackage\', tone: \'border-info-300 text-info-600 dark:border-info-700 dark:text-info-400\', title: labels.first }, { icon: \'IconEdit\', tone: \'border-warning-300 text-warning-600 dark:border-warning-700 dark:text-warning-400\', title: labels.second }, { icon: \'IconTruck\', tone: \'border-primary-300 text-primary-600 dark:border-primary-700 dark:text-primary-400\', title: labels.third }, { icon: \'IconCheck\', tone: \'border-success-300 text-success-600 dark:border-success-700 dark:text-success-400\', title: labels.ready }]" :key="index" class="relative pb-6 last:pb-0"><span v-if="index < 3" aria-hidden="true" class="absolute top-8 bottom-0 left-4 border-l border-border "/><Marker><MarkerIcon :class="entry.tone"><component :is="entry.icon"/></MarkerIcon><MarkerContent><strong>{{ entry.title }}</strong><p class="text-muted-foreground">{{ labels.description }}</p><Badge class="mt-2" variant="ghostly">SH-2026-00{{ index+1 }}</Badge></MarkerContent><MarkerMeta :date="\'2026-11-17T\' + String(9 + index).padStart(2, \'0\') + \':30:00\'" :author="index % 2 ? \'Alex Morgan\' : \'Sam Taylor\'"/></Marker></li></ol>',
        'Marker',
    ),
};
