<template>
    <Deferred
        :loader="loader"
        :delay="delay"
        :timeout="timeout"
        @loaded="loaded++"
        @error="errors++">
        <template #loading><p>Loading workspace…</p></template>
        <template #error="{ error, retry, attempt }">
            <div role="alert">
                <p>{{ error.message }}</p>
                <p>Attempt {{ attempt }}</p>
                <Button class="mt-3" @click="retry">Retry</Button>
            </div>
        </template>
    </Deferred>
    <output class="sr-only" data-testid="events">loaded:{{ loaded }} errors:{{ errors }}</output>
</template>
<script setup lang="ts">
import type { DeferredLoader } from '../components/deferred';
import { h, ref } from 'vue';
import { Button } from '../components/button';
import { Deferred } from '../components/deferred';
const props = withDefaults(
    defineProps<{ failFirst?: boolean; duration?: number; delay?: number; timeout?: number }>(),
    { duration: 500, delay: 100, timeout: 3000 },
);
const loaded = ref(0);
const errors = ref(0);
const loader: DeferredLoader = async ({ signal, attempt }) => {
    await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, props.duration);
        signal.addEventListener(
            'abort',
            () => {
                clearTimeout(timer);
                reject(new Error('Loading cancelled'));
            },
            { once: true },
        );
    });
    if (props.failFirst && attempt === 1) {
        throw new Error('Could not load the workspace');
    }
    return {
        default: {
            render: () =>
                h(
                    'p',
                    {
                        'data-testid': 'deferred-result',
                        class: 'rounded-lg border border-success-300 bg-success-50 p-5 text-success-900 dark:bg-success-950 dark:text-success-200',
                    },
                    'Workspace ready',
                ),
        },
    };
};
</script>
