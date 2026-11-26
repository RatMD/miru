import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { cardApiCopy } from '../../stories/card-documentation';
import CardDashboardExamples from '../../stories/CardDashboardExamples.vue';
import { CardDocs } from '../../stories/CardDocs';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Card } from './index';
const meta = {
    ...componentControls('Card'),
    title: 'Components/Card',
    component: Card,
    parameters: {
        controls: { include: controlNames('Card') },
        docs: { page: CardDocs, description: { component: componentDescription('Card') } },
    },
} satisfies Meta;
const exampleCopy: Record<string, string> = {
    title: 'The heading text used in this example.',
    description: 'The supporting text used in this example.',
    headerAside: 'Choose badges, action buttons or both for the example header.',
    showFooter: 'Show the example footer and its button.',
};
for (const [name, control] of Object.entries(meta.argTypes ?? {})) {
    if (!control) continue;
    const owner = name === 'headerBorder' ? 'CardHeader' : 'Card';
    const prop = name === 'headerBorder' ? 'border' : name;
    const description = cardApiCopy[owner].props[prop] ?? exampleCopy[name];
    meta.argTypes[name] = {
        ...control,
        description,
        table: { category: exampleCopy[name] ? 'Example content' : `${owner} props` },
    };
}
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Card v-bind="controlProps()"><CardHeader :border="args.headerBorder"><CardTitle>{{ args.title }}</CardTitle><CardDescription v-if="args.description">{{ args.description }}</CardDescription><CardAction v-if="args.headerAside !== \'none\'"><Badge v-if="[\'badge\',\'both\'].includes(args.headerAside)" variant="success">{{ labels.ready }}</Badge><template v-if="[\'buttons\',\'both\'].includes(args.headerAside)"><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite"><IconStar/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></CardAction></CardHeader><CardContent>{{ labels.details }}</CardContent><CardFooter v-if="args.showFooter"><Button variant="outline">{{ labels.more }}</Button></CardFooter></Card>',
        'Card',
    ),
};
export const ActionsAndDividers: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<Card><CardHeader border class="bg-muted/40"><CardTitle>{{ labels.title }}</CardTitle><CardDescription>{{ labels.description }}</CardDescription><CardAction><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite"><IconStar/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></CardAction></CardHeader><CardContent class="py-4">{{ labels.details }}</CardContent><CardFooter class="justify-end gap-2 border-t bg-muted/30 py-4"><Button variant="ghost">{{ labels.cancel }}</Button><Button variant="primary">{{ labels.confirm }}</Button></CardFooter></Card>',
        'Card',
    ),
};
export const StyledSurfaces: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<Card class="border-primary/40 bg-primary/5 shadow-none"><CardHeader><CardTitle>{{ labels.first }}</CardTitle><CardDescription>{{ labels.description }}</CardDescription></CardHeader><CardContent>{{ labels.details }}</CardContent></Card><Card class="rounded-2xl border-dashed shadow-none"><CardHeader><CardTitle>{{ labels.second }}</CardTitle></CardHeader><CardContent>{{ labels.description }}</CardContent></Card>',
        'Card',
    ),
};
export const WithHeaderBorder: StoryObj = {
    args: { headerBorder: true },
    render: componentStory(
        '<Card v-bind="controlProps()"><CardHeader :border="args.headerBorder"><CardTitle>{{ args.title }}</CardTitle><CardDescription v-if="args.description">{{ args.description }}</CardDescription><CardAction v-if="args.headerAside !== \'none\'"><Badge v-if="[\'badge\',\'both\'].includes(args.headerAside)" variant="success">{{ labels.ready }}</Badge><template v-if="[\'buttons\',\'both\'].includes(args.headerAside)"><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite"><IconStar/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></CardAction></CardHeader><CardContent>{{ labels.details }}</CardContent><CardFooter v-if="args.showFooter"><Button variant="outline">{{ labels.more }}</Button></CardFooter></Card>',
        'Card',
    ),
};
export const WithActionButtons: StoryObj = {
    args: { headerAside: 'buttons', headerBorder: true },
    render: componentStory(
        '<Card v-bind="controlProps()"><CardHeader :border="args.headerBorder"><CardTitle>{{ args.title }}</CardTitle><CardDescription v-if="args.description">{{ args.description }}</CardDescription><CardAction v-if="args.headerAside !== \'none\'"><Badge v-if="[\'badge\',\'both\'].includes(args.headerAside)" variant="success">{{ labels.ready }}</Badge><template v-if="[\'buttons\',\'both\'].includes(args.headerAside)"><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite"><IconStar/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></CardAction></CardHeader><CardContent>{{ labels.details }}</CardContent><CardFooter v-if="args.showFooter"><Button variant="outline">{{ labels.more }}</Button></CardFooter></Card>',
        'Card',
    ),
};
export const BadgesAndActions: StoryObj = {
    args: { headerAside: 'both', headerBorder: true },
    render: componentStory(
        '<Card v-bind="controlProps()"><CardHeader :border="args.headerBorder"><CardTitle>{{ args.title }}</CardTitle><CardDescription v-if="args.description">{{ args.description }}</CardDescription><CardAction v-if="args.headerAside !== \'none\'"><Badge v-if="[\'badge\',\'both\'].includes(args.headerAside)" variant="success">{{ labels.ready }}</Badge><template v-if="[\'buttons\',\'both\'].includes(args.headerAside)"><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite"><IconStar/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></CardAction></CardHeader><CardContent>{{ labels.details }}</CardContent><CardFooter v-if="args.showFooter"><Button variant="outline">{{ labels.more }}</Button></CardFooter></Card>',
        'Card',
    ),
};
export const WithoutDescription: StoryObj = {
    args: { description: '', headerAside: 'buttons' },
    render: componentStory(
        '<Card v-bind="controlProps()"><CardHeader :border="args.headerBorder"><CardTitle>{{ args.title }}</CardTitle><CardDescription v-if="args.description">{{ args.description }}</CardDescription><CardAction v-if="args.headerAside !== \'none\'"><Badge v-if="[\'badge\',\'both\'].includes(args.headerAside)" variant="success">{{ labels.ready }}</Badge><template v-if="[\'buttons\',\'both\'].includes(args.headerAside)"><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite"><IconStar/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></CardAction></CardHeader><CardContent>{{ labels.details }}</CardContent><CardFooter v-if="args.showFooter"><Button variant="outline">{{ labels.more }}</Button></CardFooter></Card>',
        'Card',
    ),
};
export const Borderless: StoryObj = {
    args: { border: false, class: 'shadow-none', showFooter: false },
    render: componentStory(
        '<Card v-bind="controlProps()"><CardHeader :border="args.headerBorder"><CardTitle>{{ args.title }}</CardTitle><CardDescription v-if="args.description">{{ args.description }}</CardDescription><CardAction v-if="args.headerAside !== \'none\'"><Badge v-if="[\'badge\',\'both\'].includes(args.headerAside)" variant="success">{{ labels.ready }}</Badge><template v-if="[\'buttons\',\'both\'].includes(args.headerAside)"><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite"><IconStar/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></CardAction></CardHeader><CardContent>{{ labels.details }}</CardContent><CardFooter v-if="args.showFooter"><Button variant="outline">{{ labels.more }}</Button></CardFooter></Card>',
        'Card',
    ),
};
export const HeaderSlots: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<Card><CardHeader border><CardTitle>{{ labels.title }}</CardTitle><CardDescription>{{ labels.description }}</CardDescription><template #badges><Badge variant="ghostly">{{ labels.ready }}</Badge></template><template #actions><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite"><IconStar/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></CardHeader><CardContent>{{ labels.details }}</CardContent></Card>',
        'Card',
    ),
};

