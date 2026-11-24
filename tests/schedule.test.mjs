import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { renderToString } from '@vue/server-renderer';
import { createServer } from 'vite';
import { afterAll as after, test } from 'vitest';
import { createSSRApp, effectScope, h, nextTick, ref } from 'vue';
const server = await createServer({
    configFile: false,
    root: fileURLToPath(new URL('..', import.meta.url)),
    plugins: [vue()],
    server: { middlewareMode: true },
    appType: 'custom',
});
after(() => server.close());
const { eventDates, visibleRange, rangeDates, scheduleWeeks } = await server.ssrLoadModule(
    '/src/components/schedule/dates.ts',
);
const { useScheduleSource } = await server.ssrLoadModule('/src/composables/useScheduleSource.ts');
const { useCalendarBooking } = await server.ssrLoadModule('/src/composables/useCalendarBooking.ts');
const { parseDate } = await import('@internationalized/date');
test('month padding spans complete weeks, including year boundaries', () => {
    const r = visibleRange('2026-11-18', 'month');
    assert.deepEqual(r, { start: '2026-10-26', end: '2026-12-07' });
    assert.equal(rangeDates(r).length, 42);
    assert.deepEqual(visibleRange('2027-01-01', 'week'), {
        start: '2026-12-28',
        end: '2027-01-04',
    });
});
test('exclusive timed ends and DST retain the correct occupied calendar days', () => {
    assert.deepEqual(
        eventDates(
            { id: 'a', title: 'a', start: '2026-03-28T23:00:00Z', end: '2026-03-29T22:00:00Z' },
            'Europe/Berlin',
        ),
        { start: '2026-03-29', end: '2026-03-30' },
    );
    assert.deepEqual(
        eventDates(
            { id: 'a', title: 'a', start: '2026-11-18', end: '2026-11-20', allDay: true },
            'Europe/Berlin',
        ),
        { start: '2026-11-18', end: '2026-11-20' },
    );
    assert.throws(() =>
        eventDates({ id: 'a', title: 'a', start: '2026-11-18T09:00:00' }, 'Europe/Berlin'),
    );
});
test('missing end is bounded while explicit ongoing events span subsequent weeks', () => {
    const date = '2026-11-18';
    assert.equal(
        eventDates({ id: 'a', title: 'a', start: date, allDay: true }, 'UTC').end,
        '2026-11-19',
    );
    assert.equal(
        eventDates({ id: 'b', title: 'b', start: date, allDay: true, openEnded: true }, 'UTC').end,
        '9999-12-31',
    );
});
test('overlapping bars occupy separate lanes and continue at week boundaries', () => {
    const events = [
        { id: 'a', title: 'a', start: '2026-11-01', end: '2026-11-11', allDay: true },
        { id: 'b', title: 'b', start: '2026-11-03', end: '2026-11-05', allDay: true },
    ];
    const weeks = scheduleWeeks(
        rangeDates({ start: '2026-11-02', end: '2026-11-16' }),
        events,
        'UTC',
    );
    assert.equal(weeks[0].lanes, 2);
    assert.equal(weeks[0].segments[0].startsHere, false);
    assert.equal(weeks[0].segments[0].endsHere, false);
    assert.equal(weeks[1].segments[0].endsHere, true);
});
test('range cache reuses data and force refresh invalidates it', async () => {
    let calls = 0;
    const key = ref('A');
    const scope = effectScope();
    const source = scope.run(() =>
        useScheduleSource({ key, immediate: false, load: async () => ++calls }),
    );
    await source.refresh(false);
    await source.refresh(false);
    assert.equal(calls, 1);
    await source.refresh();
    assert.equal(calls, 2);
    scope.stop();
});
test('stale replies cannot overwrite a newly requested range', async () => {
    const key = ref('A');
    const resolvers = [];
    const scope = effectScope();
    const source = scope.run(() =>
        useScheduleSource({
            key,
            immediate: false,
            load: () => new Promise((resolve) => resolvers.push(resolve)),
        }),
    );
    const first = source.refresh(false);
    await Promise.resolve();
    key.value = 'B';
    await Promise.resolve();
    resolvers[1]('B');
    await nextTick();
    await new Promise((resolve) => setImmediate(resolve));
    resolvers[0]('A');
    await first;
    assert.equal(source.data.value, 'B');
    scope.stop();
});
test('booking blocks unavailable slots and rechecks pending confirmation', async () => {
    const slots = ref([
        {
            value: 'a',
            label: 'a',
            used: 1,
            capacity: 1,
            available: true,
            warning: 'Confirm',
            overbooking: true,
        },
    ]);
    const scope = effectScope();
    const booking = scope.run(() => useCalendarBooking({ date: '2026-11-18', slots }));
    assert.equal(booking.selectSlot('a'), false);
    assert.ok(booking.pending.value);
    slots.value = [{ ...slots.value[0], available: false }];
    assert.equal(booking.confirmSlot(), false);
    assert.equal(booking.slot.value, null);
    slots.value = [{ ...slots.value[0], retained: true, warning: null }];
    assert.equal(booking.selectSlot('a'), true);
    booking.selectDate('2026-11-19');
    assert.equal(booking.slot.value, null);
    scope.stop();
});
test('single Calendar renders two months and hides outside dates', async () => {
    const { default: Calendar } = await server.ssrLoadModule(
        '/src/components/calendar/Calendar.vue',
    );
    const html = await renderToString(
        createSSRApp({
            render: () =>
                h(Calendar, {
                    modelValue: parseDate('2026-11-18'),
                    numberOfMonths: 2,
                    hideOutsideDays: true,
                }),
        }),
    );
    assert.equal((html.match(/data-slot="calendar-head-cell"/g) || []).length, 14);
    assert.match(html, /visibility:hidden/);
});
test('Schedule SSR exposes connected navigation and does not mutate source events', async () => {
    const { default: Schedule } = await server.ssrLoadModule(
        '/src/components/schedule/Schedule.vue',
    );
    const events = Object.freeze([
        { id: 'a', title: 'Appointment', start: '2026-11-18', allDay: true },
    ]);
    const html = await renderToString(
        createSSRApp({
            render: () =>
                h(Schedule, { date: '2026-11-18', events, views: ['month'], dayDetails: false }),
        }),
    );
    assert.match(html, /Appointment/);
    assert.match(html, /data-slot="button-group"/);
    assert.equal(events[0].start, '2026-11-18');
});

