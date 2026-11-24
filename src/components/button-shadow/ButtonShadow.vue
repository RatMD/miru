<template>
    <Button
        v-bind="forwarded"
        data-slot="button-shadow"
        :data-muted="muted"
        :data-icon-color="iconColor"
        :as="href ? 'a' : as"
        :href="href"
        :type="href ? undefined : type"
        :variant="variant"
        shape="round"
        icon-only
        :aria-label="label || title"
        :title="title"
        :class="cn('miru-button-shadow isolate relative', sizes[size ?? 'default'], props.class)"
        :style="colors">
        <svg
            v-if="statusRing && !timerRing"
            data-slot="button-shadow-status-ring"
            aria-hidden="true"
            class="shadow-status-ring"
            viewBox="0 0 40 40">
            <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="var(--shadow-status-color)"
                stroke-width="2" />
        </svg>
        <svg
            v-if="timerRing"
            data-slot="button-shadow-timer-ring"
            aria-hidden="true"
            class="shadow-timer-ring"
            viewBox="0 0 40 40">
            <circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="var(--shadow-timer-color)"
                stroke-opacity="0.15"
                stroke-width="2" />
            <circle
                data-slot="button-shadow-timer-progress"
                cx="20"
                cy="20"
                r="17"
                pathLength="100"
                fill="none"
                stroke="var(--shadow-timer-color)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="100"
                :stroke-dashoffset="100 - progress" />
        </svg>
        <ButtonStatusIcon
            v-if="statusDot"
            :visible="!loading"
            :color="typeof statusDot === 'string' ? statusDot : variant"
            :small="size === 'xs'">
            <slot />
        </ButtonStatusIcon>
        <slot v-else />
    </Button>
</template>
<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { PrimitiveProps } from 'reka-ui';
import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
    HTMLAttributes,
} from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import ButtonStatusIcon from '../button/ButtonStatusIcon.vue';
const props = withDefaults(
    defineProps<
        PrimitiveProps & {
            variant?: NonNullable<ButtonVariants['variant']>;
            size?: ButtonVariants['size'];
            muted?: boolean;
            statusDot?: boolean | NonNullable<ButtonVariants['variant']>;
            statusRing?: NonNullable<ButtonVariants['variant']> | boolean;
            timerRing?: boolean;
            timerDuration?: number;
            timerProgress?: number | null;
            timerPaused?: boolean;
            timerColor?: NonNullable<ButtonVariants['variant']>;
            iconColor?: NonNullable<ButtonVariants['variant']>;
            label?: string;
            title?: string;
            disabled?: boolean;
            loading?: boolean;
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
        muted: false,
        statusDot: false,
        statusRing: false,
        timerRing: false,
        timerDuration: 5000,
        timerProgress: null,
        timerPaused: false,
        as: 'button',
        type: 'button',
    },
);
const forwarded = reactiveOmit(
    props,
    'class',
    'variant',
    'muted',
    'label',
    'title',
    'href',
    'as',
    'type',
    'statusDot',
    'statusRing',
    'timerRing',
    'timerDuration',
    'timerProgress',
    'timerPaused',
    'timerColor',
    'iconColor',
);
const sizes = {
    xs: 'size-6 after:size-8',
    sm: 'size-7 after:size-9',
    default: 'size-8 after:size-11',
    lg: 'size-10 after:size-13',
};
const colors = computed<CSSProperties>(() => {
    const v = props.iconColor ?? props.variant;
    const neutral = ['default', 'outline', 'ghost', 'ghostly'].includes(v);
    return {
        '--shadow-status-color': ringColor(
            typeof props.statusRing === 'string' ? props.statusRing : props.variant,
        ),
        '--shadow-timer-color': ringColor(props.timerColor ?? props.iconColor ?? props.variant),
        '--shadow-ink': neutral
            ? 'var(--ui-foreground)'
            : 'var(--ui-' + v + '-text, var(--ui-' + v + '))',
        '--shadow-halo': neutral
            ? 'var(--ui-' + (v === 'default' ? 'surface-hover' : v + '-hover') + ')'
            : 'color-mix(in srgb, var(--shadow-ink) 15%, transparent)',
    };
});
const emit = defineEmits<{ 'timer-end': [] }>();
function ringColor(color: string) {
    return ['default', 'outline', 'ghost', 'ghostly'].includes(color)
        ? 'var(--ui-foreground)'
        : 'var(--ui-' + color + ')';
}
const elapsed = ref(0);
let mounted = false,
    frame: number | undefined,
    previous: number | undefined,
    completed = false;
