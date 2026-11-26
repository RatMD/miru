import type { Meta, StoryContext, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ComponentDocs } from '../../stories/ComponentDocs';
import {
    stepperSummaries,
    stepperDependencyMarkdown,
    stepperApiCopy,
} from '../../stories/stepper-documentation';
import StepperDemo from '../../stories/StepperDemo.vue';
import {
    Stepper,
    StepperList,
    StepperItem,
    StepperTrigger,
    StepperIndicator,
    StepperTitle,
    StepperLabel,
    StepperDescription,
    StepperSeparator,
    StepperContent,
    StepperActions,
} from './index';

function example(args: Record<string, unknown>, inline: boolean) {
    const item = (step: number, title: string) => `    <StepperItem :step="${step}">
      <StepperTrigger>
        <StepperIndicator${args.icons ? ` :icon="${step === 1 ? 'IconUser' : 'IconTruck'}"` : ''} :show-check="${args.showCheck !== false}" />
        <StepperLabel>
          <StepperTitle>${title}</StepperTitle>
          ${args.descriptions !== false ? `<StepperDescription>Step ${step} description</StepperDescription>` : ''}
        </StepperLabel>
      </StepperTrigger>
      ${step === 1 ? '<StepperSeparator />' : ''}${
          inline
              ? `
      <StepperContent force-mount>Content for ${title}</StepperContent>`
              : ''
      }
    </StepperItem>`;
    return `<script setup lang="ts">
import { ref } from 'vue';
import type { StepperTransition } from '@rat.md/miru';${args.icons ? "\nimport { IconUser, IconTruck } from '@tabler/icons-vue';" : ''}
import { Stepper, StepperList, StepperItem, StepperTrigger, StepperIndicator, StepperTitle, StepperLabel, StepperDescription, StepperSeparator, StepperContent, StepperActions } from '@rat.md/miru';
const step = ref(1);
// Optional: validate or save before continuing. Return false or a message to stay.
const beforeNext = async (_transition: StepperTransition) => {
  // await saveStep(_transition.from);
  // if (invalid) return 'Please check your entries.';
};
const finish = () => { /* Order saved: navigate or show confirmation. */ };
</script>

<template>
<Stepper v-model="step" orientation="${args.orientation}" variant="${args.variant}" size="${args.size}" color="${args.color}" completed-color="${args.completedColor}" inactive-appearance="${args.inactiveAppearance}" mobile-layout="${args.mobileLayout}" :mobile-breakpoint="${args.mobileBreakpoint}" :linear="${args.linear}" :before-next="beforeNext" @complete="finish">
  <StepperList>
${item(1, 'Details')}
${item(2, 'Delivery')}
  </StepperList>${
      inline
          ? ''
          : `
  <StepperContent :step="1" force-mount>Details form</StepperContent>
  <StepperContent :step="2" force-mount>Delivery form</StepperContent>`
  }
  <StepperActions complete-label="Save order" />
</Stepper>
</template>`;
}
const colors = [
    'default',
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
];
const meta: Meta = {
    title: 'Forms/Stepper',
    id: 'form-stepper',
    component: Stepper,
    subcomponents: {
        StepperList,
        StepperItem,
        StepperTrigger,
        StepperIndicator,
        StepperTitle,
        StepperLabel,
        StepperDescription,
        StepperSeparator,
        StepperContent,
        StepperActions,
    },
    parameters: {
        layout: 'padded',
        docs: {
            page: ComponentDocs,
            description: {
                component: stepperSummaries.Stepper + '\n\n' + stepperDependencyMarkdown(true),
            },
            source: {
                language: 'html',
                transform: (_source: string, context: StoryContext) =>
                    example(context.args, !!context.parameters.stepperInline),
            },
        },
    },
    args: {
        modelValue: 1,
        orientation: 'horizontal',
        variant: 'default',
        size: 'default',
        color: 'primary',
        completedColor: 'success',
        inactiveAppearance: 'outline',
        linear: true,
        mobileLayout: 'vertical',
        mobileBreakpoint: 640,
        icons: false,
        showCheck: true,
        descriptions: true,
        showContent: true,
        showActions: true,
        showPrevious: true,
        disabled: false,
        loading: false,
        error: '',
        disabledStep: 0,
        errorStep: 0,
    },
    argTypes: {
        modelValue: {
            control: { type: 'number', min: 1, max: 4 },
            description: 'Active step (v-model).',
        },
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        variant: { control: 'select', options: ['default', 'bordered'] },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        color: { control: 'select', options: colors },
        completedColor: { control: 'select', options: colors },
        inactiveAppearance: {
            control: 'select',
            options: ['outline', 'solid', 'muted'],
            description: 'Appearance of upcoming step indicators.',
        },
        linear: {
            control: 'boolean',
            description: 'Allow only the next step when moving forward.',
        },
        mobileLayout: {
            control: 'select',
            options: ['vertical', 'compact', 'scroll', 'same'],
            table: { category: 'Responsive' },
        },
        mobileBreakpoint: {
            control: { type: 'number', min: 320, max: 1200 },
            table: { category: 'Responsive' },
        },
        icons: { control: 'boolean', table: { category: 'Indicator' } },
        showCheck: { control: 'boolean', table: { category: 'Indicator' } },
        descriptions: { control: 'boolean', table: { category: 'Composition' } },
        showContent: { control: 'boolean', table: { category: 'Composition' } },
        showActions: { control: 'boolean', table: { category: 'Composition' } },
        showPrevious: { control: 'boolean', table: { category: 'Actions' } },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' },
        error: { control: 'text' },
        disabledStep: { control: { type: 'number', min: 0, max: 4 }, table: { category: 'Item' } },
        errorStep: { control: { type: 'number', min: 0, max: 4 }, table: { category: 'Item' } },
        beforeNext: {
            control: false,
            description:
                'Async forward/completion guard: ({ from, to, action }) => void | boolean | string.',
            table: { category: 'Validation' },
        },
        beforeChange: {
            control: false,
            description: 'Guard every transition, including backward navigation.',
            table: { category: 'Validation' },
        },
    },
    render: (args, { globals, parameters }) => ({
        components: { StepperDemo },
        setup: () => ({
            args,
            locale: globals.locale || 'en',
            inline: !!parameters.stepperInline,
            page: !!parameters.stepperPage,
            mobilePreview: !!parameters.stepperMobile,
            validation: parameters.stepperValidation || 'none',
            guardPrevious: !!parameters.stepperGuardPrevious,
        }),
        template:
            '<StepperDemo :args="args" :locale="locale" :inline="inline" :page="page" :mobile-preview="mobilePreview" :validation="validation" :guard-previous="guardPrevious" />',
    }),
};
for (const [name, control] of Object.entries(meta.argTypes ?? {})) {
    const description = stepperApiCopy.Stepper.props?.[name];
    if (description && control) Object.assign(control, { description });
}
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
export default meta;
const current = (canvas: HTMLElement) => within(canvas).getByTestId('stepper-state');
const next = (canvas: HTMLElement) =>
    within(canvas).getByRole('button', { name: /^(Next|Weiter)$/ });
