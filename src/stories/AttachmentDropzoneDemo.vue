<template>
    <div class="mx-auto w-full max-w-4xl">
        <UploadZone
            v-model="images"
            gallery
            :title="locale === 'de' ? 'Bilder hinzufügen' : 'Add images'">
            <template #attachments="{ items, update, disabled }">
                <AttachmentList
                    :model-value="items"
                    :disabled="disabled"
                    layout="grid"
                    sortable
                    removable
                    editable
                    show-primary
                    :locales="locales"
                    @update:model-value="update($event)" />
            </template>
        </UploadZone>
    </div>
</template>
<script setup lang="ts">
import type { UploadImage } from '../components/sortable-image-gallery';
import { computed, ref } from 'vue';
import { AttachmentList } from '../components/attachment';
import { literal } from '../components/form/types';
import { UploadZone } from '../components/upload-zone';
const props = defineProps<{ locale: string }>();
const locales = computed(() => [
    { value: 'en', label: literal(props.locale === 'de' ? 'Englisch' : 'English') },
    { value: 'de', label: literal(props.locale === 'de' ? 'Deutsch' : 'German') },
]);
const images = ref<UploadImage[]>([
    {
        id: 'cover',
        name: 'cover.png',
        title: 'Cover',
        size: 2048,
        mimeType: 'image/png',
        url:
            'data:image/svg+xml,' +
            encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="160"><rect width="200" height="160" fill="#0284c7"/></svg>',
            ),
        translations: {
            en: { title: 'Cover', description: '' },
            de: { title: 'Titelbild', description: '' },
        },
    },
]);
</script>
