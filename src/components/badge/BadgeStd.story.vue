<template>
    <Story title="Components/Badge/BadgeStd" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default Variants">
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <BadgeStd label="Badge" size="sm" />
                    <BadgeStd label="Badge" size="sm" color="primary" />
                    <BadgeStd label="Badge" size="sm" color="secondary" />
                    <BadgeStd label="Badge" size="sm" color="success" />
                    <BadgeStd label="Badge" size="sm" color="warning" />
                    <BadgeStd label="Badge" size="sm" color="danger" />
                    <BadgeStd label="Badge" size="sm" color="info" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" />
                    <BadgeStd label="Badge" color="primary" />
                    <BadgeStd label="Badge" color="secondary" />
                    <BadgeStd label="Badge" color="success" />
                    <BadgeStd label="Badge" color="warning" />
                    <BadgeStd label="Badge" color="danger" />
                    <BadgeStd label="Badge" color="info" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" size="lg" />
                    <BadgeStd label="Badge" size="lg" color="primary" />
                    <BadgeStd label="Badge" size="lg" color="secondary" />
                    <BadgeStd label="Badge" size="lg" color="success" />
                    <BadgeStd label="Badge" size="lg" color="warning" />
                    <BadgeStd label="Badge" size="lg" color="danger" />
                    <BadgeStd label="Badge" size="lg" color="info" />
                </div>
            </div>
        </Variant>
        
        <Variant title="Dot/Icon Variants">
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <BadgeStd label="Badge" size="sm" dot />
                    <BadgeStd size="sm" icon-placement="icon" dot />
                    <BadgeStd label="Badge" size="sm" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" :icon="icon" size="sm" />
                    <BadgeStd :icon="icon" size="sm" icon-placement="icon" />
                    <BadgeStd label="Badge" :icon="icon" size="sm" icon-placement="right" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" dot />
                    <BadgeStd icon-placement="icon" dot />
                    <BadgeStd label="Badge" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" :icon="icon" />
                    <BadgeStd :icon="icon" icon-placement="icon" />
                    <BadgeStd label="Badge" :icon="icon" icon-placement="right" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" size="lg" dot />
                    <BadgeStd size="lg" icon-placement="icon" dot />
                    <BadgeStd label="Badge" size="lg" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" :icon="icon" size="lg" dot />
                    <BadgeStd :icon="icon" size="lg" icon-placement="icon" />
                    <BadgeStd label="Badge" :icon="icon" size="lg" icon-placement="right" />
                </div>
            </div>
        </Variant>
        
        <Variant title="Dot/Icon Position Variants">
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <BadgeStd label="Badge" :icon="null" dot />
                    <BadgeStd label="Badge" :icon="null" icon-placement="icon" dot />
                    <BadgeStd label="Badge" :icon="null" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" :icon="icon" />
                    <BadgeStd label="Badge" :icon="icon" icon-placement="icon" />
                    <BadgeStd label="Badge" :icon="icon" icon-placement="right" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" color="primary" :icon="null" dot />
                    <BadgeStd label="Badge" color="primary" :icon="null" icon-placement="icon" dot />
                    <BadgeStd label="Badge" color="primary" :icon="null" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" color="primary" :icon="icon" />
                    <BadgeStd label="Badge" color="primary" :icon="icon" icon-placement="icon" />
                    <BadgeStd label="Badge" color="primary" :icon="icon" icon-placement="right" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" color="secondary" :icon="null" dot />
                    <BadgeStd label="Badge" color="secondary" :icon="null" icon-placement="icon" dot />
                    <BadgeStd label="Badge" color="secondary" :icon="null" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" color="secondary" :icon="icon" />
                    <BadgeStd label="Badge" color="secondary" :icon="icon" icon-placement="icon" />
                    <BadgeStd label="Badge" color="secondary" :icon="icon" icon-placement="right" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" color="success" :icon="null" dot />
                    <BadgeStd label="Badge" color="success" :icon="null" icon-placement="icon" dot />
                    <BadgeStd label="Badge" color="success" :icon="null" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" color="success" :icon="icon" />
                    <BadgeStd label="Badge" color="success" :icon="icon" icon-placement="icon" />
                    <BadgeStd label="Badge" color="success" :icon="icon" icon-placement="right" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" color="warning" :icon="null" dot />
                    <BadgeStd label="Badge" color="warning" :icon="null" icon-placement="icon" dot />
                    <BadgeStd label="Badge" color="warning" :icon="null" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" color="warning" :icon="icon" />
                    <BadgeStd label="Badge" color="warning" :icon="icon" icon-placement="icon" />
                    <BadgeStd label="Badge" color="warning" :icon="icon" icon-placement="right" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" color="danger" :icon="null" dot />
                    <BadgeStd label="Badge" color="danger" :icon="null" icon-placement="icon" dot />
                    <BadgeStd label="Badge" color="danger" :icon="null" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" color="danger" :icon="icon" />
                    <BadgeStd label="Badge" color="danger" :icon="icon" icon-placement="icon" />
                    <BadgeStd label="Badge" color="danger" :icon="icon" icon-placement="right" />
                </div>
                <div class="flex gap-2">
                    <BadgeStd label="Badge" color="info" :icon="null" dot />
                    <BadgeStd label="Badge" color="info" :icon="null" icon-placement="icon" dot />
                    <BadgeStd label="Badge" color="info" :icon="null" icon-placement="right" dot />
                    <span class="mx-4"></span>
                    <BadgeStd label="Badge" color="info" :icon="icon" />
                    <BadgeStd label="Badge" color="info" :icon="icon" icon-placement="icon" />
                    <BadgeStd label="Badge" color="info" :icon="icon" icon-placement="right" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import BadgeStd from './BadgeStd.vue';

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
The **BadgeStd** component offers enough space to elegantly present small pieces of information,
such as counters, without taking too much focus away from the content itself. If you are looking 
for bootstrap-familiar overlaying (counter) badge, usable on top of other elements, then take a 
look at the **SlimBadge** component instead.
</docs>
