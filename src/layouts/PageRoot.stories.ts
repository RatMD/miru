import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { provide, useId } from 'vue';
import { Button } from '../components/button';
import { toast } from '../components/toast';
import { miruOptionsKey } from '../miru';
import { ComponentExamplesDocs } from '../stories/ComponentDocs';
import { layoutSummaries, layoutDependencyMarkdown } from '../stories/layout-documentation';
import { PageRoot } from './index';

export default {
    title: 'Layouts/PageRoot',
    component: PageRoot,
    parameters: {
        layout: 'padded',
        docs: {
            page: ComponentExamplesDocs,
            description: {
                component:
                    layoutSummaries.PageRoot + '\n\n' + layoutDependencyMarkdown('PageRoot', true),
            },
        },
    },
    render: () => ({
        components: { PageRoot, Button },
        setup() {
            const id = 'page-root-' + useId();
            provide(miruOptionsKey, { toast: { id } });
            return { notify: () => toast.success('Application ready', { toasterId: id }) };
        },
        template:
            '<PageRoot><div class="space-y-3 rounded-lg border border-border p-6"><p>Your application content</p><Button @click="notify">Show notification</Button></div></PageRoot>',
    }),
} satisfies Meta;
export const Default: StoryObj = {};
