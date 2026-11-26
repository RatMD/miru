<template>
    <ContextProvider :locale="locale">
        <div class="max-w-3xl space-y-4">
            <div class="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" @click="multi = !multi">
                    {{ multi ? '2 → 1' : '1 → 2' }} {{ de ? 'Monate' : 'months' }}
                </Button>
                <Button variant="outline" size="sm" @click="range = !range">
                    {{ range ? (de ? 'Einzeltag' : 'Single day') : de ? 'Zeitraum' : 'Range' }}
                </Button>
                <Button variant="outline" size="sm" @click="loading = !loading">Loading</Button>
                <Button
                    variant="outline"
                    size="sm"
                    @click="
                        error = error
                            ? ''
                            : de
                              ? 'Verfügbarkeit konnte nicht geladen werden'
                              : 'Could not load availability'
                    ">
                    Error
                </Button>
            </div>
            <CalendarBooking
                v-model:date="date"
                v-model:slot="slot"
                :locale="locale"
                :range="range"
                v-model:range-value="rangeValue"
                :rules="rules"
                :slots="slots"
                :number-of-months="multi ? 2 : 1"
                hide-outside-days
                show-capacity
                :loading="loading"
                :error="error"
                :max-value="parseDate('2027-12-31')" />
            <output class="block text-sm" aria-live="polite">
                {{ date }} · {{ slot }} · {{ rangeValue }}
            </output>
        </div>
    </ContextProvider>
</template>
<script setup lang="ts">
import type { CalendarTimeSlot } from '../components/calendar';
import type { DateRange } from 'reka-ui';
import { parseDate } from '@internationalized/date';
import { computed, ref, shallowRef } from 'vue';
import { Button } from '../components/button';
import { CalendarBooking } from '../components/calendar-booking';
import { ContextProvider } from '../components/provider';
const props = defineProps<{ locale: string }>();
const de = computed(() => props.locale.startsWith('de'));
const date = ref<string | null>('2026-11-18'),
    slot = ref<string | null>('09:00'),
    rangeValue = shallowRef<DateRange>();
const multi = ref(false),
    range = ref(false),
    loading = ref(false),
    error = ref('');
const rules = {
    minValue: parseDate('2026-11-01'),
    disabledWeekdays: [0] as const,
    holidays: { '2026-11-20': 'Holiday' },
    availability: { '2026-11-19': { available: 0, reason: 'Full' } },
};
const slots = computed<CalendarTimeSlot[]>(() => [
    {
        value: '09:00',
        label: '09:00–11:00',
        used: 3,
        capacity: 3,
        available: false,
        retained: true,
        warning: null,
        overbooking: false,
    },
    {
        value: '11:00',
        label: '11:00–13:00',
        used: 1,
        capacity: 3,
        available: true,
        warning: null,
        overbooking: false,
    },
    {
        value: '13:00',
        label: '13:00–15:00',
        used: 3,
        capacity: 3,
        available: false,
        warning: null,
        overbooking: false,
    },
    {
        value: '15:00',
        label: '15:00–17:00',
        used: 3,
        capacity: 3,
        available: true,
        warning: de.value
            ? 'Sondertermin nur nach Absprache.'
            : 'Special appointment requires approval.',
        overbooking: true,
    },
]);
</script>
