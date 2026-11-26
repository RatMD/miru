<template>
    <div
        data-slot="rating"
        :dir="dir"
        :data-variant="variant"
        :data-animated="animated"
        :class="cn('miru-rating inline-flex flex-wrap items-center gap-2', props.class)"
        :style="styles">
        <div
            v-if="readonly"
            role="img"
            :aria-label="accessibleValue"
            class="flex flex-wrap items-center gap-1"
            data-slot="rating-display">
            <template v-if="mode === 'stars'">
                <span v-for="item in count" :key="item" class="rating-item relative block shrink-0">
                    <IconStar
                        class="rating-icon text-muted-foreground opacity-40"
                        aria-hidden="true" />
                    <span
                        class="absolute inset-y-0 start-0 overflow-hidden"
                        :style="{
                            width: `${Math.max(0, Math.min(1, boundedValue - item + 1)) * 100}%`,
                        }">
                        <IconStarFilled
                            class="rating-icon rating-filled absolute start-0 top-0"
                            aria-hidden="true" />
                    </span>
                </span>
            </template>
            <template v-else>
                <component
                    v-for="vote in votes"
                    :key="vote.value"
                    :is="boundedValue === vote.value ? vote.filled : vote.icon"
                    class="rating-icon"
                    :class="boundedValue === vote.value ? vote.color : 'text-muted-foreground'"
                    aria-hidden="true" />
            </template>
        </div>
        <RadioGroupRoot
            v-else-if="mode === 'like-dislike'"
            :model-value="boundedValue"
            :disabled="disabled"
            :name="name"
            :required="required"
            :dir="dir"
            :aria-label="ariaLabel || trans('common.rating.vote')"
            class="flex items-center gap-1"
            @update:model-value="updateVote">
            <RadioGroupItem v-for="vote in votes" :key="vote.value" :value="vote.value" as-child>
                <ButtonAction
                    :variant="vote.value === 1 ? 'success' : 'danger'"
                    :muted="boundedValue !== vote.value"
                    borderless="yes"
                    :aria-label="trans(vote.label)"
                    :disabled="disabled"
                    @click.capture="clearVote($event, vote.value)">
                    <component
                        :key="`${vote.value}-${pulse}`"
                        :is="boundedValue === vote.value ? vote.filled : vote.icon"
                        class="rating-icon"
                        :class="
                            animated && lastAnimated === vote.value ? 'rating-pop' : undefined
                        " />
                </ButtonAction>
            </RadioGroupItem>
        </RadioGroupRoot>
        <RatingRoot
            v-else
            :model-value="boundedValue"
            :length="count"
            :step="step"
            :clearable="clearable"
            :hoverable="hoverable"
            :disabled="disabled"
            :name="name"
            :required="required"
            :dir="dir"
            :aria-label="ariaLabel || trans('common.rating.label')"
            class="flex flex-wrap items-center gap-1"
            @update:model-value="updateStars"
            @keydown.capture="handleStarsKeydown">
            <RatingItem
                v-for="item in count"
                :key="item"
                :item="item"
                as="div"
                class="rating-item relative shrink-0"
                v-slot="{ steps }"
                :data-rating-item="item">
                <IconStar class="rating-icon text-muted-foreground opacity-40" aria-hidden="true" />
                <RatingItemIndicator
                    v-for="part in steps"
                    :key="part"
                    :step="part"
                    :data-rating-value="part"
                    class="rating-step rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    :aria-label="
                        trans('common.rating.stars', { value: format(part), max: String(count) })
                    ">
                    <IconStarFilled
                        :key="`${part}-${lastAnimated === item ? pulse : 0}`"
                        class="rating-icon rating-filled absolute start-0 top-0"
                        :class="animated && lastAnimated === item ? 'rating-pop' : undefined"
                        aria-hidden="true" />
                </RatingItemIndicator>
            </RatingItem>
        </RatingRoot>
        <span
            v-if="showValue && mode === 'stars'"
            class="text-sm text-muted-foreground tabular-nums"
            data-slot="rating-value">
            {{ format(boundedValue) }} / {{ count }}
        </span>
        <input
            v-if="readonly && name"
            type="hidden"
            :name="name"
            :value="boundedValue"
            :disabled="disabled" />
    </div>
</template>
<script setup lang="ts">
import type { RatingVariant, RatingStep } from './types';
import type { CSSProperties, HTMLAttributes } from 'vue';
import {
    IconStar,
    IconStarFilled,
    IconThumbUp,
    IconThumbUpFilled,
    IconThumbDown,
    IconThumbDownFilled,
} from '@tabler/icons-vue';
import {
    RatingRoot,
    RatingItem,
    RatingItemIndicator,
    RadioGroupRoot,
    RadioGroupItem,
} from 'reka-ui';
import { computed, ref, nextTick } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { ButtonAction } from '../button-action';
const props = withDefaults(
    defineProps<{
        modelValue?: number;
        defaultValue?: number;
        length?: number;
        step?: RatingStep;
        variant?: RatingVariant;
        mode?: 'stars' | 'like-dislike';
        readonly?: boolean;
        disabled?: boolean;
        clearable?: boolean;
        hoverable?: boolean;
        animated?: boolean;
        showValue?: boolean;
        size?: 'sm' | 'default' | 'lg';
        ariaLabel?: string;
        name?: string;
        required?: boolean;
        dir?: 'ltr' | 'rtl';
        class?: HTMLAttributes['class'];
    }>(),
    {
        length: 5,
        step: 0.5,
        variant: 'warning',
        mode: 'stars',
        readonly: false,
        disabled: false,
        clearable: true,
        hoverable: true,
        animated: true,
        showValue: false,
        size: 'default',
    },
);
const emit = defineEmits<{ 'update:modelValue': [value: number]; change: [value: number] }>();
const internalValue = ref(props.defaultValue ?? 0);
const count = computed(() =>
    Number.isFinite(props.length) ? Math.max(1, Math.floor(props.length)) : 5,
);
const boundedValue = computed(() => {
    const value = props.modelValue ?? internalValue.value;
    return props.mode === 'like-dislike'
        ? value === 1 || value === -1
            ? value
            : 0
        : Number.isFinite(value)
          ? props.readonly
              ? Math.max(0, Math.min(count.value, value))
              : Math.max(
                    0,
                    Math.min(
                        count.value,
                        Number((Math.round(value / props.step) * props.step).toFixed(2)),
                    ),
                )
          : 0;
});
const { trans, locale } = useI18n();
const format = (value: number) =>
    new Intl.NumberFormat(locale.value, { maximumFractionDigits: 2 }).format(value);
