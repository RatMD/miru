<template>
    <Story title="Form/Control/SelectField" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto p-2">
                <SelectField v-bind="state" v-model="state.value" />
            </div>
        </Variant>
        
        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto flex flex-col gap-4 p-2">
                <SelectField v-bind="state" size="sm" placeholder="40px height" v-model="state.valueSM" />
                <SelectField v-bind="state" placeholder="48px height" v-model="state.valueMD" />
                <SelectField v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
            </div>
        </Variant>

        <Variant title="States" :init-state="stateStates" v-slot="{ state }">
            <div class="max-w-[600px] mx-auto flex flex-row gap-4 p-2">
                <div class="flex flex-col flex-1 gap-4">
                    <SelectField v-bind="state" placeholder="Default State" v-model="state.placeholderValueNormal" />
                    <SelectField v-bind="state" placeholder="Disabled State" disabled v-model="state.placeholderValueDisabled" />
                    <SelectField v-bind="state" placeholder="Valid State" validation="valid" v-model="state.placeholderValueValid" />
                    <SelectField v-bind="state" placeholder="Invalid State" validation="invalid" v-model="state.placeholderValueInvalid" />
                </div>
                <div class="flex flex-col flex-1 gap-4">
                    <SelectField v-bind="state" v-model="state.valueNormal" />
                    <SelectField v-bind="state" v-model="state.valueDisabled" disabled />
                    <SelectField v-bind="state" v-model="state.valueValid" validation="valid" />
                    <SelectField v-bind="state" v-model="state.valueInvalid" validation="invalid" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SelectField from './SelectField.vue';

const options = [
    ['a', 'Option A'],
    ['b', 'Option B'],
    ['c', 'Option C']
];

function stateDefault() {
    return {
        placeholder: 'Select an option',
        value: ref()
    }
}

function stateSizes() {
    return {
        placeholder: 'Select an option',
        valueSM: ref(),
        valueMD: ref(),
        valueLG: ref()
    }
}

function stateStates() {
    return {
        placeholderValueNormal: ref<string>(''),
        placeholderValueDisabled: ref<string>(''),
        placeholderValueValid: ref<string>(''),
        placeholderValueInvalid: ref<string>(''),
        valueNormal: ref<string>('a'),
        valueDisabled: ref<string>('a'),
        valueValid: ref<string>('a'),
        valueInvalid: ref<string>('a'),
    }
}
</script>

<docs lang="md">
</docs>
