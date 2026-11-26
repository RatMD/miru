import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import { reactive } from 'vue';
import { vNumberFormat } from '../../plugins/number-format';
import { badgeApiCopy } from '../../stories/badge-documentation';
import { BadgeDocs } from '../../stories/BadgeDocs';
import BadgePartsDemo from '../../stories/BadgePartsDemo.vue';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Badge, BadgePart, BadgeSeparator } from './index';
const meta = {
    ...componentControls('Badge'),
    argTypes: Object.fromEntries(
        Object.entries(componentControls('Badge').argTypes).map(([name, control]) => {
            const description = badgeApiCopy.Badge.props?.[name];
            const examples: Record<string, string> = {
                label: 'The example label in the default slot.',
                showIcon: 'Show an example icon.',
            };
            return [
                name,
                {
                    ...control,
                    description: description ?? examples[name],
                    table: {
                        ...control.table,
                        category: description ? 'Badge props' : 'Example content',
                    },
                },
            ];
        }),
    ),
    title: 'Components/Badge',
    component: Badge,
    parameters: {
        controls: { include: controlNames('Badge') },
        docs: { page: BadgeDocs, description: { component: componentDescription('Badge') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Badge v-bind="controlProps()"><IconCheck v-if="args.showIcon"/>{{ args.label }}</Badge>',
        'Badge',
    ),
};
export const Variants: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div v-for="size in [\'default\',\'lg\']" :key="size" class="flex flex-wrap gap-2"><Badge v-for="variant in colors" :key="variant" :variant="variant" :size="size"><IconCheck/>{{ variant }}</Badge></div>',
        'Badge',
    ),
};
export const Links: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap gap-2"><Badge as="link" href="#overview" variant="primary"><IconCheck/>{{ labels.first }}</Badge><Badge as-tag="a" href="#activity" variant="outline" size="lg"><IconMail/>{{ labels.second }}</Badge></div>',
        'Badge',
    ),
};

export const Appearances: StoryObj = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Badge, BadgePart, BadgeSeparator },
        setup: () => ({
            appearances: ['auto', 'solid', 'soft'],
            variants: [
                'default',
                'primary',
                'secondary',
                'accent',
                'info',
                'success',
                'warning',
                'danger',
            ],
        }),
        template: `<div class="grid gap-4">
            <div v-for="appearance in appearances" :key="appearance" class="flex flex-wrap items-center gap-2">
                <span class="w-12 text-xs text-muted-foreground">{{ appearance }}</span>
                <Badge v-for="variant in variants" :key="variant" :variant="variant" :appearance="appearance">{{ variant }}</Badge>
            </div>
            <Badge variant="danger" appearance="soft"><BadgePart><span class="size-1.5 rounded-full bg-current" aria-hidden="true"/>Alpha</BadgePart><BadgeSeparator/><BadgePart class="font-normal">Early preview. APIs may change.</BadgePart></Badge>
        </div>`,
    }),
    play: async ({ canvasElement }) => {
        const badge = (appearance: string) =>
            canvasElement.querySelector<HTMLElement>(
                `[data-variant="primary"][data-appearance="${appearance}"]`,
            )!;
        const themeRoot = canvasElement.ownerDocument.documentElement;
        const wasDark = themeRoot.classList.contains('dark');
        const wasLight = themeRoot.classList.contains('light');
        try {
            for (const dark of [false, true]) {
                themeRoot.classList.toggle('dark', dark);
                themeRoot.classList.toggle('light', !dark);
                // Allow transitions to settle before comparing resolved colors.
                await new Promise((resolve) => setTimeout(resolve, 250));
                const expected = getComputedStyle(badge(dark ? 'soft' : 'solid'));
                const automatic = getComputedStyle(badge('auto'));
                await expect(automatic.backgroundColor).toBe(expected.backgroundColor);
                await expect(automatic.color).toBe(expected.color);
                const accent = canvasElement.querySelector<HTMLElement>(
                    '[data-variant="accent"][data-appearance="solid"]',
                )!;
                await expect(getComputedStyle(accent).color).toBe(
                    getComputedStyle(badge('solid')).color,
                );
                await expect(getComputedStyle(badge('soft')).backgroundColor).not.toBe(
                    getComputedStyle(badge('solid')).backgroundColor,
                );
            }
        } finally {
            themeRoot.classList.toggle('dark', wasDark);
            themeRoot.classList.toggle('light', wasLight);
        }
    },
};

