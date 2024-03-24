<template>
    <Story title="Form/Control/TextareaField" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2">
                <TextareaField v-bind="state" v-model="state.value" />
            </div>
        </Variant>
        
        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <TextareaField v-bind="state" size="sm" placeholder="40px height" v-model="state.valueSM" />
                <TextareaField v-bind="state" placeholder="48px height" v-model="state.valueMD" />
                <TextareaField v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
            </div>
        </Variant>
        
        <Variant title="States" :init-state="stateStates" v-slot="{ state }">
            <div class="flex flex-row gap-4 p-2">
                <div class="flex flex-col flex-1 gap-4">
                    <TextareaField v-bind="state" placeholder="Default State" v-model="state.placeholderValueNormal" />
                    <TextareaField v-bind="state" placeholder="Disabled State" disabled v-model="state.placeholderValueDisabled" />
                    <TextareaField v-bind="state" placeholder="Readonly State" readonly v-model="state.placeholderValueReadonly" />
                    <TextareaField v-bind="state" placeholder="Valid State" validation="valid" v-model="state.placeholderValueValid" />
                    <TextareaField v-bind="state" placeholder="Invalid State" validation="invalid" v-model="state.placeholderValueInvalid" />
                </div>
                <div class="flex flex-col flex-1 gap-4">
                    <TextareaField v-bind="state" v-model="state.valueNormal" />
                    <TextareaField v-bind="state" v-model="state.valueDisabled" disabled />
                    <TextareaField v-bind="state" v-model="state.valueReadonly" readonly />
                    <TextareaField v-bind="state" v-model="state.valueValid" validation="valid" />
                    <TextareaField v-bind="state" v-model="state.valueInvalid" validation="invalid" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TextareaField from './TextareaField.vue';

function stateDefault() {
    return {
        placeholder: 'Placeholder',
        value: ref(),
    }
}

function stateSizes() {
    return {
        placeholder: 'Placeholder',
        valueSM: ref(),
        valueMD: ref(),
        valueLG: ref(),
    }
}

function stateStates() {
    return {
        placeholderValueNormal: ref<string>(''),
        placeholderValueDisabled: ref<string>(''),
        placeholderValueReadonly: ref<string>(''),
        placeholderValueValid: ref<string>(''),
        placeholderValueInvalid: ref<string>(''),
        valueNormal: ref<string>('Default State'),
        valueDisabled: ref<string>('Disabled State'),
        valueReadonly: ref<string>('Readonly State'),
        valueValid: ref<string>('Valid State'),
        valueInvalid: ref<string>('Invalid State'),
    }
}
</script>

<docs lang="md">
</docs>
