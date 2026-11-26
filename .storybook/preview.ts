import type { Preview } from '@storybook/vue3-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { setup } from '@storybook/vue3';
import { ContextProvider } from '../src/components/provider';
import { ComponentDocs } from '../src/stories/ComponentDocs';
import './preview.css';
import { MiruDocsContainer } from './docs-theme';

// Keep interactive examples quiet without changing library or consumer Vue settings.
// Opt into diagnostics with VITE_STORYBOOK_VUE_WARNINGS=true; tests keep Vue warnings.
let previewAppSequence = 0;
setup((app) => {
    // Docs mounts each story as a separate app within the same document.
    app.config.idPrefix = `miru-story-${++previewAppSequence}`;
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
            components: { story, ContextProvider },
            setup: () => ({ locale: context.globals.locale || 'en' }),
            template: '<ContextProvider :locale="locale"><story /></ContextProvider>',
        }),
        withThemeByClassName({
            themes: { light: 'light', dark: 'dark' },
            defaultTheme: 'light',
        }),
    ],
    parameters: {
        docs: { container: MiruDocsContainer, page: ComponentDocs },
        options: {
            storySort: {
                method: 'alphabetical',
                includeNames: false,
                order: [
                    'Components',
                    'Forms',
                    'FormFields',
                    'Overlays',
                    'Utilities',
                    'Extensions',
                    'Layouts',
                    'Getting Started',
                    'Theming',
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
