<template>
    <UiProvider>
        <slot />
        <Toast v-if="options.toast !== false" v-bind="options.toast" />
    </UiProvider>
</template>

<script setup lang="ts">
import { inject, toValue } from 'vue';
import { useToast } from '../../composables/useToast';
import { miruOptionsKey } from '../../miru';
import { Toast } from '../toast';
import UiProvider from './UiProvider.vue';

const options = inject(miruOptionsKey, {});
// The persistent application root owns this watcher, including its teardown and deduplication.
useToast({ pageToasts: () => (options.toast === false ? [] : toValue(options.pageToasts)) });
</script>
