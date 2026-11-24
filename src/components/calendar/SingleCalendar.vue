<template>
    <CalendarRoot
        data-slot="calendar"
        :data-size="size"
        :calendar-label="trans('common.date.calendar')"
        v-slot="{ date, grid, weekDays }"
        :model-value="modelValue"
        v-model:placeholder="placeholderDate"
        :locale="resolvedLocale"
        :week-starts-on="weekStartsOn ?? 1"
        :min-value="minValue"
        :is-date-disabled="(date) => calendarDayState(date, props).disabled"
        :is-date-unavailable="(date) => calendarDayState(date, props).unavailable"
        :number-of-months="numberOfMonths"
        :fixed-weeks="fixedWeeks"
        :max-value="maxValue"
        :disabled="disabled"
        class="w-max max-w-full rounded-md border bg-background p-3 text-foreground"
        @update:model-value="$emit('update:modelValue', $event)">
        <CalendarHeader
            data-slot="calendar-header"
            class="flex items-center justify-between gap-2 pb-3">
            <CalendarPrev data-slot="calendar-prev-button" as-child>
                <Button
                    type="button"
                    :disabled="disabled"
                    variant="outline"
                    size="xs"
                    icon-only
                    :aria-label="trans('common.pagination.previous')">
                    <IconChevronLeft />
                </Button>
            </CalendarPrev>
            <div class="flex min-w-0 items-center gap-1">
                <Select
                    :disabled="disabled"
                    :model-value="String(date.month)"
                    @update:model-value="changeMonth(date, String($event))">
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
                    :model-value="String(date.year)"
                    @update:model-value="changeYear(date, String($event))">
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
            <CalendarHeading class="sr-only" />
            <CalendarNext data-slot="calendar-next-button" as-child>
                <Button
                    type="button"
                    :disabled="disabled"
                    variant="outline"
                    size="xs"
                    icon-only
                    :aria-label="trans('common.pagination.next')">
                    <IconChevronRight />
                </Button>
            </CalendarNext>
        </CalendarHeader>

        <div class="flex max-w-full gap-4 overflow-x-auto">
            <div v-for="month in grid" :key="month.value.toString()">
                <p v-if="grid.length > 1" class="pb-2 text-center text-sm font-medium">
                    {{
                        new Intl.DateTimeFormat(resolvedLocale, {
                            month: 'long',
                            year: 'numeric',
                        }).format(month.value.toDate(getLocalTimeZone()))
                    }}
                </p>
                <CalendarGrid
                    data-slot="calendar-grid"
                    class="mx-auto w-auto border-collapse space-y-1">
                    <CalendarGridHead>
                        <CalendarGridRow data-slot="calendar-grid-row" class="flex">
                            <CalendarHeadCell
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
                            </CalendarHeadCell>
                        </CalendarGridRow>
                    </CalendarGridHead>
                    <CalendarGridBody class="space-y-1">
                        <CalendarGridRow
                            data-slot="calendar-grid-row"
                            v-for="(weekDates, index) in month.rows"
                            :key="`week-${index}`"
                            class="flex">
                            <CalendarCell
                                data-slot="calendar-cell"
                                v-for="date in weekDates"
                                :key="date.toString()"
                                :date="date"
                                class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20">
                                <CalendarCellTrigger
                                    data-slot="calendar-cell-trigger"
                                    v-slot="cell"
                                    :day="date"
                                    :month="month.value"
                                    :style="
                                        hideOutsideDays && date.month !== month.value.month
                                            ? { visibility: 'hidden' }
                                            : undefined
                                    "
                                    :aria-hidden="
                                        (hideOutsideDays && date.month !== month.value.month) ||
                                        undefined
                                    "
                                    :class="
                                        isSunday(date)
                                            ? '[&:not([data-selected])]:text-danger-600 [&:not([data-selected])]:hover:text-danger-700'
                                            : undefined
                                    "
                                    class="flex size-9 cursor-pointer items-center justify-center rounded-md font-normal hover:bg-surface-hover hover:text-surface-hover-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none data-[disabled]:opacity-40 data-[unavailable]:opacity-40 data-[unavailable]:line-through data-[disabled]:cursor-not-allowed data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50 data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[today]:bg-surface-hover data-[today]:text-surface-hover-foreground data-[unavailable]:cursor-not-allowed">
                                    <slot
                                        name="day"
                                        :date="date"
                                        v-bind="calendarDayState(date, props)"
                                        :disabled="cell.disabled"
                                        :unavailable="cell.unavailable">
                                        {{ cell.dayValue }}
                                    </slot>
                                </CalendarCellTrigger>
                            </CalendarCell>
                        </CalendarGridRow>
                    </CalendarGridBody>
                </CalendarGrid>
            </div>
        </div>
    </CalendarRoot>
</template>

<script setup lang="ts">
import type { CalendarRulesProps } from './types';
import type { DateValue } from 'reka-ui';
import { getLocalTimeZone, today } from '@internationalized/date';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';
import {
    CalendarCell,
    CalendarCellTrigger,
    CalendarGrid,
    CalendarGridBody,
    CalendarGridHead,
    CalendarGridRow,
    CalendarHeadCell,
    CalendarHeader,
    CalendarHeading,
    CalendarNext,
    CalendarPrev,
    CalendarRoot,
} from 'reka-ui';
import { computed, shallowRef, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { calendarDayState } from './availability';
import { calendarMonths, calendarYears, isSunday } from './navigation';
const props = withDefaults(
    defineProps<
        CalendarRulesProps & {
            placeholder?: DateValue;
            modelValue?: DateValue;
            disabled?: boolean;
            size?: 'sm' | 'default' | 'lg';
            locale?: string;
            fixedWeeks?: boolean;
            maxValue?: DateValue;
            futureYears?: number;
            numberOfMonths?: number;
            hideOutsideDays?: boolean;
        }
    >(),
    {
        fixedWeeks: true,
        disableHolidays: true,
        futureYears: 0,
    },
);
const emit = defineEmits<{
    'update:modelValue': [value: DateValue | undefined];
    'update:placeholder': [value: DateValue];
}>();

const currentDate = today(getLocalTimeZone());
const placeholderDate = shallowRef<DateValue>(
    props.placeholder?.copy() ?? props.modelValue?.copy() ?? props.maxValue?.copy() ?? currentDate,
);
watch(
    () => props.placeholder,
    (value) => {
        if (value && value.toString() !== placeholderDate.value.toString())
            placeholderDate.value = value.copy();
    },
);
watch(placeholderDate, (value) => emit('update:placeholder', value));
const monthOptions = computed(() => calendarMonths(resolvedLocale.value));
const yearOptions = computed(() => {
    const lastYear =
        props.maxValue?.year ??
        Math.max(currentDate.year + props.futureYears, placeholderDate.value.year);

    return calendarYears(placeholderDate.value.year, lastYear);
});

watch(
    () => props.modelValue,
    (value) => {
        if (value) placeholderDate.value = value.copy();
    },
);

function changeMonth(date: DateValue, value: string): void {
    placeholderDate.value = date.set({ month: Number(value) });
}

function changeYear(date: DateValue, value: string): void {
    placeholderDate.value = date.set({ year: Number(value) });
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
