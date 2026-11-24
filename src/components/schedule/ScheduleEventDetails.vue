<template>
    <div data-slot="schedule-event-details" class="space-y-4 text-sm">
        <div
            v-if="presentation !== 'description'"
            class="space-y-1 rounded-md border border-border bg-muted/30 p-3">
            <p>{{ trans('common.schedule.date') }}: {{ dateLabel }}</p>
            <p v-for="(line, index) in event.summary || []" :key="index">{{ line }}</p>
        </div>
        <p v-if="event.description" class="whitespace-pre-wrap">{{ event.description }}</p>
        <dl
            v-if="event.details?.length"
            :class="presentation === 'cards' ? 'grid gap-2' : 'space-y-2'">
            <div
                v-for="(detail, index) in event.details"
                :key="index"
                :class="
                    presentation === 'cards'
                        ? 'rounded-md border border-border bg-muted/20 p-3'
                        : 'grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start gap-x-4'
                ">
                <dt class="text-muted-foreground">{{ detail.label }}</dt>
                <dd class="min-w-0 whitespace-pre-wrap break-words font-medium">
                    {{
                        detail.value === null
                            ? '—'
                            : typeof detail.value === 'boolean'
                              ? trans(detail.value ? 'common.schedule.yes' : 'common.schedule.no')
                              : detail.value
                    }}
                </dd>
            </div>
        </dl>
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { ScheduleEvent, ScheduleDetailPresentation } from './types';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { addDays } from './dates';
const props = withDefaults(
    defineProps<{
        event: ScheduleEvent;
        presentation?: ScheduleDetailPresentation;
        timeZone?: string;
        locale?: string;
    }>(),
    { presentation: 'list', timeZone: 'Europe/Berlin' },
);
const { trans, locale } = useI18n(() => props.locale);
const dateLabel = computed(() => {
    const event = props.event;
    const options: Intl.DateTimeFormatOptions = event.allDay
        ? { dateStyle: 'medium', timeZone: 'UTC' }
        : { dateStyle: 'medium', timeStyle: 'short', timeZone: props.timeZone };
    const format = (value: string) =>
        new Intl.DateTimeFormat(locale.value, options).format(
            new Date(event.allDay ? value + 'T12:00:00Z' : value),
        );
    const start = format(event.start);
    const last =
        event.end && event.end > event.start
            ? event.allDay
                ? addDays(event.end, -1)
                : event.end
            : null;
    const end = last ? format(last) : null;
    return (
        start +
        (event.openEnded
            ? ' – ' + trans('common.schedule.ongoing')
            : end && end !== start
              ? ' – ' + end
              : '') +
        (event.allDay ? ' (' + trans('common.schedule.all_day') + ')' : '')
    );
});
</script>
