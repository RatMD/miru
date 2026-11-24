<template>
    <div
        class="mx-auto w-full space-y-4"
        :class="
            ['list', 'states', 'types'].includes(mode)
                ? 'max-w-4xl'
                : args.orientation === 'vertical'
                  ? 'max-w-xs'
                  : 'max-w-lg'
        ">
        <AttachmentList
            v-if="mode === 'list'"
            v-bind="args"
            v-model="items"
            :locales="args.multilingual ? locales : []"
            :label="copy.label"
            @reorder="feedback = $event.join(', ')"
            @remove="feedback = $event" />
        <template v-else-if="mode === 'upload'">
            <Attachment :item="uploadItem" show-mime />
            <Button :disabled="uploadItem.status === 'uploading'" @click="startUpload">
                {{ simulate }}
            </Button>
        </template>
        <div v-else-if="mode === 'states'" class="grid gap-3 sm:grid-cols-2">
            <Attachment
                v-for="state in states"
                :key="state"
                v-bind="args"
                :item="{
                    ...filenameItem(document),
                    status: state,
                    progress: state === 'uploading' ? 64 : undefined,
                    error: state === 'error' ? copy.error : undefined,
                }" />
        </div>
        <div v-else-if="mode === 'types'" class="grid gap-3 sm:grid-cols-2">
            <Attachment v-for="item in items" :key="item.id" v-bind="args" :item="item" />
        </div>
        <Attachment
            v-else
            v-bind="args"
            :item="displaySingle"
            :locales="args.multilingual ? locales : []"
            @update:item="single = $event"
            @remove="feedback = $event"
            @move="feedback = $event" />
        <output
            v-if="feedback"
            data-testid="attachment-feedback"
            class="block text-xs text-muted-foreground">
            {{ feedback }}
        </output>
    </div>
</template>
<script setup lang="ts">
import type { AttachmentItem, AttachmentStatus } from '../components/attachment';
import { computed, ref, onBeforeUnmount } from 'vue';
import { Attachment, AttachmentList } from '../components/attachment';
import { Button } from '../components/button';
import { literal } from '../components/form/types';
const props = withDefaults(
    defineProps<{
        mode?: 'single' | 'list' | 'states' | 'types' | 'upload';
        args: Record<string, any>;
        locale: string;
    }>(),
    { mode: 'single' },
);
const copy = computed(() =>
    props.locale === 'de'
        ? {
              label: 'Anhänge',
              image: 'Landschaft',
              error: 'Der Upload ist fehlgeschlagen. Bitte erneut versuchen.',
              english: 'Englisch',
              german: 'Deutsch',
              title: 'Projektunterlagen',
              description: 'Informationen zum Projekt.',
          }
        : {
              label: 'Attachments',
              image: 'Landscape',
              error: 'The upload failed. Please try again.',
              english: 'English',
              german: 'German',
              title: 'Project documents',
              description: 'Information about the project.',
          },
);
const preview =
    'data:image/svg+xml,' +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320"><rect width="480" height="320" fill="#0284c7"/><circle cx="380" cy="65" r="32" fill="#e0f2fe"/><path d="M0 320 150 90 290 250 380 160 480 320" fill="#075985"/></svg>',
    );
const locales = computed(() => [
    { value: 'en', label: literal(copy.value.english) },
    { value: 'de', label: literal(copy.value.german) },
]);
const document: AttachmentItem = {
    id: 'document',
    name: 'project-documents.pdf',
    title: copy.value.title,
    description: copy.value.description,
    mimeType: 'application/pdf',
    size: 2465792,
    status: 'idle',
    translations: {
        en: {
            title: 'Project documents',
            description: 'Information about the project.',
        },
        de: {
            title: 'Projektunterlagen',
            description: 'Informationen zum Projekt.',
        },
    },
};
const items = ref<AttachmentItem[]>([
    {
        id: 'image',
        name: 'landscape.jpg',
        title: copy.value.image,
        url: preview,
        mimeType: 'image/jpeg',
        size: 839680,
        status: 'success',
    },
    { ...document },
    {
        id: 'video',
        name: 'overview.mp4',
        thumbnailUrl: preview,
        mimeType: 'video/mp4',
        size: 12582912,
        status: 'uploading',
        progress: 42,
    },
    {
        id: 'archive',
        name: 'backup.zip',
        mimeType: 'application/zip',
        size: 7340032,
        status: 'error',
        error: copy.value.error,
    },
    {
        id: 'audio',
        name: 'recording.mp3',
        mimeType: 'audio/mpeg',
        size: 1048576,
        status: 'processing',
    },
    {
        id: 'code',
        name: 'configuration.json',
        mimeType: 'application/json',
        size: 1536,
    },
]);
function filenameItem(item: AttachmentItem): AttachmentItem {
    const { title, description, translations, ...file } = item;
    return file;
}
if (!props.args.editable) items.value = items.value.map(filenameItem);
const single = ref<AttachmentItem>(
    props.args.image
        ? items.value[0]!
        : props.args.longMime
          ? {
                ...document,
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }
          : {
                ...document,
                status: props.args.status ?? document.status,
                progress: props.args.progress ?? undefined,
            },
);
const states: AttachmentStatus[] = ['idle', 'uploading', 'processing', 'success', 'error'];
const feedback = ref('');
const displaySingle = computed(() => ({
    ...(props.args.editable ? single.value : filenameItem(single.value)),
    status: props.args.status ?? single.value.status,
    progress: props.args.progress ?? single.value.progress,
    error: props.args.status === 'error' ? copy.value.error : single.value.error,
}));
const uploadItem = ref<AttachmentItem>(filenameItem(document));
let timer: ReturnType<typeof setInterval> | undefined;
const simulate = computed(() => (props.locale === 'de' ? 'Upload simulieren' : 'Simulate upload'));
function startUpload() {
    if (timer) clearInterval(timer);
    uploadItem.value = { ...uploadItem.value, status: 'uploading', progress: 0 };
    timer = setInterval(() => {
        const progress = Math.min(100, (uploadItem.value.progress ?? 0) + 10);
        uploadItem.value = {
            ...uploadItem.value,
            progress,
            status: progress === 100 ? 'success' : 'uploading',
        };
        if (progress === 100 && timer) {
            clearInterval(timer);
            timer = undefined;
        }
    }, 160);
}
onBeforeUnmount(() => {
    if (timer) clearInterval(timer);
});
</script>
