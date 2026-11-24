<template>
    <div data-slot="deferred" :data-pending="pending" :aria-busy="pending || undefined">
        <template v-if="error">
            <slot name="error" :error="error" :retry="retry" :attempt="attempt">
                <p role="alert" class="text-sm text-danger">
                    {{ trans('common.deferred.failed') }}
                </p>
                <Button type="button" variant="outline" size="sm" @click="retry">
                    {{ trans('common.actions.retry') }}
                </Button>
            </slot>
        </template>
        <Suspense v-else :key="revision" @pending="onPending" @resolve="onResolved">
            <div data-slot="deferred-content">
                <component :is="asyncComponent" v-if="asyncComponent" v-bind="componentProps" />
                <slot v-else :retry="retry" :attempt="attempt" />
            </div>
            <template #fallback>
                <div v-if="showLoading" data-slot="deferred-loading" role="status">
                    <slot name="loading" :attempt="attempt">
                        <Spinner :label="trans('common.states.loading')" />
                    </slot>
                </div>
            </template>
        </Suspense>
    </div>
</template>
<script setup lang="ts">
import type { DeferredLoader } from './types';
import type { Component } from 'vue';
import {
    defineAsyncComponent,
    defineComponent,
    onBeforeUnmount,
    onErrorCaptured,
    ref,
    shallowRef,
    watch,
} from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Spinner } from '../spinner';

const props = withDefaults(
    defineProps<{
        /** Optional dynamic import/component loader. Without it, Suspense handles async slot children. */
        loader?: DeferredLoader;
        componentProps?: Record<string, unknown>;
        delay?: number;
        /** Maximum client-side pending time; 0 disables the timeout. */
        timeout?: number;
    }>(),
    { delay: 200, timeout: 10000 },
);
const emit = defineEmits<{ pending: []; loaded: []; error: [error: Error] }>();
const { trans } = useI18n();
const attempt = ref(1);
const revision = ref(0);
const error = shallowRef<Error | null>(null);
const pending = ref(false);
const showLoading = ref(false);
const asyncComponent = shallowRef<Component | null>(null);
let controller: AbortController | undefined;
let loadingTimer: ReturnType<typeof setTimeout> | undefined;
let timeoutTimer: ReturnType<typeof setTimeout> | undefined;
let loaded = false;

function clearTimers(): void {
    clearTimeout(loadingTimer);
    clearTimeout(timeoutTimer);
}

/** End the current attempt and expose a retry action without leaving rejected promises unhandled. */
function fail(reason: unknown): void {
    if (error.value) {
        return;
    }
    error.value = reason instanceof Error ? reason : new Error(String(reason));
    pending.value = false;
    clearTimers();
    controller?.abort();
    emit('error', error.value);
}

function onPending(): void {
    pending.value = true;
    showLoading.value = props.delay <= 0;
    emit('pending');
    if (typeof window !== 'undefined') {
        if (props.delay > 0) {
            loadingTimer = setTimeout(() => {
                showLoading.value = true;
            }, props.delay);
        }
        if (props.timeout > 0) {
            timeoutTimer = setTimeout(
                () => fail(new Error(trans('common.deferred.timeout'))),
                props.timeout,
            );
        }
    }
}

function onResolved(): void {
    if (error.value || loaded) {
        return;
    }
    clearTimers();
    pending.value = false;
    showLoading.value = false;
    loaded = true;
    emit('loaded');
}

/** Remount the async subtree and start a new loader with a fresh abort signal. */
function retry(): void {
    attempt.value++;
}

watch(
    () => [props.loader, attempt.value] as const,
    ([loader, number]) => {
        revision.value++;
        clearTimers();
        controller?.abort();
        controller = new AbortController();
        const signal = controller.signal;
        error.value = null;
        loaded = false;
        showLoading.value = false;
        pending.value = false;
        asyncComponent.value = loader
            ? defineAsyncComponent(async () => {
                  try {
                      const result = await loader({ signal, attempt: number });
                      if (signal.aborted) {
                          return defineComponent(() => () => null);
                      }
                      return typeof result === 'object' && 'default' in result
                          ? result.default
                          : result;
                  } catch (reason) {
                      if (signal.aborted) {
                          return defineComponent(() => () => null);
                      }
                      throw reason;
                  }
              })
            : null;
    },
    { immediate: true, flush: 'sync' },
);
onErrorCaptured((reason) => {
    fail(reason);
    return false;
});
onBeforeUnmount(() => {
    clearTimers();
    controller?.abort();
});
defineExpose({ retry, pending, error });
</script>
