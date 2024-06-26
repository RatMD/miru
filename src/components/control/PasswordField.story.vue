<template>
    <Story title="Form/Control/PasswordField" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto p-2">
                <PasswordField v-bind="state" v-model="state.value" />
            </div>
        </Variant>
        
        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto flex flex-col gap-4 p-2">
                <PasswordField v-bind="state" size="sm" placeholder="32px height" v-model="state.valueSM" />
                <PasswordField v-bind="state" placeholder="40px height" v-model="state.valueMD" />
                <PasswordField v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
            </div>
        </Variant>
        
        <Variant title="States" :init-state="stateStates" v-slot="{ state }">
            <div class="max-w-[600px] mx-auto flex flex-row gap-4 p-2">
                <div class="flex flex-col flex-1 gap-4">
                    <PasswordField v-bind="state" placeholder="Default State" v-model="state.placeholderValueNormal" />
                    <PasswordField v-bind="state" placeholder="Disabled State" disabled v-model="state.placeholderValueDisabled" />
                    <PasswordField v-bind="state" placeholder="Readonly State" readonly v-model="state.placeholderValueReadonly" />
                    <PasswordField v-bind="state" placeholder="Valid State" validation="valid" v-model="state.placeholderValueValid" />
                    <PasswordField v-bind="state" placeholder="Invalid State" validation="invalid" v-model="state.placeholderValueInvalid" />
                </div>
                <div class="flex flex-col flex-1 gap-4">
                    <PasswordField v-bind="state" v-model="state.valueNormal" />
                    <PasswordField v-bind="state" v-model="state.valueDisabled" disabled />
                    <PasswordField v-bind="state" v-model="state.valueReadonly" readonly />
                    <PasswordField v-bind="state" v-model="state.valueValid" validation="valid" />
                    <PasswordField v-bind="state" v-model="state.valueInvalid" validation="invalid" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PasswordField from './PasswordField.vue';

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
