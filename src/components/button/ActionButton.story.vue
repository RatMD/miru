<template>
    <Story title="Components/Button/ActionButton" :layout="{ type: 'grid', width: '300px' }">
        <Variant title="Default">
            <div class="flex flex-row gap-2">
                <ActionButton :icon="icon" />
                <ActionButton :icon="icon" disabled />
                <ActionButton :icon="icon" loading />
                <ActionButton :icon="icon" active />
            </div>
        </Variant>
        <Variant title="Primary">
            <div class="flex flex-row gap-2">
                <ActionButton :icon="icon" color="primary" />
                <ActionButton :icon="icon" color="primary" disabled />
                <ActionButton :icon="icon" color="primary" loading />
                <ActionButton :icon="icon" color="primary" active />
            </div>
        </Variant>
        <Variant title="Secondary">
            <div class="flex flex-row gap-2">
                <ActionButton :icon="icon" color="secondary" />
                <ActionButton :icon="icon" color="secondary" disabled />
                <ActionButton :icon="icon" color="secondary" loading />
                <ActionButton :icon="icon" color="secondary" active />
            </div>
        </Variant>
        <Variant title="Success">
            <div class="flex flex-row gap-2">
                <ActionButton :icon="icon" color="success" />
                <ActionButton :icon="icon" color="success" disabled />
                <ActionButton :icon="icon" color="success" loading />
                <ActionButton :icon="icon" color="success" active />
            </div>
        </Variant>
        <Variant title="Warning">
            <div class="flex flex-row gap-2">
                <ActionButton :icon="icon" color="warning" />
                <ActionButton :icon="icon" color="warning" disabled />
                <ActionButton :icon="icon" color="warning" loading />
                <ActionButton :icon="icon" color="warning" active />
            </div>
        </Variant>
        <Variant title="Danger">
            <div class="flex flex-row gap-2">
                <ActionButton :icon="icon" color="danger" />
                <ActionButton :icon="icon" color="danger" disabled />
                <ActionButton :icon="icon" color="danger" loading />
                <ActionButton :icon="icon" color="danger" active />
            </div>
        </Variant>
        <Variant title="Info">
            <div class="flex flex-row gap-2">
                <ActionButton :icon="icon" color="info" />
                <ActionButton :icon="icon" color="info" disabled />
                <ActionButton :icon="icon" color="info" loading />
                <ActionButton :icon="icon" color="info" active />
            </div>
        </Variant>
    </Story>
</template>

<script setup>
import { h } from 'vue';
import ActionButton from './ActionButton.vue';

const icon = {
    functional: true,
    props: {
        size: Number
    },
    render(ctx) {
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
