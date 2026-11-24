import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import AuthPageDemo from '../stories/AuthPageDemo.vue';
import { AuthPage } from './index';

const meta = {
    title: 'Layout/AuthPage',
    component: AuthPage,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Responsive split or card authentication shell inspired by the SHODAN and Spottle application layouts. Form, branding and footer are host slots. Supply an image URL or visual slot; the included vector illustration follows the palette and makes no remote requests. No router, auth store or global body styles are installed.',
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
