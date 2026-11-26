import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within } from 'storybook/test';
import { componentDescription } from '../../stories/component-descriptions';
import { spinnerApiCopy } from '../../stories/spinner-documentation';
import { SpinnerDocs } from '../../stories/SpinnerDocs';
import { Spinner, spinnerColorVariants } from './index';

const meta = {
    title: 'Components/Spinner',
    component: Spinner,
    args: { variant: 'primary', size: 'default', mode: 'spin', decorative: false },
    argTypes: {
        class: { control: 'text' },
        variant: { control: 'select', options: spinnerColorVariants },
        size: { control: 'select', options: ['xs', 'sm', 'default', 'lg', 'xl'] },
        mode: { control: 'select', options: ['spin', 'steps'] },
        decorative: { control: 'boolean' },
        label: { control: 'text' },
    },
    parameters: {
        docs: {
            page: SpinnerDocs,
            description: {
                component: componentDescription('Spinner'),
            },
        },
    },
    render: (args) => ({
        components: { Spinner },
        setup: () => ({ args }),
        template: '<Spinner v-bind="args" />',
    }),
} satisfies Meta<typeof Spinner>;
Object.assign(
    meta.argTypes ?? {},
    Object.fromEntries(
        Object.entries(meta.argTypes ?? {}).map(([name, control]) => [
            name,
            {
                ...control,
                description: spinnerApiCopy.Spinner.props[name],
                table: { category: 'Spinner props' },
            },
        ]),
    ),
);
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Steps: Story = {
    args: { mode: 'steps' },
    play: async ({ canvasElement }) => {
        const spinner = within(canvasElement).getByRole('status');
        await expect(spinner).toHaveAttribute('data-mode', 'steps');
        await expect(
            getComputedStyle(spinner.querySelector('svg')!).animationTimingFunction,
        ).toContain('steps(8)');
    },
};
export const ColorsAndSizes: Story = {
    name: 'Colours and sizes',
    parameters: { controls: { disable: true } },
    render: () => ({
        components: { Spinner },
        setup: () => ({ colors: spinnerColorVariants }),
        template: `<div class="grid gap-6"><div v-for="mode in ['spin', 'steps']" :key="mode" class="grid gap-3"><strong>{{ mode }}</strong><div v-for="variant in colors" :key="variant" class="flex items-center gap-5"><span class="w-20 text-sm">{{ variant }}</span><Spinner v-for="size in ['xs', 'sm', 'default', 'lg', 'xl']" :key="size" :mode="mode" :variant="variant" :size="size" /></div></div></div>`,
    }),
};
export const Decorative: Story = {
    args: { decorative: true },
    play: async ({ canvasElement }) => {
        await expect(within(canvasElement).queryByRole('status')).not.toBeInTheDocument();
        await expect(canvasElement.querySelector('[data-slot="spinner"]')).toHaveAttribute(
            'aria-hidden',
            'true',
        );
    },
};
