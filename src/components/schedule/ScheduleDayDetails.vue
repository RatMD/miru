<template>
    <component
        :is="mobile ? Drawer : Popover"
        v-model:open="open"
        v-bind="mobile ? { snapPoints: [0.65, 0.9] } : {}">
        <component :is="mobile ? DrawerTrigger : PopoverTrigger" as-child><slot /></component>
        <component
            :is="mobile ? DrawerContent : PopoverContent"
            :class="mobile ? 'border-border p-0' : 'w-80 border-border p-0'"
            v-bind="
                mobile
                    ? { scrollable: false }
                    : {
                          side: columnIndex < 3 ? 'right' : 'left',
                          align: 'center',
                          sideOffset: 10,
                          collisionPadding: 12,
                      }
            "
            :aria-labelledby="titleId"
            :aria-describedby="descriptionId">
            <div
                class="schedule-detail-viewport"
                :style="height ? { height: height + 'px' } : undefined">
                <Transition
                    name="schedule-detail"
                    mode="out-in"
                    @before-leave="freezeHeight"
                    @enter="measure"
                    @after-enter="focusView">
                    <section
                        :key="selected?.id ?? 'day'"
                        ref="pane"
                        class="schedule-detail-pane flex min-h-0 flex-col">
                        <header
                            ref="header"
                            data-slot="schedule-detail-header"
                            class="flex shrink-0 items-start gap-2 border-b border-border px-3 py-3 pr-10">
                            <Button
                                v-if="selected"
                                variant="ghost"
                                size="sm"
                                icon-only
                                class="-ml-1 shrink-0"
                                :aria-label="trans('common.actions.back')"
                                @click="selectedId = null">
                                <IconArrowLeft />
                            </Button>
                            <div class="min-w-0 flex-1 space-y-0.5">
                                <component
                                    :is="mobile ? DrawerTitle : 'h3'"
                                    :id="titleId"
                                    tabindex="-1"
                                    class="flex min-w-0 items-center gap-2 text-sm font-semibold leading-snug outline-none">
                                    <span
                                        v-if="selected"
                                        class="size-2.5 shrink-0 rounded-full"
                                        :style="{
                                            backgroundColor: selected.color || 'var(--ui-primary)',
                                        }"
                                        aria-hidden="true" />
                                    <span class="min-w-0 break-words">
                                        {{ selected?.title ?? label }}
                                    </span>
                                </component>
                                <component
                                    :is="mobile ? DrawerDescription : 'p'"
                                    :id="descriptionId"
                                    class="text-xs leading-snug text-muted-foreground">
                                    {{
                                        selected
                                            ? selected.typeLabel || trans('common.schedule.event')
                                            : trans('common.schedule.calendar_week', {
                                                  week: weekNumber,
                                              })
                                    }}
                                </component>
                            </div>
                        </header>
                        <ScrollArea
                            fit-content
                            data-slot="schedule-detail-scroll"
                            class="min-h-0"
                            :style="{
                                maxHeight:
                                    'max(0px, calc(var(--schedule-detail-max-height) - ' +
                                    headerHeight +
                                    'px))',
                            }">
                            <div
                                ref="body"
                                class="p-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                                <template v-if="selected">
                                    <slot name="event-details" :event="selected">
                                        <ScheduleEventDetails
                                            :event="selected"
                                            :presentation="
                                                selected.detailPresentation || detailPresentation
                                            "
                                            :time-zone="timeZone"
                                            :locale="locale" />
                                    </slot>
                                </template>
                                <ul v-else-if="events.length" class="space-y-2">
                                    <li v-for="event in events" :key="event.id">
                                        <button
                                            type="button"
                                            data-slot="schedule-event-trigger"
                                            :data-schedule-event-id="event.id"
                                            class="group flex w-full cursor-pointer items-center gap-3 rounded-md border border-border border-l-4 bg-muted/30 px-2.5 py-2 text-left text-sm transition-colors hover:border-primary/50 hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring"
                                            :style="{
                                                borderLeftColor: event.color || 'var(--ui-primary)',
                                            }"
                                            @click="selectEvent(event.id)">
                                            <span class="min-w-0 flex-1">
                                                <span class="block text-sm font-medium">
                                                    {{ event.title }}
                                                </span>
                                                <span
                                                    class="mt-0.5 block text-xs text-muted-foreground">
                                                    {{
                                                        event.typeLabel ||
                                                        trans('common.schedule.event')
                                                    }}
                                                </span>
                                            </span>
                                            <IconChevronRight
                                                aria-hidden="true"
                                                class="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                                        </button>
                                    </li>
                                </ul>
                                <p v-else class="py-6 text-sm text-muted-foreground">
                                    {{ trans('common.schedule.empty') }}
                                </p>
                            </div>
                        </ScrollArea>
                    </section>
                </Transition>
            </div>
            <PopoverArrow v-if="!mobile" />
        </component>
    </component>
