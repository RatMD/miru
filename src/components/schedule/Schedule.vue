<template>
    <section
        data-slot="schedule"
        :aria-label="ariaLabel || trans('common.schedule.title')"
        :aria-busy="loading"
        class="overflow-hidden rounded-lg border border-border bg-background text-foreground">
        <header class="flex flex-wrap items-center gap-3 border-b border-border p-3 md:p-4">
            <ButtonGroup
                v-if="presentation !== 'compact'"
                :label="trans('common.schedule.navigation')">
                <Button
                    variant="outline"
                    size="sm"
                    icon-only
                    :aria-label="trans('common.pagination.previous')"
                    @click="navigate(-1)">
                    <IconChevronLeft />
                </Button>
                <Button variant="outline" size="sm" @click="current">{{ currentLabel }}</Button>
                <Button
                    variant="outline"
                    size="sm"
                    icon-only
                    :aria-label="trans('common.pagination.next')"
                    @click="navigate(1)">
                    <IconChevronRight />
                </Button>
            </ButtonGroup>
            <SchedulePeriodPicker
                :date="date"
                :view="view"
                :label="heading"
                :locale="locale"
                :week-starts-on="weekStartsOn"
                @update:date="date = $event" />

            <slot name="title-actions" />
            <div class="ml-auto flex flex-wrap items-center gap-2">
                <ButtonGroup
                    v-if="presentation === 'compact'"
                    :label="trans('common.schedule.navigation')">
                    <Button
                        variant="outline"
                        size="sm"
                        icon-only
                        :aria-label="trans('common.pagination.previous')"
                        @click="navigate(-1)">
                        <IconChevronLeft />
                    </Button>
                    <Button variant="outline" size="sm" @click="current">{{ currentLabel }}</Button>
                    <Button
                        variant="outline"
                        size="sm"
                        icon-only
                        :aria-label="trans('common.pagination.next')"
                        @click="navigate(1)">
                        <IconChevronRight />
                    </Button>
                </ButtonGroup>
                <ButtonGroup v-if="hasFilters" :label="trans('common.schedule.filters')">
                    <Button
                        type="button"
                        size="sm"
                        :variant="filtersOpen ? 'ghostly' : 'outline'"
                        :aria-expanded="filtersOpen"
                        :aria-controls="filterId"
                        @click="filtersOpen = !filtersOpen">
                        <IconFilter />
                        {{ trans('common.schedule.filters') }}
                        <Badge v-if="activeFilterCount" variant="ghostly" class="ml-1">
                            {{ activeFilterCount }}
                        </Badge>
                    </Button>
                    <TooltipProvider v-if="activeFilterCount">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    icon-only
                                    data-slot="schedule-clear-filters"
                                    :aria-label="trans('common.schedule.reset_filters')"
                                    @click="resetFilters">
                                    <IconFilterOff />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                {{ trans('common.schedule.reset_filters') }}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </ButtonGroup>
                <ToggleGroup
                    v-if="views.length > 1"
                    type="single"
                    :model-value="view"
                    :aria-label="trans('common.schedule.view')"
                    @update:model-value="changeView">
                    <ToggleGroupItem v-for="item in views" :key="item" :value="item">
                        {{ trans('common.schedule.' + item) }}
                    </ToggleGroupItem>
                </ToggleGroup>
                <slot name="actions" />
            </div>
        </header>
        <div
            v-if="hasFilters"
            :id="filterId"
            data-slot="schedule-filters"
            class="schedule-filters"
            :data-open="filtersOpen">
            <div class="min-h-0 overflow-hidden" :inert="!filtersOpen">
                <div class="flex flex-wrap items-center gap-3 border-b border-gray-300 p-3">
                    <InputSearch
                        v-if="searchable"
                        v-model="search"
                        size="sm"
                        :placeholder="trans('common.schedule.search')"
                        :aria-label="trans('common.schedule.search')"
                        class="min-w-40 flex-1" />
                    <Select
                        v-for="filter in filters"
                        :key="filter.key"
                        :model-value="filterValues[filter.key] || '__schedule_all__'"
                        @update:model-value="setFilter(filter.key, $event)">
                        <SelectTrigger size="sm" class="w-44" :aria-label="filter.label">
                            <SelectValue :placeholder="filter.label" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="__schedule_all__">
                                {{ filter.allLabel || trans('common.schedule.all') }}
                            </SelectItem>
                            <SelectItem
                                v-for="option in filter.options"
                                :key="option.value"
                                :value="option.value">
                                {{ option.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <slot name="filters" />
                </div>
            </div>
        </div>
        <p v-if="loading" role="status" class="px-4 py-2 text-sm text-muted-foreground">
            {{ trans('common.schedule.loading') }}
        </p>
        <div v-if="error" role="alert" class="p-4 text-sm text-danger">
            <slot name="error">{{ error }}</slot>
        </div>
        <div class="flex min-w-0 flex-col xl:flex-row">
            <div class="min-w-0 flex-1">
                <template v-if="view === 'agenda'">
                    <div
                        v-for="day in agendaDays"
                        :key="day"
                        class="border-b border-border p-4 last:border-0">
                        <h3 class="mb-2 text-sm font-semibold">{{ dayLabel(day) }}</h3>
                        <button
                            v-for="event in eventsFor(day)"
                            :key="event.id"
                            type="button"
                            class="mb-2 block w-full cursor-pointer rounded border border-border border-l-4 p-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                            :style="{ borderLeftColor: event.color || 'var(--ui-primary)' }"
                            @click="openEvent(event)">
                            <slot name="event" :event="event" :date="day">{{ event.title }}</slot>
                        </button>
                    </div>
                    <p
                        v-if="!agendaDays.length"
                        class="p-8 text-center text-sm text-muted-foreground">
                        {{ trans('common.schedule.empty') }}
                    </p>
                </template>
                <div v-else class="overflow-x-auto">
                    <div
                        :class="
                            view === 'day' || presentation === 'compact' ? '' : 'min-w-[420px]'
                        ">
                        <div class="grid border-b border-border bg-muted/30" :style="gridStyle">
                            <div
                                v-for="day in weeks[0]?.dates || []"
                                :key="day"
                                class="py-2 text-center text-xs text-muted-foreground">
                                {{ weekday(day) }}
                            </div>
                        </div>
                        <div
                            v-for="(week, wi) in weeks"
                            :key="week.dates[0]"
                            class="relative border-b border-border last:border-b-0"
                            :style="{
                                ...weekDividerStyle,
                                minHeight:
                                    Math.max(
                                        64,
                                        minDayHeight ?? (presentation === 'compact' ? 80 : 128),
                                    ) + 'px',
                            }">
                            <div class="grid" :style="gridStyle">
                                <div
                                    v-for="(day, di) in week.dates"
                                    :key="day"
                                    class="group relative min-w-0"
                                    :class="[
                                        presentation === 'compact' ? 'min-h-20' : 'min-h-14',
                                        selectedDate === day && 'bg-muted/50',
                                        day.slice(0, 7) !== date.slice(0, 7) &&
                                            'text-muted-foreground',
                                    ]"
                                    @mouseenter="hovered = wi * 7 + di"
                                    @mouseleave="hovered = null"
                                    @focusin="hovered = wi * 7 + di">
                                    <ScheduleDayDetails
                                        v-if="dayDetails"
                                        :events="eventsFor(day)"
                                        :label="dayLabel(day)"
                                        :date="day"
                                        :column-index="di"
                                        :time-zone="timeZone"
                                        :locale="locale"
                                        :detail-presentation="detailPresentation">
                                        <button
                                            type="button"
                                            class="flex w-full cursor-pointer flex-col items-start justify-start p-2 text-left hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring"
                                            :class="
                                                presentation === 'compact' ? 'min-h-20' : 'min-h-12'
                                            "
                                            :aria-label="dayLabel(day)"
                                            @click="selectDay(day)">
                                            <span
                                                class="inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap">
                                                <span
                                                    class="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                                                    :class="
                                                        day === today
                                                            ? 'bg-default text-default-foreground'
                                                            : redDay(day)
                                                              ? 'bg-danger/10 text-danger'
                                                              : ''
                                                    ">
                                                    {{ Number(day.slice(-2)) }}
                                                </span>
                                                <span
                                                    v-if="day.slice(0, 7) !== date.slice(0, 7)"
                                                    data-slot="schedule-outside-month"
                                                    class="shrink-0 text-xs font-semibold whitespace-nowrap text-gray-400">
                                                    / {{ Number(day.slice(5, 7)) }}
                                                </span>
                                            </span>
                                            <span
                                                v-if="holidayFor(day)"
                                                class="mt-1 block max-w-full truncate text-[10px]"
                                                :class="highlightHolidays ? 'text-danger' : ''">
                                                {{ holidayFor(day) }}
                                            </span>
                                            <span
                                                v-if="eventDisplay === 'dots'"
                                                class="mt-2 flex flex-wrap gap-1">
                                                <span
                                                    v-for="event in eventsFor(day).slice(
                                                        0,
                                                        markerLimit,
                                                    )"
                                                    :key="event.id"
                                                    class="size-1.5 rounded-full"
                                                    :style="{
                                                        background:
                                                            event.color || 'var(--ui-primary)',
                                                    }" />
                                                <Badge
                                                    v-if="eventsFor(day).length > markerLimit"
                                                    data-slot="schedule-overflow"
                                                    variant="ghostly"
                                                    class="absolute right-2 bottom-2 border-gray-300 bg-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 shadow-xs">
                                                    +{{ eventsFor(day).length - markerLimit }}
                                                </Badge>
                                            </span>
                                        </button>
                                        <template #event-details="scope">
                                            <slot name="event-details" v-bind="scope">
                                                <ScheduleEventDetails
                                                    :event="scope.event"
                                                    :time-zone="timeZone"
                                                    :locale="locale"
                                                    :presentation="
                                                        scope.event.detailPresentation ||
                                                        detailPresentation
                                                    " />
                                                <Button
                                                    v-if="editable(scope.event)"
                                                    size="sm"
                                                    class="mt-3"
                                                    @click="emit('edit', scope.event)">
                                                    {{ trans('common.actions.edit') }}
                                                </Button>
                                                <slot name="event-actions" v-bind="scope" />
                                            </slot>
                                        </template>
                                    </ScheduleDayDetails>
                                    <button
                                        v-else
                                        type="button"
                                        class="block min-h-12 w-full cursor-pointer p-2 text-left hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring"
                                        :aria-label="dayLabel(day)"
                                        @click="selectDay(day)">
                                        <span
                                            class="inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap">
                                            <span
                                                class="inline-flex size-6 items-center justify-center rounded-full text-xs font-semibold"
                                                :class="
                                                    day === today
                                                        ? 'bg-default text-default-foreground'
                                                        : redDay(day)
                                                          ? 'text-danger'
                                                          : ''
                                                ">
                                                {{ Number(day.slice(-2)) }}
                                            </span>
                                            <span
                                                v-if="day.slice(0, 7) !== date.slice(0, 7)"
                                                data-slot="schedule-outside-month"
                                                class="shrink-0 text-xs font-semibold whitespace-nowrap text-gray-400">
                                                / {{ Number(day.slice(5, 7)) }}
                                            </span>
                                        </span>
                                        <span v-if="holidayFor(day)" class="block text-[10px]">
                                            {{ holidays[day] }}
                                        </span>
                                    </button>
                                    <TooltipProvider v-if="creatable(day)" :delay-duration="300">
                                        <Tooltip>
                                            <TooltipTrigger as-child>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="xs"
                                                    icon-only
                                                    class="schedule-plus absolute top-2 right-1 z-10 text-muted-foreground"
                                                    :style="{ opacity: plusOpacity(wi * 7 + di) }"
                                                    :aria-label="createLabel(day)"
                                                    @click.stop="emit('create', day)">
                                                    <IconPlus />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{{ createLabel(day) }}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <slot
                                        name="day-summary"
                                        :date="day"
                                        :events="eventsFor(day)"
                                        :selected="selectedDate === day" />
                                    <div v-if="$slots['day-content']" class="p-2">
                                        <slot
                                            name="day-content"
                                            :date="day"
                                            :events="eventsFor(day)"
                                            :selected="selectedDate === day" />
                                    </div>
                                </div>
                            </div>
                            <div
                                v-if="eventDisplay === 'bars'"
                                class="pointer-events-none grid gap-y-1 pb-2"
                                :style="{ ...gridStyle, marginTop: '-1px' }">
                                <button
                                    v-for="segment in segments(week)"
                                    :key="segment.key"
                                    type="button"
                                    class="pointer-events-auto relative min-w-0 cursor-pointer text-left text-xs focus-visible:outline-none"
                                    :class="
                                        rangePresentation === 'strips'
                                            ? 'schedule-strip h-4'
                                            : [
                                                  'z-10 mx-1 truncate rounded border-l-4 px-2 py-1 focus-visible:ring-2 focus-visible:ring-gray-300',
                                                  activeId === segment.event.id
                                                      ? 'bg-surface-hover ring-1 ring-gray-300'
                                                      : 'bg-muted/60 hover:bg-muted',
                                              ]
                                    "
                                    :data-active="activeId === segment.event.id"
                                    :style="{
                                        gridColumn: segment.column + ' / span ' + segment.span,
                                        gridRow: segment.lane + 1,
                                        borderLeftColor: segment.event.color || 'var(--ui-primary)',
                                        ...(rangePresentation === 'strips'
                                            ? {
                                                  marginLeft: segment.startsHere
                                                      ? 50 / segment.span + '%'
                                                      : '0',
                                                  marginRight: segment.endsHere
                                                      ? 50 / segment.span + '%'
                                                      : '0',
                                                  minWidth: '6px',
                                                  '--schedule-strip-color':
                                                      segment.event.color || 'var(--ui-primary)',
                                                  '--schedule-strip-ink': scheduleEventInk(
                                                      segment.event.color,
                                                  ),
                                              }
                                            : {}),
                                    }"
                                    :title="segment.event.title"
                                    @mouseenter="activeId = segment.event.id"
                                    @mouseleave="activeId = null"
                                    @focus="activeId = segment.event.id"
                                    @blur="activeId = null"
                                    @click="openEvent(segment.event)">
                                    <span
                                        v-if="rangePresentation === 'strips'"
                                        class="schedule-strip-label">
                                        <strong class="block truncate font-medium">
                                            {{ segment.event.title }}
                                        </strong>
                                        <span
                                            v-if="
                                                segment.event.description || segment.event.typeLabel
                                            "
                                            class="block truncate text-[10px] opacity-90">
                                            {{
                                                segment.event.description || segment.event.typeLabel
                                            }}
                                        </span>
                                    </span>
                                    <template v-else>
                                        <span v-if="!segment.startsHere" aria-hidden="true">‹</span>
                                        <slot
                                            name="event"
                                            :event="segment.event"
                                            :segment="segment">
                                            {{ segment.event.title }}
                                        </slot>
                                        <span v-if="!segment.endsHere" aria-hidden="true">›</span>
                                    </template>
                                </button>
                            </div>
                            <Button
                                v-if="eventDisplay === 'bars' && week.lanes > maxVisibleEvents"
                                variant="ghost"
                                size="sm"
                                class="m-1"
                                :aria-expanded="expandedWeeks.has(week.dates[0]!)"
                                @click="toggleWeek(week.dates[0]!)">
                                {{
                                    expandedWeeks.has(week.dates[0]!)
                                        ? trans('common.schedule.less')
                                        : trans('common.schedule.more', {
                                              count: week.lanes - maxVisibleEvents,
                                          })
                                }}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <aside
                v-if="$slots['day-details']"
                class="w-full border-t border-border p-4 xl:w-80 xl:border-t-0 xl:border-l">
                <slot
                    name="day-details"
                    :date="selectedDate"
                    :events="selectedDate ? eventsFor(selectedDate) : []" />
            </aside>
        </div>
        <Overlay
            v-model:open="eventOpen"
            :title="selectedEvent?.title || trans('common.schedule.title')"
            :description="selectedEvent?.start || ''"
            size="lg">
            <template v-if="selectedEvent">
                <slot name="event-details" :event="selectedEvent">
                    <ScheduleEventDetails
                        :event="selectedEvent"
                        :time-zone="timeZone"
                        :locale="locale"
                        :presentation="selectedEvent.detailPresentation || detailPresentation" />
                </slot>
                <slot name="event-actions" :event="selectedEvent" />
                <Button
                    v-if="editable(selectedEvent)"
                    class="mt-4"
                    size="sm"
                    @click="emit('edit', selectedEvent)">
                    {{ trans('common.actions.edit') }}
                </Button>
            </template>
        </Overlay>
    </section>
