<template>
    <Story title="Components/Dialog/AlertDialog">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Dialog" @click="state.visible = !state.visible" />
            </div>
            <AlertDialog 
                title="Something went horrible wrong" 
                target="html" 
                @cancel="() => state.loading = true"
                @submit="() => state.loading = true"
                v-bind="state" 
                v-model:visible="state.visible">
                <p>A not-really-good thing happened here.</p>
                <details>
                    <summary>Details</summary>
                    <p>
                        Error-Code: X404
                    </p>
                </details>
            </AlertDialog>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import AlertDialog from './AlertDialog.vue';

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
