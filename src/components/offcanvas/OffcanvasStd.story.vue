<template>
    <Story title="Components/Offcanvas/OffcanvasStd">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Offcanvas" @click="state.visible = !state.visible" />
            </div>
            <OffcanvasStd target="html" v-bind="state" v-model:visible="state.visible">
                <div class="p-4">
                    Default Content
                </div>
            </OffcanvasStd>
        </Variant>

        <Variant title="Placements" :init-state="statePlacements" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Top Offcanvas" @click="state.placement = 'top'; state.visible = !state.visible" closable />
                <ButtonStd label="Open Right Offcanvas" @click="state.placement = 'right'; state.visible = !state.visible" closable />
                <ButtonStd label="Open Bottom Offcanvas" @click="state.placement = 'bottom'; state.visible = !state.visible" closable />
                <ButtonStd label="Open Left Offcanvas" @click="state.placement = 'left'; state.visible = !state.visible" closable />
            </div>
            <OffcanvasStd target="html" v-bind="state" v-model:visible="state.visible">
                <div class="p-4">
                    Default Content
                </div>
            </OffcanvasStd>
        </Variant>

        <Variant title="Content Slots" :init-state="stateSlots" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Offcanvas" @click="state.visible = !state.visible" />
            </div>
            
            <OffcanvasStd target="html" v-bind="state" v-model:visible="state.visible">
                <template #header>
                    <div class="offcanvas-title">Offcanvas Title</div>
                </template>

                <template #article>
                    <div class="offcanvas-content">
                        Default Content
                    </div>
                </template>

                <template #footer>
                    <div class="offcanvas-actions">
                        Footer
                    </div>
                </template>
            </OffcanvasStd>
        </Variant>

        <Variant title="Closable" :init-state="stateClosable" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Offcanvas" @click="state.visible = !state.visible" />
            </div>
            
            <OffcanvasStd target="html" v-bind="state" v-model:visible="state.visible">
                Default Content
            </OffcanvasStd>
        </Variant>

        <Variant title="Static" :init-state="stateStatic" v-slot="{ state }">
            <div class="flex flex-col items-center justify-start w-screen h-screen gap-4 py-16">
                <ButtonStd label="Open Offcanvas" @click="state.visible = !state.visible" />
            </div>
            
            <OffcanvasStd target="html" v-bind="state" v-model:visible="state.visible">
                Static Modals cannot be closed by an click outside or using ESC.
            </OffcanvasStd>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import OffcanvasStd from './OffcanvasStd.vue';

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

function stateSlots() {
    return {
        placement: ref<string>('right'),
        visible: ref<boolean>(false),
    }
}

function stateClosable() {
    return {
        placement: ref<string>('right'),
        title: 'Offcanvas Title',
        visible: ref<boolean>(false),
        closable: ref<boolean>(true),
        escape: ref<boolean>(true)
    }
}

function stateStatic() {
    return {
        title: 'Static Offcanvas',
        placement: ref<string>('right'),
        visible: ref<boolean>(false),
        closable: ref<boolean>(true),
        escape: ref<boolean>(true),
        static: ref<boolean>(true)
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
