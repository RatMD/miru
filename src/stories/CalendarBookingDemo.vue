<template>
    <UiProvider :locale="locale">
        <div class="grid max-w-xl gap-4">
            <div>
                <h3 class="font-semibold">{{ copy.title }}</h3>
                <p class="mt-1 text-sm text-muted-foreground">{{ copy.hint }}</p>
            </div>
            <Calendar
                v-model="day"
                :week-starts-on="weekStartsOn ?? 1"
                :min-value="parseDate('2026-11-17')"
                :disabled-weekdays="[0]"
                :holidays="{ '2026-11-20': copy.holiday }"
                :availability="availability"
                @update:placeholder="visibleMonth = $event.toString().slice(0, 7)">
                <template #day="{ date, available, reason, holiday }">
                    <span
                        class="relative flex size-full items-center justify-center"
                        :title="
                            holiday ||
                            reason ||
                            (available !== undefined ? available + ' ' + copy.free : undefined)
                        ">
                        {{ date.day }}
                        <span
                            v-if="available !== undefined && available > 0"
                            class="absolute bottom-1 size-1 rounded-full bg-success" />
                    </span>
                </template>
            </Calendar>
            <p class="text-xs text-muted-foreground">{{ copy.month }}: {{ visibleMonth }}</p>
            <div>
                <h4 class="mb-2 text-sm font-semibold">
                    {{ copy.slots }} — {{ day?.toString() ?? '—' }}
                </h4>
                <div class="flex flex-wrap gap-2">
                    <Button
                        v-for="slot in slots"
                        :key="slot.value"
                        :disabled="!slot.available"
                        :aria-pressed="selected === slot.value"
                        :variant="
                            selected === slot.value
                                ? 'primary'
                                : slot.warning
                                  ? 'warning'
                                  : 'outline'
                        "
                        @click="select(slot)">
                        {{ slot.label }} · {{ Math.max(0, slot.capacity - slot.used) }}/{{
                            slot.capacity
                        }}
                        {{ copy.free }}
                    </Button>
                </div>
            </div>
            <output aria-live="polite">
                {{ copy.selected }}: {{ selected && day ? day.toString() + ' ' + selected : '—' }}
            </output>
            <OverlayChoice
                :open="pending !== null"
                :title="copy.special"
                :description="pending?.warning ?? ''"
                :primary="{ label: copy.confirm, variant: 'warning' }"
                @update:open="!$event && (pending = null)"
                @confirm="confirm" />
        </div>
    </UiProvider>
</template>
<script setup lang="ts">
import type {
    CalendarDayAvailability,
    CalendarTimeSlot,
    CalendarWeekday,
} from '../components/calendar';
import type { DateValue } from 'reka-ui';
import { parseDate } from '@internationalized/date';
import { computed, ref, shallowRef, watch } from 'vue';
import { Button } from '../components/button';
import { Calendar } from '../components/calendar';
import { OverlayChoice } from '../components/overlay-choice';
import { UiProvider } from '../components/provider';
const props = defineProps<{ locale: string; weekStartsOn?: CalendarWeekday }>();
const day = shallowRef<DateValue | undefined>(parseDate('2026-11-17'));
const selected = ref<string | null>(null);
const pending = shallowRef<CalendarTimeSlot | null>(null);
const visibleMonth = ref('2026-11');
const copy = computed(() =>
    props.locale.startsWith('de')
        ? {
              title: 'Terminbuchung',
              hint: 'Sonntage, Feiertage und ausgebuchte Tage sind gesperrt. Die Daten simulieren eine Backend-Antwort.',
              holiday: 'Beispiel-Feiertag',
              closed: 'Geschlossen',
              full: 'Ausgebucht',
              slots: 'Verfügbare Uhrzeiten',
              free: 'frei',
              special: 'Sondertermin',
              warning: 'Dieser zusätzliche Termin erfordert eine Bestätigung.',
              selected: 'Ausgewählt',
              month: 'Sichtbarer Monat',
              confirm: 'Termin bestätigen',
          }
        : {
              title: 'Book an appointment',
              hint: 'Sundays, holidays and fully booked days are blocked. This fixture simulates a backend response.',
              holiday: 'Example holiday',
              closed: 'Closed',
              full: 'Fully booked',
              slots: 'Available times',
              free: 'free',
              special: 'Special appointment',
              warning: 'This additional appointment requires confirmation.',
              selected: 'Selected',
              month: 'Visible month',
              confirm: 'Confirm appointment',
          },
);
const availability = computed<Record<string, CalendarDayAvailability>>(() => ({
    '2026-11-17': { available: 3 },
    '2026-11-18': { available: 0, reason: copy.value.full },
    '2026-11-19': { closed: true, reason: copy.value.closed },
    '2026-11-21': { available: 2 },
}));
const slots = computed<CalendarTimeSlot[]>(() =>
    day.value
        ? [
              {
                  value: '08:30',
                  label: '08:30',
                  used: 1,
                  capacity: 3,
                  available: true,
                  warning: null,
                  overbooking: false,
              },
              {
                  value: '09:30',
                  label: '09:30',
                  used: 3,
                  capacity: 3,
                  available: false,
                  warning: null,
                  overbooking: false,
              },
              {
                  value: '10:30',
                  label: '10:30',
                  used: 0,
                  capacity: 1,
                  available: true,
                  warning: copy.value.warning,
                  overbooking: true,
              },
          ]
        : [],
);
watch(day, () => {
    selected.value = null;
    pending.value = null;
});
function select(slot: CalendarTimeSlot): void {
    if (!slot.available) return;
    if (slot.warning) pending.value = slot;
    else selected.value = slot.value;
}
function confirm(): void {
    selected.value = pending.value?.value ?? null;
    pending.value = null;
}
</script>
