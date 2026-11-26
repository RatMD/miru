import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ComponentDocs } from '../../stories/ComponentDocs';
import {
    utilitySummaries,
    utilityDependencyMarkdown,
    describeUtilityControls,
} from '../../stories/utilities-documentation';
import { Breakpoint } from './index';
const meta = {
    title: 'Utilities/Breakpoint',
    component: Breakpoint,
    parameters: {
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    utilitySummaries.Breakpoint +
                    '\n\n' +
                    utilityDependencyMarkdown('Breakpoint', true),
            },
        },
    },
    args: { min: 'md' },
    argTypes: {
        min: { control: 'text' },
        max: { control: 'text' },
        orientation: { control: 'select', options: [undefined, 'portrait', 'landscape'] },
    },
    render: (args) => ({
        components: { Breakpoint },
        setup: () => ({ args }),
        template:
            '<div class="rounded-xl border border-border p-6 text-foreground"><Breakpoint v-bind="args"><template #default="state"><p data-testid="matched">Matching viewport</p><pre>{{ state }}</pre></template><template #else="state"><p data-testid="fallback">Outside the configured range</p><pre>{{ state }}</pre></template></Breakpoint><p class="mt-4 text-sm text-muted-foreground">Resize the preview to switch branches.</p></div>',
    }),
} satisfies Meta;
describeUtilityControls('Breakpoint', meta.argTypes ?? {}, meta);
export default meta;
export const Default: StoryObj = {};
export const BelowMedium: StoryObj = { args: { min: null, max: 'md' } };
export const Custom: StoryObj = {
    args: { min: 'compact', max: 'wide', breakpoints: { compact: 560, wide: 1200 } },
};
export const Landscape: StoryObj = { args: { min: null, orientation: 'landscape' } };
