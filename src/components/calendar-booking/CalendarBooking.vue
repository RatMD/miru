<template>
    <div data-slot="calendar-booking" class="grid min-w-0 grid-cols-1 gap-4">
        <Calendar
            v-if="range"
            range
            v-model="dateRange"
            v-bind="rules"
            :max-value="maxValue"
            :locale="locale"
            :number-of-months="numberOfMonths"
            :hide-outside-days="hideOutsideDays"
            :disabled="disabled || loading"
            :future-years="futureYears"
            @update:placeholder="emit('visible-month-change', $event.toString())" />
        <Calendar
            v-else
            :model-value="calendarDate"
            v-bind="rules"
            :max-value="maxValue"
            :locale="locale"
            :number-of-months="numberOfMonths"
            :hide-outside-days="hideOutsideDays"
            :disabled="disabled || loading"
            :future-years="futureYears"
            @update:model-value="changeDate"
            @update:placeholder="emit('visible-month-change', $event.toString())" />
        <p v-if="loading" role="status" class="text-sm text-muted-foreground">
            {{ trans('common.schedule.loading') }}
        </p>
        <p v-if="error" role="alert" class="text-sm text-danger">{{ error }}</p>
        <slot name="after-calendar" :date="booking.date.value" />
        <div v-if="showSlots && booking.date.value && !range" class="grid gap-2">
            <p class="text-sm font-semibold">{{ slotsLabel || trans('common.schedule.slots') }}</p>
            <div
                class="flex flex-wrap gap-2"
                role="group"
                :aria-label="slotsLabel || trans('common.schedule.slots')">
                <Button
                    v-for="item in slots"
                    :key="item.value"
                    type="button"
                    :variant="
                        booking.slot.value === item.value
                            ? 'primary'
                            : item.warning
                              ? 'warning'
                              : 'outline'
                    "
                    :disabled="disabled || loading || (!item.available && !item.retained)"
                    :aria-pressed="booking.slot.value === item.value"
                    @click="booking.selectSlot(item.value)">
                    <slot name="slot" :selected="booking.slot.value === item.value">
                        {{ item.label }}
                        <span v-if="showCapacity" class="text-xs">
                            {{ Math.max(0, item.capacity - item.used) }}/{{ item.capacity }}
                        </span>
                        <span v-if="item.retained" class="text-xs">
                            {{ trans('common.schedule.retained') }}
                        </span>
                    </slot>
                </Button>
            </div>
            <p v-if="!slots.length && !loading" class="text-sm text-muted-foreground">
                {{ trans('common.schedule.no_slots') }}
            </p>
        </div>
        <OverlayChoice
            :open="booking.pending.value !== null"
            :title="trans('common.schedule.special')"
            :disabled="disabled || loading"
            :loading="loading"
            :description="booking.pending.value?.warning || ''"
            :primary="{ label: trans('common.actions.accept'), variant: 'warning' }"
            @confirm="booking.confirmSlot()"
            @update:open="!$event && booking.cancel()" />
    </div>
</template>
<script setup lang="ts">
import type { CalendarRulesProps, CalendarTimeSlot } from '../calendar';
import type { DateRange, DateValue } from 'reka-ui';
import { parseDate } from '@internationalized/date';
import { computed, watch } from 'vue';
import { useCalendarBooking } from '../../composables/useCalendarBooking';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Calendar } from '../calendar';
import { OverlayChoice } from '../overlay-choice';
const props = withDefaults(
    defineProps<{
        slots?: CalendarTimeSlot[];
        rules?: CalendarRulesProps;
        maxValue?: DateValue;
        range?: boolean;
        numberOfMonths?: number;
        hideOutsideDays?: boolean;
        futureYears?: number;
        disabled?: boolean;
        loading?: boolean;
        error?: string;
        locale?: string;
        showSlots?: boolean;
        showCapacity?: boolean;
        confirmWarnings?: boolean;
        slotsLabel?: string;
    }>(),
    {
        slots: () => [],
        rules: () => ({}),
        range: false,
        numberOfMonths: 1,
        futureYears: 10,
        showSlots: true,
        showCapacity: false,
        confirmWarnings: true,
    },
);
const date = defineModel<string | null>('date', { default: null });
const slot = defineModel<string | null>('slot', { default: null });
const dateRange = defineModel<DateRange>('rangeValue');
const emit = defineEmits<{ 'visible-month-change': [date: string] }>();
const { trans } = useI18n(() => props.locale);
const booking = useCalendarBooking({
    date: date.value,
    slot: slot.value,
    slots: () => props.slots,
    rules: () => props.rules,
    maxValue: () => props.maxValue,
    confirmWarnings: () => props.confirmWarnings,
});
watch(
    date,
    (value) => {
        if (value !== booking.date.value) booking.date.value = value;
    },
    { flush: 'sync' },
);
watch(
    booking.date,
    (value) => {
        date.value = value;
    },
    { flush: 'sync' },
);
watch(slot, (value) => {
    booking.slot.value = value;
});
watch(booking.slot, (value) => {
    slot.value = value;
});
const calendarDate = computed(() => (date.value ? parseDate(date.value) : undefined));
function changeDate(value: DateValue | undefined) {
    if (value && props.maxValue && value.compare(props.maxValue) > 0) return;
    booking.selectDate(value?.toString() ?? null);
}
</script>
