<template>
    <div :class="overflow ? 'w-full max-w-[340px]' : 'w-full max-w-3xl'">
        <Tabs
            v-model="active"
            :tabs="tabs"
            :appearance="appearance"
            :variant="variant"
            :orientation="orientation"
            :bordered="bordered"
            :active-indicator="activeIndicator"
            :drawer-show-all-tabs="drawerShowAllTabs"
            :aria-label="text.navigation">
            <template v-for="tab in tabs" :key="tab.value" #[tab.value]>
                <section class="space-y-4">
                    <div class="border-b border-border pb-4">
                        <h3 class="text-lg font-semibold">{{ tab.label }}</h3>
                        <p class="mt-1 text-sm text-muted-foreground">{{ text.description }}</p>
                    </div>
                    <p class="text-sm text-muted-foreground">{{ text.content }}</p>
                </section>
            </template>
        </Tabs>
    </div>
</template>
<script setup lang="ts">
import type { InlineVariant } from '../components/inline-variants';
import type { TabItem, TabsAppearance } from '../components/tabs';
import {
    IconCalendarEvent,
    IconFileText,
    IconHistory,
    IconLock,
    IconSettings,
    IconUsers,
} from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { Tabs } from '../components/tabs';

const props = withDefaults(
    defineProps<{
        locale?: string;
        appearance?: TabsAppearance;
        variant?: InlineVariant;
        orientation?: 'horizontal' | 'vertical';
        bordered?: boolean;
        activeIndicator?: boolean;
        drawerShowAllTabs?: boolean;
        overflow?: boolean;
    }>(),
    {
        locale: 'en',
        appearance: 'buttons',
        variant: 'primary',
        orientation: 'vertical',
        drawerShowAllTabs: true,
    },
);
const active = ref('general');
const text = computed(() =>
    props.locale === 'de'
        ? {
              navigation: 'Formularbereiche',
              general: 'Allgemein',
              participants: 'Teilnehmer',
              settings: 'Einstellungen',
              documents: 'Dokumente',
              history: 'Verlauf',
              locked: 'Gesperrt',
              description: 'Bereich der Formularnavigation',
              content: 'Die Anwendung bestimmt die Inhalte und speichert die Formulardaten.',
          }
        : {
              navigation: 'Form sections',
              general: 'General',
              participants: 'Participants',
              settings: 'Settings',
              documents: 'Documents',
              history: 'History',
              locked: 'Locked',
              description: 'Form navigation section',
              content: 'The application owns the content and saves form data.',
          },
);
const tabs = computed<TabItem[]>(() => [
    { value: 'general', label: text.value.general, icon: IconCalendarEvent },
    { value: 'participants', label: text.value.participants, icon: IconUsers, badge: 8 },
    { value: 'settings', label: text.value.settings, icon: IconSettings },
    ...(props.overflow
        ? [
              { value: 'documents', label: text.value.documents, icon: IconFileText },
              {
                  value: 'history',
                  label: text.value.history,
                  icon: IconHistory,
                  attention: props.locale === 'de' ? 'Neue Einträge' : 'New entries',
              },
          ]
        : []),
    { value: 'locked', label: text.value.locked, icon: IconLock, disabled: true },
]);
</script>
