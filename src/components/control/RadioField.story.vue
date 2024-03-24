<template>
    <Story title="Form/Control/RadioField" :layout="{ type: 'grid', width: '400px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2">
                <RadioField v-bind="state" v-model="state.value" />
            </div>
        </Variant>
        
        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <RadioField v-bind="state" size="sm" v-model="state.valueSM" />
                <RadioField v-bind="state" v-model="state.valueMD" />
                <RadioField v-bind="state" size="lg" v-model="state.valueLG" />
            </div>
        </Variant>

        <Variant title="States" :init-state="stateStates" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <RadioField v-bind="state" v-model="state.valueNormal" label="Default" />
                <RadioField v-bind="state" v-model="state.valueChecked" label="Checked" />
                <RadioField v-bind="state" v-model="state.valueDisabled" label="Disabled" disabled />
                <RadioField v-bind="state" v-model="state.valueBoth" label="Disabled & Checked" disabled />
                <RadioField v-bind="state" v-model="state.valueValid" validation="valid" />
                <RadioField v-bind="state" v-model="state.valueInvalid" validation="invalid" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import RadioField from './RadioField.vue';

function stateDefault() {
    return {
        label: "Radio Field",
        value: ref()
    }
}

function stateSizes() {
    return {
        label: "Radio Field",
        valueSM: ref(),
        valueMD: ref(),
        valueLG: ref(),
    }
}

function stateStates() {
    return {
        label: "Radio Field",
        value: ref(),
        valueNormal: ref(),
        valueChecked: ref(true),
        valueDisabled: ref(),
        valueBoth: ref(true),
        valueValid: ref(),
        valueInvalid: ref(),
    }
}
</script>

<docs lang="md">
</docs>