</template>
<script setup lang="ts">
import type {
    ScheduleEvent,
    ScheduleRange,
    ScheduleView,
    ScheduleWeek,
    ScheduleDetailPresentation,
    ScheduleFilter,
} from './types';
import {
    IconChevronLeft,
    IconChevronRight,
    IconPlus,
    IconFilter,
    IconFilterOff,
} from '@tabler/icons-vue';
import { useMediaQuery } from '@vueuse/core';
import { computed, ref, watch, useSlots, useId } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Badge } from '../badge';
import { Button } from '../button';
import { ButtonGroup } from '../button-group';
import { InputSearch } from '../input-search';
import { Overlay } from '../overlay';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../select';
import { ToggleGroup, ToggleGroupItem } from '../toggle-group';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../tooltip';
import { scheduleEventInk } from './dates';
import {
    dateInZone,
    eventDates,
    moveDate,
    rangeDates,
    scheduleWeeks,
    visibleRange,
    isoWeekNumber,
} from './dates';
import { filterScheduleEvents } from './filter';
import ScheduleDayDetails from './ScheduleDayDetails.vue';
import ScheduleEventDetails from './ScheduleEventDetails.vue';
import SchedulePeriodPicker from './SchedulePeriodPicker.vue';
const props = withDefaults(
    defineProps<{
        events: ScheduleEvent[];
        presentation?: 'compact' | 'full';
        eventDisplay?: 'dots' | 'bars';
        rangePresentation?: 'cards' | 'strips';
        filters?: ScheduleFilter[];
        filterMode?: 'local' | 'server';
        createVisibility?: 'always' | 'hover';
        highlightSundays?: boolean;
        highlightHolidays?: boolean;
        minDayHeight?: number;
        views?: ScheduleView[];
        timeZone?: string;
        weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        locale?: string;
        ariaLabel?: string;
        dayDetails?: boolean;
        eventDetails?: boolean;
        detailPresentation?: ScheduleDetailPresentation;
        eventSort?: (left: ScheduleEvent, right: ScheduleEvent) => number;
        readonly?: boolean;
        canCreate?: boolean | ((date: string) => boolean);
        canEdit?: boolean | ((event: ScheduleEvent) => boolean);
        searchable?: boolean;
        searchMode?: 'local' | 'server';
        loading?: boolean;
        error?: string;
        holidays?: Record<string, string>;
        maxVisibleEvents?: number;
        markerLimit?: number;
        today?: string;
    }>(),
    {
        presentation: 'full',
        eventDisplay: 'bars',
        views: () => ['week', 'month', 'agenda'],
        rangePresentation: 'cards',
        filters: () => [],
        filterMode: 'local',
        highlightSundays: true,
        highlightHolidays: true,
        timeZone: 'Europe/Berlin',
        weekStartsOn: 1,
        dayDetails: true,
        eventDetails: true,
        detailPresentation: 'list',
        readonly: false,
        canCreate: false,
        canEdit: false,
        searchable: false,
        searchMode: 'local',
        holidays: () => ({}),
        maxVisibleEvents: 4,
        markerLimit: 4,
    },
);
const { trans, locale } = useI18n(() => props.locale);
const dateModel = defineModel<string>('date');
const initialDate = ref(props.today || dateInZone(new Date(), props.timeZone));
const date = computed({
    get: () => dateModel.value ?? initialDate.value,
    set: (value: string) => { dateModel.value = value; },
});
const view = defineModel<ScheduleView>('view', { default: 'month' });
const selectedDate = defineModel<string | null>('selectedDate', { default: null });
const search = defineModel<string>('search', { default: '' });
const filterValues = defineModel<Record<string, string>>('filterValues', { default: () => ({}) });
const filtersOpen = defineModel<boolean>('filtersOpen', { default: false });
const filterId = useId(),
    slots = useSlots();
