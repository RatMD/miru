<template>
    <Story title="Components/Offcanvas/BaseOffcanvas">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Offcanvas" @click="state.visible = !state.visible" />
            </div>
            <BaseOffcanvas target="html" v-bind="state" v-model:visible="state.visible">
                <div class="p-4">
                    Default Content
                </div>
            </BaseOffcanvas>
        </Variant>

        <Variant title="Placements" :init-state="stateDefault" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Top Offcanvas" @click="state.placement = 'top'; state.visible = !state.visible" closable />
                <ButtonStd label="Open Right Offcanvas" @click="state.placement = 'right'; state.visible = !state.visible" closable />
                <ButtonStd label="Open Bottom Offcanvas" @click="state.placement = 'bottom'; state.visible = !state.visible" closable />
                <ButtonStd label="Open Left Offcanvas" @click="state.placement = 'left'; state.visible = !state.visible" closable />
            </div>
            <BaseOffcanvas target="html" v-bind="state" v-model:visible="state.visible">
                <div class="p-4">
                    Default Content
                </div>
            </BaseOffcanvas>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import BaseOffcanvas from './BaseOffcanvas.vue';

function stateDefault() {
    return {
        visible: ref<boolean>(false)
    }
}
function statePlacements() {
    return {
        placement: ref<string>('right'),
        visible: ref<boolean>(false),
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
