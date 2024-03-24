<template>
    <Story title="Components/Tooltip/BaseTooltip" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <BaseTooltip label="Tooltip" />
        </Variant>

        <Variant title="Slot">
            <BaseTooltip label="Tooltip">
                <div class="flex flex-row items-center gap-2">
                    <icon :size="16" />
                    <span>Custom Tooltip Slot</span>
                </div>
            </BaseTooltip>
        </Variant>

        <Variant title="Colors">
            <div class="flex flex-col gap-2">
                <BaseTooltip label="Default Tooltip" />
                <BaseTooltip label="Primary Tooltip" color="primary" />
                <BaseTooltip label="Secondary Tooltip" color="secondary" />
                <BaseTooltip label="Success Tooltip" color="success" />
                <BaseTooltip label="Warning Tooltip" color="warning" />
                <BaseTooltip label="Danger Tooltip" color="danger" />
                <BaseTooltip label="Info Tooltip" color="info" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import BaseTooltip from './BaseTooltip.vue';

const icon = {
    functional: true,
    props: {
        size: Number
    },
    render(ctx: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: ctx?.props?.size ?? 16,
            height: ctx?.props?.size ?? 16,
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
The **BaseTooltip** component contains the basic design and layout of the tooltip, but without 
applying any behaviors or function. Instead use the TooltipStd
component or the [`v-tooltip`]() directive to integrate a fully functional tooltip.
</docs>
