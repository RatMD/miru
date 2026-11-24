import type { CalendarRulesProps, CalendarTimeSlot } from '../components/calendar';
import type { DateValue } from 'reka-ui';
import type { MaybeRefOrGetter } from 'vue';
import { parseDate } from '@internationalized/date';
import { computed, ref, shallowRef, toValue, watch } from 'vue';
import { calendarDayState } from '../components/calendar/availability';
/** Selection only: availability and authorization remain server-owned; no implicit persistence. */
export function useCalendarBooking(
    options: {
        date?: string | null;
        maxValue?: MaybeRefOrGetter<DateValue | undefined>;
        slot?: string | null;
        slots?: MaybeRefOrGetter<readonly CalendarTimeSlot[]>;
        rules?: MaybeRefOrGetter<CalendarRulesProps>;
        confirmWarnings?: MaybeRefOrGetter<boolean>;
    } = {},
) {
    const date = ref<string | null>(options.date ?? null),
        slot = ref<string | null>(options.slot ?? null);
    const pending = shallowRef<CalendarTimeSlot | null>(null);
    const slots = computed(() => toValue(options.slots) ?? []);
    const selectedSlot = computed(
        () => slots.value.find((value) => value.value === slot.value) ?? null,
    );
    function selectDate(value: string | null): boolean {
        if (value) {
            const parsed = parseDate(value),
                rules = toValue(options.rules) ?? {};
            const state = calendarDayState(parsed, rules);
            const maximum = toValue(options.maxValue);
            if (
                state.unavailable ||
                (maximum && parsed.compare(maximum) > 0) ||
                (rules.minValue && parsed.compare(rules.minValue) < 0)
            )
                return false;
        }
        date.value = value;
        return true;
    }
    function selectSlot(value: string): boolean {
        const candidate = slots.value.find((item) => item.value === value);
        if (!date.value || !candidate || (!candidate.available && !candidate.retained))
            return false;
        if (candidate.warning && toValue(options.confirmWarnings) !== false) {
            pending.value = candidate;
            return false;
        }
        slot.value = candidate.value;
        pending.value = null;
        return true;
    }
    function confirmSlot(): boolean {
        const candidate =
            pending.value && slots.value.find((item) => item.value === pending.value!.value);
        if (!candidate || (!candidate.available && !candidate.retained)) {
            pending.value = null;
            return false;
        }
        slot.value = candidate.value;
        pending.value = null;
        return true;
    }
    watch(
        date,
        () => {
            slot.value = null;
            pending.value = null;
        },
        { flush: 'sync' },
    );
    watch(slots, (values) => {
        if (
            slot.value &&
            !values.some((item) => item.value === slot.value && (item.available || item.retained))
        )
            slot.value = null;
        if (
            pending.value &&
            !values.some(
                (item) => item.value === pending.value!.value && (item.available || item.retained),
            )
        )
            pending.value = null;
    });
    return {
        date,
        slot,
        slots,
        selectedSlot,
        pending,
        selectDate,
        selectSlot,
        confirmSlot,
        cancel: () => {
            pending.value = null;
        },
    };
}
