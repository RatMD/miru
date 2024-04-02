<template>
    <Story title="Support/BackdropSupport" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Open Backdrop" color="primary" @click="state.visible = !state.visible" />
                </div>
                <BackdropSupport position="absolute" :visible="state.visible" />
                <div class="absolute inset-0 flex flex-col items-end w-full gap-4 p-8 z-[200]" :class="[
                    state.visible ? `flex` : `hidden`
                ]">
                    <ButtonStd label="Close Backdrop" color="danger" @click="state.visible = !state.visible" />
                </div>
            </div>
        </Variant>

        <Variant title="SM Blur" :init-state="stateSmBlur" v-slot="{ state }">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Open Backdrop" color="primary" @click="state.visible = !state.visible" />
                </div>
                <BackdropSupport position="absolute" size="sm" :visible="state.visible" />
                <div class="absolute inset-0 flex flex-col items-end w-full gap-4 p-8 z-[200]" :class="[
                    state.visible ? `flex` : `hidden`
                ]">
                    <ButtonStd label="Close Backdrop" color="danger" @click="state.visible = !state.visible" />
                </div>
            </div>
        </Variant>

        <Variant title="MD Blur" :init-state="stateMdBlur" v-slot="{ state }">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Open Backdrop" color="primary" @click="state.visible = !state.visible" />
                </div>
                <BackdropSupport position="absolute" size="md" :visible="state.visible" />
                <div class="absolute inset-0 flex flex-col items-end w-full gap-4 p-8 z-[200]" :class="[
                    state.visible ? `flex` : `hidden`
                ]">
                    <ButtonStd label="Close Backdrop" color="danger" @click="state.visible = !state.visible" />
                </div>
            </div>
        </Variant>

        <Variant title="LG Blur" :init-state="stateLgBlur" v-slot="{ state }">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Open Backdrop" color="primary" @click="state.visible = !state.visible" />
                </div>
                <BackdropSupport position="absolute" size="lg" :visible="state.visible" />
                <div class="absolute inset-0 flex flex-col items-end w-full gap-4 p-8 z-[200]" :class="[
                    state.visible ? `flex` : `hidden`
                ]">
                    <ButtonStd label="Close Backdrop" color="danger" @click="state.visible = !state.visible" />
                </div>
            </div>
        </Variant>

        <Variant title="XL Blur" :init-state="stateXlBlur" v-slot="{ state }">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Open Backdrop" color="primary" @click="state.visible = !state.visible" />
                </div>
                <BackdropSupport position="absolute" size="xl" :visible="state.visible" />
                <div class="absolute inset-0 flex flex-col items-end w-full gap-4 p-8 z-[200]" :class="[
                    state.visible ? `flex` : `hidden`
                ]">
                    <ButtonStd label="Close Backdrop" color="danger" @click="state.visible = !state.visible" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BackdropSupport from './BackdropSupport.vue';
import ButtonStd from '../button/ButtonStd.vue';

/**
 * Default States
 * @return
 */
function stateDefault() {
    return {
        visible: ref<boolean>(false)
    }
}

/**
 * SM Blur States
 * @return
 */
function stateSmBlur() {
    return {
        visible: ref<boolean>(false)
    };
}

/**
 * MD Blur States
 * @return
 */
function stateMdBlur() {
    return {
        visible: ref<boolean>(false)
    };
}

/**
 * LG Blur States
 * @return
 */
function stateLgBlur() {
    return {
        visible: ref<boolean>(false)
    };
}

/**
 * XL Blur States
 * @return
 */
function stateXlBlur() {
    return {
        visible: ref<boolean>(false)
    };
}
</script>

<docs lang="md">
Work in Progress
</docs>