const partsDemo =
    (scenario: 'composition' | 'numbers'): StoryObj['render'] =>
    (_, { globals }) => ({
        components: { BadgePartsDemo },
        setup: () => ({ scenario, locale: globals.locale === 'de' ? 'de-DE' : 'en-US' }),
        template: '<BadgePartsDemo :scenario="scenario" :locale="locale" />',
    });

export const PartsAndSeparators: StoryObj = {
    parameters: { controls: { disable: true } },
    render: partsDemo('composition'),
    play: async ({ canvasElement }) => {
        const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
        for (const badge of badges) {
            const parts = badge.querySelectorAll('[data-slot="badge-part"]');
            const style = getComputedStyle(badge);
            if (parts.length) {
                await expect(style.paddingLeft).toBe('0px');
                await expect(style.columnGap).toBe('0px');
                const expectedPadding = badge.getAttribute('data-size') === 'lg' ? '12px' : '8px';
                await expect(getComputedStyle(parts[0]!).paddingLeft).toBe(expectedPadding);
            } else {
                await expect(style.paddingLeft).not.toBe('0px');
            }
        }
        for (const separator of canvasElement.querySelectorAll('[data-slot="badge-separator"]')) {
            await expect(separator).toHaveAttribute('aria-hidden', 'true');
            await expect(separator.getBoundingClientRect().height).toBeGreaterThan(10);
        }
    },
};
export const FormattedNumbers: StoryObj = {
    parameters: { controls: { disable: true } },
    render: partsDemo('numbers'),
    play: async ({ canvasElement, globals }) => {
        const canvas = within(canvasElement);
        const de = globals.locale === 'de';
        const helper = canvas.getByTestId('number-helper');
        const directive = canvas.getByTestId('number-directive');
        await expect(helper).toHaveTextContent(de ? '1.234,50' : '1,234.50');
        await expect(directive).toHaveTextContent(helper.textContent!);
        await userEvent.click(
            canvas.getByRole('button', { name: de ? 'Wert ändern' : 'Change value' }),
        );
        await expect(directive).toHaveTextContent(de ? '9.876,25' : '9,876.25');
        await userEvent.click(
            canvas.getByRole('button', { name: de ? 'Sprache wechseln' : 'Change locale' }),
        );
        await expect(directive).toHaveTextContent(de ? '9,876.25' : '9.876,25');
        await expect(helper).toHaveTextContent(directive.textContent!);
    },
};
export const ReactiveNumberOptions: StoryObj = {
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Badge, BadgePart, BadgeSeparator },
        directives: { 'number-format': vNumberFormat },
        setup: () => ({
            settings: reactive({
                value: 1234.5,
                locale: 'en-US',
                options: { minimumFractionDigits: 0 },
            }),
        }),
        template: `<div class="flex items-center gap-3">
            <Badge variant="outline"><BadgePart>Quantity</BadgePart><BadgeSeparator /><BadgePart data-testid="reactive-number" v-number-format="settings" /></Badge>
            <button type="button" class="rounded border border-border px-3 py-1 text-sm" @click="settings.options.minimumFractionDigits = 2">Show two decimals</button>
        </div>`,
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByTestId('reactive-number')).toHaveTextContent('1,234.5');
        await userEvent.click(canvas.getByRole('button', { name: 'Show two decimals' }));
        await expect(canvas.getByTestId('reactive-number')).toHaveTextContent('1,234.50');
    },
};