/** Container-sized dashboard links with full-cell hover/focus and grayscale icons. */
export const QuickAccess: StoryObj = {
    args: { containerWidth: 560 },
    argTypes: { containerWidth: { control: { type: 'range', min: 280, max: 1120, step: 16 } } },
    parameters: {
        layout: 'padded',
        controls: { include: ['containerWidth'] },
        docs: {
            description: {
                story: 'shared quick links. Adjust containerWidth to see one, two or more columns based on card width. Entire cells are links; hover and keyboard focus reveal icon colours. The settings menu can disable grayscale.',
            },
        },
    },
    render: (args) => ({
        components: { CardDashboardExamples },
        setup: () => ({ args }),
        template: '<CardDashboardExamples kind="links" :container-width="args.containerWidth" />',
    }),
};
/** A fixed header separator with a bounded, scrollable list of dated entries. */
export const UpcomingEvents: StoryObj = {
    args: { containerWidth: 560 },
    argTypes: { containerWidth: { control: { type: 'range', min: 280, max: 1120, step: 16 } } },
    parameters: {
        layout: 'padded',
        controls: { include: ['containerWidth'] },
        docs: {
            description: {
                story: 'Upcoming dates with a header border, coloured markers, localised dates and full-row hover/focus. ScrollArea limits the list to 256px while the header stays visible. The settings menu toggles the date labels.',
            },
        },
    },
    render: (args) => ({
        components: { CardDashboardExamples },
        setup: () => ({ args }),
        template: '<CardDashboardExamples kind="events" :container-width="args.containerWidth" />',
    }),
};
