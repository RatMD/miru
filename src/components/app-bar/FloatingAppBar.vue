<template>
    <nav
        data-slot="floating-app-bar"
        :data-variant="variant"
        :data-shape="shape"
        :data-appearance="appearance"
        :data-bordered="bordered"
        :data-orientation="resolvedOrientation"
        :data-animated="animated"
        :data-auxiliary-position="auxiliaryPosition"
        :style="themeStyle"
        :class="['ui-floating-app-bar', { 'ui-floating-app-bar-fixed': fixed }]"
        :aria-label="label">
        <Transition name="ui-floating-app-bar-swap" mode="out-in" :css="animated">
            <div :key="transitionKey ?? variant" class="ui-floating-app-bar-body">
                <div v-if="variant !== 'primary'" class="ui-floating-app-bar-side">
                    <slot name="left" />
                </div>
                <div class="ui-floating-app-bar-primary"><slot name="primary" /></div>
                <div v-if="variant !== 'primary'" class="ui-floating-app-bar-side">
                    <slot name="right" />
                </div>
            </div>
        </Transition>
        <div
            v-if="$slots['auxiliary-start']"
            class="ui-floating-app-bar-auxiliary ui-floating-app-bar-auxiliary-start">
            <slot name="auxiliary-start" />
        </div>
        <div
            v-if="$slots['auxiliary-end']"
            class="ui-floating-app-bar-auxiliary ui-floating-app-bar-auxiliary-end">
            <slot name="auxiliary-end" />
        </div>
    </nav>
</template>

<script setup lang="ts">
import type {
    FloatingAppBarOrientation,
    FloatingAppBarShape,
    FloatingAppBarTone,
    FloatingAppBarVariant,
} from './types';
import type { CSSProperties } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { computed } from 'vue';
import { floatingAppBarGradients, floatingAppBarHexagonMask } from './types';

const props = withDefaults(
    defineProps<{
        /** Accessible, localized name supplied by the host application. */
        label: string;
        variant?: FloatingAppBarVariant;
        /** Disable positioning when the bar lives inside a dialog or keyboard viewport. */
        fixed?: boolean;
        /** Compact defaults to a circle; Portal uses the original rounded SVG hexagon. */
        shape?: FloatingAppBarShape;
        appearance?: 'solid' | 'gradient';
        /** Portal panels are borderless; Compact keeps its existing thin border. */
        bordered?: boolean;
        /** Solid colors continue to come from the slotted Button variant. */
        gradientTone?: FloatingAppBarTone;
        /** Auto moves a fixed bar to the right edge in landscape. */
        orientation?: FloatingAppBarOrientation;
        animated?: boolean;
        /** Change this key to animate a replacement even when the layout variant is unchanged. */
        transitionKey?: string | number;
        auxiliaryPosition?: 'adjacent' | 'edge';
    }>(),
    {
        variant: 'five',
        fixed: true,
        shape: 'circle',
        appearance: 'solid',
        bordered: true,
        gradientTone: 'primary',
        orientation: 'horizontal',
        animated: true,
        auxiliaryPosition: 'adjacent',
    },
);
const landscape = useMediaQuery('(orientation: landscape)');
const resolvedOrientation = computed(() =>
    props.orientation === 'auto'
        ? landscape.value
            ? 'vertical'
            : 'horizontal'
        : props.orientation,
);
const themeStyle = computed<CSSProperties>(() => ({
    '--ui-floating-app-bar-hexagon': floatingAppBarHexagonMask,
    '--ui-floating-app-bar-gradient': floatingAppBarGradients[props.gradientTone],
}));
</script>

