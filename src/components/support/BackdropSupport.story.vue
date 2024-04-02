<template>
    <Story title="Support/BackdropSupport" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Button" color="primary" />
                </div>
                <BackdropSupport position="absolute" v-model:visible="state.visible" />
            </div>
        </Variant>

        <Variant title="SM Blur">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Button" color="primary" />
                </div>
                <BackdropSupport position="absolute" size="sm" />
            </div>
        </Variant>

        <Variant title="MD Blur">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Button" color="primary" />
                </div>
                <BackdropSupport position="absolute" size="md" />
            </div>
        </Variant>

        <Variant title="LG Blur">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Button" color="primary" />
                </div>
                <BackdropSupport position="absolute" size="lg" />
            </div>
        </Variant>

        <Variant title="XL Blur">
            <div class="content">
                <div class="flex flex-col items-center w-full gap-4 p-8">
                    <span>Content</span>
                    <ButtonStd label="Button" color="primary" />
                </div>
                <BackdropSupport position="absolute" size="xl" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BackdropSupport from './BackdropSupport.vue';
import ButtonStd from '../button/ButtonStd.vue';

// Default Variant States
function stateDefault() {
    return {
        visible: ref(false)
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
