<template>
    <Story title="Components/Card/CardXen" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2 max-w-[400px] mx-auto">
                <CardXen v-bind="state">
                    Card Content
                </CardXen>
            </div>
        </Variant>

        <Variant title="Colors" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2 max-w-[400px] mx-auto">
                <CardXen v-bind="state" :color="null">
                    Default Color
                </CardXen>
            </div>
            
            <div class="p-2 max-w-[400px] mx-auto">
                <CardXen v-bind="state" color="primary">
                    Primary Color
                </CardXen>
            </div>
            
            <div class="p-2 max-w-[400px] mx-auto">
                <CardXen v-bind="state" color="secondary">
                    Secondary Color
                </CardXen>
            </div>
            
            <div class="p-2 max-w-[400px] mx-auto">
                <CardXen v-bind="state" color="success">
                    Success Color
                </CardXen>
            </div>
            
            <div class="p-2 max-w-[400px] mx-auto">
                <CardXen v-bind="state" color="warning">
                    Warning Color
                </CardXen>
            </div>
            
            <div class="p-2 max-w-[400px] mx-auto">
                <CardXen v-bind="state" color="danger">
                    Danger Color
                </CardXen>
            </div>
            
            <div class="p-2 max-w-[400px] mx-auto">
                <CardXen v-bind="state" color="info">
                    Info Color
                </CardXen>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import CardXen from './CardXen.vue';

// Default Variant States
function stateDefault() {
    return {
        title: 'Collapse Content',
        actions: [
            {
                icon: PencilIcon,
                iconProps: { size: 16 },
                onClick() { alert('clicked') }
            },
            {
                icon: TrashIcon,
                iconProps: { size: 16 },
                onClick() { alert('clicked') }
            }
        ]
    }
}

const PencilIcon = {
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
            'stroke-width': (props?.size ?? 16) == 16 ? "2" : "1.5",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            class: "lucide lucide-pencil",
        }, [
            h('path', { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }),
            h('path', { d: "m15 5 4 4" }),
        ]);
    }
};

const TrashIcon = {
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
            'stroke-width': (props?.size ?? 16) == 16 ? "2" : "1.5",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            class: "lucide lucide-trash-2",
        }, [
            h('path', { d: "M3 6h18" }),
            h('path', { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
            h('path', { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
            h('line', { x1: "10", x2: "10", y1: "11", y2: "17" }),
            h('line', { x1: "14", x2: "14", y1: "11", y2: "17" }),
        ]);
    }
};
</script>

<docs lang="md">
Work in Progress
</docs>
