<template>
    <Story title="Form/Control/TimeFrameField" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2">
                <TimeFrameField v-bind="state" v-model="state.value" />
            </div>
        </Variant>

        <Variant title="Between" :init-state="stateBetween" v-slot="{ state }">
            <div class="p-2">
                <TimeFrameField v-bind="state" v-model="state.value" />
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
</script>

<docs lang="md">
</docs>
