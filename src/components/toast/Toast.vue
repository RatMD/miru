<template>
    <ToastProvider
        :key="id ?? 'default'"
        :toast-manager="channel.manager"
        :duration="toastOptions?.duration ?? duration"
        :limit="inline ? 100 : visibleToasts"
        :disable-swipe="disableSwipe"
        :swipe-direction="swipeDirection"
        :swipe-threshold="swipeThreshold"
        :label="containerAriaLabel || trans('common.toast.label')">
        <ToastViewport :host="props" v-bind="$attrs">
            <template v-for="(_, name) in $slots" #[name]="scope">
                <slot :name="name" v-bind="scope ?? {}" />
            </template>
        </ToastViewport>
    </ToastProvider>
</template>
<script setup lang="ts">
import type { ToasterProps } from './types';
import { ToastProvider } from 'reka-ui';
import { onBeforeUnmount, shallowRef, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { acquireToastChannel } from './toast';
import ToastViewport from './ToastViewport.vue';
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<ToasterProps>(), {
    appearance: 'frost',
    inline: false,
    position: 'bottom-right',
    theme: 'system',
    duration: 4000,
    visibleToasts: 3,
    closeButton: true,
    closeButtonPosition: 'top-right',
    expand: false,
    richColors: false,
    gap: 12,
    offset: 24,
    mobileOffset: 16,
    swipeDirection: 'right',
    swipeThreshold: 50,
    disableSwipe: false,
});
const { trans } = useI18n();
const channel = shallowRef(acquireToastChannel(props.id, () => props.toastOptions));
watch(
    () => props.id,
    (id) => {
        channel.value.release();
        channel.value = acquireToastChannel(id, () => props.toastOptions);
    },
);
onBeforeUnmount(() => channel.value.release());
</script>
