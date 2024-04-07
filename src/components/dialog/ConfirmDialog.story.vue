<template>
    <Story title="Components/Dialog/ConfirmDialog">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Dialog" @click="state.visible = !state.visible" />
            </div>
            <ConfirmDialog 
                title="Confirm your action" 
                target="html" 
                @cancel="() => state.loading = true"
                @submit="() => state.loading = true"
                v-bind="state" 
                v-model:visible="state.visible">
                Default Content
            </ConfirmDialog>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import ConfirmDialog from './ConfirmDialog.vue';


function stateDefault() {
    const visible = ref<boolean>(false);
    const loading = ref<boolean>(false);
    return {
        visible,
        loading
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
