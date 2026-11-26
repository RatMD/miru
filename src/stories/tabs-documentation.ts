import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const tabsSummary =
    'Switch between related content panels using line or button-style tabs, with theme colours, icons and badges. Horizontal tabs adapt to limited space with a desktop popover or mobile drawer.';
export function tabsDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        {
            components: [
                {
                    name: 'Badge',
                    url: '/components/api/badge',
                    storybook: '/docs/components-badge--docs',
                },
                {
                    name: 'Button',
                    url: '/components/api/button',
                    storybook: '/docs/components-button--docs',
                },
                {
                    name: 'Drawer',
                    url: '/components/api/drawer',
                    storybook: '/docs/overlay-drawer--docs',
                },
                {
                    name: 'Popover',
                    url: '/components/api/popover',
                    storybook: '/docs/overlay-popover--docs',
                },
            ],
            packages: [
                '@tabler/icons-vue',
                '@vueuse/core',
                'class-variance-authority',
                'clsx',
                'reka-ui',
                'tailwind-merge',
                'vue',
            ],
            primitives: [{ name: 'Reka UI Tabs', url: 'https://reka-ui.com/docs/components/tabs' }],
        },
        storybook,
    );
}
export const tabsApiCopy: Record<
    string,
    {
        props: Record<string, string>;
        events: Record<string, string>;
        slots: Record<string, string>;
        defaults: Record<string, string>;
    }
> = {
    Tabs: {
        props: {
            tabs: 'The ordered tab definitions, each with a unique value and visible label.',
            variant: 'Set the selected-tab colour; individual tabs can override it.',
            appearance: 'Choose underlined tabs (line) or separate tab buttons (buttons).',
            bordered: 'Add an outline to each tab in the buttons appearance.',
            activeIndicator:
                'Add a left-hand colour marker to the selected tab in the buttons appearance.',
            modelValue: 'The selected tab value; bind with v-model to update selection.',
            defaultValue:
                'The fallback selection when modelValue is absent; otherwise the first tab is selected.',
            ariaLabel: 'The accessible name for the tab list and mobile overflow description.',
            content:
                'Render the tab panels; disable this for navigation with externally managed content.',
            unmountOnHide: 'Unmount inactive panels; set to false to preserve their local state.',
            inset: 'Inset horizontal tab controls while keeping the divider at full width.',
            orientation:
                'Arrange the tabs horizontally or vertically and set the keyboard navigation axis.',
            collapseOverflow: 'Move horizontal tabs that do not fit into an overflow menu.',
            drawerShowAllTabs:
                'List all tabs in the mobile overflow drawer; false lists only hidden tabs.',
            contentClass: 'Additional CSS classes for each tab panel.',
        },
        events: { 'update:modelValue': 'Emitted when a tab is selected, with its value.' },
        slots: {
            '[tab.value]': 'Content for the matching tab value; use one named slot per panel.',
        },
        defaults: { bordered: 'false', activeIndicator: 'false', inset: 'false' },
    },
};
export const tabsNotes = [
    {
        title: 'Tab definitions',
        text: 'Each TabItem describes one tab. Use unique `value` strings and supply a matching named slot for its panel.\n\n| Field | Description |\n| --- | --- |\n| `attention` | Accessible text for an attention dot. |\n| `attentionPosition` | Place the dot beside the label or over the icon; falls back to the label without an icon. |\n| `badge` | A numeric badge; zero is displayed too. |\n| `class` | Additional CSS classes for this tab’s control. |\n| `disabled` | Prevent selection of this tab. |\n| `icon` | A decorative Vue icon component. |\n| `indicatorClass` | CSS classes for the selected tab’s line or left-hand marker. |\n| `label` | The visible tab label. |\n| `separatorBefore` | Add a visual separator before a horizontal tab. |\n| `tone` | Legacy colour override for default, warning, success or danger. |\n| `value` | The unique selection value and panel slot name. |\n| `variant` | Override the root colour for this tab; takes precedence over tone. |',
    },
    {
        title: 'Selection and panel state',
        text: 'Bind `v-model` to store the selected tab. Without a model value, selection falls back to `defaultValue` and then the first tab. Provide content with slots such as `#overview` for a tab whose value is `overview`. Inactive panels are unmounted by default; use `:unmount-on-hide="false"` to preserve editor, upload or form state. With `:content="false"`, only the tab navigation is rendered. Supply `aria-label` to name the tab list.',
    },
    {
        title: 'Colours',
        text: 'Use `variant` to choose `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` or `danger`; Tabs uses `primary` by default. A tab’s explicit `variant` takes precedence over a non-default legacy `tone`, followed by the root variant. The same colour follows the tab through horizontal, vertical and overflow navigation, with `indicatorClass` available for a custom indicator. Colours apply to both line and button appearances; disabled tabs retain their disabled treatment.\n\n```vue\n<Tabs v-model="active" :tabs="tabs" variant="accent" />\n```',
    },
    {
        title: 'Appearance and responsive overflow',
        text: '`appearance="line"` uses a divider and animated selection indicator. `appearance="buttons"` uses individual tab surfaces, with optional `bordered` outlines and an `activeIndicator` on the left. Horizontal overflow opens a popover at viewport widths of 768px and above and a drawer below that width. Desktop lists hidden tabs only; mobile lists all tabs unless `drawerShowAllTabs` is false. Vertical tabs do not collapse. With `collapseOverflow` disabled, reserve enough space for all tabs.',
    },
];
