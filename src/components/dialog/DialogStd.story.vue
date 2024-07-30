<template>
    <Story title="Components/Dialog/DialogStd">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Dialog" @click="state.visible = !state.visible" />
            </div>
            <DialogStd target="html" v-bind="state" v-model:visible="state.visible">
                Default Content
            </DialogStd>
        </Variant>

        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open xs Dialog" @click="state.size = 'xs'; state.visible = true;" />
                <ButtonStd label="Open sm Dialog" @click="state.size = 'sm'; state.visible = true;" />
                <ButtonStd label="Open md Dialog" @click="state.size = 'md'; state.visible = true;" />
                <ButtonStd label="Open lg Dialog" @click="state.size = 'lg'; state.visible = true;" />
                <ButtonStd label="Open xl Dialog" @click="state.size = 'xl'; state.visible = true;" />
            </div>

            <DialogStd target="html" v-bind="state" v-model:visible="state.visible">
                Default Content
            </DialogStd>
        </Variant>

        <Variant title="Content Slots" :init-state="stateSlots" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Dialog" @click="state.visible = !state.visible" />
            </div>
            
            <DialogStd target="html" v-bind="state" v-model:visible="state.visible">
                <template #header>
                    <div class="dialog-title">Header</div>
                </template>
                
                <template #article>
                    <div class="dialog-content">
                        Default Content
                    </div>
                </template>

                <template #footer>
                    <div class="dialog-actions">
                        Footer
                    </div>
                </template>
            </DialogStd>
        </Variant>

        <Variant title="Closable" :init-state="stateClosable" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Dialog" @click="state.visible = !state.visible" />
            </div>
            
            <DialogStd target="html" v-bind="state" v-model:visible="state.visible">
                <template #header>
                    <div class="dialog-title">Header</div>
                </template>
                Default Content
            </DialogStd>
        </Variant>

        <Variant title="Static" :init-state="stateStatic" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Dialog" @click="state.visible = !state.visible" />
            </div>
            
            <DialogStd target="html" v-bind="state" v-model:visible="state.visible">
                <template #header>
                    <div class="dialog-title">Header</div>
                </template>
                Static Modals cannot be closed by an click outside or using ESC.
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

function stateSlots() {
    return {
        size: ref<string>('md'),
        visible: ref<boolean>(false),
    }
}

function stateClosable() {
    return {
        size: ref<string>('md'),
        visible: ref<boolean>(false),
        closable: true
    }
}

function stateStatic() {
    return {
        size: ref<string>('md'),
        visible: ref<boolean>(false),
        closable: true,
        static: true
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
