import { Title, Markdown, Primary, Controls, Stories, useOf } from '@storybook/addon-docs/blocks';
import { createElement, Fragment } from 'react';
import { componentSummary } from './component-documentation';

/** Keep Storybook focused on a short introduction; full guides live in VitePress. */
function ComponentIntro() {
    const { preparedMeta } = useOf('meta', ['meta']);
    const description =
        preparedMeta.parameters.docs?.description?.component ??
        componentSummary(preparedMeta.title.split('/').at(-1) ?? 'Component');
    const intro = typeof description === 'string' ? description.split(/\n\s*\n/)[0] : '';
    return intro ? createElement(Markdown, null, intro) : null;
}

export function ComponentDocs({ showControls = true }: { showControls?: boolean }) {
    return createElement(
        Fragment,
        null,
        createElement(Title),
        createElement(ComponentIntro),
        createElement(Primary),
        showControls && createElement('h2', null, 'Playground controls'),
        showControls && createElement(Controls),
        createElement(Stories),
    );
}

/** Examples such as booking scenarios provide their own interactive controls. */
export function ComponentExamplesDocs() {
    return createElement(ComponentDocs, { showControls: false });
}
