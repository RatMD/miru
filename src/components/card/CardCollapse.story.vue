<template>
    <Story title="Components/Card/CardCollapse" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <CardCollapse v-bind="state" v-model:visible="state.visible">
                Card Content
            </CardCollapse>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CardCollapse from './CardCollapse.vue';

// Default Variant States
function stateDefault() {
    return {
        title: 'Collapse Content',
        visible: ref(false)
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
