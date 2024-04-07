<template>
    <Story title="Form/Control/TimeFrameField" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto p-2">
                <TimeFrameField v-bind="state" v-model="state.value" />
            </div>
        </Variant>

        <Variant title="Between" :init-state="stateBetween" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto p-2">
                <TimeFrameField v-bind="state" v-model="state.value" />
            </div>
        </Variant>
        
        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto flex flex-col gap-4 p-2">
                <TimeFrameField v-bind="state" size="sm" placeholder="32px height" v-model="state.valueSM" />
                <TimeFrameField v-bind="state" placeholder="40px height" v-model="state.valueMD" />
                <TimeFrameField v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TimeFrameField from './TimeFrameField.vue';

function stateDefault() {
    return {
        value: ref()
    }
}

function stateBetween() {
    return {
        between: '03:00:00',
        value: ref()
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
</script>

<docs lang="md">
</docs>
