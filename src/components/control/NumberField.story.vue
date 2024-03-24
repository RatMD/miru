<template>
    <Story title="Form/Control/NumberField" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2">
                <NumberField v-bind="state" v-model="state.value" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NumberField from './NumberField.vue';

function stateDefault() {
    return {
        value: ref(),
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
