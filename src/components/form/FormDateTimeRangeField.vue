<template>
    <div class="grid gap-4 sm:grid-cols-4">
        <Field class="sm:col-span-2">
            <FieldLabel>{{ rangeLabel }}</FieldLabel>
            <Popover v-model:open="datePopoverOpen">
                <PopoverTrigger as-child>
                    <Button
                        type="button"
                        variant="outline"
                        class="w-full justify-start font-normal">
                        <IconCalendar class="size-4" />
                        {{ rangeText }}
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" class="w-auto p-0">
                    <Calendar
                        range
                        :model-value="range"
                        :locale="locale"
                        @update:model-value="updateRange" />
                    <p class="px-3 pb-3 text-xs text-muted-foreground">
                        {{ rangeHint }}
                    </p>
                </PopoverContent>
            </Popover>
        </Field>

        <Field v-if="!allDay">
            <FieldLabel>{{ startTimeLabel }}</FieldLabel>
            <InputDateTime
                mode="time"
                :model-value="timePart(start, '09:00')"
                @update:model-value="updateStartTime(String($event))" />
        </Field>
        <Field v-if="!allDay" :data-invalid="endErrors.length > 0">
            <FieldLabel>{{ endTimeLabel }}</FieldLabel>
            <InputDateTime
                mode="time"
                :model-value="timePart(end, '10:00')"
                @update:model-value="updateEndTime(String($event))" />
            <FieldError v-if="endErrors.length" :errors="endErrors" />
        </Field>
    </div>
</template>

<script setup lang="ts">
import type { DateRange } from 'reka-ui';
import { parseDate } from '@internationalized/date';
import { IconCalendar } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { dayjs } from '../../support/dayjs';
import { Button } from '../button';
import { Calendar } from '../calendar';
import { Field, FieldError, FieldLabel } from '../field';
import { InputDateTime } from '../input-date-time';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

type FormError = string | { message: string | undefined } | undefined;
const props = withDefaults(
    defineProps<{
        start: string;
        end: string | null;
        allDay: boolean;
        locale: string;
        rangeLabel: string;
        rangeHint: string;
        startTimeLabel: string;
        endTimeLabel: string;
        endErrors?: FormError[];
    }>(),
    { endErrors: () => [] },
);
const emit = defineEmits<{
    'update:start': [value: string];
    'update:end': [value: string | null];
}>();

const datePopoverOpen = ref(false);
const range = computed<DateRange>(() => ({
    start: parseDate(datePart(props.start)),
    end: props.end ? parseDate(datePart(props.end)) : undefined,
}));
const rangeText = computed(() => {
    const start = dayjs(props.start).locale(props.locale).format('D MMMM YYYY');
    if (!props.end) return start;

    return `${start} – ${dayjs(props.end).locale(props.locale).format('D MMMM YYYY')}`;
});

function datePart(value: string): string {
    return value.slice(0, 10);
}
function timePart(value: string | null, fallback: string): string {
    const match = value?.match(/T(\d{2}:\d{2})/);
    return match?.[1] ?? fallback;
}
function dateTime(date: string, time: string): string {
    return `${date}T${time}`;
}
function updateRange(value: DateRange): void {
    if (value.start) {
        emit('update:start', dateTime(value.start.toString(), timePart(props.start, '09:00')));
    }
    emit(
        'update:end',
        value.end ? dateTime(value.end.toString(), timePart(props.end, '10:00')) : null,
    );
    if (value.start && value.end) {
        datePopoverOpen.value = false;
    }
}
function updateStartTime(time: string): void {
    emit('update:start', dateTime(datePart(props.start), time));
}
function updateEndTime(time: string): void {
    const date = props.end ? datePart(props.end) : datePart(props.start);
    emit('update:end', dateTime(date, time));
}
</script>
