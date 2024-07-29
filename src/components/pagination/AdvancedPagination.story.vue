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

        <Variant title="Pagination Slot" :init-state="stateCustomSlot" v-slot="{ state }">
            <div class="p-2">
                <AdvancedPagination v-bind="state">
                    <template #pagination="props">
                        <div class="pager">
                            <span class="pager-sep">Page</span>
                            <span class="pager-cur">{{ props.current }}</span>
                            <span class="pager-sep">of</span>
                            <span class="pager-max">{{ props.last }}</span>
                        </div>
                    </template>
                </AdvancedPagination>
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
    }
}

// Advanced variant States
function stateConnected() {
    return {
        current: 2,
        last: 5,
        connected: true
    }
}

// Advanced variant States
function stateAlignment() {
    return {
        current: 2,
        last: 5,
    }
}

// Advanced variant States
function stateDisabled() {
    return {
        current: 2,
        last: 5,
    }
}

// Custom Slot variant States
function stateCustomSlot() {
    return {
        current: 2,
        last: 5
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
