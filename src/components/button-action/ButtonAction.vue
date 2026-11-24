<template>
    <Button
        v-bind="forwarded"
        data-slot="button-action"
        :data-borderless="borderless"
        :data-muted="resolvedMuted"
        :as="href ? 'a' : as"
        :href="href"
        :type="href ? undefined : type"
        :variant="variant"
        :icon-only="iconOnly && !label"
        :aria-label="label || title"
        :title="title"
        :class="cn('miru-button-action justify-self-start', props.class)"
        :style="colors">
        <ButtonStatusIcon
            v-if="statusDot"
            :visible="!loading"
            :color="typeof statusDot === 'string' ? statusDot : variant"
            :small="size === 'xs'">
            <slot />
        </ButtonStatusIcon>
        <slot v-else />
        <span v-if="label">{{ label }}</span>
    </Button>
</template>
<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { ButtonActionColor, ButtonActionBorderless } from './variants';
import type { PrimitiveProps } from 'reka-ui';
import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
    HTMLAttributes,
} from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import ButtonStatusIcon from '../button/ButtonStatusIcon.vue';
import { buttonActionDefaultsKey } from './context';
const props = withDefaults(
    defineProps<
        PrimitiveProps & {
            variant?: ButtonActionColor;
            size?: ButtonVariants['size'];
            shape?: ButtonVariants['shape'];
            borderless?: ButtonActionBorderless;
            iconOnly?: boolean;
            muted?: boolean;
            statusDot?: boolean | NonNullable<ButtonVariants['variant']>;
            label?: string;
            title?: string;
            disabled?: boolean;
            loading?: boolean;
            loadingPosition?: 'start' | 'end';
            href?: string;
            target?: AnchorHTMLAttributes['target'];
            rel?: string;
            type?: ButtonHTMLAttributes['type'];
            class?: HTMLAttributes['class'];
        }
    >(),
    {
        variant: 'default',
        size: 'default',
        shape: 'default',
        borderless: 'no',
        iconOnly: true,
        muted: undefined,
        statusDot: false,
        as: 'button',
        type: 'button',
    },
);
const forwarded = reactiveOmit(
    props,
    'class',
    'variant',
    'muted',
    'statusDot',
    'borderless',
    'label',
    'title',
    'iconOnly',
    'href',
    'as',
    'type',
);
const actionDefaults = inject(buttonActionDefaultsKey, undefined);
const resolvedMuted = computed(() => props.muted ?? actionDefaults?.value.muted ?? false);
const colors = computed<CSSProperties>(() => {
    const v = props.variant;
    const neutral = v === 'default' || v === 'outline';
    return {
        '--action-ink': neutral
            ? 'var(--ui-foreground)'
            : 'var(--ui-' + v + '-text, var(--ui-' + v + '))',
        '--action-dark-ink': neutral
            ? 'var(--ui-foreground)'
            : 'var(--ui-' + v + '-text, var(--ui-' + v + '-300))',
        '--action-dark-hover-bg': neutral
            ? 'var(--ui-ghost-hover)'
            : 'color-mix(in srgb, var(--action-dark-ink) 12%, var(--ui-action-background, var(--ui-background)))',
        '--action-dark-active-bg': neutral
            ? 'var(--ui-ghost-active)'
            : 'color-mix(in srgb, var(--action-dark-ink) 24%, var(--ui-action-background, var(--ui-background)))',
        '--action-border-idle': v === 'outline' ? 'var(--ui-border)' : 'var(--action-display-ink)',
        '--action-hover-bg': neutral ? 'var(--ui-neutral-100)' : 'var(--ui-' + v + '-100)',
        '--action-active-bg': 'var(--ui-' + v + '-active)',
        '--action-active-border': neutral ? 'var(--ui-neutral-500)' : 'var(--ui-' + v + '-950)',
        '--action-active-foreground': 'var(--ui-' + v + '-foreground)',
    };
});
</script>
<style>
.miru-button-action {
    --action-display-ink: var(--action-ink);
    --action-display-hover-bg: var(--action-hover-bg);
    --action-display-active-bg: var(--action-active-bg);
    --action-display-active-ink: color-mix(
        in srgb,
        var(--action-active-foreground) 85%,
        var(--action-active-bg)
    );
    --action-display-active-border: var(--action-active-border);
    --button-status-dot-cutout: var(--ui-action-background, var(--ui-background));
    --action-border-current: var(--action-border-idle);
    background-color: var(--ui-action-background, var(--ui-background));
    color: var(--action-display-ink);
    border: 1px solid var(--action-border-current);
}
.miru-button-action:where(.dark, .dark *, [data-theme='dark'], [data-theme='dark'] *) {
    --action-display-ink: var(--action-dark-ink);
    --action-display-hover-bg: var(--action-dark-hover-bg);
    --action-display-active-bg: var(--action-dark-active-bg);
    --action-display-active-ink: var(--action-dark-ink);
    --action-display-active-border: var(--action-dark-ink);
}
.miru-button-action[data-muted='true'] {
    color: var(--ui-muted-foreground);
}
.miru-button-action[data-borderless='effect'] {
    --action-border-current: transparent;
}
.miru-button-action:not(:disabled):not([aria-disabled='true']):not([data-disabled]):hover,
.miru-button-action:not(:disabled):not([aria-disabled='true']):not([data-disabled]):focus-visible {
    --action-border-current: var(--action-border-idle);
    --button-status-dot-cutout: var(--action-display-hover-bg);
    background-color: var(--action-display-hover-bg);
    color: var(--action-display-ink);
}
.miru-button-action:not(:disabled):not([aria-disabled='true']):not([data-disabled]):active {
    --action-border-current: var(--action-display-active-border);
    --button-status-dot-cutout: var(--action-display-active-bg);
    background-color: var(--action-display-active-bg);
    color: var(--action-display-active-ink);
}
.miru-button-action[aria-disabled='true'] {
    --action-border-current: var(--action-border-idle);
}
.miru-button-action[data-borderless='yes'] {
    border-color: transparent;
}
</style>
