<template>
    <Button variant="outline" @click="version++">Load other content</Button>
    <Deferred :loader="loader" :delay="0" @loaded="loaded++">
        <template #loading>Loading selection…</template>
    </Deferred>
    <output data-testid="load-count">{{ loaded }}</output>
</template>
<script setup lang="ts">
import type { DeferredLoader } from '../components/deferred';
import { computed, h, ref } from 'vue';
import { Button } from '../components/button';
import { Deferred } from '../components/deferred';
const version = ref(1);
const loaded = ref(0);
const loader = computed<DeferredLoader>(() => {
    const selected = version.value;
    return async () => {
        // Deliberately ignore abort, as some host transports cannot cancel their work.
        await new Promise((resolve) => setTimeout(resolve, selected === 1 ? 700 : 20));
        return {
            render: () => h('p', { 'data-testid': 'replaced-result' }, `Selection ${selected}`),
        };
    };
});
</script>
