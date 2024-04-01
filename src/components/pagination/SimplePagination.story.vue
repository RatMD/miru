<template>
    <Story title="Components/Pagination/SimplePagination" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2">
                <SimplePagination v-bind="state" />
            </div>
        </Variant>

        <Variant title="Reversed" :init-state="stateReverse" v-slot="{ state }">
            <div class="p-2">
                <SimplePagination v-bind="state" />
            </div>
        </Variant>
        
        <Variant title="Disabled" :init-state="stateDisabled" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <SimplePagination v-bind="state" disabled />
                <SimplePagination v-bind="state" disabled-prev />
                <SimplePagination v-bind="state" disabled-next />
            </div>
        </Variant>
        
        <Variant title="Loading" :init-state="stateLoading" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <SimplePagination v-bind="state" loading />
                <SimplePagination v-bind="state" loading-prev />
                <SimplePagination v-bind="state" loading-next />
            </div>
        </Variant>

        <Variant title="Custom Labels" :init-state="stateCustoms" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <SimplePagination v-bind="state" 
                    :label-prev="ChevronLeft" 
                    :label-prev-props="{ size: 16 }" 
                    :label-next="ChevronRight" 
                    :label-next-props="{ size: 16 }" />
                <SimplePagination v-bind="state" 
                    :label-prev="ChevronLeft" 
                    :label-next="ChevronRight" 
                    icons />
                <SimplePagination v-bind="state" label-prev="Previous Page" label-next="Next Page" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import ChevronLeft from '../lucide/ChevronLeft.vue';
import ChevronRight from '../lucide/ChevronRight.vue';
import SimplePagination from '../pagination/SimplePagination.vue';

// Simple variant States
function stateDefault() {
    return {
        size: 'sm'
    }
}

// Reversed variant States
function stateReverse() {
    return {
        size: 'sm',
        reverse: true
    }
}

// Disabled variant States
function stateDisabled() {
    return {
        size: 'sm'
    }
}

// Loading variant States
function stateLoading() {
    return {
        size: 'sm'
    }
}

// Custom variant States
function stateCustoms() {
    return {
        size: 'sm'
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
