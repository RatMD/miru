import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import DashboardPageDemo from '../stories/DashboardPageDemo.vue';
import { DashboardPage } from './index';

const meta = {
    title: 'Layout/DashboardPage',
    component: DashboardPage,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Configurable application shell combining an expanded Cockpit-style sidebar with the Portal icon rail. Sidebar and mobile-menu models are controlled independently; navigation, branding, search, profile, toolbars and AppBar are host-owned. Supports grouped/nested navigation, router adapters, content/page scrolling, inset/flush surfaces and responsive Sheet navigation.',
            },
        },
    },
    args: {
        collapsed: false,
        sidebar: true,
        sidebarTone: 'dark',
        surface: 'inset',
        scroll: 'content',
        headerSize: 'default',
        padding: 'default',
        sidebarWidth: '18rem',
        railWidth: '5.5rem',
        headerSearch: true,
        appBar: false,
    },
    argTypes: {
        collapsed: { control: 'boolean' },
        sidebar: { control: 'boolean' },
        sidebarTone: { control: 'select', options: ['surface', 'muted', 'dark'] },
        surface: { control: 'select', options: ['inset', 'flush'] },
        scroll: { control: 'select', options: ['content', 'page'] },
        headerSize: { control: 'select', options: ['sm', 'default', 'lg'] },
        padding: { control: 'select', options: ['none', 'sm', 'default', 'lg'] },
        sidebarWidth: { control: 'text' },
        railWidth: { control: 'text' },
        contentWidth: { control: 'text' },
        headerSearch: { control: 'boolean', table: { category: 'Example' } },
        appBar: { control: 'boolean', table: { category: 'Example' } },
    },
    render: (args, { globals }) => ({
        components: { DashboardPageDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<DashboardPageDemo v-bind="args" :locale="locale" />',
    }),
} satisfies Meta;
export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Cockpit: Story = {};
export const Portal: Story = {
    args: {
        collapsed: true,
        sidebarTone: 'muted',
        surface: 'flush',
        headerSize: 'lg',
        headerSearch: false,
        appBar: true,
    },
};
export const LightSidebar: Story = { args: { sidebarTone: 'surface' } };
export const PageScroll: Story = { args: { scroll: 'page', extraContent: true } };
export const NoSidebar: Story = { args: { sidebar: false, contentWidth: '80rem' } };
export const Interaction: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const root = canvasElement.querySelector('[data-slot="dashboard-page"]')!;
        await userEvent.click(
            canvas.getByRole('button', { name: /^Collapse sidebar$|^Seitenleiste einklappen$/ }),
        );
        await expect(root).toHaveAttribute('data-collapsed', 'true');
        await userEvent.click(
            canvas.getByRole('button', { name: /^Expand sidebar$|^Seitenleiste ausklappen$/ }),
        );
        await expect(root).toHaveAttribute('data-collapsed', 'false');
        const navigation = within(
            canvas.getByRole('navigation', { name: /^Main navigation$|^Hauptnavigation$/ }),
        );
        await userEvent.click(navigation.getByRole('link', { name: /^Orders|^Aufträge/ }));
        await expect(canvas.getByTestId('dashboard-selection')).toHaveTextContent(
            /Orders|Aufträge/,
        );
        await expect(navigation.getByRole('link', { name: /^Orders|^Aufträge/ })).toHaveAttribute(
            'aria-current',
            'page',
        );
    },
};