const trigger = (canvas: HTMLElement, step: number) =>
    canvas.querySelectorAll<HTMLElement>('[data-slot="stepper-trigger"]')[step - 1]!;
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        await userEvent.click(next(canvasElement));
        await waitFor(() => expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 2/));
        await userEvent.click(
            within(canvasElement).getByRole('button', { name: /^(Back|Zurück)$/ }),
        );
        await waitFor(() => expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 1/));
        await expect(trigger(canvasElement, 4)).toBeDisabled();
    },
};
export const Icons: StoryObj = { args: { icons: true, modelValue: 2 } };
export const Bordered: StoryObj = {
    args: { variant: 'bordered', size: 'sm', modelValue: 3, descriptions: false },
};
export const PageContainer: StoryObj = {
    args: { variant: 'bordered', icons: true },
    parameters: { stepperPage: true, stepperValidation: 'required' },
};
export const Vertical: StoryObj = {
    args: { orientation: 'vertical', size: 'lg' },
    parameters: { stepperInline: true },
    play: async ({ canvasElement }) => {
        const content = within(canvasElement).getAllByTestId('step-content');
        await expect(content[0]!).toBeVisible();
        await expect(content[1]!).not.toBeVisible();
        await userEvent.type(within(canvasElement).getByRole('textbox', { name: /Name/ }), 'Alex');
        await userEvent.click(next(canvasElement));
        await waitFor(() => expect(content[1]!).toBeVisible());
        await expect(content[0]!).not.toBeVisible();
        await userEvent.click(
            within(canvasElement).getByRole('button', { name: /^(Back|Zurück)$/ }),
        );
        await waitFor(() =>
            expect(within(canvasElement).getByRole('textbox', { name: /Name/ })).toHaveValue(
                'Alex',
            ),
        );
    },
};
export const VerticalBordered: StoryObj = {
    args: { orientation: 'vertical', variant: 'bordered', icons: true },
    parameters: { stepperInline: true },
};
export const NonLinear: StoryObj = {
    args: { linear: false },
    play: async ({ canvasElement }) => {
        trigger(canvasElement, 1).focus();
        await userEvent.keyboard('{ArrowRight}');
        await expect(trigger(canvasElement, 2)).toHaveFocus();
        trigger(canvasElement, 4).focus();
        await userEvent.keyboard('{Enter}');
        await waitFor(() => expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 4/));
        await userEvent.click(trigger(canvasElement, 2));
        await waitFor(() => expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 2/));
    },
};
export const Validation: StoryObj = {
    args: { variant: 'bordered' },
    parameters: { stepperValidation: 'required' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(trigger(canvasElement, 2));
        await waitFor(() =>
            expect(canvas.getByRole('alert')).toHaveTextContent(/recipient name|Empfängers/),
        );
        await expect(trigger(canvasElement, 1)).toHaveAttribute('aria-invalid', 'true');
        await expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 1/);
        await userEvent.click(next(canvasElement));
        await expect(canvas.getByTestId('stepper-validation-calls')).toHaveTextContent('2');
        await userEvent.type(canvas.getByRole('textbox', { name: /Name/ }), 'Alex');
        await userEvent.click(trigger(canvasElement, 2));
        await waitFor(() => expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 2/));
        await expect(canvas.queryByRole('alert')).toBeNull();
    },
};
export const AsyncRequest: StoryObj = {
    args: { variant: 'bordered' },
    parameters: { stepperValidation: 'async' },
    play: async ({ canvasElement }) => {
        await userEvent.click(
            within(canvasElement).getByRole('button', { name: /Fill example data|Beispieldaten/ }),
        );
        await userEvent.click(next(canvasElement));
        await expect(canvasElement.querySelector('[data-slot="stepper"]')).toHaveAttribute(
            'aria-busy',
            'true',
        );
        await expect(next(canvasElement)).toBeDisabled();
        await expect(trigger(canvasElement, 2)).toBeDisabled();
        await waitFor(() => expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 2/));
        await expect(
            within(canvasElement).getByTestId('stepper-validation-calls'),
        ).toHaveTextContent('1');
    },
};
export const RequestFailure: StoryObj = {
    args: { variant: 'bordered' },
    parameters: { stepperValidation: 'reject' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(
            canvas.getByRole('button', { name: /Fill example data|Beispieldaten/ }),
        );
        await userEvent.click(next(canvasElement));
        await waitFor(() =>
            expect(canvas.getByRole('alert')).toHaveTextContent(/try again|erneut/),
        );
        await expect(canvas.getByTestId('stepper-failures')).toHaveTextContent('1');
        await userEvent.click(next(canvasElement));
        await waitFor(() => expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 2/));
    },
};
export const Completion: StoryObj = {
    parameters: { stepperValidation: 'required' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(
            canvas.getByRole('button', { name: /Fill example data|Beispieldaten/ }),
        );
        for (let i = 2; i <= 4; i++) {
            await userEvent.click(next(canvasElement));
            await waitFor(() =>
                expect(current(canvasElement)).toHaveTextContent(
                    new RegExp(`(Step|Schritt): ${i}`),
                ),
            );
        }
        await userEvent.click(
            canvas.getByRole('button', { name: /Complete order|Auftrag abschließen/ }),
        );
        await waitFor(() =>
            expect(current(canvasElement)).toHaveTextContent(/(Saved|Gespeichert): yes/),
        );
        await expect(canvas.getByTestId('stepper-validation-calls')).toHaveTextContent('4');
    },
};
export const Disabled: StoryObj = {
    args: { disabled: true },
    play: async ({ canvasElement }) => {
        for (const button of canvasElement.querySelectorAll('[data-slot="stepper-trigger"]'))
            await expect(button).toBeDisabled();
        await expect(next(canvasElement)).toBeDisabled();
    },
};
export const LockedPreviousSteps: StoryObj = {
    args: { modelValue: 2 },
    parameters: { stepperGuardPrevious: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: /^(Back|Zurück)$/ }));
        await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent(/locked|gesperrt/));
        await expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 2/);
        await userEvent.click(trigger(canvasElement, 1));
        await expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 2/);
        await userEvent.click(next(canvasElement));
        await waitFor(() => expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 3/));
    },
};
export const CompletionValidation: StoryObj = {
    args: { modelValue: 4, variant: 'bordered' },
    parameters: { stepperValidation: 'required' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(
            canvas.getByRole('button', { name: /Complete order|Auftrag abschließen/ }),
        );
        await waitFor(() =>
            expect(canvas.getByRole('alert')).toHaveTextContent(/recipient name|Empfängers/),
        );
        await expect(current(canvasElement)).toHaveTextContent(/(Saved|Gespeichert): —/);
        await userEvent.click(
            canvas.getByRole('button', { name: /Fill example data|Beispieldaten/ }),
        );
        await userEvent.click(
            canvas.getByRole('button', { name: /Complete order|Auftrag abschließen/ }),
        );
        await waitFor(() =>
            expect(current(canvasElement)).toHaveTextContent(/(Saved|Gespeichert): yes/),
        );
    },
};
export const BooleanGuard: StoryObj = {
    parameters: { stepperValidation: 'false' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(
            canvas.getByRole('button', { name: /Fill example data|Beispieldaten/ }),
        );
        await userEvent.click(next(canvasElement));
        await waitFor(() =>
            expect(canvas.getByRole('alert')).toHaveTextContent(/check this step|Schritt/),
        );
        await userEvent.click(next(canvasElement));
        await waitFor(() => expect(current(canvasElement)).toHaveTextContent(/(Step|Schritt): 2/));
    },
};
export const DisabledStep: StoryObj = {
    args: { disabledStep: 2 },
    play: async ({ canvasElement }) => {
        await expect(trigger(canvasElement, 2)).toBeDisabled();
        await expect(next(canvasElement)).toBeDisabled();
    },
};
export const ErrorState: StoryObj = {
    args: {
        variant: 'bordered',
        modelValue: 4,
        error: '4 positions need to be completed or corrected: EAN.',
    },
};
export const MobileVertical: StoryObj = {
    parameters: { stepperMobile: true, stepperInline: true },
    args: { orientation: 'vertical', size: 'lg' },
};
export const MobileCompact: StoryObj = {
    parameters: { stepperMobile: true },
    args: { mobileLayout: 'compact', variant: 'bordered', descriptions: false, modelValue: 2 },
    play: async ({ canvasElement }) => {
        await expect(
            trigger(canvasElement, 1).querySelector('[data-slot="stepper-title"]'),
        ).not.toBeVisible();
        await expect(
            trigger(canvasElement, 2).querySelector('[data-slot="stepper-title"]'),
        ).toBeVisible();
    },
};
export const MobileScroll: StoryObj = {
    parameters: { stepperMobile: true },
    args: { mobileLayout: 'scroll', icons: true },
};
export const Colors: StoryObj = {
    render: () => ({
        components: {
            Stepper,
            StepperList,
            StepperItem,
            StepperTrigger,
            StepperIndicator,
            StepperTitle,
            StepperLabel,
            StepperSeparator,
        },
        setup: () => ({ colors }),
        template: `<div class="grid max-w-4xl gap-6"><div v-for="color in colors" :key="color"><p class="mb-2 text-xs text-muted-foreground">{{ color }}</p><Stepper :model-value="2" :color="color" :completed-color="color" mobile-layout="same"><StepperList><StepperItem v-for="step in 3" :key="step" :step="step"><StepperTrigger><StepperIndicator /><StepperLabel><StepperTitle>Step {{ step }}</StepperTitle></StepperLabel></StepperTrigger><StepperSeparator v-if="step < 3" /></StepperItem></StepperList></Stepper></div></div>`,
    }),
};
