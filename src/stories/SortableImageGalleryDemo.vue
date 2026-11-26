<template>
    <div class="grid w-full max-w-3xl gap-4">
        <SortableImageGallery v-bind="args" v-model="images" />
        <output class="text-xs text-muted-foreground" aria-label="Image order">
            {{ images.map((image) => image.id).join(', ') }}
        </output>
    </div>
</template>
<script setup lang="ts">
import type { UploadImage } from '../components/sortable-image-gallery';
import { ref } from 'vue';
import { SortableImageGallery } from '../components/sortable-image-gallery';
defineProps<{ args: Record<string, unknown> }>();
const images = ref<UploadImage[]>([
    {
        id: 'cover',
        title: 'Studio cover',
        name: 'studio-cover.jpg',
        url: null,
        mimeType: 'image/jpeg',
    },
    {
        id: 'detail',
        title: 'A little detail',
        name: 'detail.jpg',
        url: null,
        mimeType: 'image/jpeg',
    },
    {
        id: 'workspace',
        title: 'Workspace',
        name: 'workspace.jpg',
        url: null,
        mimeType: 'image/jpeg',
    },
]);
</script>
