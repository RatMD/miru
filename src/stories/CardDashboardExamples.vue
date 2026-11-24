<template>
    <div class="dashboard-card-example" :style="{ width: containerWidth + 'px' }">
        <Card class="overflow-hidden">
            <CardHeader border>
                <CardTitle class="flex items-center gap-2 text-sm">
                    <component
                        :is="kind === 'links' ? IconLink : IconCalendarEvent"
                        class="size-4"
                        aria-hidden="true" />
                    {{ kind === 'links' ? copy.quickLinks : copy.upcoming }}
                </CardTitle>
                <template #actions>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost" size="sm" icon-only :aria-label="copy.settings">
                                <IconSettings class="size-4" aria-hidden="true" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem v-if="kind === 'links'" v-model="grayscale">
                                {{ copy.grayscale }}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem v-else v-model="showDates">
                                {{ copy.showDates }}
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </template>
            </CardHeader>
            <CardContent class="p-0!">
                <div v-if="kind === 'links'" data-slot="card-quick-links" class="quick-link-grid">
                    <a
                        v-for="link in links"
                        :key="link.title"
                        :href="link.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="quick-link"
                        :aria-label="link.title"
                        :title="link.url">
                        <component
                            :is="link.icon"
                            class="quick-link-icon"
                            :class="{ 'is-grayscale': grayscale }"
                            :style="{ color: link.color }"
                            aria-hidden="true" />
                        <span class="min-w-0 flex-1">
                            <span class="block truncate text-sm font-medium">{{ link.title }}</span>
                            <span class="block truncate text-[10px] text-muted-foreground">
                                {{ link.url }}
                            </span>
                        </span>
                    </a>
                </div>
                <ScrollArea
                    v-else
                    fit-content
                    class="max-h-64 w-full"
                    data-slot="card-upcoming-events">
                    <ul class="m-0 list-none p-0 py-1">
                        <li v-for="(event, index) in events" :key="event.date">
                            <a :href="'#example-event-' + index" class="event-link">
                                <span
                                    class="size-2 shrink-0 rounded-full"
                                    :style="{ backgroundColor: event.color }"
                                    aria-hidden="true" />
                                <span class="min-w-0 flex-1">
                                    <span class="block truncate text-sm font-medium">
                                        {{ copy.events[index] }}
                                    </span>
                                    <time
                                        v-if="showDates"
                                        :datetime="event.date"
                                        class="block text-xs text-muted-foreground">
                                        {{ dateLabel(event.date) }}
                                    </time>
                                </span>
                            </a>
                        </li>
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    </div>
</template>
<script setup lang="ts">
import {
    IconLink,
    IconCalendarEvent,
    IconSettings,
    IconCircleAsterisk,
    IconShoppingBag,
    IconMessages,
    IconBrandInstagram,
    IconBrandFacebook,
} from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from '../components/dropdown-menu';
import { ScrollArea } from '../components/scroll-area';
import { useI18n } from '../composables/useI18n';
withDefaults(defineProps<{ kind: 'links' | 'events'; containerWidth?: number }>(), {
    containerWidth: 560,
});
const { locale } = useI18n();
const grayscale = ref(true);
const showDates = ref(true);
const copy = computed(() =>
    locale.value.startsWith('de')
        ? {
              quickLinks: 'Schnellzugriffe',
              upcoming: 'Anstehende Termine',
              settings: 'Anzeige anpassen',
              grayscale: 'Icons zunächst in Graustufen',
              showDates: 'Datum anzeigen',
              events: [
                  'Geburtstag von Alexander',
                  '1. Weihnachtstag',
                  '2. Weihnachtstag',
                  'Neujahr',
                  'Geburtstag von Sam',
                  'Teambesprechung',
                  'Inventur',
              ],
          }
        : {
              quickLinks: 'Quick access',
              upcoming: 'Upcoming events',
              settings: 'Display settings',
              grayscale: 'Start with grayscale icons',
              showDates: 'Show dates',
              events: [
                  "Alexander's birthday",
                  'Christmas Day',
                  'Boxing Day',
                  "New Year's Day",
                  "Sam's birthday",
                  'Team meeting',
                  'Stocktaking',
              ],
          },
);
const links = [
    {
        title: 'MIRU',
        url: 'https://miru.at',
        icon: IconCircleAsterisk,
        color: 'var(--ui-primary)',
    },
    {
        title: 'rat.md',
        url: 'https://rat.md',
        icon: IconCircleAsterisk,
        color: 'var(--ui-primary)',
    },
    {
        title: 'ebay.de',
        url: 'https://www.ebay.de/',
        icon: IconShoppingBag,
        color: 'var(--ui-warning-600)',
    },
    {
        title: 'kleinanzeigen.de',
        url: 'https://www.kleinanzeigen.de/',
        icon: IconMessages,
        color: 'var(--ui-success)',
    },
    {
        title: 'instagram.com',
        url: 'https://www.instagram.com/',
        icon: IconBrandInstagram,
        color: 'var(--ui-secondary)',
    },
    {
        title: 'facebook.com',
        url: 'https://www.facebook.com/',
        icon: IconBrandFacebook,
        color: 'var(--ui-info)',
    },
];
const events = [
    { date: '2026-12-17', color: 'var(--ui-secondary)' },
    { date: '2026-12-25', color: 'var(--ui-danger)' },
    { date: '2026-12-26', color: 'var(--ui-danger)' },
    { date: '2027-01-01', color: 'var(--ui-danger)' },
    { date: '2027-01-07', color: 'var(--ui-secondary)' },
    { date: '2027-01-11', color: 'var(--ui-primary)' },
    { date: '2027-01-15', color: 'var(--ui-info)' },
];
function dateLabel(date: string): string {
    return new Intl.DateTimeFormat(locale.value, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
    }).format(new Date(date + 'T12:00:00Z'));
}
</script>
<style scoped>
.dashboard-card-example {
    max-width: 100%;
}
.quick-link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: 1px;
    background: var(--ui-background);
}
.quick-link {
    box-shadow: 0 0 0 1px var(--ui-border);
}
.quick-link,
.event-link {
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    color: var(--ui-foreground);
    text-decoration: none;
    cursor: pointer;
    background: var(--ui-background);
    transition: background-color 180ms ease;
}
.event-link {
    padding: 0.625rem 1.5rem;
}
.quick-link:hover,
.event-link:hover {
    background: var(--ui-muted);
}
.quick-link:focus-visible,
.event-link:focus-visible {
    background: var(--ui-muted);
    outline: 2px solid var(--ui-primary);
    outline-offset: -2px;
}
.quick-link-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    transition: filter 220ms ease;
}
.quick-link-icon.is-grayscale {
    filter: grayscale(1);
}
.quick-link:is(:hover, :focus-visible) .quick-link-icon {
    filter: grayscale(0);
}
@media (prefers-reduced-motion: reduce) {
    .quick-link,
    .event-link,
    .quick-link-icon {
        transition: none;
    }
}
</style>
