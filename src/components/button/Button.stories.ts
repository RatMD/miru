import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within } from 'storybook/test';
import { defineComponent, h, onUnmounted, ref } from 'vue';
import { buttonApiCopy } from '../../stories/button-documentation';
import { ButtonDocs } from '../../stories/ButtonDocs';
import { componentDescription } from '../../stories/component-descriptions';
import { Button, buttonColorVariants } from './index';

// Development fixtures only. Component text always comes from the host's translations.
const labels = {
    en: {
        action: 'Continue',
        load: 'Click for loading',
        save: 'Save',
        open: 'Open example',
        leading: 'Icon before text',
        trailing: 'Icon after text',
    },
    de: {
        action: 'Weiter',
        load: 'Für Ladeanimation klicken',
        save: 'Speichern',
        open: 'Beispiel öffnen',
        leading: 'Icon vor dem Text',
        trailing: 'Icon nach dem Text',
    },
} as const;

function storyLabels(locale: unknown): typeof labels.en | typeof labels.de {
    return labels[locale === 'de' ? 'de' : 'en'];
}

/** Tabler Plus path (MIT); inline fixture avoids imposing an icon package on consumers. */
const StoryIcon = defineComponent({
    name: 'StoryIcon',
    setup: () => () =>
        h(
            'svg',
            {
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': 2,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'aria-hidden': 'true',
            },
            [h('path', { d: 'M12 5v14M5 12h14' })],
        ),
});

const meta = {
    title: 'Components/Button',
    parameters: {
        docs: { page: ButtonDocs, description: { component: componentDescription('Button') } },
    },
    component: Button,
    args: {
        variant: 'default',
        size: 'default',
        shape: 'default',
        iconOnly: false,
        loading: false,
        loadingPosition: 'start',
        disabled: false,
    },
    argTypes: {
        variant: { control: 'select', options: buttonColorVariants },
        size: { control: 'select', options: ['xs', 'sm', 'default', 'lg'] },
        shape: { control: 'select', options: ['default', 'round'] },
        iconOnly: { control: 'boolean' },
        loading: { control: 'boolean' },
        loadingPosition: { control: 'select', options: ['start', 'end'] },
        disabled: { control: 'boolean' },
        as: { control: false },
        asChild: { control: false },
        class: { control: false },
    },
    render: (args, { globals }) => ({
        components: { Button, StoryIcon },
        setup: () => ({ args, labels: storyLabels(globals.locale) }),
        template:
            '<Button v-bind="args" :aria-label="args.iconOnly ? labels.save : undefined"><StoryIcon v-if="args.iconOnly" /><template v-else>{{ labels.action }}</template></Button>',
    }),
} satisfies Meta<typeof Button>;

for (const [name, control] of Object.entries(meta.argTypes)) {
    const description = buttonApiCopy.Button.props[name];
    const examples: Record<string, string> = {};
    Object.assign(control, {
        description: description ?? examples[name],
        table: { category: description ? 'Button props' : 'Example content' },
    });
}
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const IconOnly: Story = { args: { iconOnly: true } };
export const LoadingIconOnly: Story = { args: { iconOnly: true, loading: true } };

export const AllVariants: Story = {
    parameters: { layout: 'padded' },
    render: (args) => ({
        components: { Button },
        setup: () => ({ args, variants: buttonColorVariants }),
        template:
            '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:1rem"><Button v-for="variant in variants" :key="variant" v-bind="args" :variant="variant">{{ variant }}</Button></div>',
    }),
};

export const Rounded: Story = { ...AllVariants, args: { shape: 'round' } };

export const Sizes: Story = {
    parameters: { layout: 'padded' },
    render: (args, { globals }) => ({
        components: { Button, StoryIcon },
        setup: () => ({
            args,
            labels: storyLabels(globals.locale),
            sizes: ['xs', 'sm', 'default', 'lg'] as const,
        }),
        template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:1rem">
        <div v-for="size in sizes" :key="size" style="display:grid;justify-items:center;gap:1rem">
          <Button v-bind="args" :size="size">{{ size }}</Button>
          <Button v-bind="args" :size="size" icon-only :aria-label="labels.save"><StoryIcon /></Button>
          <Button v-bind="args" :size="size" shape="round" icon-only :aria-label="labels.save"><StoryIcon /></Button>
        </div>
      </div>`,
    }),
};

export const IconLeft: Story = {
    render: (args, { globals }) => ({
        components: { Button, StoryIcon },
        setup: () => ({ args, labels: storyLabels(globals.locale) }),
        template: '<Button v-bind="args"><StoryIcon />{{ labels.save }}</Button>',
    }),
};

export const IconRight: Story = {
    render: (args, { globals }) => ({
        components: { Button, StoryIcon },
        setup: () => ({ args, labels: storyLabels(globals.locale) }),
        template: '<Button v-bind="args">{{ labels.save }}<StoryIcon /></Button>',
    }),
};

export const IconsBoth: Story = {
    render: (args, { globals }) => ({
        components: { Button, StoryIcon },
        setup: () => ({ args, labels: storyLabels(globals.locale) }),
        template: '<Button v-bind="args"><StoryIcon />{{ labels.save }}<StoryIcon /></Button>',
    }),
};

/** Run a five-second demo; the slot label and icon footprint stay unchanged. */
function interactiveLoading(position: 'start' | 'end'): Story['render'] {
    return (args, { globals }) => ({
        components: { Button, StoryIcon },
        setup() {
            const loading = ref(false);
            let timer: ReturnType<typeof setTimeout> | undefined;

            function startLoading(): void {
                if (loading.value) return;
                loading.value = true;
                timer = setTimeout(() => {
                    loading.value = false;
                    timer = undefined;
                }, 5_000);
            }

            onUnmounted(() => {
                if (timer !== undefined) clearTimeout(timer);
            });

            return { args, labels: storyLabels(globals.locale), loading, startLoading, position };
        },
        template: `
      <Button v-bind="args" :loading="loading" :loading-position="position" @click="startLoading">
        <StoryIcon v-if="position === 'start'" />
        {{ labels.load }}
        <StoryIcon v-if="position === 'end'" />
      </Button>`,
    });
}

export const LoadingWithIcon: Story = { render: interactiveLoading('start') };
export const LoadingWithRightIcon: Story = { render: interactiveLoading('end') };

export const AsChild: Story = {
    args: { asChild: true, variant: 'outline' },
    render: (args, { globals }) => ({
        components: { Button },
        setup: () => ({ args, labels: storyLabels(globals.locale) }),
        template: '<Button v-bind="args"><a href="#example">{{ labels.open }}</a></Button>',
    }),
};

export const German: Story = { globals: { locale: 'de' } };
