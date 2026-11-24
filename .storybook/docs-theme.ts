import type { DocsContainerProps } from '@storybook/addon-docs/blocks';
import type { PropsWithChildren } from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { createElement, useSyncExternalStore } from 'react';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import { themes } from 'storybook/theming';

let currentTheme: 'light' | 'dark' = 'light';
const listeners = new Set<() => void>();

/** Keep documentation pages in sync, including MDX pages without inline stories. */
function applyTheme({ globals }: { globals: Record<string, unknown> }): void {
    currentTheme = globals.theme === 'dark' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    document.documentElement.classList.toggle('light', currentTheme === 'light');
    for (const listener of listeners) {
        listener();
    }
}

addons.getChannel().on(SET_GLOBALS, applyTheme);
addons.getChannel().on(GLOBALS_UPDATED, applyTheme);

function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

/** Apply Storybook's own documentation theme without replacing its standard blocks. */
function MiruDocsContainer({ children, ...props }: PropsWithChildren<DocsContainerProps>) {
    const theme = useSyncExternalStore(
        subscribe,
        () => currentTheme,
        () => 'light' as const,
    );
    return createElement(DocsContainer, { ...props, theme: themes[theme] }, children);
}

export { MiruDocsContainer };
