<template>
    <div ref="host" data-slot="apexchart" class="min-w-0">
        <Chart
            v-if="ready"
            v-bind="$attrs"
            :type="type"
            :series="series"
            :options="chartOptions"
            :width="width"
            :height="height" />
        <div
            v-else
            role="status"
            :style="{ minHeight: typeof height === 'number' ? height + 'px' : height }">
            {{ trans('common.chart.loading') }}
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ApexOptions, ApexAxisChartSeries, ApexNonAxisChartSeries } from 'apexcharts';
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { merge } from '../../support/merge';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        type?: NonNullable<ApexOptions['chart']>['type'];
        series: ApexAxisChartSeries | ApexNonAxisChartSeries;
        options?: ApexOptions;
        width?: string | number;
        height?: string | number;
    }>(),
    { type: 'line', height: 300 },
);
const Chart = defineAsyncComponent(() => import('vue3-apexcharts'));
const host = ref<HTMLElement>();
const ready = ref(false);
const theme = shallowRef<ApexOptions>({});
const { trans } = useI18n();
let observer: MutationObserver | undefined;
function updateTheme(): void {
    if (!host.value) return;
    const css = getComputedStyle(host.value);
    const dark = !!host.value.closest('.dark, [data-theme="dark"]');
    const color = (name: string) => css.getPropertyValue('--ui-' + name).trim();
    theme.value = {
        chart: {
            background: 'transparent',
            foreColor: color('foreground'),
            toolbar: { show: false },
            fontFamily: css.fontFamily,
        },
        colors: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'danger'].map(
            color,
        ),
        theme: { mode: dark ? 'dark' : 'light' },
        grid: { borderColor: color('border') },
        tooltip: { theme: dark ? 'dark' : 'light' },
        dataLabels: { enabled: false },
    };
}
onMounted(() => {
    updateTheme();
    ready.value = true;
    observer = new MutationObserver(updateTheme);
    for (let node: HTMLElement | null = host.value ?? null; node; node = node.parentElement)
        observer.observe(node, {
            attributes: true,
            attributeFilter: [
                'class',
                'style',
                'data-theme',
                'data-miru-colors',
                'data-miru-color-revision',
            ],
        });
});
onBeforeUnmount(() => observer?.disconnect());
const chartOptions = computed<ApexOptions>(() => merge(theme.value, props.options ?? {}));
</script>
