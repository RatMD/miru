<template>
    <Story title="Components/Button/ButtonStd" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="sm" :icon="icon" />
                    <ButtonStd label="Button" size="sm" :icon="icon" disabled />
                    <ButtonStd label="Button" size="sm" :icon="icon" loading />
                    <ButtonStd label="Button" size="sm" :icon="icon" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" :icon="icon" />
                    <ButtonStd label="Button" :icon="icon" disabled />
                    <ButtonStd label="Button" :icon="icon" loading />
                    <ButtonStd label="Button" :icon="icon" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="lg" :icon="icon" />
                    <ButtonStd label="Button" size="lg" :icon="icon" disabled />
                    <ButtonStd label="Button" size="lg" :icon="icon" loading />
                    <ButtonStd label="Button" size="lg" :icon="icon" active />
                </div>
            </div>
        </Variant>

        <Variant title="Primary">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="sm" color="primary" :icon="icon" />
                    <ButtonStd label="Button" size="sm" color="primary" :icon="icon" disabled />
                    <ButtonStd label="Button" size="sm" color="primary" :icon="icon" loading />
                    <ButtonStd label="Button" size="sm" color="primary" :icon="icon" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" :icon="icon" color="primary" />
                    <ButtonStd label="Button" :icon="icon" color="primary" disabled />
                    <ButtonStd label="Button" :icon="icon" color="primary" loading />
                    <ButtonStd label="Button" :icon="icon" color="primary" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="lg" color="primary" :icon="icon" />
                    <ButtonStd label="Button" size="lg" color="primary" :icon="icon" disabled />
                    <ButtonStd label="Button" size="lg" color="primary" :icon="icon" loading />
                    <ButtonStd label="Button" size="lg" color="primary" :icon="icon" active />
                </div>
            </div>
        </Variant>

        <Variant title="Secondary">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="sm" color="secondary" :icon="icon" />
                    <ButtonStd label="Button" size="sm" color="secondary" :icon="icon" disabled />
                    <ButtonStd label="Button" size="sm" color="secondary" :icon="icon" loading />
                    <ButtonStd label="Button" size="sm" color="secondary" :icon="icon" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" :icon="icon" color="secondary" />
                    <ButtonStd label="Button" :icon="icon" color="secondary" disabled />
                    <ButtonStd label="Button" :icon="icon" color="secondary" loading />
                    <ButtonStd label="Button" :icon="icon" color="secondary" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="lg" color="secondary" :icon="icon" />
                    <ButtonStd label="Button" size="lg" color="secondary" :icon="icon" disabled />
                    <ButtonStd label="Button" size="lg" color="secondary" :icon="icon" loading />
                    <ButtonStd label="Button" size="lg" color="secondary" :icon="icon" active />
                </div>
            </div>
        </Variant>

        <Variant title="Success">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="sm" color="success" :icon="icon" />
                    <ButtonStd label="Button" size="sm" color="success" :icon="icon" disabled />
                    <ButtonStd label="Button" size="sm" color="success" :icon="icon" loading />
                    <ButtonStd label="Button" size="sm" color="success" :icon="icon" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" :icon="icon" color="success" />
                    <ButtonStd label="Button" :icon="icon" color="success" disabled />
                    <ButtonStd label="Button" :icon="icon" color="success" loading />
                    <ButtonStd label="Button" :icon="icon" color="success" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="lg" color="success" :icon="icon" />
                    <ButtonStd label="Button" size="lg" color="success" :icon="icon" disabled />
                    <ButtonStd label="Button" size="lg" color="success" :icon="icon" loading />
                    <ButtonStd label="Button" size="lg" color="success" :icon="icon" active />
                </div>
            </div>
        </Variant>

        <Variant title="Warning">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="sm" color="warning" :icon="icon" />
                    <ButtonStd label="Button" size="sm" color="warning" :icon="icon" disabled />
                    <ButtonStd label="Button" size="sm" color="warning" :icon="icon" loading />
                    <ButtonStd label="Button" size="sm" color="warning" :icon="icon" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" :icon="icon" color="warning" />
                    <ButtonStd label="Button" :icon="icon" color="warning" disabled />
                    <ButtonStd label="Button" :icon="icon" color="warning" loading />
                    <ButtonStd label="Button" :icon="icon" color="warning" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="lg" color="warning" :icon="icon" />
                    <ButtonStd label="Button" size="lg" color="warning" :icon="icon" disabled />
                    <ButtonStd label="Button" size="lg" color="warning" :icon="icon" loading />
                    <ButtonStd label="Button" size="lg" color="warning" :icon="icon" active />
                </div>
            </div>
        </Variant>

        <Variant title="Danger">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="sm" color="danger" :icon="icon" />
                    <ButtonStd label="Button" size="sm" color="danger" :icon="icon" disabled />
                    <ButtonStd label="Button" size="sm" color="danger" :icon="icon" loading />
                    <ButtonStd label="Button" size="sm" color="danger" :icon="icon" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" :icon="icon" color="danger" />
                    <ButtonStd label="Button" :icon="icon" color="danger" disabled />
                    <ButtonStd label="Button" :icon="icon" color="danger" loading />
                    <ButtonStd label="Button" :icon="icon" color="danger" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="lg" color="danger" :icon="icon" />
                    <ButtonStd label="Button" size="lg" color="danger" :icon="icon" disabled />
                    <ButtonStd label="Button" size="lg" color="danger" :icon="icon" loading />
                    <ButtonStd label="Button" size="lg" color="danger" :icon="icon" active />
                </div>
            </div>
        </Variant>

        <Variant title="Info">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="sm" color="info" :icon="icon" />
                    <ButtonStd label="Button" size="sm" color="info" :icon="icon" disabled />
                    <ButtonStd label="Button" size="sm" color="info" :icon="icon" loading />
                    <ButtonStd label="Button" size="sm" color="info" :icon="icon" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" :icon="icon" color="info" />
                    <ButtonStd label="Button" :icon="icon" color="info" disabled />
                    <ButtonStd label="Button" :icon="icon" color="info" loading />
                    <ButtonStd label="Button" :icon="icon" color="info" active />
                </div>
                <div class="flex flex-row gap-2">
                    <ButtonStd label="Button" size="lg" color="info" :icon="icon" />
                    <ButtonStd label="Button" size="lg" color="info" :icon="icon" disabled />
                    <ButtonStd label="Button" size="lg" color="info" :icon="icon" loading />
                    <ButtonStd label="Button" size="lg" color="info" :icon="icon" active />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import ButtonStd from './ButtonStd.vue';

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
The standard set of buttons for your website or application. The button bellow supports different 
colors and sizes, all browser-native states including an additional `loading` one as well as a 
general icon and label handling. However, compared to other Vue Frameworks, you aren't able to 
push content using a Slot, everything is done using properties only.
</docs>
