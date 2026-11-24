import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionContent,
} from './index';
const meta = {
    ...componentControls('Accordion'),
    title: 'Components/Accordion',
    component: Accordion,
    parameters: {
        controls: { include: controlNames('Accordion') },
        docs: { description: { component: componentDescription('Accordion') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Accordion v-bind="controlProps()" v-model="accordion"><AccordionItem v-for="value in [\'one\',\'two\']" :key="value" :value="value"><AccordionHeader :muted-actions="args.mutedActions"><AccordionTrigger :badges-position="args.badgesPosition">{{ value === \'one\' ? labels.first : labels.second }}<template v-if="args.showDescription" #description>{{ labels.description }}</template><template v-if="args.showBadges" #badges><Badge variant="ghostly">{{ labels.ready }}</Badge><Badge variant="outline">2</Badge></template></AccordionTrigger><template v-if="args.showActions" #actions><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite" :aria-pressed="favorites.includes(value)" @click="favorites = favorites.includes(value) ? favorites.filter(item => item !== value) : [...favorites, value]"><IconStar :class="favorites.includes(value) && \'fill-current\'"/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></AccordionHeader><AccordionContent :max-height="args.maxHeight || undefined"><p v-for="n in (args.maxHeight ? 12 : 1)" :key="n" class="text-sm mb-3 last:mb-0">{{ labels.description }}</p></AccordionContent></AccordionItem></Accordion>',
        'Accordion',
    ),
};
export const MultipleWithActions: StoryObj = {
    ...Default,
    args: {
        type: 'multiple',
        modelValue: ['one'],
        showDescription: true,
        showBadges: true,
        showActions: true,
    },
};
export const BadgesBelowTitle: StoryObj = {
    args: {
        type: 'multiple',
        modelValue: ['one'],
        showDescription: false,
        showBadges: true,
        showActions: true,
        badgesPosition: 'below',
    },
    render: componentStory(
        '<Accordion v-bind="controlProps()" v-model="accordion"><AccordionItem v-for="value in [\'one\',\'two\']" :key="value" :value="value"><AccordionHeader :muted-actions="args.mutedActions"><AccordionTrigger :badges-position="args.badgesPosition">{{ value === \'one\' ? labels.first : labels.second }}<template v-if="args.showDescription" #description>{{ labels.description }}</template><template v-if="args.showBadges" #badges><Badge variant="ghostly">{{ labels.ready }}</Badge><Badge variant="outline">2</Badge></template></AccordionTrigger><template v-if="args.showActions" #actions><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite" :aria-pressed="favorites.includes(value)" @click="favorites = favorites.includes(value) ? favorites.filter(item => item !== value) : [...favorites, value]"><IconStar :class="favorites.includes(value) && \'fill-current\'"/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></AccordionHeader><AccordionContent :max-height="args.maxHeight || undefined"><p v-for="n in (args.maxHeight ? 12 : 1)" :key="n" class="text-sm mb-3 last:mb-0">{{ labels.description }}</p></AccordionContent></AccordionItem></Accordion>',
        'Accordion',
    ),
};
export const ScrollableContent: StoryObj = {
    args: { modelValue: 'one', maxHeight: '12rem' },
    render: componentStory(
        '<Accordion v-bind="controlProps()" v-model="accordion"><AccordionItem v-for="value in [\'one\',\'two\']" :key="value" :value="value"><AccordionHeader :muted-actions="args.mutedActions"><AccordionTrigger :badges-position="args.badgesPosition">{{ value === \'one\' ? labels.first : labels.second }}<template v-if="args.showDescription" #description>{{ labels.description }}</template><template v-if="args.showBadges" #badges><Badge variant="ghostly">{{ labels.ready }}</Badge><Badge variant="outline">2</Badge></template></AccordionTrigger><template v-if="args.showActions" #actions><ButtonAction variant="warning" size="sm" borderless="effect" :title="labels.favorite" :aria-pressed="favorites.includes(value)" @click="favorites = favorites.includes(value) ? favorites.filter(item => item !== value) : [...favorites, value]"><IconStar :class="favorites.includes(value) && \'fill-current\'"/></ButtonAction><ButtonAction variant="danger" size="sm" borderless="effect" :title="labels.remove"><IconTrash/></ButtonAction></template></AccordionHeader><AccordionContent :max-height="args.maxHeight || undefined"><p v-for="n in (args.maxHeight ? 12 : 1)" :key="n" class="text-sm mb-3 last:mb-0">{{ labels.description }}</p></AccordionContent></AccordionItem></Accordion>',
        'Accordion',
    ),
};

export const UnmutedActions: StoryObj = { ...Default, args: { mutedActions: false } };

export const Modern: StoryObj = { ...Default, args: { iconMode: 'modern' } };
export const Operator: StoryObj = { ...Default, args: { iconMode: 'operator' } };

export const IconModes: StoryObj = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: {
            Accordion,
            AccordionItem,
            AccordionHeader,
            AccordionTrigger,
            AccordionContent,
        },
        template: `<div class="grid w-80 gap-5">
            <Accordion v-for="mode in ['default', 'modern', 'operator']" :key="mode" type="single" collapsible :icon-mode="mode">
                <AccordionItem value="details">
                    <AccordionHeader><AccordionTrigger>{{ mode }}</AccordionTrigger></AccordionHeader>
                    <AccordionContent>Accordion icon: {{ mode }}</AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible icon-mode="modern">
                <AccordionItem value="override">
                    <AccordionHeader><AccordionTrigger icon-mode="operator">Trigger override</AccordionTrigger></AccordionHeader>
                    <AccordionContent>Individual triggers may override the root icon mode.</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>`,
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        for (const mode of ['default', 'modern', 'operator']) {
            const trigger = canvas.getByRole('button', { name: mode });
            const indicator = trigger.querySelector('[data-slot="accordion-chevron"]')!;
            const icon = indicator.querySelector('svg')!;
            await expect(indicator).toHaveAttribute('data-icon-mode', mode);
            await expect(trigger).toHaveAttribute('aria-expanded', 'false');
            await userEvent.click(trigger);
            await expect(trigger).toHaveAttribute('aria-expanded', 'true');
            await waitFor(() =>
                expect(getComputedStyle(icon).rotate).toBe(mode === 'modern' ? '-90deg' : '180deg'),
            );
            if (mode === 'operator') {
                const vertical = icon.querySelector('[data-slot="accordion-operator-vertical"]')!;
                await waitFor(() => expect(getComputedStyle(vertical).opacity).toBe('0'));
                await userEvent.click(trigger);
                await waitFor(() => expect(getComputedStyle(vertical).opacity).toBe('1'));
                await expect(trigger).toHaveAttribute('aria-expanded', 'false');
            }
        }
        await expect(
            canvas
                .getByRole('button', { name: 'Trigger override' })
                .querySelector('[data-slot="accordion-chevron"]'),
        ).toHaveAttribute('data-icon-mode', 'operator');
    },
};
