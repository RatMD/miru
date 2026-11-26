<template>
    <ContextProvider>
        <slot />
        <Toast v-if="options.toast !== false" v-bind="options.toast" />
    </ContextProvider>
</template>

<script setup lang="ts">
import { inject, toValue } from 'vue';
import ContextProvider from '../components/provider/ContextProvider.vue';
import { Toast } from '../components/toast';
import { useToast } from '../composables/useToast';
import { miruOptionsKey } from '../miru';

const options = inject(miruOptionsKey, {});
// The persistent application root owns this watcher, including its teardown and deduplication.
useToast({
    pageToasts: () => (options.toast === false ? [] : toValue(options.pageToasts)),
    toasterId: () => (options.toast === false ? undefined : options.toast?.id),
});
</script>
