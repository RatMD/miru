<template>
    <Story title="Components/Loading/ProgressBar" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <div class="p-4">
                <ProgressBar />
            </div>
        </Variant>

        <Variant title="Colors">
            <div class="flex flex-col gap-4 p-4">
                <ProgressBar color="primary" />
                <ProgressBar color="secondary" />
                <ProgressBar color="success" />
                <ProgressBar color="warning" />
                <ProgressBar color="danger" />
                <ProgressBar color="info" />
            </div>
        </Variant>

        <Variant title="Value">
            <div class="flex flex-col gap-4 p-4">
                <ProgressBar color="primary" :final="100" v-model="value" />
                <ProgressBar color="secondary" :final="100" v-model="value" />
                <ProgressBar color="success" :final="100" v-model="value" />
                <ProgressBar color="warning" :final="100" v-model="value" />
                <ProgressBar color="danger" :final="100" v-model="value" />
                <ProgressBar color="info" :final="100" v-model="value" />
                
                <ButtonGroup gap="none">
                    <ButtonStd @click="onDecrease" color="secondary" size="sm" label="-" />
                    <ButtonStd @click="onIncrease" color="secondary" size="sm" label="+" />
                </ButtonGroup>
            </div>
        </Variant>

        <Variant title="Sizes">
            <div class="flex flex-col gap-4 p-4">
                <ProgressBar color="primary" size="sm" />
                <ProgressBar color="primary" size="md" />
                <ProgressBar color="primary" size="lg" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ProgressBar from './ProgressBar.vue';
import ButtonStd from '../button/ButtonStd.vue';
import ButtonGroup from '../button/ButtonGroup.vue';

// States
const value = ref<number>(10);

function onDecrease() {
    value.value -= 10;
}
function onIncrease() {
    value.value += 10;
}
</script>

<docs lang="md">
Work in Progress
</docs>
