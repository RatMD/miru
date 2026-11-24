<template>
    <RangeCalendarRoot
        data-slot="calendar"
        :data-size="size"
        :calendar-label="trans('common.date.range_calendar')"
        :key="navigationRevision"
        v-slot="{ grid, weekDays }"
        :model-value="modelValue"
        v-model:placeholder="placeholderDate"
        :locale="resolvedLocale"
        :week-starts-on="weekStartsOn ?? 1"
        :min-value="minValue"
        :is-date-disabled="(date) => calendarDayState(date, props).disabled"
        :is-date-unavailable="(date) => calendarDayState(date, props).unavailable"
        :allow-non-contiguous-ranges="allowNonContiguousRanges"
        :number-of-months="numberOfMonths"
        :max-value="maxValue"
        :disabled="disabled"
        :fixed-weeks="fixedWeeks"
        class="w-max rounded-md border bg-background p-3 text-foreground"
        @update:model-value="$emit('update:modelValue', $event)">
        <RangeCalendarHeader
            data-slot="calendar-header"
            class="flex items-center justify-between gap-2 pb-3">
            <RangeCalendarPrev data-slot="calendar-prev-button" as-child>
                <Button
                    type="button"
                    :disabled="disabled"
                    variant="outline"
                    size="xs"
                    icon-only
                    :aria-label="trans('common.pagination.previous')">
                    <IconChevronLeft />
                </Button>
            </RangeCalendarPrev>
            <div class="flex items-center gap-1">
                <Select
                    :disabled="disabled"
                    :model-value="String(placeholderDate.month)"
                    @update:model-value="changeMonth(String($event))">
                    <SelectTrigger
                        size="sm"
                        class="w-[6.75rem] gap-1 px-2 py-0 data-[size=sm]:h-6"
                        :aria-label="trans('common.date.month')">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="month in monthOptions"
                            :key="month.value"
                            :value="month.value">
                            {{ month.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    :disabled="disabled"
                    :model-value="String(placeholderDate.year)"
                    @update:model-value="changeYear(String($event))">
                    <SelectTrigger
                        size="sm"
                        class="w-[4.25rem] gap-1 px-2 py-0 data-[size=sm]:h-6"
                        :aria-label="trans('common.date.year')">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="year in yearOptions" :key="year" :value="String(year)">
                            {{ year }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <RangeCalendarHeading class="sr-only" />
            <RangeCalendarNext data-slot="calendar-next-button" as-child>
                <Button
                    type="button"
                    :disabled="disabled"
                    variant="outline"
                    size="xs"
                    icon-only
                    :aria-label="trans('common.pagination.next')">
                    <IconChevronRight />
                </Button>
            </RangeCalendarNext>
        </RangeCalendarHeader>
        <div class="flex gap-4">
            <div v-for="month in grid" :key="month.value.toString()">
                <p v-if="numberOfMonths > 1" class="pb-3 text-center text-sm font-medium">
                    {{ monthCaption(month.value) }}
                </p>
                <RangeCalendarGrid
                    data-slot="calendar-grid"
                    class="w-auto border-collapse space-y-1">
                    <RangeCalendarGridHead>
                        <RangeCalendarGridRow data-slot="calendar-grid-row" class="flex">
                            <RangeCalendarHeadCell
                                data-slot="calendar-head-cell"
                                v-for="(day, dayIndex) in weekDays"
                                :key="day"
                                class="w-9 rounded-md text-center text-[0.8rem] font-normal"
                                :class="
                                    isSunday(month.rows[0]?.[dayIndex])
                                        ? 'text-danger-600'
                                        : 'text-muted-foreground'
                                ">
                                {{ day }}
                            </RangeCalendarHeadCell>
                        </RangeCalendarGridRow>
                    </RangeCalendarGridHead>
                    <RangeCalendarGridBody class="space-y-1">
                        <RangeCalendarGridRow
                            data-slot="calendar-grid-row"
                            v-for="(weekDates, index) in month.rows"
                            :key="index"
                            class="flex">
                            <RangeCalendarCell
                                data-slot="calendar-cell"
                                v-for="date in weekDates"
                                :key="date.toString()"
                                :date="date"
                                class="relative p-0 text-center text-sm focus-within:z-20">
                                <RangeCalendarCellTrigger
                                    data-slot="calendar-cell-trigger"
                                    v-slot="cell"
                                    :day="date"
                                    :month="month.value"
                                    :aria-hidden="hiddenOutsideDay(date, month.value) || undefined"
                                    :class="[
                                        isSunday(date)
                                            ? '[&:not([data-selected])]:text-danger-600 [&:not([data-selected])]:hover:text-danger-700'
                                            : undefined,
                                        hiddenOutsideDay(date, month.value) &&
                                            'pointer-events-none invisible',
                                    ]"
                                    class="flex size-9 cursor-pointer items-center justify-center rounded-md font-normal hover:bg-surface-hover hover:text-surface-hover-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none data-[disabled]:opacity-40 data-[unavailable]:opacity-40 data-[unavailable]:line-through data-[disabled]:cursor-not-allowed data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50 data-[selected]:rounded-none data-[selected]:bg-ghostly-hover data-[selected]:text-foreground data-[selection-end]:rounded-r-md data-[selection-end]:bg-default! data-[selection-end]:text-default-foreground! data-[selection-start]:rounded-l-md data-[selection-start]:bg-default! data-[selection-start]:text-default-foreground! data-[today]:font-semibold data-[unavailable]:cursor-not-allowed">
                                    <slot
                                        name="day"
                                        :date="date"
                                        v-bind="calendarDayState(date, props)"
                                        :disabled="cell.disabled"
                                        :unavailable="cell.unavailable">
                                        {{ cell.dayValue }}
                                    </slot>
                                </RangeCalendarCellTrigger>
                            </RangeCalendarCell>
                        </RangeCalendarGridRow>
                    </RangeCalendarGridBody>
                </RangeCalendarGrid>
            </div>
        </div>
    </RangeCalendarRoot>
</template>

<script setup lang="ts">
import type { CalendarRulesProps } from './types';
import type { DateRange, DateValue } from 'reka-ui';
import { endOfMonth, getLocalTimeZone, startOfMonth, today } from '@internationalized/date';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';
import {
    RangeCalendarCell,
    RangeCalendarCellTrigger,
    RangeCalendarGrid,
    RangeCalendarGridBody,
    RangeCalendarGridHead,
    RangeCalendarGridRow,
    RangeCalendarHeadCell,
    RangeCalendarHeader,
    RangeCalendarHeading,
    RangeCalendarNext,
    RangeCalendarPrev,
    RangeCalendarRoot,
} from 'reka-ui';
import { computed, ref, shallowRef, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { calendarDayState } from './availability';
import { calendarMonths, calendarYears, isSunday } from './navigation';
const props = withDefaults(
    defineProps<
        CalendarRulesProps & {
            placeholder?: DateValue;
            allowNonContiguousRanges?: boolean;
            modelValue?: DateRange;
            maxValue?: DateValue;
            disabled?: boolean;
            size?: 'sm' | 'default' | 'lg';
            locale?: string;
            numberOfMonths?: number;
            fixedWeeks?: boolean;
            /** Hide duplicate adjacent-month dates in multi-month views; outer dates stay visible. */
            hideOutsideDays?: boolean;
            futureYears?: number;
        }
    >(),
    {
        modelValue: () => ({ start: undefined, end: undefined }),

        numberOfMonths: 2,
        fixedWeeks: true,
        disableHolidays: true,
        hideOutsideDays: undefined,
        futureYears: 10,
    },
);
const emit = defineEmits<{
    'update:modelValue': [value: DateRange];
    'update:placeholder': [value: DateValue];
}>();
const currentDate = today(getLocalTimeZone());
// Reka keeps an already visible month in the current grid; explicit navigation must re-anchor it.
const navigationRevision = ref(0);
const placeholderDate = shallowRef<DateValue>(
    props.placeholder?.copy() ?? props.modelValue.start?.copy() ?? currentDate,
);
const resolvedHideOutsideDays = computed(() => props.hideOutsideDays ?? props.numberOfMonths > 1);
watch(
    () => props.placeholder,
    (value) => {
        if (value && value.toString() !== placeholderDate.value.toString())
            placeholderDate.value = value.copy();
    },
);
watch(placeholderDate, (value) => emit('update:placeholder', value));
const monthOptions = computed(() => calendarMonths(resolvedLocale.value));
const yearOptions = computed(() =>
    calendarYears(
        placeholderDate.value.year,
        Math.max(currentDate.year + props.futureYears, placeholderDate.value.year),
    ),
);
watch(
    () => props.modelValue.start,
    (value) => {
        if (value) placeholderDate.value = value.copy();
    },
);
function changeMonth(value: string): void {
    placeholderDate.value = placeholderDate.value.set({ month: Number(value) });
    navigationRevision.value++;
}
function changeYear(value: string): void {
    placeholderDate.value = placeholderDate.value.set({ year: Number(value) });
    navigationRevision.value++;
}
function monthCaption(value: DateValue): string {
    return new Intl.DateTimeFormat(resolvedLocale.value, { month: 'long', year: 'numeric' }).format(
        value.toDate(getLocalTimeZone()),
    );
}
function outsideVisibleRange(value: DateValue): boolean {
    return (
        value.compare(startOfMonth(placeholderDate.value)) < 0 ||
        value.compare(endOfMonth(placeholderDate.value.add({ months: props.numberOfMonths - 1 }))) >
            0
    );
}

function hiddenOutsideDay(value: DateValue, month: DateValue): boolean {
    if (!resolvedHideOutsideDays.value) return false;

    const outsideMonth =
        value.compare(startOfMonth(month)) < 0 || value.compare(endOfMonth(month)) > 0;
    return outsideMonth && (props.numberOfMonths === 1 || !outsideVisibleRange(value));
}

const { trans, locale: providerLocale } = useI18n(() => props.locale);
const resolvedLocale = computed(() => props.locale || providerLocale.value);
</script>

<style scoped>
[data-size='sm'] [data-slot='calendar-cell-trigger'] {
    width: 2rem;
    height: 2rem;
}
[data-size='sm'] [data-slot='calendar-head-cell'] {
    width: 2rem;
}
[data-size='lg'] [data-slot='calendar-cell-trigger'] {
    width: 2.75rem;
    height: 2.75rem;
}
[data-size='lg'] [data-slot='calendar-head-cell'] {
    width: 2.75rem;
}
</style>
