import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within } from 'storybook/test';
import { alertApiCopy } from '../../stories/alert-documentation';
import { AlertDocs } from '../../stories/AlertDocs';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Alert, AlertDescription, AlertTitle } from './index';
const meta = {
    ...componentControls('Alert'),
    argTypes: Object.fromEntries(
        Object.entries(componentControls('Alert').argTypes).map(([name, control]) => {
            const description = alertApiCopy.Alert.props?.[name];
            const previewCopy: Record<string, string> = {
                title: 'The example heading in AlertTitle.',
                description: 'The example message in AlertDescription.',
            };
            return [
                name,
                {
                    ...control,
                    description: description ?? previewCopy[name],
                    table: {
                        ...control.table,
                        category: description ? 'Alert props' : 'Example content',
                    },
                },
            ];
        }),
    ),
    title: 'Components/Alert',
    component: Alert,
    parameters: {
        controls: { include: controlNames('Alert') },
        docs: { page: AlertDocs, description: { component: componentDescription('Alert') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Alert v-bind="controlProps()" v-model:open="open"><AlertTitle>{{ args.title }}</AlertTitle><AlertDescription>{{ args.description }}</AlertDescription></Alert>',
        'Alert',
    ),
};
export const Variants: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        "<Alert v-for=\"variant in ['default','accent','info','success','warning','danger']\" :key=\"variant\" :variant=\"variant\"><AlertTitle>{{ labels.title }}</AlertTitle><AlertDescription>{{ labels.description }}</AlertDescription></Alert>",
        'Alert',
    ),
};
export const WithoutTitle: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        "<Alert v-for=\"variant in ['default','accent','info','success','warning','danger']\" :key=\"variant\" :variant=\"variant\"><AlertDescription>{{ labels.description }}</AlertDescription></Alert>",
        'Alert',
    ),
};

export const Dismissable: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        "<Alert v-for=\"variant in ['default','accent','info','success','warning','danger']\" :key=\"variant\" :variant=\"variant\" dismissable><AlertTitle>{{ labels.title }}</AlertTitle><AlertDescription>{{ labels.description }}</AlertDescription></Alert>",
        'Alert',
    ),
};

export const DismissableWithoutTitle: StoryObj = {
    name: 'Dismissable without Title',
    parameters: { controls: { disable: true } },
    render: componentStory(
        "<Alert v-for=\"variant in ['default','accent','info','success','warning','danger']\" :key=\"variant\" :variant=\"variant\" dismissable><AlertDescription>{{ labels.description }}</AlertDescription></Alert>",
        'Alert',
    ),
};

export const WithoutIcon: StoryObj = {
    args: { showIcon: false },
    render: componentStory(
        '<Alert v-bind="controlProps()" v-model:open="open"><AlertTitle>{{ args.title }}</AlertTitle><AlertDescription>{{ args.description }}</AlertDescription></Alert>',
        'Alert',
    ),
};
export const CustomIcon: StoryObj = {
    render: componentStory(
        '<Alert v-bind="controlProps()"><template #icon><IconPackage /></template><AlertTitle>{{ args.title }}</AlertTitle><AlertDescription>{{ args.description }}</AlertDescription></Alert>',
        'Alert',
    ),
};

const softExamples = {
    en: [
        {
            variant: 'default',
            title: 'Workspace notice',
            description: 'Review the latest updates for your workspace.',
        },
        {
            variant: 'accent',
            title: 'Workspace highlight',
            description: 'A highlighted update for your workspace.',
        },
        {
            variant: 'info',
            title: 'Information updated',
            description:
                "We've updated relevant information related to this event. No further steps are needed.",
        },
        {
            variant: 'success',
            title: 'Action completed',
            description:
                'Everything worked as expected. Your changes have been saved successfully. You can continue working without interruption.',
        },
        {
            variant: 'warning',
            title: 'Attention needed',
            description:
                'Review this before continuing. This may affect how the feature or data behaves. Please review the details.',
        },
        {
            variant: 'danger',
            title: 'Action failed',
            description: "We couldn't complete the request. Please try again or check the details.",
        },
    ],
    de: [
        {
            variant: 'default',
            title: 'Hinweis zum Arbeitsbereich',
            description: 'Prüfe die neuesten Änderungen in deinem Arbeitsbereich.',
        },
        {
            variant: 'accent',
            title: 'Neu im Arbeitsbereich',
            description: 'Eine hervorgehobene Änderung für deinen Arbeitsbereich.',
        },
        {
            variant: 'info',
            title: 'Informationen aktualisiert',
            description:
                'Die Informationen zu diesem Ereignis wurden aktualisiert. Weitere Schritte sind nicht erforderlich.',
        },
        {
            variant: 'success',
            title: 'Aktion abgeschlossen',
            description:
                'Deine Änderungen wurden erfolgreich gespeichert. Du kannst ohne Unterbrechung weiterarbeiten.',
        },
        {
            variant: 'warning',
            title: 'Bitte beachten',
            description:
                'Prüfe die Details, bevor du fortfährst. Dies kann sich auf die Funktion oder die Daten auswirken.',
        },
        {
            variant: 'danger',
            title: 'Aktion fehlgeschlagen',
            description:
                'Die Anfrage konnte nicht abgeschlossen werden. Versuche es erneut oder prüfe die Details.',
        },
    ],
};

export const SoftVariants: StoryObj = {
    parameters: { controls: { disable: true } },
    render: (_args, { globals }) => ({
        components: { Alert, AlertTitle, AlertDescription },
        setup: () => ({ examples: softExamples[globals.locale === 'de' ? 'de' : 'en'] }),
        template: `<div class="grid w-[min(28rem,calc(100vw-3rem))] gap-4">
            <Alert v-for="example in examples" :key="example.variant" :variant="example.variant" appearance="soft">
                <AlertTitle>{{ example.title }}</AlertTitle>
                <AlertDescription>{{ example.description }}</AlertDescription>
            </Alert>
        </div>`,
    }),
    play: async ({ canvasElement }) => {
        const alerts = within(canvasElement).getAllByRole('alert');
        await expect(alerts).toHaveLength(6);
        const backgrounds = new Set<string>();
        for (const alert of alerts) {
            await expect(alert).toHaveAttribute('data-appearance', 'soft');
            const style = getComputedStyle(alert);
            backgrounds.add(style.backgroundColor);
            await expect(style.borderTopWidth).toBe('1px');
            await expect(getComputedStyle(alert, '::before').display).toBe('none');
            const icon = alert.querySelector('[data-slot="alert-icon"]')!;
            await expect(
                parseFloat(getComputedStyle(icon).borderTopLeftRadius),
            ).toBeGreaterThanOrEqual(icon.getBoundingClientRect().width / 2);
            await expect(
                getComputedStyle(alert.querySelector('[data-slot="alert-title"]')!).color,
            ).toBe(style.color);
        }
        await expect(backgrounds.size).toBe(6);
    },
};
