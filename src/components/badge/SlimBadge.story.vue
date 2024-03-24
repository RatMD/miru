<template>
    <Story title="Components/Badge/SlimBadge" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default Variants">
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <SlimBadge :label="null" size="sm" />
                    <SlimBadge :label="null" size="sm" color="primary" />
                    <SlimBadge :label="null" size="sm" color="secondary" />
                    <SlimBadge :label="null" size="sm" color="success" />
                    <SlimBadge :label="null" size="sm" color="warning" />
                    <SlimBadge :label="null" size="sm" color="danger" />
                    <SlimBadge :label="null" size="sm" color="info" />
                </div>
                <div class="flex gap-2">
                    <SlimBadge label="42" />
                    <SlimBadge label="42" color="primary" />
                    <SlimBadge label="42" color="secondary" />
                    <SlimBadge label="42" color="success" />
                    <SlimBadge label="42" color="warning" />
                    <SlimBadge label="42" color="danger" />
                    <SlimBadge label="42" color="info" />
                </div>
                <div class="flex gap-2">
                    <SlimBadge label="42" size="lg" />
                    <SlimBadge label="42" size="lg" color="primary" />
                    <SlimBadge label="42" size="lg" color="secondary" />
                    <SlimBadge label="42" size="lg" color="success" />
                    <SlimBadge label="42" size="lg" color="warning" />
                    <SlimBadge label="42" size="lg" color="danger" />
                    <SlimBadge label="42" size="lg" color="info" />
                </div>
            </div>
        </Variant>

        <Variant title="Icon Variants">
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <SlimBadge :icon="icon" size="sm" pill />
                    <SlimBadge :icon="icon" size="sm" color="primary" pill />
                    <SlimBadge :icon="icon" size="sm" color="secondary" pill />
                    <SlimBadge :icon="icon" size="sm" color="success" pill />
                    <SlimBadge :icon="icon" size="sm" color="warning" pill />
                    <SlimBadge :icon="icon" size="sm" color="danger" pill />
                    <SlimBadge :icon="icon" size="sm" color="info" pill />
                </div>
                <div class="flex gap-2">
                    <SlimBadge :icon="icon" pill />
                    <SlimBadge :icon="icon" color="primary" pill />
                    <SlimBadge :icon="icon" color="secondary" pill />
                    <SlimBadge :icon="icon" color="success" pill />
                    <SlimBadge :icon="icon" color="warning" pill />
                    <SlimBadge :icon="icon" color="danger" pill />
                    <SlimBadge :icon="icon" color="info" pill />
                </div>
                <div class="flex gap-2">
                    <SlimBadge :icon="icon" size="lg" pill />
                    <SlimBadge :icon="icon" size="lg" color="primary" pill />
                    <SlimBadge :icon="icon" size="lg" color="secondary" pill />
                    <SlimBadge :icon="icon" size="lg" color="success" pill />
                    <SlimBadge :icon="icon" size="lg" color="warning" pill />
                    <SlimBadge :icon="icon" size="lg" color="danger" pill />
                    <SlimBadge :icon="icon" size="lg" color="info" pill />
                </div>
            </div>
        </Variant>

        <Variant title="Pill Variants">
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <SlimBadge label="42" size="sm" pill />
                    <SlimBadge label="42" size="sm" color="primary" pill />
                    <SlimBadge label="42" size="sm" color="secondary" pill />
                    <SlimBadge label="42" size="sm" color="success" pill />
                    <SlimBadge label="42" size="sm" color="warning" pill />
                    <SlimBadge label="42" size="sm" color="danger" pill />
                    <SlimBadge label="42" size="sm" color="info" pill />
                </div>
                <div class="flex gap-2">
                    <SlimBadge label="42" pill />
                    <SlimBadge label="42" color="primary" pill />
                    <SlimBadge label="42" color="secondary" pill />
                    <SlimBadge label="42" color="success" pill />
                    <SlimBadge label="42" color="warning" pill />
                    <SlimBadge label="42" color="danger" pill />
                    <SlimBadge label="42" color="info" pill />
                </div>
                <div class="flex gap-2">
                    <SlimBadge label="42" size="lg" pill />
                    <SlimBadge label="42" size="lg" color="primary" pill />
                    <SlimBadge label="42" size="lg" color="secondary" pill />
                    <SlimBadge label="42" size="lg" color="success" pill />
                    <SlimBadge label="42" size="lg" color="warning" pill />
                    <SlimBadge label="42" size="lg" color="danger" pill />
                    <SlimBadge label="42" size="lg" color="info" pill />
                </div>
            </div>
        </Variant>

        <Variant title="Filled Variants">
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <SlimBadge label="42" size="sm" fill />
                    <SlimBadge label="42" size="sm" color="primary" fill />
                    <SlimBadge label="42" size="sm" color="secondary" fill />
                    <SlimBadge label="42" size="sm" color="success" fill />
                    <SlimBadge label="42" size="sm" color="warning" fill />
                    <SlimBadge label="42" size="sm" color="danger" fill />
                    <SlimBadge label="42" size="sm" color="info" fill />
                </div>
                <div class="flex gap-2">
                    <SlimBadge label="42" fill />
                    <SlimBadge label="42" color="primary" fill />
                    <SlimBadge label="42" color="secondary" fill />
                    <SlimBadge label="42" color="success" fill />
                    <SlimBadge label="42" color="warning" fill />
                    <SlimBadge label="42" color="danger" fill />
                    <SlimBadge label="42" color="info" fill />
                </div>
                <div class="flex gap-2">
                    <SlimBadge label="42" size="lg" fill />
                    <SlimBadge label="42" size="lg" color="primary" fill />
                    <SlimBadge label="42" size="lg" color="secondary" fill />
                    <SlimBadge label="42" size="lg" color="success" fill />
                    <SlimBadge label="42" size="lg" color="warning" fill />
                    <SlimBadge label="42" size="lg" color="danger" fill />
                    <SlimBadge label="42" size="lg" color="info" fill />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import SlimBadge from './SlimBadge.vue';

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
The standard badges offer enough space to elegantly present small snippets of information or 
counters without taking too much focus away from the content itself. If you are looking for 
overlaying badges used on top of other elements, you will find a suitable one under `OverlayBadge`.
</docs>
