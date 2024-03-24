<template>
    <Story title="Form/Control/SelectableList" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2">
                <SelectableList v-bind="state" v-model="state.value" />
            </div>
        </Variant>

        <Variant title="Multiple" :init-state="stateMultiple" v-slot="{ state }">
            <div class="p-2">
                <SelectableList v-bind="state" v-model="state.value" />
            </div>
        </Variant>

        <Variant title="Multiple" :init-state="stateSizes" v-slot="{ state }">
            <div class="flex flex-col gap-8 p-2">
                <div class="flex flex-row gap-16">
                    <SelectableList v-bind="state" v-model="state.valueSM" size="sm" />
                    <SelectableList v-bind="state" v-model="state.valueSMM" size="sm" multiple />
                </div>
                <div class="flex flex-row gap-16">
                    <SelectableList v-bind="state" v-model="state.valueMD" />
                    <SelectableList v-bind="state" v-model="state.valueMDM" multiple />
                </div>
                <div class="flex flex-row gap-16">
                    <SelectableList v-bind="state" v-model="state.valueLG" size="lg" />
                    <SelectableList v-bind="state" v-model="state.valueLGM" size="lg" multiple />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SelectableList from './SelectableList.vue';

const options = [
    ['a', 'Option A'],
    ['b', 'Option B'],
    ['c', 'Option C'],
    {
        value: 'd',
        label: 'Disabled',
        disabled: true
    }
];

function stateDefault() {
    return {
        options,
        value: ref()
    }
}

function stateMultiple() {
    return {
        options,
        multiple: true,
        value: ref()
    }
}

function stateSizes() {
    return {
        options,
        valueSM: ref(),
        valueSMM: ref(),
        valueMD: ref(),
        valueMDM: ref(),
        valueLG: ref(),
        valueLGM: ref(),
    }
}
</script>

<docs lang="md">
</docs>
