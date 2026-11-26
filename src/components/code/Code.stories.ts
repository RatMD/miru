import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { codeApiCopy } from '../../stories/code-documentation';
import { CodeDocs } from '../../stories/CodeDocs';
import { componentDescription } from '../../stories/component-descriptions';
import { inlineColorVariants } from '../inline-variants';
import { ContextProvider } from '../provider';
import { Code } from './index';

const meta = {
    title: 'Components/Code',
    component: Code,
    parameters: {
        docs: {
            page: CodeDocs,
            description: {
                component: componentDescription('Code'),
            },
        },
    },
    args: {
        value: 'npm install @rat.md/miru',
        variant: 'default',
        borderless: false,
        copyable: false,
        prefix: '',
        prefixVariant: undefined,
        copyTarget: 'all',
        class: '',
    },
    argTypes: {
        class: { control: 'text' },
        variant: { control: 'select', options: inlineColorVariants },
        borderless: { control: 'boolean' },
        copyable: { control: 'boolean' },
        value: { control: 'text' },
        prefix: { control: 'text' },
        prefixVariant: { control: 'select', options: [undefined, ...inlineColorVariants] },
        copyTarget: { control: 'select', options: ['all', 'button'] },
    },
    render: (args) => ({
        components: { Code },
        setup: () => ({ args }),
        template: '<p>Run <Code v-bind="args" /> to get started.</p>',
    }),
} satisfies Meta;
Object.assign(
    meta.argTypes,
    Object.fromEntries(
        Object.entries(meta.argTypes).map(([name, control]) => [
            name,
            {
                ...control,
                description: codeApiCopy.Code.props[name],
                table: { category: 'Code props' },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {};
export const Borderless: StoryObj = { args: { borderless: true } };
export const Command: StoryObj = { args: { prefix: '$', prefixVariant: 'accent', copyable: true } };
export const PrefixOnly: StoryObj = { args: { prefix: '$', prefixVariant: 'accent' } };
export const CopyButton: StoryObj = {
    args: { prefix: '$', prefixVariant: 'accent', copyable: true, copyTarget: 'button' },
};
export const CopyFeedback: StoryObj = {
    render: () => ({
        components: { Code, ContextProvider },
        template: `<div class="flex flex-col items-start gap-6">
            <ContextProvider locale="en"><Code copyable prefix="$" prefix-variant="accent" value="npm install @rat.md/miru" /></ContextProvider>
            <ContextProvider locale="de"><Code copyable copy-target="button" prefix="$" prefix-variant="accent" value="npm install @rat.md/miru" /></ContextProvider>
        </div>`,
    }),
    play: async ({ canvasElement }) => {
        const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
        const writes: string[] = [];
        Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: {
                writeText: async (text: string) => {
                    writes.push(text);
                },
            },
        });
        try {
            const canvas = within(canvasElement);
            for (const [label, result] of [
                ['Copy data', 'Data copied'],
                ['Daten kopieren', 'Daten kopiert'],
            ]) {
                const button = canvas.getByRole('button', { name: label });
                await userEvent.hover(button);
                await waitFor(() =>
                    expect(document.querySelector('[data-code-tooltip]')).toHaveTextContent(label),
                );
                await userEvent.click(button);
                await waitFor(() =>
                    expect(document.querySelector('[data-code-tooltip]')).toHaveTextContent(result),
                );
                await expect(
                    document.querySelector('[data-code-tooltip] .tabler-icon-clipboard-check'),
                ).toBeInTheDocument();
                await expect(button).toHaveFocus();
                await userEvent.unhover(button);
                button.blur();
                await waitFor(() =>
                    expect(document.querySelector('[data-code-tooltip]')).not.toBeInTheDocument(),
                );
            }
            await expect(writes).toEqual(['npm install @rat.md/miru', 'npm install @rat.md/miru']);
        } finally {
            if (descriptor) {
                Object.defineProperty(navigator, 'clipboard', descriptor);
            } else {
                Reflect.deleteProperty(navigator, 'clipboard');
            }
        }
    },
};
export const Variants: StoryObj = {
    render: () => ({
        components: { Code },
        setup: () => ({ variants: inlineColorVariants }),
        template:
            '<div class="flex flex-wrap gap-4"><Code v-for="variant in variants" :key="variant" :variant="variant" :value="variant" /></div>',
    }),
};
export const SlotContent: StoryObj = {
    render: () => ({
        components: { Code },
        template:
            '<Code copyable prefix="$" prefix-variant="accent">npm install @rat.md/miru</Code>',
    }),
    play: async ({ canvasElement }) => {
        const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
        const writes: string[] = [];
        Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: {
                writeText: async (value: string) => {
                    writes.push(value);
                },
            },
        });
        try {
            const button = within(canvasElement).getByRole('button');
            await userEvent.click(canvasElement.querySelector('[data-slot="code-content"]')!);
            await expect(canvasElement.querySelectorAll('button')).toHaveLength(1);
            await waitFor(() => expect(button).toHaveAttribute('data-copied', 'true'));
            await expect(writes).toEqual(['npm install @rat.md/miru']);
            await expect(within(canvasElement).getByRole('status')).toHaveTextContent(
                /copied|kopiert/i,
            );
        } finally {
            if (descriptor) Object.defineProperty(navigator, 'clipboard', descriptor);
            else Reflect.deleteProperty(navigator, 'clipboard');
        }
    },
};
export const ClipboardFailure: StoryObj = {
    args: { copyable: true },
    play: async ({ canvasElement }) => {
        const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
        Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: {
                writeText: async () => {
                    throw new Error('Clipboard unavailable');
                },
            },
        });
        try {
            const canvas = within(canvasElement);
            await userEvent.click(canvas.getByRole('button'));
            await waitFor(() =>
                expect(canvas.getByRole('status')).toHaveTextContent(/Could not|konnten nicht/),
            );
            await expect(canvas.getByRole('button')).toHaveAttribute('data-copied', 'false');
        } finally {
            if (descriptor) Object.defineProperty(navigator, 'clipboard', descriptor);
            else Reflect.deleteProperty(navigator, 'clipboard');
        }
    },
};
