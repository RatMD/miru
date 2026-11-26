<template>
    <ContextProvider :locale="locale">
        <div class="space-y-4">
            <component
                :is="scenario === 'compact' ? Card : 'div'"
                :class="scenario === 'compact' ? 'gap-0 overflow-hidden border-border py-0' : ''">
                <Schedule
                    v-model:date="date"
                    v-model:view="view"
                    v-model:selected-date="selected"
                    v-model:filter-values="filterValues"
                    v-model:search="search"
                    :events="visibleEvents"
                    :locale="locale"
                    :class="scenario === 'compact' ? 'rounded-none border-0' : ''"
                    :presentation="scenario === 'compact' ? 'compact' : 'full'"
                    :event-display="scenario === 'compact' ? 'dots' : 'bars'"
                    :views="availableViews"
                    :filters="filterDefinitions"
                    :highlight-holidays="highlightHolidays"
                    :range-presentation="scenario === 'marketing' ? 'strips' : 'cards'"
                    :readonly="readOnly || scenario === 'readonly'"
                    :can-create="scenario !== 'readonly'"
                    :can-edit="scenario !== 'readonly'"
                    :searchable="scenario === 'marketing'"
                    :max-visible-events="scenario === 'marketing' ? 3 : 4"
                    :detail-presentation="detailMode"
                    :holidays="holidays"
                    :loading="remote && source.loading.value"
                    today="2026-11-18"
                    @create="(day) => (message = 'Host: create on ' + day)"
                    @edit="(event) => (message = 'Host: edit ' + event.title)">
                    <template v-if="scenario === 'compact'" #title-actions>
                        <Button
                            variant="ghost"
                            size="sm"
                            icon-only
                            :aria-label="de ? 'Kalender öffnen' : 'Open calendar'"
                            @click="message = 'Host: navigate to full schedule'">
                            <IconExternalLink />
                        </Button>
                    </template>
                    <template v-if="remote" #filters>
                        <Button variant="outline" size="sm" @click="source.refresh()">
                            {{ de ? 'Aktualisieren' : 'Refresh' }}
                        </Button>
                    </template>
                    <template #event-details="{ event }">
                        <ScheduleEventDetails
                            :event="event"
                            :locale="locale"
                            :presentation="detailMode || 'list'" />
                        <Button
                            v-if="event.id === 'note'"
                            variant="outline"
                            size="sm"
                            class="mt-4"
                            @click="message = 'Host: open note details'">
                            {{ de ? 'Notiz öffnen' : 'Open note' }}
                        </Button>
                    </template>
                    <template v-if="scenario === 'day-details'" #day-summary="{ date: day }">
                        <div class="flex gap-1 px-2 pb-2 text-[10px]">
                            <Badge variant="info">{{ (Number(day.slice(-2)) % 9) + 1 }} L</Badge>
                            <Badge variant="warning">2 S</Badge>
                        </div>
                    </template>
                    <template
                        v-if="scenario === 'day-details'"
                        #day-details="{ date: day, events: dayEvents }">
                        <p class="mb-1 text-xs text-muted-foreground">
                            {{ de ? 'Ausgewählter Tag' : 'Selected day' }}
                        </p>
                        <h3 class="mb-4 font-semibold">{{ day || '—' }}</h3>
                        <div
                            v-for="event in dayEvents"
                            :key="event.id"
                            class="mb-3 rounded-lg border border-l-4 p-4"
                            :style="{ borderLeftColor: event.color }">
                            <p class="text-xs text-muted-foreground">09:00–14:00</p>
                            <p class="mt-2 font-semibold">{{ event.title }}</p>
                            <p class="mt-1 text-sm">{{ event.description }}</p>
                        </div>
                    </template>
                </Schedule>
            </component>
            <p v-if="remote" class="text-xs text-muted-foreground">
                {{
                    de
                        ? 'Datenquelle mit Bereichscache; Inertia ist optional.'
                        : 'Range-cached source; Inertia is optional.'
                }}
            </p>
            <output aria-live="polite" class="block text-sm text-muted-foreground">
                {{ message }}
            </output>
        </div>
    </ContextProvider>
