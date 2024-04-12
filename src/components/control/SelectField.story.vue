<template>
    <Story title="Form/Control/SelectField" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto p-2">
                <SelectField v-bind="state" v-model="state.value" />
            </div>
        </Variant>
        
        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto flex flex-col gap-4 p-2">
                <SelectField v-bind="state" size="sm" placeholder="32px height" v-model="state.valueSM" />
                <SelectField v-bind="state" placeholder="40px height" v-model="state.valueMD" />
                <SelectField v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
            </div>
        </Variant>

        <Variant title="Control States" :init-state="stateStates" v-slot="{ state }">
            <div class="flex flex-col items-center flex-1 gap-6 w-[400px] mx-auto">
                <FormControl class="w-full" label="Default" v-bind="state" v-model="state.valueNormal" v-slot="{ control }">
                    <SelectField placeholder="Default State" :options="options" v-bind="control" />
                </FormControl>
                <FormControl class="w-full" label="Disabled" v-bind="state" v-model="state.valueDisabled" v-slot="{ control }" disabled>
                    <SelectField placeholder="Disabled State" :options="options" v-bind="control" />
                </FormControl>
                <FormControl class="w-full" label="Valid" v-bind="state" v-model="state.valueValid" v-slot="{ control }" validation="valid" validation-message="This field is valid.">
                    <SelectField placeholder="Valid State" :options="options" v-bind="control" />
                </FormControl>
                <FormControl class="w-full" label="Invalid" v-bind="state" v-model="state.valueInvalid" v-slot="{ control }" validation="invalid" validation-message="This field is invalid.">
                    <SelectField placeholder="Invalid State" :options="options" v-bind="control" />
                </FormControl>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SelectField from './SelectField.vue';
import FormControl from '../form/FormControl.vue';

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
        valueNormal: ref<string>('a'),
        valueDisabled: ref<string>('a'),
        valueValid: ref<string>('a'),
        valueInvalid: ref<string>('a'),
    }
}
</script>

<docs lang="md">
</docs>
