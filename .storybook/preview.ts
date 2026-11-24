import type { Preview } from '@storybook/vue3-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { setup } from '@storybook/vue3';
import { UiProvider } from '../src/components/provider';
import './preview.css';
import { MiruDocsContainer } from './docs-theme';

// Keep interactive examples quiet without changing library or consumer Vue settings.
// Opt into diagnostics with VITE_STORYBOOK_VUE_WARNINGS=true; tests keep Vue warnings.
setup((app) => {
    if (
        import.meta.env.DEV &&
        import.meta.env.MODE !== 'test' &&
        import.meta.env.VITE_STORYBOOK_VUE_WARNINGS !== 'true'
    ) {
        app.config.warnHandler = () => {};
    }
});

const preview: Preview = {
    tags: ['autodocs'],
    initialGlobals: { locale: 'en', theme: 'light' },
    globalTypes: {
        locale: {
            description: 'Story content locale',
            toolbar: {
                icon: 'globe',
                dynamicTitle: true,
                items: [
                    { value: 'en', title: 'English' },
                    { value: 'de', title: 'Deutsch' },
                ],
            },
        },
    },
    decorators: [
        (story, context) => ({
            components: { story, UiProvider },
            setup: () => ({ locale: context.globals.locale || 'en' }),
            template: '<UiProvider :locale="locale"><story /></UiProvider>',
        }),
        withThemeByClassName({
            themes: { light: 'light', dark: 'dark' },
            defaultTheme: 'light',
        }),
    ],
    parameters: {
        docs: { container: MiruDocsContainer },
        options: {
            storySort: {
                method: 'alphabetical',
                order: [
                    'Getting Started',
                    'Theming',
                    'Components',
                    [
                        'Accordion',
                        'Alert',
                        'Anchor',
                        'Attachment',
                        'AttachmentList',
                        'Avatar',
                        'AvatarStack',
                        'Badge',
                        'BadgeCopy',
                        'BadgeCounter',
                        'Breadcrumbs',
                        'Button',
                        'ButtonAction',
                        'ButtonGroup',
                        'ButtonShadow',
                        'Card',
                        'CardChart',
                        'Carousel',
                        'Code',
                        'CodePanel',
                        'FilterBadges',
                        'Item',
                        'Kbd',
                        'Marker',
                        'Pagination',
                        'Progress',
                        'Separator',
                        'Skeleton',
                        'Spinner',
                        'Tabs',
                        '*',
                    ],
                    'Form',
                    ['Field', 'Generator', 'Form', 'InputGroup', 'Label', '*'],
                    'FormFields',
                    [
                        'Checkbox',
                        'CheckboxGroup',
                        'ColorPicker',
                        'Combobox',
                        'EditorJSON',
                        'EditorMarkdown',
                        'EditorTinyMCE',
                        'Input',
                        'InputDateTime',
                        'InputFile',
                        'InputNumber',
                        'InputOtp',
                        'InputPassword',
                        'InputPhone',
                        'InputSearch',
                        'InputTags',
                        'Radiobox',
                        'RadioGroup',
                        'Select',
                        'Slider',
                        'Switch',
                        'Textarea',
                        'Toggle',
                        'ToggleGroup',
                        'UploadZone',
                        '*',
                    ],
                    'Extensions',
                    ['ApexCharts', 'TimeSlots', 'DataTable', 'FormGenerator', 'Schedule', '*'],
                    'Layout',
                    ['AppBar', 'AuthPage', 'DashboardPage', 'FormPage', '*'],
                    'Overlay',
                    [
                        'Command',
                        'ContextMenu',
                        'Description',
                        'Dialog',
                        'Drawer',
                        'Overlay',
                        'OverlayChoice',
                        'OverlayDetail',
                        'OverlayNotice',
                        'Popover',
                        'Sheet',
                        'Toast',
                        'Tooltip',
                        '*',
                    ],
                    'Utilities',
                    [
                        'AspectRatio',
                        'Backdrop',
                        'Breakpoint',
                        'Collapsible',
                        'Copy',
                        'Calendar',
                        'EditorFrame',
                        'Deferred',
                        'DropdownMenu',
                        'ScrollArea',
                        '*',
                    ],
                    'Composables',
                    'Plugins',
                    'Support',
                    '*',
                ],
            },
        },
        layout: 'centered',
        controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
        a11y: { test: 'todo' },
    },
};

export default preview;