const hasFilters = computed(() => props.searchable || props.filters.length > 0 || !!slots.filters);
const activeFilterCount = computed(
    () =>
        props.filters.filter((filter) => !!filterValues.value[filter.key]).length +
        (search.value.trim() ? 1 : 0),
);
function setFilter(key: string, value: unknown) {
    const next = { ...filterValues.value };
    if (!value || value === '__schedule_all__') delete next[key];
    else next[key] = String(value);
    filterValues.value = next;
}
function resetFilters() {
    filterValues.value = {};
    search.value = '';
}
const emit = defineEmits<{
    create: [date: string];
    edit: [event: ScheduleEvent];
    'select-event': [event: ScheduleEvent];
    'select-date': [date: string];
    'range-change': [range: ScheduleRange];
}>();
const range = computed(() => visibleRange(date.value, view.value, props.weekStartsOn));
const dates = computed(() => rangeDates(range.value));
const filtered = computed(() =>
    filterScheduleEvents(props.events, {
        search: search.value,
        values: filterValues.value,
        keys: props.filters.map((f) => f.key),
        locale: locale.value,
        searchMode: props.searchMode,
        filterMode: props.filterMode,
    }),
);
const weeks = computed(() => scheduleWeeks(dates.value, filtered.value, props.timeZone));
const today = computed(() => props.today || dateInZone(new Date(), props.timeZone));
/** Draw only the six inner separators; the Schedule/Card owns its outside border. */
const weekDividerStyle = computed(() =>
    view.value === 'day'
        ? {}
        : {
              backgroundImage: Array.from(
                  { length: 6 },
                  () => 'linear-gradient(var(--ui-border), var(--ui-border))',
              ).join(','),
              backgroundSize: '1px 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: Array.from(
                  { length: 6 },
                  (_, i) => ((i + 1) / 7) * 100 + '% 0',
              ).join(','),
          },
);
const gridStyle = computed(() => ({
    gridTemplateColumns: 'repeat(' + (view.value === 'day' ? 1 : 7) + ', minmax(0, 1fr))',
}));
const hovered = ref<number | null>(null),
    activeId = ref<string | null>(null),
    expandedWeeks = ref(new Set<string>());