</template>
<script setup lang="ts">
import type { ScheduleEvent, ScheduleView, ScheduleFilter } from '../components/schedule';
import { IconExternalLink } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Card } from '../components/card';
import { ContextProvider } from '../components/provider';
import { Schedule, ScheduleEventDetails } from '../components/schedule';
import { useScheduleSource } from '../composables/useScheduleSource';
const props = withDefaults(
    defineProps<{
        scenario: 'compact' | 'organizer' | 'readonly' | 'marketing' | 'day-details';
        locale: string;
        initialView?: ScheduleView;
        remote?: boolean;
        empty?: boolean;
        detailMode?: 'list' | 'cards' | 'description';
        crowded?: boolean;
        readOnly?: boolean;
        highlightHolidays?: boolean;
    }>(),
    { initialView: 'month', remote: false, empty: false, readOnly: false, highlightHolidays: true },
);
const de = computed(() => props.locale.startsWith('de'));
const date = ref('2026-11-18'),
    view = ref<ScheduleView>(props.initialView),
    selected = ref<string | null>('2026-11-18'),
    message = ref(''),
    filterValues = ref<Record<string, string>>({}),
    search = ref('');
const availableViews = computed<ScheduleView[]>(() =>
    props.scenario === 'compact'
        ? ['month']
        : props.scenario === 'day-details'
          ? ['day', 'week', 'month']
          : ['week', 'month', 'agenda'],
);
const filterDefinitions = computed<ScheduleFilter[]>(() =>
    props.scenario === 'compact'
        ? []
        : [
              {
                  key: 'status',
                  label: de.value ? 'Status' : 'Status',
                  allLabel: de.value ? 'Alle Status' : 'All statuses',
                  options: [
                      { value: 'active', label: de.value ? 'Aktiv' : 'Active' },
                      { value: 'planned', label: de.value ? 'Geplant' : 'Planned' },
                      { value: 'confirmed', label: de.value ? 'Bestätigt' : 'Confirmed' },
                      { value: 'paused', label: de.value ? 'Pausiert' : 'Paused' },
                  ],
              },
              {
                  key: 'type',
                  label: de.value ? 'Terminart' : 'Event type',
                  allLabel: de.value ? 'Alle Terminarten' : 'All event types',
                  options: [
                      { value: 'campaign', label: de.value ? 'Kampagne' : 'Campaign' },
                      { value: 'delivery', label: de.value ? 'Lieferung' : 'Delivery' },
                      { value: 'meeting', label: de.value ? 'Besprechung' : 'Meeting' },
                      { value: 'holiday', label: de.value ? 'Feiertag' : 'Holiday' },
                  ],
              },
              {
                  key: 'location',
                  label: de.value ? 'Standort' : 'Location',
                  allLabel: de.value ? 'Alle Standorte' : 'All locations',
                  options: [
                      { value: 'dorsten', label: 'Dorsten' },
                      { value: 'gelsenkirchen', label: 'Gelsenkirchen' },
                  ],
              },
          ],
);
const holidays = { '2026-11-01': 'Allerheiligen', '2026-11-18': 'Buß- und Bettag' };
const events = computed<ScheduleEvent[]>(() =>
    props.empty
        ? []
        : [
              {
                  id: 'delivery-1',
                  filterValues: { status: 'planned', type: 'delivery', location: 'dorsten' },
                  title: de.value ? 'Lieferung LS 73141' : 'Delivery LS 73141',
                  start: '2026-11-10',
                  allDay: true,
                  color: '#f59e0b',
                  typeLabel: de.value ? 'Frist' : 'Deadline',
                  description: de.value ? '93 bestellte Geräte' : '93 ordered appliances',
                  details: [
                      { label: de.value ? 'Art' : 'Type', value: de.value ? 'Frist' : 'Deadline' },
                      { label: 'Status', value: de.value ? 'Geplant' : 'Planned' },
                      {
                          label: de.value ? 'Sichtbarkeit' : 'Visibility',
                          value: de.value ? 'Alle berechtigten Benutzer' : 'All authorized users',
                      },
                      { label: de.value ? 'Zeitzone' : 'Timezone', value: 'UTC' },
                  ],
              },
              {
                  id: 'delivery-2',
                  typeLabel: de.value ? 'Frist' : 'Deadline',
                  filterValues: { status: 'planned', type: 'delivery', location: 'dorsten' },
                  title: 'Lieferung LS 73140',
                  start: '2026-11-10',
                  allDay: true,
                  color: '#f59e0b',
              },
              {
                  id: 'note',
                  filterValues: { status: 'active', type: 'meeting', location: 'gelsenkirchen' },
                  typeLabel: de.value ? 'Besprechung' : 'Meeting',
                  title: de.value ? 'Team-Besprechung' : 'Team meeting',
                  start: '2026-11-18T09:00:00+01:00',
                  end: '2026-11-18T10:00:00+01:00',
                  color: '#6366f1',
                  description: de.value
                      ? 'Notiz und Details bleiben in der Host-Anwendung.'
                      : 'Notes and details remain host-owned.',
              },
              {
                  id: 'holiday',
                  holiday: true,
                  filterValues: { status: 'confirmed', type: 'holiday' },
                  title: de.value ? 'Buß- und Bettag' : 'Day of Repentance',
                  start: '2026-11-18',
                  allDay: true,
                  readonly: true,
                  color: '#94a3b8',
                  typeLabel: de.value ? 'Gesetzlicher Feiertag' : 'Public holiday',
                  summary: [de.value ? 'Gilt in: Sachsen' : 'Applies in: Saxony'],
                  details: [
                      {
                          label: de.value ? 'Art' : 'Type',
                          value: de.value ? 'Gesetzlicher Feiertag' : 'Public holiday',
                      },
                      { label: 'Status', value: de.value ? 'Bestätigt' : 'Confirmed' },
                      { label: de.value ? 'Gilt in NRW' : 'Applies in NRW', value: false },
                      { label: de.value ? 'Zeitzone' : 'Timezone', value: 'Europe/Berlin' },
                  ],
              },
              ...Array.from({ length: props.crowded ? 20 : 0 }, (_, i) => ({
                  id: 'overflow-' + i,
                  title: (de.value ? 'Zusätzlicher Termin ' : 'Additional appointment ') + (i + 1),
                  start: '2026-11-18',
                  allDay: true,
                  typeLabel: de.value ? 'Hinweis' : 'Notice',
                  color: '#64748b',
                  details: Array.from({ length: 24 }, (_, j) => ({
                      label: (de.value ? 'Angabe ' : 'Detail ') + (j + 1),
                      value:
                          (de.value
                              ? 'Langer Detailtext für die ScrollArea '
                              : 'Long detail for the ScrollArea ') +
                          (j + 1),
                  })),
              })),
              ...Array.from({ length: props.scenario === 'marketing' ? 10 : 4 }, (_, i) => ({
                  id: 'campaign-' + i,
                  typeLabel: de.value ? 'Kampagne' : 'Campaign',
                  filterValues: {
                      status: i % 3 ? 'active' : 'paused',
                      type: 'campaign',
                      location: i % 2 ? 'dorsten' : 'gelsenkirchen',
                  },
                  title:
                      props.scenario === 'day-details'
                          ? [
                                'Astrid Senkbeil',
                                'Kathrin Enbergs',
                                'Christel Plowe',
                                'Sarah Müller',
                            ][i % 4]!
                          : (de.value ? 'Kampagne ' : 'Campaign ') + (i + 1),
                  start: i % 2 ? '2026-11-16' : '2026-10-28',
                  end: i % 3 ? '2026-11-21' : '2026-12-04',
                  allDay: true,
                  color: i % 2 ? '#10b981' : '#3b82f6',
                  description: 'Dorsten · Backend details',
              })),
              {
                  id: 'open',
                  typeLabel: de.value ? 'Kampagne' : 'Campaign',
                  filterValues: { status: 'active', type: 'campaign', location: 'dorsten' },
                  title: de.value ? 'Daueranzeige' : 'Ongoing advertisement',
                  start: '2026-11-22',
                  openEnded: true,
                  allDay: true,
                  color: '#8b5cf6',
              },
          ],
);
const source = useScheduleSource({
    key: computed(() =>
        JSON.stringify([
            props.scenario,
            date.value,
            view.value,
            filterValues.value,
            search.value,
            'Europe/Berlin',
        ]),
    ),
    immediate: props.remote,
    load: async (signal) => {
        await Promise.resolve();
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        return events.value;
    },
});
const visibleEvents = computed(() => (props.remote ? source.data.value || [] : events.value));
</script>
