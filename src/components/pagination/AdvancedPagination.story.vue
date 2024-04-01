<template>
    <Story title="Components/Pagination/AdvancedPagination" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateSimple" v-slot="{ state }">
            <div class="p-2">
                <AdvancedPagination v-bind="state" />
            </div>
        </Variant>

        <Variant title="Connected" :init-state="stateConnected" v-slot="{ state }">
            <div class="p-2">
                <AdvancedPagination v-bind="state" />
            </div>
        </Variant>

        <Variant title="Alignment" :init-state="stateAlignment" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <AdvancedPagination align="left" v-bind="state" />
                <AdvancedPagination align="center" v-bind="state" />
                <AdvancedPagination align="right" v-bind="state" />
            </div>
        </Variant>

        <Variant title="Disabled" :init-state="stateDisabled" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <AdvancedPagination v-bind="state" disabled />
                <AdvancedPagination v-bind="state" :current="1" />
                <AdvancedPagination v-bind="state" :current="5" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import AdvancedPagination from '../pagination/AdvancedPagination.vue';

// Simple variant States
function stateSimple() {
    return {
        current: 2,
        last: 5,
        size: 'sm',
    }
}

// Advanced variant States
function stateConnected() {
    return {
        current: 2,
        last: 5,
        size: 'sm',
        connected: true
    }
}

// Advanced variant States
function stateAlignment() {
    return {
        current: 2,
        last: 5,
        size: 'sm'
    }
}

// Advanced variant States
function stateDisabled() {
    return {
        current: 2,
        last: 5,
        size: 'sm'
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