test('ISO week number follows ISO week-years at January boundaries', async () => {
    const { isoWeekNumber } = await server.ssrLoadModule('/src/components/schedule/dates.ts');
    assert.equal(isoWeekNumber('2026-11-18'), 47);
    assert.equal(isoWeekNumber('2021-01-01'), 53);
    assert.equal(isoWeekNumber('2021-01-04'), 1);
});
test('event details format exclusive all-day ends and render host details as text', async () => {
    const { default: Details } = await server.ssrLoadModule(
        '/src/components/schedule/ScheduleEventDetails.vue',
    );
    const html = await renderToString(
        createSSRApp({
            render: () =>
                h(Details, {
                    locale: 'de-DE',
                    event: {
                        id: 'x',
                        title: 'x',
                        start: '2026-11-18',
                        end: '2026-11-20',
                        allDay: true,
                        details: [
                            { label: 'HTML', value: '<script>alert(1)</script>' },
                            { label: 'Aktiv', value: false },
                        ],
                    },
                }),
        }),
    );
    assert.match(html, /18.11.2026/);
    assert.match(html, /19.11.2026/);
    assert.doesNotMatch(html, /20.11.2026/);
    assert.match(html, /&lt;script&gt;/);
    assert.match(html, /Nein/);
});

test('declared Schedule facets combine with search and support multivalue data', async () => {
    const { filterScheduleEvents } = await server.ssrLoadModule(
        '/src/components/schedule/filter.ts',
    );
    const events = [
        {
            id: 'a',
            title: 'Campaign A',
            start: '2026-11-18',
            filterValues: { status: 'active', location: ['dorsten', 'essen'] },
        },
        {
            id: 'b',
            title: 'Campaign B',
            start: '2026-11-18',
            filterValues: { status: 'paused', location: 'dorsten' },
        },
        {
            id: 'c',
            title: 'Delivery',
            start: '2026-11-18',
            filterValues: { status: 'active', location: 'essen' },
        },
    ];
    assert.deepEqual(
        filterScheduleEvents(events, {
            search: 'campaign',
            values: { status: 'active', location: 'dorsten' },
            keys: ['status', 'location'],
        }).map((e) => e.id),
        ['a'],
    );
    assert.equal(
        filterScheduleEvents(events, { values: { unrelated: 'x' }, keys: ['status'] }).length,
        3,
    );
    assert.equal(
        filterScheduleEvents(events, {
            search: 'missing',
            searchMode: 'server',
            values: { status: 'missing' },
            filterMode: 'server',
        }).length,
        3,
    );
});
test('ISO-week picker provides complete contiguous week-years', async () => {
    const { scheduleYearWeeks, isoWeekYear } = await server.ssrLoadModule(
        '/src/components/schedule/dates.ts',
    );
    const weeks = scheduleYearWeeks(2026);
    assert.equal(weeks.length, 53);
    assert.equal(weeks[0].start, '2025-12-29');
    assert.equal(weeks.at(-1).number, 53);
    assert.equal(isoWeekYear('2027-01-01'), 2026);
    weeks.slice(1).forEach((week, i) => assert.equal(weeks[i].end, week.start));
    assert.equal(scheduleYearWeeks(2027).length, 52);
});