<style>
:root {
    --ui-floating-app-bar-clearance: 7rem;
}
.ui-floating-app-bar {
    --ui-floating-app-bar-length: 22rem;
    --ui-floating-app-bar-panel-size: 3.25rem;
    --ui-floating-app-bar-primary-size: 4.25rem;
    --ui-floating-app-bar-dock-offset: calc(var(--ui-floating-app-bar-panel-size) / 2 + 1rem);
    --ui-floating-app-bar-icon-rotation: 0deg;
    position: relative;
    width: min(100%, var(--ui-floating-app-bar-length));
    min-height: calc(var(--ui-floating-app-bar-panel-size) + 2rem);
    padding: 1rem 0.5rem calc(1rem + env(safe-area-inset-bottom, 0px));
    margin-inline: auto;
    rotate: 0deg;
    transition:
        top 320ms ease,
        left 320ms ease,
        width 320ms ease,
        rotate 320ms ease;
}
.ui-floating-app-bar-fixed {
    position: fixed;
    top: calc(100% - var(--ui-floating-app-bar-dock-offset) - env(safe-area-inset-bottom, 0px));
    left: 50%;
    translate: -50% -50%;
    margin: 0;
    padding-bottom: 1rem;
    z-index: 45;
}
.ui-floating-app-bar-body {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
    height: var(--ui-floating-app-bar-panel-size);
    color: var(--ui-foreground);
    filter: drop-shadow(0 0.5rem 1rem #0003);
}
.ui-floating-app-bar-side {
    display: flex;
    align-items: stretch;
    min-width: 0;
    height: 100%;
    overflow: hidden;
    border: 1px solid var(--ui-border);
    background: var(--ui-background);
}
.ui-floating-app-bar[data-bordered='false'] .ui-floating-app-bar-side {
    border: 0;
}
.ui-floating-app-bar-side:first-child {
    border-right: 0;
    border-radius: 9999px 0 0 9999px;
    mask-image: radial-gradient(
        circle calc(2.5rem + 3px) at 100% 50%,
        transparent calc(100% - 0.5px),
        black 100%
    );
}
.ui-floating-app-bar-side:last-child {
    border-left: 0;
    border-radius: 0 9999px 9999px 0;
    mask-image: radial-gradient(
        circle calc(2.5rem + 3px) at 0% 50%,
        transparent calc(100% - 0.5px),
        black 100%
    );
}
/* Hosts may group related actions without changing the equal-width segments. */
.ui-floating-app-bar-side > [data-floating-app-bar-group] {
    display: contents;
}
.ui-floating-app-bar-side .miru-button {
    flex: 1 1 0;
    width: 0;
    min-width: 0;
    height: 100%;
    padding: 0;
    border: 0;
    border-radius: 0;
}
/* Normalize Button and ButtonAction feedback only inside the floating panels. */
.ui-floating-app-bar-side
    .miru-button:not(:disabled):not([aria-disabled='true']):not([data-disabled]):is(
        :hover,
        :focus-visible
    ) {
    background-color: var(--ui-neutral-100);
    color: var(--ui-primary);
    box-shadow: none;
}
.ui-floating-app-bar-side
    .miru-button:not(:disabled):not([aria-disabled='true']):not([data-disabled]):is(
        :active,
        [data-state='open'],
        [aria-expanded='true']
    ) {
    background-color: var(--ui-neutral-200);
    color: var(--ui-primary);
    box-shadow: none;
}
/* Optical adjustments affect the glyph, never its segment's hit area. */
.ui-floating-app-bar-side
    [data-floating-app-bar-icon-offset]
    > :is(svg, [data-floating-app-bar-glyph]) {
    translate: 2px 0;
}
.ui-floating-app-bar-side:first-child
    [data-floating-app-bar-icon-offset]
    > :is(svg, [data-floating-app-bar-glyph]) {
    translate: -2px 0;
}
/* Keep inner icons clear of the cutout while the whole segment remains clickable. */
.ui-floating-app-bar-side:first-child .miru-button:last-child {
    padding-inline-end: 2rem;
}
.ui-floating-app-bar-side:last-child .miru-button:first-child {
    padding-inline-start: 2rem;
}
.ui-floating-app-bar-side .miru-button:is(:disabled, [aria-disabled='true']) {
    background: var(--ui-muted);
    color: var(--ui-muted-foreground);
    opacity: 1;
}
.ui-floating-app-bar-side :is(:disabled, [aria-disabled='true']) svg {
    opacity: 0.45;
}
.ui-floating-app-bar-side :focus-visible {
    outline: 2px solid var(--ui-ring);
    outline-offset: -3px;
    box-shadow: none;
}
.ui-floating-app-bar-primary {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    width: var(--ui-floating-app-bar-primary-size);
    height: var(--ui-floating-app-bar-primary-size);
}
.ui-floating-app-bar-primary > .miru-button {
    width: var(--ui-floating-app-bar-primary-size);
    height: var(--ui-floating-app-bar-primary-size);
    padding: 0;
    border-radius: 50%;
}
.ui-floating-app-bar[data-variant='three'] {
    --ui-floating-app-bar-length: 15rem;
}
.ui-floating-app-bar[data-variant='primary'] {
    --ui-floating-app-bar-length: 6rem;
}
.ui-floating-app-bar[data-variant='primary'] .ui-floating-app-bar-body {
    grid-template-columns: 1fr;
}
.ui-floating-app-bar[data-shape='rounded-hexagon'] {
    --ui-floating-app-bar-panel-size: 3rem;
    --ui-floating-app-bar-primary-size: 4.5rem;
    --ui-floating-app-bar-dock-offset: 2.75rem;
}
.ui-floating-app-bar[data-shape='rounded-hexagon'][data-variant='three'] {
    --ui-floating-app-bar-length: 13rem;
}
.ui-floating-app-bar[data-shape='rounded-hexagon'] .ui-floating-app-bar-side {
    mask-image: var(--ui-floating-app-bar-hexagon), linear-gradient(black, black);
    mask-size:
        5.75rem 5.75rem,
        100% 100%;
    mask-repeat: no-repeat;
    mask-composite: exclude;
}
.ui-floating-app-bar[data-shape='rounded-hexagon'] .ui-floating-app-bar-side:first-child {
    mask-position:
        calc(100% + 2.875rem) center,
        0 0;
}
.ui-floating-app-bar[data-shape='rounded-hexagon'] .ui-floating-app-bar-side:last-child {
    mask-position:
        -2.875rem center,
        0 0;
}
.ui-floating-app-bar[data-shape='rounded-hexagon']
    :is(.ui-floating-app-bar-primary, .ui-floating-app-bar-auxiliary)
    > .miru-button {
    border-radius: 0;
    mask: var(--ui-floating-app-bar-hexagon) center / contain no-repeat;
}
.ui-floating-app-bar[data-shape='rounded-hexagon']
    :is(.ui-floating-app-bar-primary, .ui-floating-app-bar-auxiliary):has(:focus-visible) {
    filter: drop-shadow(0 0 2px var(--ui-ring));
}
.ui-floating-app-bar[data-appearance='gradient']
    :is(.ui-floating-app-bar-primary, .ui-floating-app-bar-auxiliary)
    > .miru-button {
    background: var(--ui-floating-app-bar-gradient);
    color: white;
    transition:
        filter 200ms ease,
        opacity 200ms ease;
}
.ui-floating-app-bar[data-appearance='gradient']
    :is(.ui-floating-app-bar-primary, .ui-floating-app-bar-auxiliary)
    > .miru-button:not(:disabled):hover {
    filter: brightness(1.08);
}
.ui-floating-app-bar[data-appearance='gradient']
    .ui-floating-app-bar-auxiliary
    > .miru-button[data-variant='primary'] {
    --ui-floating-app-bar-gradient: linear-gradient(
        135deg,
        var(--color-indigo-500, #6366f1),
        var(--color-purple-600, #9333ea)
    );
}
.ui-floating-app-bar[data-appearance='gradient']
    .ui-floating-app-bar-auxiliary
    > .miru-button[data-variant='danger'] {
    --ui-floating-app-bar-gradient: linear-gradient(
        135deg,
        var(--color-red-500, #ef4444),
        var(--color-fuchsia-600, #c026d3)
    );
}
.ui-floating-app-bar[data-appearance='gradient']
    .ui-floating-app-bar-auxiliary
    > .miru-button[data-variant='success'] {
    --ui-floating-app-bar-gradient: linear-gradient(
        135deg,
        var(--color-teal-500, #14b8a6),
        var(--color-lime-600, #65a30d)
    );
}
.ui-floating-app-bar[data-appearance='gradient']
    .ui-floating-app-bar-auxiliary
    > .miru-button[data-variant='warning'] {
    --ui-floating-app-bar-gradient: linear-gradient(
        135deg,
        var(--color-orange-500, #f97316),
        var(--color-amber-500, #f59e0b)
    );
}
.ui-floating-app-bar[data-appearance='gradient']
    .ui-floating-app-bar-auxiliary
    > .miru-button[data-variant='info'] {
    --ui-floating-app-bar-gradient: linear-gradient(
        135deg,
        var(--color-sky-500, #0ea5e9),
        var(--color-cyan-600, #0891b2)
    );
}
.ui-floating-app-bar-auxiliary {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    transition:
        left 320ms ease,
        right 320ms ease;
}
.ui-floating-app-bar-auxiliary-start {
    left: -3rem;
}
.ui-floating-app-bar-auxiliary-end {
    right: -3rem;
}
.ui-floating-app-bar-auxiliary > .miru-button {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border-radius: 50%;
}
.ui-floating-app-bar[data-auxiliary-position='edge'] .ui-floating-app-bar-auxiliary-start {
    left: calc(
        50% - var(--ui-floating-app-bar-viewport-half-width, 50vw) + 1rem +
            env(safe-area-inset-left, 0px)
    );
}
.ui-floating-app-bar[data-auxiliary-position='edge'] .ui-floating-app-bar-auxiliary-end {
    right: calc(
        50% - var(--ui-floating-app-bar-viewport-half-width, 50vw) + 1rem +
            env(safe-area-inset-right, 0px)
    );
}
.ui-floating-app-bar[data-orientation='vertical'] {
    --ui-floating-app-bar-icon-rotation: -90deg;
    rotate: 90deg;
}
.ui-floating-app-bar-fixed[data-orientation='vertical'] {
    top: 50%;
    left: calc(100% - var(--ui-floating-app-bar-dock-offset) - env(safe-area-inset-right, 0px));
    width: min(var(--ui-floating-app-bar-length), calc(100dvh - 2rem));
}
.ui-floating-app-bar-fixed[data-orientation='vertical']:has(.ui-floating-app-bar-auxiliary) {
    width: min(var(--ui-floating-app-bar-length), calc(100dvh - 8rem));
}
.ui-floating-app-bar[data-orientation='vertical'][data-auxiliary-position='edge']
    .ui-floating-app-bar-auxiliary-start {
    left: -3.5rem;
}
.ui-floating-app-bar[data-orientation='vertical'][data-auxiliary-position='edge']
    .ui-floating-app-bar-auxiliary-end {
    right: -3.5rem;
}
.ui-floating-app-bar
    :is(.miru-button > svg, [data-floating-app-bar-glyph], [data-floating-app-bar-upright]) {
    rotate: var(--ui-floating-app-bar-icon-rotation);
    transition: rotate 320ms ease;
}
.ui-floating-app-bar [data-floating-app-bar-glyph] {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    pointer-events: none;
}
.ui-floating-app-bar-swap-enter-active,
.ui-floating-app-bar-swap-leave-active {
    transition:
        transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 160ms ease;
}
.ui-floating-app-bar-swap-enter-from,
.ui-floating-app-bar-swap-leave-to {
    transform: translateY(120%);
    opacity: 0;
}
.ui-floating-app-bar[data-animated='false'],
.ui-floating-app-bar[data-animated='false'] * {
    transition: none;
}
@media (prefers-reduced-motion: reduce) {
    .ui-floating-app-bar,
    .ui-floating-app-bar *,
    .ui-floating-app-bar-swap-enter-active,
    .ui-floating-app-bar-swap-leave-active {
        transition: none !important;
    }
}
</style>