const touch = useMediaQuery('(hover: none), (pointer: coarse)');
const selectedEventId = ref<string | null>(null),
    eventOpen = ref(false);
const selectedEvent = computed(() => filtered.value.find((e) => e.id === selectedEventId.value));
function format(day: string, options: Intl.DateTimeFormatOptions) {
    return new Intl.DateTimeFormat(locale.value, { ...options, timeZone: 'UTC' }).format(
        new Date(day + 'T12:00:00Z'),
    );
}
const heading = computed(() =>
    view.value === 'week'
        ? '[' +
          trans('common.schedule.week_code', {
              week: String(isoWeekNumber(range.value.start)).padStart(2, '0'),
          }) +
          '] ' +
          format(range.value.start, { day: '2-digit', month: 'short' }) +
          ' – ' +
          format(dates.value.at(-1)!, { day: '2-digit', month: 'short', year: 'numeric' })
        : format(
              date.value,
              view.value === 'day'
                  ? { day: 'numeric', month: 'long', year: 'numeric' }
                  : { month: 'long', year: 'numeric' },
          ),
);
const currentLabel = computed(() =>
    trans(
        'common.schedule.' +
            (view.value === 'month' || view.value === 'agenda'
                ? 'this_month'
                : view.value === 'week'
                  ? 'this_week'
                  : 'today'),
    ),
);
function dayLabel(day: string) {
    return format(day, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function weekday(day: string) {
    return format(day, { weekday: 'short' });
}
function navigate(offset: number) {
    date.value = moveDate(date.value, offset, view.value);
}
function current() {
    date.value = today.value;
    selectedDate.value = today.value;
}
function changeView(value: unknown) {
    if (props.views.includes(value as ScheduleView)) view.value = value as ScheduleView;
}
function eventsFor(day: string) {
    return filtered.value
        .filter((e) => {
            const r = eventDates(e, props.timeZone);
            return r.start <= day && r.end > day;
        })
        .sort(
            props.eventSort ||
                ((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id)),
        );
}
const agendaDays = computed(() => dates.value.filter((day) => eventsFor(day).length));
function selectDay(day: string) {
    selectedDate.value = day;
    emit('select-date', day);
}
function openEvent(event: ScheduleEvent) {
    selectedEventId.value = event.id;
    eventOpen.value = props.eventDetails;
    emit('select-event', event);
}
function createLabel(day: string) {
    return trans('common.schedule.create_on', {
        date: format(day, { day: 'numeric', month: 'long', year: 'numeric' }),
    });
}
function creatable(day: string) {
    return (
        !props.readonly &&
        (typeof props.canCreate === 'function' ? props.canCreate(day) : props.canCreate)
    );
}
function editable(event: ScheduleEvent) {
    return (
        !props.readonly &&
        !event.readonly &&
        (typeof props.canEdit === 'function' ? props.canEdit(event) : props.canEdit)
    );
}
function holidayFor(day: string) {
    return (
        props.holidays[day] ||
        props.events.find((e) => {
            if (!e.holiday) return false;
            const r = eventDates(e, props.timeZone);
            return r.start <= day && r.end > day;
        })?.title
    );
}
function redDay(day: string) {
    return (
        (props.highlightSundays && new Date(day + 'T12:00:00Z').getUTCDay() === 0) ||
        (props.highlightHolidays && !!holidayFor(day))
    );
}
function plusOpacity(index: number) {
    const always =
        props.createVisibility === 'always' ||
        (props.createVisibility !== 'hover' && props.presentation === 'full');
    const base = always ? 0.35 : 0;
    if (touch.value) return 1;
    if (hovered.value === null) return base;
    const row = Math.abs(Math.floor(index / 7) - Math.floor(hovered.value / 7)),
        col = Math.abs((index % 7) - (hovered.value % 7));
    return Math.max(
        base,
        row === 0 && col === 0 ? 1 : row + col === 1 ? 0.5 : row === 1 && col === 1 ? 0.15 : 0,
    );
}
function segments(week: ScheduleWeek) {
    return expandedWeeks.value.has(week.dates[0]!)
        ? week.segments
        : week.segments.filter((s) => s.lane < props.maxVisibleEvents);
}
function toggleWeek(key: string) {
    const next = new Set(expandedWeeks.value);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    expandedWeeks.value = next;
}
watch(
    range,
    (value) => {
        expandedWeeks.value = new Set();
        eventOpen.value = false;
        emit('range-change', value);
    },
    { immediate: true },
);
watch(selectedEvent, (value) => {
    if (!value) eventOpen.value = false;
});
</script>
<style scoped>
.schedule-filters {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 200ms ease;
}
.schedule-filters[data-open='true'] {
    grid-template-rows: 1fr;
}
.schedule-strip {
    isolation: isolate;
    z-index: 1;
    border: 0;
    background: transparent;
}
.schedule-strip::before {
    content: '';
    position: absolute;
    inset: 50% 0 auto;
    height: 6px;
    transform: translateY(-50%);
    border-radius: 3px;
    background: var(--schedule-strip-color);
    transition:
        height 150ms ease,
        box-shadow 150ms ease;
}
.schedule-strip-label {
    position: absolute;
    inset: 50% 0 auto;
    transform: translateY(-50%);
    padding: 4px 8px;
    color: var(--schedule-strip-ink);
    opacity: 0;
    pointer-events: none;
    transition: opacity 150ms ease;
}
.schedule-strip:is([data-active='true'], :focus-visible) {
    z-index: 20;
}
.schedule-strip:is([data-active='true'], :focus-visible)::before {
    height: 40px;
    box-shadow: 0 0 0 1px var(--ui-neutral-300);
}
.schedule-strip:is([data-active='true'], :focus-visible) .schedule-strip-label {
    opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
    .schedule-filters,
    .schedule-strip::before,
    .schedule-strip-label {
        transition: none;
    }
}

.schedule-plus {
    transition: opacity 180ms ease;
}
.schedule-plus:focus-visible {
    opacity: 1 !important;
}
@media (prefers-reduced-motion: reduce) {
    .schedule-plus {
        transition: none;
    }
}
</style>
