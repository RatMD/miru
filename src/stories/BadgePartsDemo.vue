<template>
    <div data-slot="badge-parts-demo" class="grid gap-4">
        <template v-if="scenario === 'composition'">
            <div
                v-for="size in ['default', 'lg'] as const"
                :key="size"
                class="flex flex-wrap items-center gap-3">
                <Badge :size="size" variant="success">
                    <IconCheck />
                    {{ labels.ready }}
                </Badge>
                <Badge :size="size" variant="primary">
                    <BadgePart>{{ labels.items }}</BadgePart>
                    <BadgeSeparator />
                    <BadgePart class="tabular-nums">42</BadgePart>
                </Badge>
                <Badge :size="size" variant="outline">
                    <BadgePart>
                        <IconMail />
                        {{ labels.messages }}
                    </BadgePart>
                    <BadgeSeparator />
                    <BadgePart class="tabular-nums">12</BadgePart>
                    <BadgeSeparator />
                    <BadgePart>{{ labels.new }}</BadgePart>
                </Badge>
                <Badge :size="size" variant="success">
                    <BadgePart>{{ labels.completed }}</BadgePart>
                    <BadgeSeparator />
                    <BadgePart class="bg-white/15 tabular-nums">8 / 10</BadgePart>
                </Badge>
            </div>
        </template>
        <template v-else-if="scenario === 'numbers'">
            <div class="flex flex-wrap items-center gap-3">
                <Badge variant="primary">
                    <BadgePart>{{ labels.helper }}</BadgePart>
                    <BadgeSeparator />
                    <BadgePart data-testid="number-helper" class="tabular-nums">
                        {{
                            formatNumber(amount, locale, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })
                        }}
                    </BadgePart>
                </Badge>
                <Badge variant="outline">
                    <BadgePart>{{ labels.directive }}</BadgePart>
                    <BadgeSeparator />
                    <BadgePart
                        data-testid="number-directive"
                        class="tabular-nums"
                        v-number-format="{
                            value: amount,
                            options: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                        }" />
                </Badge>
                <Badge variant="success">
                    <BadgePart>{{ labels.completed }}</BadgePart>
                    <BadgeSeparator />
                    <BadgePart
                        class="tabular-nums"
                        v-number-format="{
                            value: 0.875,
                            options: { style: 'percent', maximumFractionDigits: 1 },
                        }" />
                </Badge>
            </div>
            <div class="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" @click="amount = 9876.25">
                    {{ labels.update }}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    @click="localLocale = locale.startsWith('de') ? 'en-US' : 'de-DE'">
                    {{ labels.locale }}
                </Button>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { IconCheck, IconMail } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { Badge, BadgePart, BadgeSeparator } from '../components/badge';
import { Button } from '../components/button';
import { createNumberFormatDirective } from '../plugins/number-format';
import { formatNumber } from '../support/numberFormat';

const props = withDefaults(
    defineProps<{
        scenario?: 'composition' | 'numbers';
        locale?: string;
    }>(),
    { scenario: 'composition', locale: 'en-US' },
);
const amount = ref(1234.5);
const localLocale = ref<string>();
const locale = computed(() => localLocale.value ?? props.locale);
const vNumberFormat = createNumberFormatDirective(() => locale.value);
const labels = computed(() =>
    props.locale.startsWith('de')
        ? {
              ready: 'Bereit',
              items: 'Einträge',
              messages: 'Nachrichten',
              new: 'Neu',
              completed: 'Erledigt',
              helper: 'Helper',
              directive: 'Directive',
              update: 'Wert ändern',
              locale: 'Sprache wechseln',
          }
        : {
              ready: 'Ready',
              items: 'Items',
              messages: 'Messages',
              new: 'New',
              completed: 'Completed',
              helper: 'Helper',
              directive: 'Directive',
              update: 'Change value',
              locale: 'Change locale',
          },
);
</script>
