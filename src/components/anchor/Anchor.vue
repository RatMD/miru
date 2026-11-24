<template>
    <component
        :is="asChild ? AnchorSlot : 'a'"
        data-slot="anchor"
        :href="disabled ? undefined : href"
        :target="target"
        :rel="safeRel"
        :aria-disabled="disabled || undefined"
        :tabindex="disabled ? -1 : undefined"
        :role="disabled ? 'link' : undefined"
        :data-variant="variant"
        :data-underline="underline"
        :data-animation="animation"
        :class="
            cn(
                'miru-anchor cursor-pointer rounded-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                inlineTextVariants({ variant }),
                inlineHoverVariants({ variant }),
                props.class,
            )
        "
        @click.capture="guardDisabled"
        @auxclick.capture="guardDisabled"
        @click="onClick">
        <slot />
        <IconExternalLink
            v-if="external || target === '_blank'"
            data-slot="anchor-external-icon"
            aria-hidden="true"
            class="ms-1 inline size-[0.9em] align-baseline" />
    </component>
</template>
<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { HTMLAttributes } from 'vue';
import { IconExternalLink } from '@tabler/icons-vue';
import { computed } from 'vue';
import { cn } from '../../support/classNames';
import { inlineHoverVariants, inlineTextVariants } from '../inline-variants';
import AnchorSlot from './AnchorSlot';

const props = withDefaults(
    defineProps<{
        href?: string;
        target?: string;
        /** Mark an external destination; new-tab targets show the icon automatically. */
        external?: boolean;
        rel?: string;
        variant?: InlineVariant;
        /** Underline the text on hover/focus, permanently, or never. */
        underline?: 'none' | 'hover' | 'always';
        /** Slide draws left-to-right and leaves toward the right; fade changes opacity. */
        animation?: 'fade' | 'slide';
        disabled?: boolean;
        /** Merge attributes and classes onto a router link supplied through the default slot. */
        asChild?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    { variant: 'primary', underline: 'hover', animation: 'fade', disabled: false, asChild: false },
);
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const safeRel = computed(() => {
    const values = new Set((props.rel || '').split(/\s+/).filter(Boolean));
    if (props.target === '_blank') {
        values.add('noopener');
        values.add('noreferrer');
    }
    return [...values].join(' ') || undefined;
});

function guardDisabled(event: MouseEvent): void {
    if (props.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }
}

/** Block disabled navigation before forwarding a permitted link click to the host. */
function onClick(event: MouseEvent): void {
    if (props.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    emit('click', event);
}
</script>
<style scoped>
.miru-anchor {
    text-decoration-line: underline;
    text-decoration-color: transparent;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
    padding-bottom: 0.1em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
}
.miru-anchor[data-underline='always'] {
    text-decoration-color: currentColor;
}
.miru-anchor[data-underline='hover'] {
    transition:
        text-decoration-color 180ms ease,
        background-size 180ms ease,
        color 180ms ease;
}
.miru-anchor[data-underline='hover']:not([aria-disabled='true']):is(:hover, :focus-visible) {
    text-decoration-color: currentColor;
}
.miru-anchor[data-animation='slide'][data-underline='hover'] {
    text-decoration: none;
    background-image: linear-gradient(currentColor, currentColor);
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 0% 1px;
}
.miru-anchor[data-animation='slide'][data-underline='hover']:not([aria-disabled='true']):is(
        :hover,
        :focus-visible
    ) {
    background-position: left bottom;
    background-size: 100% 1px;
}
@media (prefers-reduced-motion: reduce) {
    .miru-anchor {
        transition: none !important;
    }
}
</style>
