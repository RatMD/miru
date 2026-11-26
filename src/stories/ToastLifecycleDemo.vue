<template>
    <div class="grid w-full max-w-3xl gap-4">
        <div class="flex flex-wrap gap-2">
            <Button v-if="mode === 'root'" size="sm" variant="outline" @click="page">
                Server notice
            </Button>
            <Button
                v-if="mode === 'root'"
                size="sm"
                variant="outline"
                @click="settings.toast = settings.toast === false ? hostOptions : false">
                Toggle root toasts
            </Button>
            <Button size="sm" variant="outline" @click="save">Save</Button>
            <template v-if="mode === 'hosts'">
                <Button
                    size="sm"
                    variant="outline"
                    @click="other.success('Second host', { id: 'shared', duration: Infinity })">
                    Send to second host
                </Button>
            </template>
            <template v-if="mode === 'lifecycle'">
                <Button
                    size="sm"
                    variant="outline"
                    @click="notifications.loading('Working', options('work'))">
                    Loading
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    @click="notifications.success('Finished', options('work'))">
                    Finish loading
                </Button>
                <Button size="sm" variant="outline" @click="promise(false)">Promise success</Button>
                <Button size="sm" variant="outline" @click="promise(true)">Promise failure</Button>
                <Button
                    size="sm"
                    variant="outline"
                    @click="notifications.message('Persistent notice', options('persistent'))">
                    Persistent
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    @click="
                        notifications.message('Locked notice', {
                            ...options('locked'),
                            dismissible: false,
                        })
                    ">
                    Locked
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    @click="
                        notifications.message('Review changes', {
                            ...options('keep'),
                            action: {
                                label: 'Keep open',
                                closeOnClick: false,
                                onClick: () => (feedback = 'Action performed'),
                            },
                        })
                    ">
                    Keep-open action
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    @click="
                        notifications.message('Review changes', {
                            ...options('action'),
                            action: { label: 'Confirm', onClick: () => (feedback = 'Confirmed') },
                            cancel: { label: 'Cancel', onClick: () => (feedback = 'Cancelled') },
                        })
                    ">
                    Actions
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    @click="
                        notifications.message('Expires automatically', {
                            ...options('timed'),
                            duration: 300,
                        })
                    ">
                    Timed
                </Button>
                <Button size="sm" variant="outline" @click="batch">Send batch</Button>
                <Button
                    size="sm"
                    variant="outline"
                    @click="
                        notifications.update(id + 'work', {
                            title: 'Updated explicitly',
                            type: 'info',
                        })
                    ">
                    Update
                </Button>
                <Button size="sm" variant="outline" @click="startDeferred">
                    Start deferred request
                </Button>
                <Button size="sm" variant="outline" @click="resolveDeferred?.('done')">
                    Resolve deferred request
                </Button>
                <Button size="sm" variant="outline" @click="mounted = !mounted">Toggle host</Button>
            </template>
            <Button size="sm" variant="outline" @click="notifications.dismiss()">
                Dismiss this host
            </Button>
        </div>
        <PageRoot v-if="mode === 'root'">
            <p class="text-sm text-muted-foreground">
                The persistent PageRoot hosts local and server notifications using createMiru options.
            </p>
        </PageRoot>
        <template v-else>
            <Toast
                v-if="mounted"
                :id="id"
                :inline="!floating"
                :expand="false"
                :visible-toasts="3"
                :duration="Infinity"
                appearance="flat" />
            <Toast
                v-if="mode === 'hosts'"
                :id="id + 'other'"
                inline
                :duration="Infinity"
                appearance="flat" />
        </template>
        <output data-testid="toast-feedback" class="text-sm">{{ feedback }}</output>
        <output data-testid="toast-dismissed" class="sr-only">{{ dismissed }}</output>
        <output data-testid="toast-expired" class="sr-only">{{ expired }}</output>
        <output data-testid="toast-promise-result" class="sr-only">{{ promiseResult }}</output>
    </div>
</template>
<script lang="ts">
let lifecycleSequence = 0;
</script>
<script setup lang="ts">
import type { ToastOptions, ToasterProps } from '../components/toast';
import type { PageToast } from '../composables/useToast';
import type { MiruOptions } from '../miru';
import { onBeforeUnmount, provide, ref, shallowReactive } from 'vue';
import { Button } from '../components/button';
import { Toast } from '../components/toast';
import { useToast } from '../composables/useToast';
import { PageRoot } from '../layouts';
import { miruOptionsKey } from '../miru';
const props = withDefaults(
    defineProps<{ mode?: 'lifecycle' | 'hosts' | 'root'; floating?: boolean }>(),
    { mode: 'lifecycle', floating: false },
);
const id = `toast-lifecycle-${++lifecycleSequence}`;
const notifications = useToast({ toasterId: id });
const other = useToast({ toasterId: id + 'other' });
const feed = ref<readonly PageToast[]>([]);
const hostOptions: ToasterProps = { id, inline: true, duration: Infinity, appearance: 'flat' };
const settings = shallowReactive<MiruOptions>({ toast: hostOptions, pageToasts: feed });
if (props.mode === 'root') provide(miruOptionsKey, settings);
const feedback = ref('');
const dismissed = ref(0),
    expired = ref(0),
    promiseResult = ref(''),
    mounted = ref(true);
const timers: ReturnType<typeof setTimeout>[] = [];
let resolveDeferred: ((value: string) => void) | undefined;
let batchSequence = 0;
function options(key: string): ToastOptions {
    return {
        id: id + key,
        duration: Infinity,
        onDismiss: () => dismissed.value++,
        onAutoClose: () => expired.value++,
    };
}
function save() {
    notifications.success('Saved changes', {
        ...options('saved'),
        id: props.mode === 'hosts' ? 'shared' : id + 'saved',
        description: 'Available throughout your workspace.',
    });
}
function page() {
    feed.value = [
        {
            id: id + 'page',
            status: 'info',
            title: 'Server notice',
            description: 'Received through the page feed.',
            duration: null,
            closable: false,
        },
    ];
}
function batch() {
    for (let index = 0; index < 4; index++)
        notifications.info('Stack item ' + ++batchSequence, options('batch' + batchSequence));
}
function promise(reject: boolean) {
    const task = new Promise<string>((resolve, fail) =>
        timers.push(
            setTimeout(
                () => (reject ? fail(new Error('Network unavailable')) : resolve('Document saved')),
                350,
            ),
        ),
    );
    const handle = notifications.promise(task, {
        ...options('promise'),
        loading: 'Saving document',
        success: (value) => value,
        error: 'Request failed',
    });
    void handle.unwrap().then(
        (value) => (promiseResult.value = value),
        () => (promiseResult.value = 'rejected'),
    );
}
function startDeferred() {
    const task = new Promise<string>((resolve) => (resolveDeferred = resolve));
    void notifications.promise(task, {
        ...options('deferred'),
        loading: 'Deferred request',
        success: 'Deferred success',
    });
}
onBeforeUnmount(() => {
    timers.forEach(clearTimeout);
    notifications.dismiss();
    other.dismiss();
    resolveDeferred?.('done');
});
</script>
