<template>
    <Story title="Support/CollapseSupport">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <ButtonStd label="Collapse Content" @click="state.collapsed = !state.collapsed" />
            <CollapseSupport v-bind="state" class="mt-8">
                <div class="max-w-xs p-4 bg-gray-100 rounded dark:bg-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </CollapseSupport>
        </Variant>
        
        <Variant title="Slow Transition" :init-state="stateSlow" v-slot="{ state }">
            <ButtonStd label="Collapse Content" @click="state.collapsed = !state.collapsed" />
            <CollapseSupport v-bind="state" class="mt-8">
                <div class="max-w-xs p-4 bg-gray-100 rounded dark:bg-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </CollapseSupport>
        </Variant>
        
        <Variant title="Normal Transition" :init-state="stateNormal" v-slot="{ state }">
            <ButtonStd label="Collapse Content" @click="state.collapsed = !state.collapsed" />
            <CollapseSupport v-bind="state" class="mt-8">
                <div class="max-w-xs p-4 bg-gray-100 rounded dark:bg-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </CollapseSupport>
        </Variant>
        
        <Variant title="Fast Transition" :init-state="stateFast" v-slot="{ state }">
            <ButtonStd label="Collapse Content" @click="state.collapsed = !state.collapsed" />
            <CollapseSupport v-bind="state" class="mt-8">
                <div class="max-w-xs p-4 bg-gray-100 rounded dark:bg-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </CollapseSupport>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import CollapseSupport from './CollapseSupport.vue';

/**
 * Default States
 * @returns
 */
function stateDefault() {
    return {
        collapsed: ref<boolean>(true)
    }
}

/**
 * Slow States
 * @returns
 */
function stateSlow() {
    return {
        duration: 'slow',
        collapsed: ref<boolean>(true)
    }
}

/**
 * Normal States
 * @returns
 */
function stateNormal() {
    return {
        duration: 'normal',
        collapsed: ref<boolean>(true)
    }
}

/**
 * Fast States
 * @returns
 */
function stateFast() {
    return {
        duration: 'fast',
        collapsed: ref<boolean>(true)
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
