<template>
    <Story title="Components/Pagination/PagedPagination" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2">
                <PagedPagination v-bind="state" />
            </div>
        </Variant>

        <Variant title="Connected" :init-state="stateConnected" v-slot="{ state }">
            <div class="p-2">
                <PagedPagination v-bind="state" />
            </div>
        </Variant>

        <Variant title="Alignment" :init-state="stateAlignment" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <PagedPagination align="left" v-bind="state" />
                <PagedPagination align="center" v-bind="state" />
                <PagedPagination align="right" v-bind="state" />
            </div>
        </Variant>

        <Variant title="Disabled" :init-state="stateDisabled" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <PagedPagination v-bind="state" disabled />
                <PagedPagination v-bind="state" :current="1" />
                <PagedPagination v-bind="state" :current="15" />
            </div>
        </Variant>

        <Variant title="Before" :init-state="stateBefore" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <PagedPagination v-bind="state" :current="3" />
                <PagedPagination v-bind="state" :current="2" />
                <PagedPagination v-bind="state" :current="1" />
            </div>
        </Variant>

        <Variant title="After" :init-state="stateAfter" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <PagedPagination v-bind="state" :current="13" />
                <PagedPagination v-bind="state" :current="14" />
                <PagedPagination v-bind="state" :current="15" />
            </div>
        </Variant>

        <Variant title="Pages" :init-state="statePages" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <PagedPagination v-bind="state" :pages="1" />
                <PagedPagination v-bind="state" :pages="2" />
                <PagedPagination v-bind="state" :pages="3" />
                <PagedPagination v-bind="state" :pages="4" />
                <PagedPagination v-bind="state" :pages="5" />
                <PagedPagination v-bind="state" :pages="6" />
                <PagedPagination v-bind="state" :pages="7" />
                <PagedPagination v-bind="state" :pages="8" />
                <PagedPagination v-bind="state" :pages="9" />
                <PagedPagination v-bind="state" :pages="10" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import PagedPagination from '../pagination/PagedPagination.vue';

// Default Variant
function stateDefault() {
    return {
        current: 8,
        first: 1,
        last: 15,
        pages: 5
    }
}

// Connected Variant
function stateConnected() {
    return {
        current: 8,
        first: 1,
        last: 15,
        pages: 5,
        connected: true
    }
}

// Alignment Variant
function stateAlignment() {
    return {
        current: 8,
        first: 1,
        last: 15,
        pages: 5,
        connected: true
    }
}

// Disabled Variant
function stateDisabled() {
    return {
        current: 8,
        first: 1,
        last: 15,
        pages: 5,
        connected: true,
        disabled: true
    }
}

// Before Variant
function stateBefore() {
    return {
        current: 3,
        first: 1,
        last: 15,
        pages: 5,
        connected: true
    }
}

// After Variant
function stateAfter() {
    return {
        current: 14,
        first: 1,
        last: 15,
        pages: 5,
        connected: true
    }
}

// Pages Variant
function statePages() {
    return {
        current: 5,
        first: 1,
        last: 10,
        pages: 5,
        connected: true
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
