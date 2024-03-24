<template>
    <Story title="Components/Button/ShadowButton" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <div class="flex flex-col gap-4 p-4">
                <ShadowButton :icon="icon" />
            </div>
        </Variant>
        
        <Variant title="Small">
            <div class="flex flex-col gap-4 p-4">
                <ShadowButton :icon="icon" size="sm" />
            </div>
        </Variant>
        
        <Variant title="Large">
            <div class="flex flex-col gap-4 p-4">
                <ShadowButton :icon="icon" size="lg" />
            </div>
        </Variant>
        
        <Variant title="Colors">
            <div class="flex flex-col gap-4 p-4">
                <div class="flex gap-4">
                    <ShadowButton :icon="icon" />
                    <ShadowButton :icon="icon" color="primary" />
                    <ShadowButton :icon="icon" color="secondary" />
                    <ShadowButton :icon="icon" color="success" />
                    <ShadowButton :icon="icon" color="warning" />
                    <ShadowButton :icon="icon" color="danger" />
                    <ShadowButton :icon="icon" color="info" />
                </div>
                <div class="flex gap-4">
                    <ShadowButton :icon="icon" active />
                    <ShadowButton :icon="icon" active color="primary" />
                    <ShadowButton :icon="icon" active color="secondary" />
                    <ShadowButton :icon="icon" active color="success" />
                    <ShadowButton :icon="icon" active color="warning" />
                    <ShadowButton :icon="icon" active color="danger" />
                    <ShadowButton :icon="icon" active color="info" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import ShadowButton from './ShadowButton.vue';

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
A initial background-less fully rounded shadow button.
</docs>
