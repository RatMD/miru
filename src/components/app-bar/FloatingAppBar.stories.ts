import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ComponentDocs } from '../../stories/ComponentDocs';
import FloatingAppBarControllerDemo from '../../stories/FloatingAppBarControllerDemo.vue';
import FloatingAppBarDemo from '../../stories/FloatingAppBarDemo.vue';
import {
    layoutSummaries,
    layoutDependencyMarkdown,
    describeLayoutControls,
    layoutApiCopy,
} from '../../stories/layout-documentation';
import { FloatingAppBar } from './index';

const meta = {
    title: 'Layouts/AppBar',
    id: 'layout-appbar',
    component: FloatingAppBar,
    parameters: {
        controls: { include: Object.keys(layoutApiCopy.FloatingAppBar.props ?? {}) },
        layout: 'padded',
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    layoutSummaries.FloatingAppBar +
                    '\n\n' +
                    layoutDependencyMarkdown('FloatingAppBar', true),
            },
        },
    },
    args: {
        label: '',
        variant: 'five',
        shape: 'circle',
        appearance: 'solid',
        bordered: true,
        gradientTone: 'primary',
        orientation: 'horizontal',
        animated: true,
        auxiliaryPosition: 'adjacent',
    },
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: ['five', 'three', 'primary'] },
        shape: { control: 'select', options: ['circle', 'rounded-hexagon'] },
        appearance: { control: 'select', options: ['solid', 'gradient'] },
        bordered: { control: 'boolean' },
        gradientTone: {
            control: 'select',
            options: ['primary', 'success', 'danger', 'warning', 'info'],
        },
        orientation: { control: 'select', options: ['horizontal', 'vertical', 'auto'] },
        animated: { control: 'boolean' },
        auxiliaryPosition: { control: 'select', options: ['adjacent', 'edge'] },
        fixed: { control: false },
        transitionKey: { control: false },
    },
    render: (args, context) => ({
        components: { FloatingAppBarDemo },
        setup: () => ({
            args,
            locale: context.globals.locale,
            preset: context.parameters.floatingBarPreset ?? 'compact',
            autoplay: context.parameters.floatingBarAutoplay ?? false,
            viewport: context.parameters.floatingBarViewport ?? false,
            surface: context.parameters.floatingBarSurface ?? 'dark',
        }),
        template:
            '<FloatingAppBarDemo :args="args" :locale="locale" :preset="preset" :autoplay="autoplay" :viewport="viewport" :surface="surface" />',
    }),
} satisfies Meta<typeof FloatingAppBar>;
describeLayoutControls('FloatingAppBar', meta.argTypes);
export default meta;
type Story = StoryObj<typeof meta>;
const hexagonArgs = { shape: 'rounded-hexagon', appearance: 'gradient', bordered: false } as const;

export const Compact: Story = {};
export const StateController: Story = {
    parameters: { controls: { disable: true } },
    render: (_args, { globals }) => ({
        components: { FloatingAppBarControllerDemo },
        setup: () => ({ locale: globals.locale }),
        template: '<FloatingAppBarControllerDemo :locale="locale" />',
    }),
};
export const CompactScanner: Story = { args: { variant: 'three' } };
export const HexagonMenu: Story = {
    args: { ...hexagonArgs },
    parameters: { floatingBarPreset: 'hexagon-menu' },
};
export const WhitePage: Story = {
    args: { ...hexagonArgs },
    parameters: { floatingBarPreset: 'hexagon-menu', floatingBarSurface: 'white' },
};
export const HexagonSimple: Story = {
    args: {
        variant: 'three',
        ...hexagonArgs,
        gradientTone: 'warning',
    },
    parameters: { floatingBarPreset: 'hexagon-simple' },
};
export const HexagonWizard: Story = {
    args: {
        variant: 'three',
        ...hexagonArgs,
        gradientTone: 'success',
        auxiliaryPosition: 'edge',
    },
    parameters: { floatingBarPreset: 'hexagon-wizard' },
};
export const PrimaryOnly: Story = {
    args: { ...hexagonArgs, variant: 'primary' },
    parameters: { floatingBarPreset: 'primary-only' },
};
export const AuxiliaryActions: Story = {
    args: {
        variant: 'primary',
        ...hexagonArgs,
        auxiliaryPosition: 'edge',
    },
    parameters: { floatingBarPreset: 'auxiliary' },
};
export const AnimatedSwitching: Story = {
    args: { ...hexagonArgs },
    parameters: { floatingBarPreset: 'playground', floatingBarAutoplay: true },
};
export const Landscape: Story = {
    args: { ...hexagonArgs, orientation: 'vertical' },
    parameters: { floatingBarPreset: 'hexagon-menu' },
};
export const AutoOrientation: Story = {
    args: { ...hexagonArgs, orientation: 'auto' },
    parameters: {
        floatingBarPreset: 'hexagon-menu',
        floatingBarViewport: true,
        layout: 'fullscreen',
    },
};
