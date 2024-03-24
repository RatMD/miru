<template>
    <Story title="Components/Dialog/BaseDialog">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <ButtonStd label="Open Dialog" @click="state.visible = !state.visible" />
            <BaseDialog target="html" v-bind="state" v-model:visible="state.visible">
                Default Content
            </BaseDialog>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import BaseDialog from './BaseDialog.vue';

function stateDefault() {
    return {
        visible: ref<boolean>(false)
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
