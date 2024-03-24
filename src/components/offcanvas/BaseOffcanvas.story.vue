<template>
    <Story title="Components/Offcanvas/BaseOffcanvas">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <ButtonStd label="Open Offcanvas" @click="state.visible = !state.visible" />
            <BaseOffcanvas target="html" v-bind="state" v-model:visible="state.visible">
                Default Content
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
</script>

<docs lang="md">
Work in Progress
</docs>
