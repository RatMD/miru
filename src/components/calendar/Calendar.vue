<template>
    <RangeCalendar
        v-if="range"
        v-bind="rules"
        :placeholder="placeholder"
        :allow-non-contiguous-ranges="allowNonContiguousRanges"
        @update:placeholder="emit('update:placeholder', $event)"
        :model-value="rangeValue"
        :locale="locale"
        :size="size"
        :number-of-months="numberOfMonths"
        :fixed-weeks="fixedWeeks"
        :max-value="maxValue"
        :future-years="futureYears ?? 10"
        :hide-outside-days="hideOutsideDays"
        :disabled="disabled"
        @update:model-value="update">
        <template v-if="$slots.day" #day="slotProps">
            <slot name="day" v-bind="slotProps" />
        </template>
    </RangeCalendar>
    <SingleCalendar
        v-else
        v-bind="rules"
        :placeholder="placeholder"
        @update:placeholder="emit('update:placeholder', $event)"
        :model-value="singleValue"
        :number-of-months="numberOfMonths"
        :hide-outside-days="hideOutsideDays"
        :locale="locale"
        :size="size"
        :fixed-weeks="fixedWeeks"
        :max-value="maxValue"
        :future-years="futureYears ?? 0"
        :disabled="disabled"
        @update:model-value="update">
        <template v-if="$slots.day" #day="slotProps">
            <slot name="day" v-bind="slotProps" />
        </template>
    </SingleCalendar>
</template>

<script setup lang="ts" generic="Range extends boolean = false">
import type { CalendarValue, CalendarUpdateValue, CalendarRulesProps } from './types';
import type { DateRange, DateValue } from 'reka-ui';
import { computed } from 'vue';
import RangeCalendar from './RangeCalendar.vue';
import SingleCalendar from './SingleCalendar.vue';

const props = withDefaults(
    defineProps<
        CalendarRulesProps & {
            range?: Range & boolean;
            size?: 'sm' | 'default' | 'lg';
            placeholder?: DateValue;
            allowNonContiguousRanges?: boolean;
            modelValue?: CalendarValue<Range>;
            locale?: string;
            fixedWeeks?: boolean;
            maxValue?: DateValue;
            futureYears?: number;
            numberOfMonths?: number;
            hideOutsideDays?: boolean;
            disabled?: boolean;
        }
    >(),
    { disableHolidays: true },
);
const emit = defineEmits<{
    'update:modelValue': [value: CalendarUpdateValue<Range>];
    'update:placeholder': [value: DateValue];
}>();
const rules = computed<CalendarRulesProps>(() => ({
    weekStartsOn: props.weekStartsOn ?? 1,
    minValue: props.minValue,
    disabledWeekdays: props.disabledWeekdays,
    disabledDates: props.disabledDates,
    holidays: props.holidays,
    disableHolidays: props.disableHolidays,
    availability: props.availability,
    isDateDisabled: props.isDateDisabled,
    isDateUnavailable: props.isDateUnavailable,
}));
const singleValue = computed(() => props.modelValue as DateValue | undefined);
const rangeValue = computed(() => props.modelValue as DateRange | undefined);
function update(value: DateValue | DateRange | undefined): void {
    emit('update:modelValue', value as CalendarUpdateValue<Range>);
}
</script>
