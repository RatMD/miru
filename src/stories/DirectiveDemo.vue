<template>
    <div data-slot="directive-demo" class="grid gap-4">
        <template v-if="['dayjs', 'filesize', 'price'].includes(mode)">
            <dl class="grid grid-cols-2 gap-3">
                <template v-if="mode === 'price'">
                    <dt>{{ labels.price }}</dt>
                    <dd data-test="price" v-price="amount" />
                    <dt>{{ labels.cents }}</dt>
                    <dd data-test="cents" v-price.cents="amount" />
                </template>
                <template v-if="mode === 'filesize'">
                    <dt>{{ labels.size }}</dt>
                    <dd data-test="filesize" v-filesize:2.metric="bytes" />
                </template>
                <template v-if="mode === 'dayjs'">
                    <dt>{{ labels.date }}</dt>
                    <dd data-test="dayjs" v-dayjs="date">DD MMMM YYYY</dd>
                </template>
            </dl>
            <Button
                @click="
                    amount = 42;
                    bytes = 2048;
                    date = '2026-12-01T12:00:00';
                ">
                {{ labels.update }}
            </Button>
        </template>
        <template v-else-if="mode === 'click-outside'">
            <div
                v-if="visible"
                data-test="outside-target"
                v-click-outside="onOutside"
                class="rounded border p-4">
                <Button variant="outline">{{ labels.inside }}</Button>
                <output data-test="outside-count">{{ count }}</output>
            </div>
            <div v-if="visible" v-click-outside.once="onOnce" class="rounded border p-4">
                <output data-test="once-count">{{ once }}</output>
            </div>
            <Button data-test="outside-button">{{ labels.outside }}</Button>
            <Button @click="visible = !visible">{{ labels.toggle }}</Button>
        </template>
        <div v-else v-resize.immediate="onResize" class="w-64 rounded border p-4">
            <output data-test="resize">{{ size }}</output>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ResizeSize } from '../plugins';
import { ref, computed } from 'vue';
import { Button } from '../components/button';
import {
    createPriceDirective,
    createDayjsDirective,
    vClickOutside,
    vFilesize,
    vResize,
} from '../plugins';
const props = defineProps<{
    mode: 'dayjs' | 'filesize' | 'price' | 'click-outside' | 'resize';
    locale: string;
}>();
const vPrice = createPriceDirective(() => props.locale);
const vDayjs = createDayjsDirective(() => props.locale);
const amount = ref(1234.5),
    bytes = ref(1536),
    date = ref('2026-11-17T12:00:00'),
    count = ref(0),
    once = ref(0),
    visible = ref(true),
    size = ref('');
const onOutside = () => count.value++,
    onOnce = () => once.value++;
const onResize = (el: ResizeSize, viewport: ResizeSize) => {
    size.value = el.width + '×' + el.height + ' / ' + viewport.width + '×' + viewport.height;
};
const labels = computed(() =>
    props.locale.startsWith('de')
        ? {
              price: 'Preis',
              cents: 'Cent-Betrag',
              size: 'Dateigröße',
              date: 'Datum',
              update: 'Werte ändern',
              inside: 'Innerhalb',
              outside: 'Außerhalb',
              toggle: 'Beispiel umschalten',
          }
        : {
              price: 'Price',
              cents: 'Amount in cents',
              size: 'File size',
              date: 'Date',
              update: 'Change values',
              inside: 'Inside',
              outside: 'Outside',
              toggle: 'Toggle example',
          },
);
</script>
