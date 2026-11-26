<template>
    <SliderRoot
        :data-readonly="isReadonly || undefined"
        @click.capture="guardReadonly"
        @keydown.capture="guardReadonly"
        @beforeinput.capture="guardReadonly"
        @paste.capture="guardReadonly"
        @pointerdown.capture="guardReadonly"
        v-slot="{ modelValue: values }"
        v-bind="forwarded"
        :required="!isReadonly && required"
        data-slot="slider"
        :data-size="size"
        :class="
            cn(
                'miru-slider relative flex touch-none select-none items-center data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[orientation=horizontal]:h-6 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-6 data-[orientation=vertical]:flex-col',
                props.class,
            )
        "
        :style="{ '--slider-color': colors[variant] }">
        <SliderTrack
            data-slot="slider-track"
            class="relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
            <SliderRange
                data-slot="slider-range"
                class="absolute bg-(--slider-color) data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
        </SliderTrack>
        <div
            v-if="showSteps && marks.length"
            aria-hidden="true"
            class="pointer-events-none absolute inset-0">
            <span
                v-for="mark in marks"
                :key="mark"
                data-slot="slider-step"
                class="absolute size-1 rounded-full bg-foreground/30"
                :style="markStyle(mark)" />
        </div>
        <SliderThumb
            v-for="(_, index) in values || defaultValue"
            :key="index"
            data-slot="slider-thumb"
            :aria-readonly="isReadonly || undefined"
            :aria-label="
                thumbLabels?.[index] ||
                (values?.length === 2
                    ? trans(index === 0 ? 'common.date.from' : 'common.date.until')
                    : label || trans('common.form.slider'))
            "
            class="relative block size-4 cursor-grab rounded-full border-2 border-(--slider-color) bg-background shadow-sm outline-none transition-shadow hover:ring-4 hover:ring-(--slider-color)/15 focus-visible:ring-4 focus-visible:ring-(--slider-color)/25 active:cursor-grabbing data-[disabled]:pointer-events-none"
            :class="size === 'sm' ? 'size-3' : size === 'lg' ? 'size-5' : undefined" />
    </SliderRoot>
</template>
<script setup lang="ts">
import type { SliderRootProps, SliderRootEmits } from 'reka-ui';
import type { CSSProperties, HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import {
    SliderRoot,
    SliderTrack,
    SliderRange,
    SliderThumb,
    useDirection,
    useForwardPropsEmits,
} from 'reka-ui';
import { computed, toRef } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { useReadonlyField } from '../field/readonly';

const props = withDefaults(
    defineProps<
        SliderRootProps & {
            class?: HTMLAttributes['class'];
            readonly?: boolean;
            variant?:
                | 'default'
                | 'primary'
                | 'secondary'
                | 'accent'
                | 'info'
                | 'success'
                | 'warning'
                | 'danger';
            size?: 'sm' | 'default' | 'lg';
            label?: string;
            thumbLabels?: string[];
            /** Render step marks when the range contains at most 200 intervals. */
            showSteps?: boolean;
        }
    >(),
    {
        defaultValue: () => [0],
        min: 0,
        max: 100,
        step: 1,
        variant: 'primary',
        size: 'default',
        thumbAlignment: 'overflow',
    },
);
const { readonly: isReadonly, guard: guardReadonly } = useReadonlyField(() => props.readonly);
const emits = defineEmits<SliderRootEmits>();
const forwarded = useForwardPropsEmits(
    reactiveOmit(
        props,
        'readonly',
        'class',
        'variant',
        'size',
        'label',
        'thumbLabels',
        'showSteps',
    ),
    emits,
);
const { trans } = useI18n();
const direction = useDirection(toRef(props, 'dir'));
const colors = {
    default: 'var(--color-neutral-500)',
    primary: 'var(--ui-primary)',
    secondary: 'var(--ui-secondary)',
    accent: 'var(--ui-accent)',
    info: 'var(--ui-info)',
    success: 'var(--ui-success)',
    warning: 'var(--ui-warning)',
    danger: 'var(--ui-danger)',
};
const marks = computed(() => {
    const intervals = (props.max - props.min) / props.step;
    if (!Number.isFinite(intervals) || intervals < 1 || intervals > 200) {
        return [];
    }
    return Array.from(
        { length: Math.floor(intervals) + 1 },
        (_, index) => props.min + index * props.step,
    );
});

/** Position decorative step marks for the same orientation/direction as Reka. */
function markStyle(value: number): CSSProperties {
    const fraction = (value - props.min) / (props.max - props.min);
    const reverse =
        props.orientation === 'vertical'
            ? !props.inverted
            : (direction.value === 'rtl') !== !!props.inverted;
    const position = `${(reverse ? 1 - fraction : fraction) * 100}%`;
    return props.orientation === 'vertical'
        ? { top: position, left: '50%', transform: 'translate(-50%, -50%)' }
        : { left: position, top: '50%', transform: 'translate(-50%, -50%)' };
}
</script>