</template>
<script setup lang="ts">
import type { ScheduleEvent, ScheduleDetailPresentation } from './types';
import { IconArrowLeft, IconChevronRight } from '@tabler/icons-vue';
import { useMediaQuery, useResizeObserver } from '@vueuse/core';
import { computed, nextTick, ref, useId, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription } from '../drawer';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '../popover';
import { ScrollArea } from '../scroll-area';
import { isoWeekNumber } from './dates';
import ScheduleEventDetails from './ScheduleEventDetails.vue';
const props = withDefaults(
    defineProps<{
        events: ScheduleEvent[];
        label: string;
        date: string;
        locale?: string;
        columnIndex?: number;
        timeZone?: string;
        detailPresentation?: ScheduleDetailPresentation;
    }>(),
    { columnIndex: 0, timeZone: 'Europe/Berlin', detailPresentation: 'list' },
);
const { trans } = useI18n(() => props.locale);
const mobile = useMediaQuery('(max-width:767px)');
const open = ref(false),
    selectedId = ref<string | null>(null),
    pane = ref<HTMLElement>(),
    header = ref<HTMLElement>(),
    body = ref<HTMLElement>(),
    height = ref(0),
    headerHeight = ref(60);
const selected = computed(() => props.events.find((e) => e.id === selectedId.value));
const weekNumber = computed(() => isoWeekNumber(props.date));
const titleId = useId(),
    descriptionId = useId();
let lastEventId: string | null = null;
function selectEvent(id: string) {
    lastEventId = id;
    selectedId.value = id;
}
function freezeHeight() {
    if (pane.value) height.value = pane.value.getBoundingClientRect().height;
}
function measure() {
    void nextTick(() => {
        if (header.value) headerHeight.value = header.value.getBoundingClientRect().height;
        if (pane.value) height.value = pane.value.getBoundingClientRect().height;
    });
}
function focusView() {
    if (!selected.value && lastEventId) {
        const button = Array.from(
            body.value?.querySelectorAll<HTMLElement>('[data-schedule-event-id]') || [],
        ).find((el) => el.dataset.scheduleEventId === lastEventId);
        if (button) {
            button.focus({ preventScroll: true });
            return;
        }
    }
    pane.value?.querySelector<HTMLElement>('[tabindex="-1"]')?.focus({ preventScroll: true });
}
useResizeObserver([pane, header, body], measure);
watch(open, (value) => {
    if (!value) {
        selectedId.value = null;
        height.value = 0;
        lastEventId = null;
    } else measure();
});
</script>
<style scoped>
.schedule-detail-viewport {
    --schedule-detail-max-height: min(
        28rem,
        70dvh,
        var(--reka-popover-content-available-height, 70dvh)
    );
    overflow: hidden;
    transition: height 180ms ease;
}
.schedule-detail-pane {
    max-height: var(--schedule-detail-max-height);
}
.schedule-detail-enter-active,
.schedule-detail-leave-active {
    transition:
        opacity 120ms ease,
        transform 120ms ease;
}
.schedule-detail-enter-from {
    opacity: 0;
    transform: translateX(6px);
}
.schedule-detail-leave-to {
    opacity: 0;
    transform: translateX(-6px);
}
@media (prefers-reduced-motion: reduce) {
    .schedule-detail-viewport,
    .schedule-detail-enter-active,
    .schedule-detail-leave-active {
        transition: none;
    }
}
</style>
