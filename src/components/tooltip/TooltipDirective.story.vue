<template>
    <Story title="Components/Tooltip/TooltipDirective" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <div class="inline-flex self-start underline decoration-dashed" v-tooltip.modifier="'Tooltip by Directive'">
                Tooltip
            </div>
        </Variant>

        <Variant title="Delayed">
            <div class="inline-flex self-start underline decoration-dashed" v-tooltip.500ms="'Delayed Tooltip by Directive'">
                Delayed Tooltip by 500ms
            </div>
        </Variant>

        <Variant title="Center Content">
            <div class="inline-flex self-start underline decoration-dashed" v-tooltip.center="'Lorem ipsum dolor sit amet, consectetur adipiscing elit'">
                Tooltip
            </div>
        </Variant>

        <Variant title="Placements">
            <template v-for="(items, idx) of placements" :key="idx">
                <div class="flex flex-row gap-4">
                    <template v-for="([key, label], id2) of Object.entries(items)" :key="id2">
                        <div class="flex items-center justify-center w-48 h-16 m-4 border border-gray-300 border-solid rounded-md bg-gray-50 dark:border-gray-500 dark:bg-gray-800" 
                            v-tooltip.arrow="{ placement: key, label }">
                            {{ key }}
                        </div>
                    </template>
                </div>
            </template>
        </Variant>

        <Variant title="Colours">
            <template v-for="(tooltip, idx) of colors" :key="idx">
                <div class="flex flex-row gap-4">
                    <div class="flex items-center justify-center w-48 h-16 m-4 border border-gray-300 border-solid rounded-md bg-gray-50 dark:border-gray-500 dark:bg-gray-800" 
                        v-tooltip.right.arrow="{ color: tooltip.color, label: tooltip.label }">
                        {{ tooltip.label }}
                    </div>
                </div>
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import TooltipStd, { type TooltipStdProps } from './TooltipStd.vue';

const placements = [
    {
        'top': 'Top Tooltip',
        'top-start': 'Top-Start Tooltip',
        'top-end': 'Top-End Tooltip',
    },
    {
        'right': 'Right Tooltip',
        'right-start': 'Right-Start Tooltip',
        'right-end': 'Right-End Tooltip',
    },
    {
        'bottom': 'Bottom Tooltip',
        'bottom-start': 'Bottom-Start Tooltip',
        'bottom-end': 'Bottom-End Tooltip',
    },
    {
        'left': 'Left Tooltip',
        'left-start': 'Left-Start Tooltip',
        'left-end': 'Left-End Tooltip',
    },
];

const colors: { label: string, color: TooltipStdProps['color'] }[] = [
    {
        label: 'Primary Tooltip',
        color: 'primary',
    },
    {
        label: 'Secondary Tooltip',
        color: 'secondary',
    },
    {
        label: 'Success Tooltip',
        color: 'success',
    },
    {
        label: 'Warning Tooltip',
        color: 'warning',
    },
    {
        label: 'Danger Tooltip',
        color: 'danger',
    },
    {
        label: 'Info Tooltip',
        color: 'info',
    },
];

const icon = {
    functional: true,
    props: {
        size: Number
    },
    render(props: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: props?.size ?? 16,
            height: props?.size ?? 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            class: "lucide lucide-rat",
        }, [
            h('path', { d: "M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4" }),
            h('path', { d: "M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3" }),
            h('path', { d: "M13.2 18a3 3 0 0 0-2.2-5" }),
            h('path', { d: "M13 22H4a2 2 0 0 1 0-4h12" }),
            h('path', { d: "M16 9h.01" }),
        ]);
    }
};
</script>

<docs lang="md">
</docs>