const accessibleValue = computed(() =>
    props.mode === 'stars'
        ? trans('common.rating.stars', {
              value: format(boundedValue.value),
              max: String(count.value),
          })
        : trans(
              boundedValue.value === 1
                  ? 'common.rating.like'
                  : boundedValue.value === -1
                    ? 'common.rating.dislike'
                    : 'common.rating.neutral',
          ),
);
const styles = computed<CSSProperties>(() => ({
    '--rating-size': props.size === 'sm' ? '1rem' : props.size === 'lg' ? '2rem' : '1.5rem',
    '--rating-ink':
        props.variant === 'default'
            ? 'var(--ui-foreground)'
            : `var(--ui-${props.variant}-text, var(--ui-${props.variant}))`,
}));
const votes = [
    {
        value: -1,
        icon: IconThumbDown,
        filled: IconThumbDownFilled,
        label: 'common.rating.dislike',
        color: 'text-danger',
    },
    {
        value: 1,
        icon: IconThumbUp,
        filled: IconThumbUpFilled,
        label: 'common.rating.like',
        color: 'text-success',
    },
];
const pulse = ref(0);
const lastAnimated = ref(0);
function update(value: number) {
    if (props.disabled || props.readonly) return;
    internalValue.value = value;
    lastAnimated.value = props.mode === 'stars' ? Math.ceil(value || boundedValue.value) : value;
    pulse.value++;
    emit('update:modelValue', value);
    emit('change', value);
}
function handleStarsKeydown(event: KeyboardEvent) {
    if (props.disabled || props.readonly || event.altKey || event.ctrlKey || event.metaKey) return;
    const group = event.currentTarget as HTMLElement;
    const rtl = getComputedStyle(group).direction === 'rtl';
    let next = boundedValue.value;
    if (event.key === 'Home') next = props.step;
    else if (event.key === 'End') next = count.value;
    else if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        const increase =
            event.key === 'ArrowUp' ||
            (rtl ? event.key === 'ArrowLeft' : event.key === 'ArrowRight');
        next = Math.max(
            props.clearable ? 0 : props.step,
            Math.min(
                count.value,
                Number((next + (increase ? props.step : -props.step)).toFixed(2)),
            ),
        );
    } else return;
    event.preventDefault();
    event.stopImmediatePropagation();
    // Clear Reka's pointer preview when switching to keyboard input.
    group.dispatchEvent(new MouseEvent('mouseleave'));
    updateStars(next);
    void nextTick(() => {
        const targets = Array.from(group.querySelectorAll<HTMLElement>('[data-rating-value]'));
        (
            targets.find((target) => Number(target.dataset.ratingValue) === next) ?? targets[0]
        )?.focus();
    });
}
function updateStars(value: number) {
    update(value);
}
function updateVote(value: unknown) {
    if (value === -1 || value === 1) update(value);
}
function clearVote(event: MouseEvent, value: number) {
    if (props.clearable && boundedValue.value === value && !props.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
        update(0);
    }
}
</script>
<style>
.miru-rating .rating-icon,
.miru-rating .rating-item {
    width: var(--rating-size);
    height: var(--rating-size);
}
.miru-rating .rating-filled {
    color: var(--rating-ink);
}
.miru-rating .rating-step {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    overflow: hidden;
    border: 0;
    padding: 0;
    background: transparent;
    width: var(--reka-rating-item-step-width);
    opacity: var(--reka-rating-item-step-opacity);
    z-index: var(--reka-rating-item-step-z-index);
    cursor: pointer;
}
.miru-rating .rating-step .rating-filled {
    opacity: 0;
}
.miru-rating .rating-step[data-state='active'] .rating-filled {
    opacity: 1;
}
.miru-rating .rating-step:disabled {
    cursor: not-allowed;
}
.miru-rating:has([aria-disabled='true']) {
    opacity: 0.5;
}
.miru-rating .rating-pop {
    animation: miru-rating-pop 240ms ease-out;
    transform-origin: center;
}
@keyframes miru-rating-pop {
    0% {
        transform: scale(0.8);
    }
    55% {
        transform: scale(1.18);
    }
    100% {
        transform: scale(1);
    }
}
@media (prefers-reduced-motion: reduce) {
    .miru-rating .rating-pop {
        animation: none;
    }
}
</style>
