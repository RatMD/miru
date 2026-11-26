import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import AuthPageDemo from '../stories/AuthPageDemo.vue';
import { ComponentDocs } from '../stories/ComponentDocs';
import {
    layoutSummaries,
    layoutDependencyMarkdown,
    describeLayoutControls,
    layoutApiCopy,
} from '../stories/layout-documentation';
import { AuthPage } from './index';

const meta = {
    title: 'Layouts/AuthPage',
    id: 'layout-authpage',
    component: AuthPage,
    parameters: {
        controls: { include: Object.keys(layoutApiCopy.AuthPage.props ?? {}) },
        layout: 'fullscreen',
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    layoutSummaries.AuthPage + '\n\n' + layoutDependencyMarkdown('AuthPage', true),
            },
        },
    },
    args: {
        variant: 'split',
        panelSide: 'left',
        fullHeight: true,
        framed: true,
        hideVisualOnMobile: false,
        panelWidth: '26rem',
    },
    argTypes: {
        variant: { control: 'select', options: ['split', 'card'] },
        panelSide: { control: 'select', options: ['left', 'right'] },
        fullHeight: { control: 'boolean' },
        framed: { control: 'boolean' },
        hideVisualOnMobile: { control: 'boolean' },
        image: { control: 'text' },
        panelWidth: { control: 'text' },
        height: { control: 'text' },
    },
    render: (args, { globals }) => ({
        components: { AuthPageDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<AuthPageDemo v-bind="args" :locale="locale" />',
    }),
} satisfies Meta;
describeLayoutControls('AuthPage', meta.argTypes);
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const PanelRight: Story = { args: { panelSide: 'right' } };
export const Card: Story = { args: { variant: 'card', panelWidth: '28rem' } };
export const FullBleed: Story = { args: { framed: false } };
export const NoMobileVisual: Story = { args: { hideVisualOnMobile: true } };
export const Embedded: Story = { args: { fullHeight: false, height: 660 } };
export const FormInteraction: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.type(canvas.getByLabelText(/^Email$|^E-Mail$/), 'sam@example.test');
        await userEvent.type(canvas.getByLabelText(/^Password$|^Passwort$/), 'example-password');
        await userEvent.click(canvas.getByRole('button', { name: /^Sign in$|^Anmelden$/ }));
        await expect(canvas.getByRole('alert')).toBeInTheDocument();
    },
};
