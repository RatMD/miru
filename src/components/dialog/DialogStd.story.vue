<template>
    <Story title="Components/Dialog/DialogStd">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Dialog" @click="state.visible = !state.visible" />
            </div>
            <DialogStd target="html" v-bind="state" v-model:visible="state.visible">
                <div class="p-4">
                    Default Content
                </div>
            </DialogStd>
        </Variant>

        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Small Dialog" @click="state.size = 'sm'; state.visible = true;" />
                <ButtonStd label="Open Medium Dialog" @click="state.size = 'md'; state.visible = true;" />
                <ButtonStd label="Open Large Dialog" @click="state.size = 'lg'; state.visible = true;" />
            </div>

            <DialogStd target="html" v-bind="state" v-model:visible="state.visible">
                <div class="p-4">
                    Default Content
                </div>
            </DialogStd>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import DialogStd from './DialogStd.vue';

function stateDefault() {
    return {
        visible: ref<boolean>(false)
    }
}

function stateSizes() {
    return {
        size: ref<string>('sm'),
        visible: ref<boolean>(false),
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
