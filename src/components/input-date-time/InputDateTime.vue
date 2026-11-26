<template>
    <div
        ref="root"
        data-slot="input-date-time"
        :data-mode="mode"
        :class="
            cn(
                'grid w-full min-w-0 gap-2',
                mode === 'datetime' && 'grid-cols-[minmax(0,1fr)_7rem]',
                mode === 'timeframe' && 'grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]',
                props.wrapperClass,
            )
        "
        :role="mode === 'datetime' || mode === 'timeframe' ? 'group' : undefined"
        :aria-label="label || (mode === 'timeframe' ? trans('common.date.timeframe') : undefined)">
        <template v-if="mode === 'timeframe'">
            <input
                v-for="endpoint in ['start', 'end'] as const"
                :key="endpoint"
                type="text"
                class="sr-only"
                tabindex="-1"
                :name="name ? `${name}[${endpoint}]` : undefined"
                :value="range[endpoint] ?? ''"
                :required="required"
                :readonly="readonly"
                :disabled="disabled"
                aria-hidden="true"
                @invalid="focusInvalid" />
        </template>
        <input
            v-else
            type="text"
            class="sr-only"
            tabindex="-1"
            :name="name"
            :value="text"
            :required="required"
            :readonly="readonly"
            :disabled="disabled"
            aria-hidden="true"
            @invalid="focusInvalid" />
        <InputDate
            v-if="mode === 'date' || mode === 'datetime'"
            v-bind="{ ...calendarRules, ...fieldAttrs() }"
            :model-value="date"
            :max-value="maxValue"
            :locale="resolvedLocale"
            :placeholder="placeholder || trans('common.date.date')"
            :allow-future="allowFuture ?? mode === 'datetime'"
            :disabled="disabled"
            :size="size"
            :class="props.class"
            :readonly="readonly"
            @update:model-value="updateDate" />
        <InputTime
            v-if="mode === 'time' || mode === 'datetime'"
            v-bind="mode === 'time' ? fieldAttrs() : validationAttrs()"
            :model-value="time"
            :locale="resolvedLocale"
            :disabled="disabled || (mode === 'datetime' && !date)"
            :size="size"
            :class="props.class"
            :readonly="readonly"
            :label="mode === 'time' ? label : undefined"
            :invalid="isInvalid()"
            @update:model-value="updateTime" />
        <template v-if="mode === 'timeframe'">
            <InputTime
                v-bind="fieldAttrs()"
                :model-value="range.start || ''"
                :locale="resolvedLocale"
                :placeholder="trans('common.date.from')"
                :label="startLabel || trans('common.date.from')"
                :disabled="disabled"
                :size="size"
                :class="props.class"
                :readonly="readonly"
                :invalid="isInvalid()"
                @update:model-value="updateRange('start', $event)" />
            <span aria-hidden="true" class="self-center text-muted-foreground">–</span>
            <InputTime
                v-bind="validationAttrs()"
                :id="attrs.id ? `${attrs.id}-end` : undefined"
                :model-value="range.end || ''"
                :locale="resolvedLocale"
                :placeholder="trans('common.date.until')"
                :label="endLabel || trans('common.date.until')"
                :disabled="disabled"
                :size="size"
                :class="props.class"
                :readonly="readonly"
                :invalid="isInvalid()"
                @update:model-value="updateRange('end', $event)" />
        </template>
    </div>
</template>
<script setup lang="ts">
import type { CalendarRulesProps } from '../calendar';
import type { InputDateTimeMode, InputDateTimeValue, TimeframeValue } from './types';
import type { DateValue } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { computed, ref, useAttrs } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import InputDate from './date/InputDate.vue';
import InputTime from './time/InputTime.vue';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<
        CalendarRulesProps & {
            modelValue?: InputDateTimeValue;
            mode?: InputDateTimeMode;
            allowFuture?: boolean;
            /** Calendar-day bounds; local times have no timezone conversion. */
            maxValue?: DateValue;
            locale?: string;
            placeholder?: string;
            label?: string;
            startLabel?: string;
            endLabel?: string;
            disabled?: boolean;
            readonly?: boolean;
            name?: string;
            required?: boolean;
            wrapperClass?: HTMLAttributes['class'];
            size?: 'sm' | 'default' | 'lg';
            class?: HTMLAttributes['class'];
        }
    >(),
    {
        modelValue: null,
        mode: 'datetime',
        allowFuture: undefined,
        disabled: false,
        size: 'default',
    },
);
const emit = defineEmits<{ 'update:modelValue': [value: InputDateTimeValue] }>();
const attrs = useAttrs();
const root = ref<HTMLElement>();
function focusInvalid(event: Event) {
    event.preventDefault();
    root.value
        ?.querySelector<HTMLButtonElement>(
            '[data-slot="input-date-trigger"], [data-slot="input-time-trigger"]',
        )
        ?.focus();
}
function fieldAttrs() {
    return { ...attrs, 'aria-label': props.label || attrs['aria-label'] };
}
function validationAttrs() {
    return {
        'aria-invalid': attrs['aria-invalid'],
        'aria-valid': attrs['aria-valid'],
        'aria-describedby': attrs['aria-describedby'],
        onBlur: attrs.onBlur,
    };
}
function isInvalid(): boolean {
    return attrs['aria-invalid'] === true || attrs['aria-invalid'] === 'true';
}
const { trans, locale: resolvedLocale } = useI18n(() => props.locale);
const calendarRules = computed<CalendarRulesProps>(() => ({
    weekStartsOn: props.weekStartsOn,
    minValue: props.minValue,
    disabledWeekdays: props.disabledWeekdays,
    disabledDates: props.disabledDates,
    holidays: props.holidays,
    disableHolidays: props.disableHolidays,
    availability: props.availability,
    isDateDisabled: props.isDateDisabled,
    isDateUnavailable: props.isDateUnavailable,
}));
const text = computed(() => (typeof props.modelValue === 'string' ? props.modelValue : ''));
const date = computed(() =>
    /^\d{4}-\d{2}-\d{2}(?:T|$)/.test(text.value) ? text.value.slice(0, 10) : null,
);
const time = computed(() =>
    props.mode === 'time' ? text.value : text.value.match(/T(\d{2}:\d{2})/)?.[1] || '00:00',
);
const range = computed<TimeframeValue>(() =>
    typeof props.modelValue === 'object' && props.modelValue
        ? props.modelValue
        : { start: null, end: null },
);
/** Update the local date while preserving its clock time. */
function updateDate(value: string | null): void {
    if (props.disabled || props.readonly) return;
    emit(
        'update:modelValue',
        props.mode === 'date' ? value : value ? `${value}T${time.value}` : null,
    );
}
/** Update a clock time without parsing it in the browser timezone. */
function updateTime(value: string): void {
    if (props.disabled || props.readonly) return;
    if (props.mode === 'time') {
        emit('update:modelValue', value);
    } else if (date.value) {
        emit('update:modelValue', `${date.value}T${value}`);
    }
}
/** Preserve both endpoints, including partial and overnight timeframes. */
function updateRange(endpoint: keyof TimeframeValue, value: string): void {
    if (props.disabled || props.readonly) return;
    emit('update:modelValue', { ...range.value, [endpoint]: value });
}
</script>