const progress = computed(() =>
    Math.max(
        0,
        Math.min(
            100,
            Number.isFinite(props.timerProgress) && props.timerProgress != null
                ? props.timerProgress
                : 100 * (1 - elapsed.value / Math.max(1, props.timerDuration)),
        ),
    ),
);
function stopTimer() {
    if (frame != null) cancelAnimationFrame(frame);
    frame = undefined;
    previous = undefined;
}
function tick(time: number) {
    if (previous != null) elapsed.value += time - previous;
    previous = time;
    if (progress.value > 0) frame = requestAnimationFrame(tick);
    else frame = undefined;
}
function startTimer() {
    stopTimer();
    if (
        mounted &&
        props.timerRing &&
        props.timerProgress == null &&
        !props.timerPaused &&
        progress.value > 0
    )
        frame = requestAnimationFrame(tick);
}
function restartTimer() {
    elapsed.value = 0;
    completed = false;
    startTimer();
}
watch(() => [props.timerRing, props.timerDuration], restartTimer);
watch(() => [props.timerProgress, props.timerPaused], startTimer);
watch(progress, (value) => {
    if (value > 0) completed = false;
    if (props.timerRing && value === 0 && !completed) {
        completed = true;
        emit('timer-end');
    }
});
onMounted(() => {
    mounted = true;
    restartTimer();
});
onBeforeUnmount(() => {
    mounted = false;
    stopTimer();
});
defineExpose({ restartTimer });
</script>
<style scoped>
.miru-button-shadow {
    background-color: transparent;
    color: var(--shadow-ink);
    border: 0;
    padding: 0;
    overflow: visible;
}
.miru-button-shadow[data-muted='true']:not([data-icon-color]) {
    color: var(--ui-muted-foreground);
}
.miru-button-shadow::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    border-radius: 9999px;
    background-color: var(--shadow-halo);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 180ms ease-out;
    pointer-events: none;
}
.miru-button-shadow[data-variant='outline']::after {
    border: 1px solid var(--ui-input);
}
.miru-button-shadow:not([aria-disabled='true']):hover,
.miru-button-shadow:not([aria-disabled='true']):focus-visible {
    color: var(--shadow-ink);
}
.miru-button-shadow:not([aria-disabled='true']):hover::after,
.miru-button-shadow:not([aria-disabled='true']):focus-visible::after {
    transform: translate(-50%, -50%) scale(1);
}
.miru-button-shadow:not([aria-disabled='true']):active {
    box-shadow: none;
}
.miru-button-shadow:not([aria-disabled='true']):active::after {
    transform: translate(-50%, -50%) scale(1.08);
}
@media (prefers-reduced-motion: reduce) {
    .miru-button-shadow::after {
        transition: none;
    }
}
.shadow-status-ring,
.shadow-timer-ring {
    position: absolute;
    pointer-events: none;
    max-width: none;
}
.shadow-status-ring {
    width: 100%;
    height: 100%;
}
.shadow-timer-ring {
    width: calc(100% + 0.5rem);
    height: calc(100% + 0.5rem);
    transform: rotate(-90deg);
}
.miru-button-shadow[data-loading='true'] > .shadow-status-ring,
.miru-button-shadow[data-loading='true'] > .shadow-timer-ring {
    display: block;
}
</style>
