import { GLOBALS_UPDATED, SET_GLOBALS, STORY_ARGS_UPDATED } from 'storybook/internal/core-events';
import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

// Use the existing demo theme switcher for the sidebar, toolbar and addon panels too.
addons.register('miru/interface-theme', (api) => {
    const applyTheme = ({ globals }: { globals: Record<string, unknown> }) => {
        addons.setConfig({ theme: globals.theme === 'dark' ? themes.dark : themes.light });
    };
    applyTheme({ globals: api.getGlobals() });
    addons.getChannel().on(SET_GLOBALS, applyTheme);
    addons.getChannel().on(GLOBALS_UPDATED, applyTheme);
});

// Refresh the manager view after its story index receives Vue-driven Args updates.
addons.register('miru/controls-refresh', (api) => {
    let revision = 0;
    addons.getChannel().on(STORY_ARGS_UPDATED, () => {
        void api.setAddonState('miru/controls-refresh', { revision: ++revision });
    });
});
