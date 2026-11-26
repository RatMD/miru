import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { selectionVariantsPlay } from '../../stories/selection-checks';
import SelectionVariantsDemo from '../../stories/SelectionVariantsDemo.vue';
import { tabsApiCopy } from '../../stories/tabs-documentation';
import { TabsDocs } from '../../stories/TabsDocs';
import TabsNavigationDemo from '../../stories/TabsNavigationDemo.vue';
import { Tabs } from './index';
const meta = {
    ...componentControls('Tabs'),
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        controls: { include: controlNames('Tabs') },
        docs: { page: TabsDocs, description: { component: componentDescription('Tabs') } },
    },
} satisfies Meta;
Object.assign(
    meta.argTypes,
    Object.fromEntries(
        Object.entries(meta.argTypes).map(([name, control]) => [
            name,
            {
                ...control,
                description: tabsApiCopy.Tabs.props[name],
                table: { ...control?.table, category: 'Tabs props' },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Tabs v-bind="controlProps()" v-model="active" :tabs="tabs" :aria-label="labels.title"><template #overview>{{ labels.description }}</template><template #activity>{{ labels.details }}</template></Tabs>',
        'Tabs',
    ),
};
export const Vertical: StoryObj = { ...Default, args: { orientation: 'vertical' } };

export const Variants: StoryObj = {
    parameters: { controls: { disable: true }, layout: 'padded' },
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="tabs" />',
    }),
};
export const ItemOverrides: StoryObj = {
    parameters: { controls: { disable: true }, layout: 'padded' },
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="tabs" overrides />',
    }),
};

export const Interaction: StoryObj = { ...Variants, play: selectionVariantsPlay('tabs') };

const navigation: StoryObj['render'] = (args, { globals }) => ({
    components: { TabsNavigationDemo },
    setup: () => ({ args, locale: globals.locale || 'en' }),
    template: '<TabsNavigationDemo v-bind="args" :locale="locale" />',
});

export const Buttons: StoryObj = {
    render: navigation,
    args: { appearance: 'buttons', orientation: 'vertical' },
    parameters: { layout: 'padded' },
    play: async ({ canvasElement, globals }) => {
        const canvas = within(canvasElement);
        const first = canvas.getByRole('tab', {
            name: globals.locale === 'de' ? 'Allgemein' : 'General',
        });
        await expect(canvasElement.querySelector('[data-slot="tabs-indicator"]')).toBeNull();
        await expect(first).toHaveAttribute('aria-selected', 'true');
        await expect(getComputedStyle(first).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
        first.focus();
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() =>
            expect(canvas.getAllByRole('tab')[1]!).toHaveAttribute('aria-selected', 'true'),
        );
        await expect(canvas.getAllByRole('tab').at(-1)!).toBeDisabled();
    },
};
export const HorizontalButtons: StoryObj = {
    ...Buttons,
    args: { appearance: 'buttons', orientation: 'horizontal' },
    play: undefined,
};
export const NeutralButtons: StoryObj = {
    ...Buttons,
    args: { ...Buttons.args, variant: 'default' },
    play: undefined,
};
export const BorderedButtons: StoryObj = {
    ...Buttons,
    args: { ...Buttons.args, bordered: true },
    play: undefined,
};
export const ButtonsWithActiveIndicator: StoryObj = {
    ...Buttons,
    args: { ...Buttons.args, activeIndicator: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getAllByRole('tab')[2]!);
        const selected = canvas.getAllByRole('tab')[2]!;
        await expect(selected).toHaveAttribute('aria-selected', 'true');
        await expect(selected.querySelector('[data-slot="tabs-active-indicator"]')!).toBeVisible();
        await expect(
            canvasElement.querySelectorAll('[data-slot="tabs-active-indicator"]'),
        ).toHaveLength(1);
    },
};
export const BorderedButtonsWithIndicator: StoryObj = {
    ...ButtonsWithActiveIndicator,
    args: { ...ButtonsWithActiveIndicator.args, bordered: true },
};
export const ButtonColors: StoryObj = {
    parameters: { controls: { disable: true }, layout: 'padded' },
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="tabs" appearance="buttons" />',
    }),
};
export const ButtonColorInteraction: StoryObj = {
    ...ButtonColors,
    play: selectionVariantsPlay('tabs'),
};
export const ButtonItemOverrides: StoryObj = {
    ...ButtonColors,
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="tabs" appearance="buttons" overrides />',
    }),
    play: undefined,
};

/** The same checks exercise the desktop popover and mobile drawer at their actual breakpoint. */
function overflowPlay(showAll: boolean): StoryObj['play'] {
    return async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(canvasElement.ownerDocument.body);
        await waitFor(() =>
            expect(canvasElement.querySelector('[data-tabs-overflow-trigger]')).not.toBeNull(),
        );
        const visible = canvas.getAllByRole('tab').map((tab) => tab.textContent!.trim());
        const first = canvas.getAllByRole('tab')[0]!;
        const isDesktop = matchMedia('(min-width: 768px)').matches;
        await userEvent.click(
            canvasElement.querySelector<HTMLElement>('[data-tabs-overflow-trigger]')!,
        );
        const popup = await body.findByRole('dialog');
        const options = within(popup)
            .getAllByRole('button')
            .filter(
                (button) => !button.hasAttribute('data-slot') || button.dataset.slot === 'button',
            );
        // Drawer has a close button too; only option buttons carry an explicit selection state.
        const tabs = options.filter(
            (button) =>
                button.hasAttribute('aria-current') ||
                button.getAttribute('data-state') === 'inactive',
        );
        if (!isDesktop && showAll) {
            await expect(tabs).toHaveLength(6);
            await expect(tabs[0]!).toHaveAttribute('aria-current', 'true');
        } else {
            await expect(tabs).toHaveLength(6 - visible.length);
            for (const tab of tabs) await expect(visible).not.toContain(tab.textContent!.trim());
        }
        await expect(tabs.at(-1)!).toBeDisabled();
        const enabled = tabs.filter((tab) => !tab.hasAttribute('disabled'));
        const target = enabled.at(-1)!;
        const targetLabel = target.textContent!.trim();
        await userEvent.click(target);
        await waitFor(() => expect(body.queryByRole('dialog')).toBeNull());
        await waitFor(() =>
            expect(
                canvas.getAllByRole('tab').find((tab) => tab.textContent!.trim() === targetLabel)!,
            ).toHaveAttribute('aria-selected', 'true'),
        );
        await expect(first).not.toHaveAttribute('aria-selected', 'true');
    };
}
export const Overflow: StoryObj = {
    render: navigation,
    args: {
        appearance: 'line',
        orientation: 'horizontal',
        overflow: true,
        drawerShowAllTabs: true,
    },
    parameters: { layout: 'padded' },
    play: overflowPlay(true),
};
export const DrawerHiddenTabsOnly: StoryObj = {
    ...Overflow,
    args: { ...Overflow.args, drawerShowAllTabs: false },
    play: overflowPlay(false),
};
export const ButtonsOverflow: StoryObj = {
    ...Overflow,
    args: { ...Overflow.args, appearance: 'buttons' },
};
