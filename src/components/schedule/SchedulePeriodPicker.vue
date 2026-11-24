<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button
                variant="ghost"
                size="sm"
                data-slot="schedule-period-trigger"
                class="h-auto min-h-8 max-w-full text-left text-sm font-semibold whitespace-normal">
                {{ label }}
            </Button>
        </PopoverTrigger>
        <PopoverContent
            class="w-80 border-border p-3"
            :side-offset="10"
            :arrow-padding="10"
            @open-auto-focus="focusSelection">
            <div class="mb-3 flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    icon-only
                    :aria-label="trans('common.schedule.previous_year')"
                    @click="year--">
                    <IconChevronLeft />
                </Button>
                <span class="text-sm font-semibold">{{ year }}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    icon-only
                    :aria-label="trans('common.schedule.next_year')"
                    @click="year++">
                    <IconChevronRight />
                </Button>
            </div>
            <ScrollArea
                v-if="view === 'week'"
                fit-content
                class="max-h-72"
                viewport-class="overscroll-contain">
                <div
                    ref="weekList"
                    class="space-y-1 pb-2"
                    :aria-label="trans('common.schedule.select_week')">
                    <Button
                        v-for="week in weeks"
                        :key="week.start"
                        type="button"
                        :variant="selectedWeek === week.start ? 'ghostly' : 'ghost'"
                        size="sm"
                        class="w-full justify-start"
                        :aria-current="selectedWeek === week.start ? 'date' : undefined"
                        @click="pick(week.start)">
                        {{ weekLabel(week) }}
                    </Button>
                </div>
            </ScrollArea>
            <div v-else class="grid grid-cols-3 gap-1">
                <Button
                    v-for="month in 12"
                    :key="month"
                    variant="ghost"
                    size="sm"
                    @click="
                        pick(
                            String(year).padStart(4, '0') +
                                '-' +
                                String(month).padStart(2, '0') +
                                '-01',
                        )
                    ">
                    {{ monthLabel(month) }}
                </Button>
            </div>
            <PopoverArrow />
        </PopoverContent>
    </Popover>
</template>
<script setup lang="ts">
import type { ScheduleView, ScheduleWeekOption } from './types';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '../popover';
import { ScrollArea } from '../scroll-area';
import { addDays, isoWeekYear, scheduleYearWeeks, weekStart } from './dates';
const props = withDefaults(
    defineProps<{
        date: string;
        view: ScheduleView;
        label: string;
        locale?: string;
        weekStartsOn?: number;
    }>(),
    { weekStartsOn: 1 },
);
const emit = defineEmits<{ 'update:date': [date: string] }>();
const { trans, locale } = useI18n(() => props.locale);
const open = ref(false),
    year = ref(Number(props.date.slice(0, 4))),
    weekList = ref<HTMLElement>();
const selectedWeek = computed(() => weekStart(props.date, props.weekStartsOn));
const weeks = computed(() => scheduleYearWeeks(year.value, props.weekStartsOn));
function format(date: string, options: Intl.DateTimeFormatOptions) {
    return new Intl.DateTimeFormat(locale.value, { ...options, timeZone: 'UTC' }).format(
        new Date(date + 'T12:00:00Z'),
    );
}
function weekLabel(week: ScheduleWeekOption) {
    return (
        '[' +
        trans('common.schedule.week_code', { week: String(week.number).padStart(2, '0') }) +
        '] ' +
        format(week.start, { day: '2-digit', month: 'short' }) +
        ' – ' +
        format(addDays(week.end, -1), { day: '2-digit', month: 'short' })
    );
}
function monthLabel(month: number) {
    return format('2026-' + String(month).padStart(2, '0') + '-01', { month: 'short' });
}
function pick(date: string) {
    emit('update:date', date);
    open.value = false;
}
function focusSelection(event: Event) {
    if (props.view !== 'week') return;
    event.preventDefault();
    void nextTick(() => {
        const current =
            weekList.value?.querySelector<HTMLElement>('[aria-current]') ||
            weekList.value?.querySelector<HTMLElement>('button');
        current?.scrollIntoView({ block: 'center' });
        current?.focus({ preventScroll: true });
    });
}
watch(open, (value) => {
    if (value)
        year.value =
            props.view === 'week' ? isoWeekYear(props.date) : Number(props.date.slice(0, 4));
});
</script>
