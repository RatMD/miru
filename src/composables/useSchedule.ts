import type { ScheduleView } from '../components/schedule/types';
import type { MaybeRefOrGetter } from 'vue';
import { computed, ref, toValue } from 'vue';
import { dateInZone, moveDate, rangeDates, visibleRange } from '../components/schedule/dates';
/** Headless navigation. The host owns transport, routes and permission checks. */
export function useSchedule(
    options: {
        date?: string;
        view?: ScheduleView;
        timeZone?: MaybeRefOrGetter<string>;
        weekStartsOn?: MaybeRefOrGetter<number>;
        now?: () => Date;
    } = {},
) {
    const zone = () => toValue(options.timeZone) || 'Europe/Berlin';
    const today = () => dateInZone(options.now?.() ?? new Date(), zone());
    const date = ref(options.date ?? today()),
        view = ref<ScheduleView>(options.view ?? 'month');
    const selectedDate = ref<string | null>(null),
        selectedEventId = ref<string | null>(null);
    const range = computed(() =>
        visibleRange(date.value, view.value, toValue(options.weekStartsOn) ?? 1),
    );
    return {
        date,
        view,
        range,
        dates: computed(() => rangeDates(range.value)),
        selectedDate,
        selectedEventId,
        navigate: (offset: number) => {
            date.value = moveDate(date.value, offset, view.value);
        },
        goToday: () => {
            date.value = today();
        },
    };
}
