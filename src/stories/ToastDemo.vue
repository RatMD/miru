<template>
    <div class="grid w-full max-w-full gap-6" style="width: min(44rem, 100%)">
        <div class="flex flex-wrap gap-2">
            <Button
                v-for="type in types"
                :key="type"
                variant="outline"
                size="sm"
                @click="show(type)">
                {{ labels[type] }}
            </Button>
            <Button variant="outline" size="sm" @click="promise(false)">
                {{ labels.promise }}
            </Button>
            <Button variant="outline" size="sm" @click="promise(true)">
                {{ labels.promiseError }}
            </Button>
            <Button variant="outline" size="sm" @click="resolveLoading">
                {{ labels.resolve }}
            </Button>
        </div>
        <Toast
            :id="id"
            :inline="inline"
            :appearance="appearance"
            :position="position"
            :close-button="closeButton"
            :rich-colors="richColors"
            :expand="expand"
            :duration="duration"
            :visible-toasts="visibleToasts"
            :theme="theme" />
        <output class="text-sm" aria-live="polite">{{ feedback }}</output>
    </div>
</template>
<script lang="ts">
let nextDemoId = 0;
</script>
<script setup lang="ts">
import type { ToastAppearance } from '../components/toast';
import type { ToasterProps } from 'vue-sonner';
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { toast } from 'vue-sonner';
import { Button } from '../components/button';
import { Toast } from '../components/toast';
const props = withDefaults(
    defineProps<{
        locale?: string;
        inline?: boolean;
        appearance?: ToastAppearance;
        position?: ToasterProps['position'];
        closeButton?: boolean;
        richColors?: boolean;
        expand?: boolean;
        duration?: number;
        visibleToasts?: number;
        theme?: ToasterProps['theme'];
        seed?: boolean;
    }>(),
    { locale: 'en', inline: true, appearance: 'frost', closeButton: true, seed: true },
);
const id = 'toast-demo-' + ++nextDemoId,
    ids = new Set<string>(),
    timers: ReturnType<typeof setTimeout>[] = [];
const feedback = ref('');
const types = [
    'message',
    'success',
    'info',
    'warning',
    'error',
    'loading',
    'action',
    'multiline',
] as const;
type Type = (typeof types)[number];
const labels = computed(() =>
    props.locale === 'de'
        ? {
              message: 'Nachricht',
              success: 'Erfolgreich gespeichert',
              info: 'Neue Informationen',
              warning: 'Eintrag überprüfen',
              error: 'Speichern fehlgeschlagen',
              loading: 'Wird geladen',
              action: 'Nachricht mit Aktionen',
              multiline: 'Mehrzeilige Nachricht',
              description: 'Die Änderungen stehen im gesamten Arbeitsbereich zur Verfügung.',
              line: 'Weitere Informationen in der nächsten Zeile.',
              confirm: 'Anzeigen',
              cancel: 'Abbrechen',
              promise: 'Erfolgreiches Promise',
              promiseError: 'Fehlerhaftes Promise',
              resolve: 'Laden abschließen',
              done: 'Abgeschlossen',
          }
        : {
              message: 'Message',
              success: 'Saved successfully',
              info: 'New information',
              warning: 'Review this item',
              error: 'Unable to save',
              loading: 'Loading',
              action: 'Message with actions',
              multiline: 'Multi-line message',
              description: 'The changes are available throughout the workspace.',
              line: 'Additional information on the next line.',
              confirm: 'View',
              cancel: 'Cancel',
              promise: 'Successful promise',
              promiseError: 'Failed promise',
              resolve: 'Finish loading',
              done: 'Completed',
          },
);
function options(key: string, persistent = false) {
    const toastId = id + '-' + key;
    ids.add(toastId);
    return {
        id: toastId,
        toasterId: id,
        description: labels.value.description,
        duration: persistent ? Infinity : props.duration,
    };
}
function show(type: Type, persistent = false) {
    const opts = options(type, persistent);
    if (type === 'action')
        toast.message(labels.value.action, {
            ...opts,
            action: {
                label: labels.value.confirm,
                onClick: () => (feedback.value = labels.value.done),
            },
            cancel: {
                label: labels.value.cancel,
                onClick: () => (feedback.value = labels.value.cancel),
            },
        });
    else if (type === 'multiline')
        toast.message(labels.value.multiline, {
            ...opts,
            description: labels.value.description + '\n' + labels.value.line,
        });
    else toast[type](labels.value[type], opts);
}
function resolveLoading() {
    toast.success(labels.value.done, options('loading'));
}
function promise(reject: boolean) {
    const task = new Promise<string>((resolve, fail) => {
        timers.push(
            setTimeout(
                () => (reject ? fail(new Error(labels.value.error)) : resolve(labels.value.done)),
                1500,
            ),
        );
    });
    toast.promise(task, {
        ...options('promise-' + reject),
        loading: labels.value.loading,
        success: labels.value.done,
        error: labels.value.error,
    });
}
onMounted(() => {
    if (props.seed) types.forEach((type) => show(type, true));
});
onBeforeUnmount(() => {
    timers.forEach(clearTimeout);
    ids.forEach((key) => toast.dismiss(key));
});
</script>
