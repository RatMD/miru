<template>
    <Primitive
        data-slot="button"
        :data-variant="variant"
        :data-size="size"
        :data-shape="shape"
        :data-icon-only="iconOnly"
        :data-loading="loading"
        :data-loading-position="loadingPosition"
        :as="as"
        :as-child="asChild"
        :type="as === 'button' && !asChild ? 'button' : undefined"
        :disabled="as === 'button' && !asChild ? unavailable : undefined"
        :aria-disabled="unavailable || undefined"
        :aria-busy="loading || undefined"
        :tabindex="unavailable && (asChild || as !== 'button') ? -1 : undefined"
        :style="loading ? { cursor: 'wait' } : undefined"
        :class="
            cn(
                'miru-button',
                buttonVariants({ variant, size: size, shape, iconOnly: iconOnly }),
                props.class,
            )
        "
        @click.capture="guardInteraction"
        @keydown.capture="guardKeyboard">
        <slot />
    </Primitive>
</template>

<script setup lang="ts">
import type { ButtonVariants } from './index';
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { Primitive } from 'reka-ui';
import { computed } from 'vue';
import { cn } from '../../support/classNames';
import { buttonVariants } from './index';

interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant'];
    size?: ButtonVariants['size'];
    shape?: ButtonVariants['shape'];
    iconOnly?: boolean;
    loading?: boolean;
    /** Position of the loader within the inline slot layout. */
    loadingPosition?: 'start' | 'end';
    disabled?: boolean;
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    variant: 'default',
    size: 'default',
    shape: 'default',
    iconOnly: false,
    loading: false,
    loadingPosition: 'start',
    disabled: false,
});

const unavailable = computed(() => props.disabled || props.loading);

/** Native buttons and slotted links both reject activation while unavailable. */
function guardInteraction(event: Event): void {
    if (!unavailable.value) return;
    event.preventDefault();
    event.stopImmediatePropagation();
}

function guardKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') guardInteraction(event);
}
</script>

<style scoped>
/* Scope semantic button tokens; dark filled variants use their explicit palette shades. */
.miru-button:where(.dark, .dark *, [data-theme='dark'], [data-theme='dark'] *) {
    --ui-primary: var(--ui-primary-600);
    --ui-primary-foreground: #ffffff;
    --ui-primary-hover: var(--ui-primary-700);
    --ui-primary-active: var(--ui-primary-800);
    --ui-accent: var(--ui-accent-600);
    --ui-accent-foreground: #ffffff;
    --ui-accent-hover: var(--ui-accent-700);
    --ui-accent-active: var(--ui-accent-800);
    --ui-secondary: var(--ui-secondary-600);
    --ui-secondary-foreground: #ffffff;
    --ui-secondary-hover: var(--ui-secondary-700);
    --ui-secondary-active: var(--ui-secondary-800);
    --ui-info: var(--ui-info-700);
    --ui-info-foreground: #ffffff;
    --ui-info-hover: var(--ui-info-800);
    --ui-info-active: var(--ui-info-900);
    --ui-success: var(--ui-success-700);
    --ui-success-foreground: #ffffff;
    --ui-success-hover: var(--ui-success-800);
    --ui-success-active: var(--ui-success-900);
    --ui-warning: var(--ui-warning-400);
    --ui-warning-foreground: #000000;
    --ui-warning-hover: var(--ui-warning-500);
    --ui-warning-active: var(--ui-warning-600);
    --ui-danger: var(--ui-danger-700);
    --ui-danger-foreground: #ffffff;
    --ui-danger-hover: var(--ui-danger-800);
    --ui-danger-active: var(--ui-danger-900);
}

/* Tabler Loader2 path (MIT). Preserve the original slot and as-child root. */
.miru-button {
    --ui-warning-foreground: #000000;
    --button-loader-size: 1rem;
    --button-loader-gap: 0.5rem;
}

.miru-button[data-size='xs'] {
    --button-loader-size: 0.75rem;
    --button-loader-gap: 0.25rem;
}

.miru-button[data-size='sm'] {
    --button-loader-gap: 0.375rem;
}

.miru-button[data-size='lg'] {
    --button-loader-size: 1.25rem;
    --button-loader-gap: 0.625rem;
}

.miru-button[data-loading='true']::before {
    content: '';
    width: var(--button-loader-size);
    height: var(--button-loader-size);
    flex: none;
    background-color: currentColor;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M12 3a9 9 0 1 0 9 9'/%3E%3C/svg%3E")
        center / contain no-repeat;
    animation: button-loader-spin 1s linear infinite;
}

/* Keep the spinner on the same side as a trailing icon without wrapping the slot. */
.miru-button[data-loading='true'][data-loading-position='end']::before {
    order: 1;
}

.miru-button[data-loading='true']:has(svg) :deep(svg) {
    display: none;
}

.miru-button[data-loading='true']:not(:has(svg)):not([data-icon-only='true'])::before {
    animation:
        button-loader-spin 1s linear infinite,
        button-loader-enter 180ms ease-out both;
}

@keyframes button-loader-spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes button-loader-enter {
    from {
        width: 0;
        opacity: 0;
        margin-inline-end: calc(-1 * var(--button-loader-gap));
    }
    to {
        width: var(--button-loader-size);
        opacity: 1;
        margin-inline-end: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .miru-button[data-loading='true']::before {
        animation: none;
    }
}
</style>
