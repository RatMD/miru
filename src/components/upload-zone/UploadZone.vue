<template>
    <div class="space-y-2">
        <label
            :for="inputId"
            data-slot="upload-zone"
            class="group relative grid min-h-52 place-items-center rounded-lg border-2 border-dashed p-6 text-center transition-colors duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/40 sm:p-8"
            :class="[
                unavailable
                    ? 'cursor-not-allowed opacity-60'
                    : 'cursor-pointer hover:border-primary/60 hover:bg-primary/5',
                effectiveStatus === 'error'
                    ? 'border-danger/60 bg-danger/5'
                    : effectiveStatus === 'success'
                      ? 'border-success-500 bg-success-50 text-success-800 dark:bg-success-950/30 dark:text-success-300'
                      : dragging
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-background',
            ]"
            :aria-busy="busy || validating"
            @dragenter.prevent="enter"
            @dragover.prevent="over"
            @dragleave.prevent="leave"
            @drop.prevent="drop">
            <input
                :id="inputId"
                class="sr-only"
                type="file"
                :accept="effectiveAccept || undefined"
                :multiple="multiple || gallery"
                :disabled="unavailable"
                :aria-label="title"
                :aria-describedby="`${inputId}-limits`"
                @change="choose" />
            <div class="space-y-4">
                <component
                    :is="icon"
                    class="mx-auto size-11 transition-transform duration-200 motion-reduce:transition-none"
                    :class="{
                        'animate-spin': busy || validating,
                        'scale-110': dragging && !unavailable,
                        'text-danger': effectiveStatus === 'error',
                        'text-primary': dragging || busy,
                    }"
                    aria-hidden="true" />
                <div class="space-y-1" role="status" aria-live="polite">
                    <p class="font-medium">{{ title }}</p>
                    <p v-if="description" class="text-sm text-muted-foreground">
                        {{ description }}
                    </p>
                    <slot />
                </div>
                <div
                    :id="`${inputId}-limits`"
                    class="flex flex-wrap justify-center gap-2 text-muted-foreground">
                    <Badge variant="outline" class="gap-1.5 bg-background/80">
                        <IconDatabase aria-hidden="true" />
                        {{ trans('common.upload.max_size', { size: maxSizeMiB }) }}
                    </Badge>
                    <Badge variant="outline" class="gap-1.5 bg-background/80">
                        <IconFile aria-hidden="true" />
                        {{ displayedFormats || trans('common.upload.all_formats') }}
                    </Badge>
                    <Badge v-if="minDimensions" variant="outline" class="gap-1.5 bg-background/80">
                        <IconMinimize aria-hidden="true" />
                        {{ trans('common.upload.min_dimensions', { ...minDimensions }) }}
                    </Badge>
                    <Badge v-if="maxDimensions" variant="outline" class="gap-1.5 bg-background/80">
                        <IconMaximize aria-hidden="true" />
                        {{ trans('common.upload.max_dimensions', { ...maxDimensions }) }}
                    </Badge>
                </div>
            </div>
        </label>
        <p v-if="problem || error" role="alert" class="text-sm text-danger">
            {{ problem || error }}
        </p>
        <slot
            v-if="gallery"
            name="attachments"
            :items="images"
            :update="updateImages"
            :disabled="disabled || busy || validating">
            <SortableImageGallery
                :model-value="images"
                :disabled="disabled || busy || validating"
                :sortable="sortable"
                :show-primary="showPrimary"
                @update:model-value="updateImages"
                @reorder="$emit('reorder', $event)"
                @remove="$emit('remove', $event)" />
        </slot>
    </div>
</template>

<script setup lang="ts">
import type { AttachmentItem } from '../attachment';
import type { UploadImage } from '../sortable-image-gallery';
import type { ImageDimensions, UploadProblem } from './validation';
import {
    IconAlertCircle,
    IconArrowDown,
    IconCircleCheck,
    IconCloudUpload,
    IconDatabase,
    IconFile,
    IconLoader2,
    IconMaximize,
    IconMinimize,
} from '@tabler/icons-vue';
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { getAttachmentName } from '../attachment';
import { Badge } from '../badge';
import { SortableImageGallery } from '../sortable-image-gallery';
import { createUploadFeedback } from './feedback';
import { fitsImageDimensions, validateUploadFiles } from './validation';
const props = withDefaults(
    defineProps<{
        title: string;
        /** Await processing before creating previews/emitting files; output is validated again. */
        transformFiles?: (files: File[]) => File[] | Promise<File[]>;
        gallery?: boolean;
        modelValue?: UploadImage[];
        sortable?: boolean;
        showPrimary?: boolean;
        maxFiles?: number;
        description?: string;
        accept?: string;
        formats?: string;
        maxSizeMiB?: number;
        multiple?: boolean;
        disabled?: boolean;
        busy?: boolean;
        status?: 'idle' | 'success' | 'error';
        error?: string;
        minDimensions?: ImageDimensions;
        maxDimensions?: ImageDimensions;
    }>(),
    {
        gallery: false,
        sortable: true,
        showPrimary: true,
        maxFiles: 20,
        accept: '',
        maxSizeMiB: 20,
        multiple: false,
        disabled: false,
        busy: false,
        status: 'idle',
    },
);
const emit = defineEmits<{
    files: [files: File[]];
    'processing-error': [error: unknown];
    'update:modelValue': [images: UploadImage[]];
    reorder: [ids: string[]];
    remove: [id: string];
}>();
const localImages = ref<UploadImage[]>([]);
const images = computed(() => props.modelValue ?? localImages.value);
const ownedUrls = new Map<string, string>();
let disposed = false;
const effectiveAccept = computed(() => props.accept || (props.gallery ? 'image/*' : ''));
function updateImages(value: AttachmentItem[]) {
    const next: UploadImage[] = value.map((item) => ({
        ...item,
        kind: 'image',
        url: item.url ?? null,
        title: item.title ?? getAttachmentName(item),
    }));
    localImages.value = next;
    emit('update:modelValue', next);
}
watch(
    images,
    (value) => {
        const ids = new Set(value.map((image) => image.id));
        for (const [id, url] of ownedUrls) {
            if (!ids.has(id)) {
                URL.revokeObjectURL(url);
                ownedUrls.delete(id);
            }
        }
    },
    { flush: 'post' },
);
onBeforeUnmount(() => {
    disposed = true;
    for (const url of ownedUrls.values()) URL.revokeObjectURL(url);
    ownedUrls.clear();
});
const inputId = `upload-${useId()}`;
const dragging = ref(false);
const validating = ref(false);
const problem = ref('');
const displayedFormats = computed(
    () =>
        props.formats ||
        effectiveAccept.value
            .split(',')
            .map((format) => format.trim())
            .filter(Boolean)
            .join(', '),
);
let dragDepth = 0;
// A processing indicator may stay active while the caller permits additional files.
const unavailable = computed(
    () => props.disabled || validating.value || (props.gallery && props.busy),
);
const feedback = createUploadFeedback();
const effectiveStatus = computed(() =>
    props.busy || validating.value
        ? 'idle'
        : problem.value || props.error || props.status === 'error'
          ? 'error'
          : feedback.state.value,
);
watch(
    () => props.status,
    (status) => {
        if (status === 'success') feedback.success();
        if (status === 'error') feedback.error();
        if (status === 'idle' && feedback.state.value === 'error') feedback.reset();
    },
);
watch(
    () => props.error,
    (error) => {
        if (error) feedback.error();
        else if (feedback.state.value === 'error') feedback.reset();
    },
);
watch(
    () => props.busy,
    (busy, previous) => {
        if (busy) feedback.reset();
        else if (previous) {
            if (problem.value || props.error || props.status === 'error') feedback.error();
            else feedback.success();
        }
    },
);
onBeforeUnmount(feedback.reset);
const icon = computed(() =>
    props.busy || validating.value
        ? IconLoader2
        : effectiveStatus.value === 'error'
          ? IconAlertCircle
          : dragging.value
            ? IconArrowDown
            : effectiveStatus.value === 'success'
              ? IconCircleCheck
              : IconCloudUpload,
);
watch(unavailable, (disabled) => {
    if (disabled) resetDrag();
});
function resetDrag(): void {
    dragDepth = 0;
    dragging.value = false;
}
function enter(event: DragEvent): void {
    if (!unavailable.value && event.dataTransfer?.types.includes('Files')) {
        dragDepth++;
        dragging.value = true;
    }
}
function over(event: DragEvent): void {
    if (event.dataTransfer) event.dataTransfer.dropEffect = unavailable.value ? 'none' : 'copy';
}
function leave(): void {
    if (--dragDepth <= 0) resetDrag();
}
function choose(event: Event): void {
    const input = event.target as HTMLInputElement;
    void select([...(input.files ?? [])]);
    input.value = '';
}
function drop(event: DragEvent): void {
    resetDrag();
    if (event.dataTransfer?.files) void select([...event.dataTransfer.files]);
}
function validationMessage(code: UploadProblem): string {
    return trans(`common.upload.errors.${code}`, {
        size: String(props.maxSizeMiB),
        formats: props.formats || effectiveAccept.value,
    });
}
async function select(files: File[]): Promise<void> {
    if (unavailable.value || !files.length) return;
    problem.value = '';
    feedback.reset();
    validating.value = true;
    await nextTick();
    try {
        if (props.transformFiles) {
            files = await props.transformFiles([...files]);
            if (!Array.isArray(files) || files.some((file) => !(file instanceof File)))
                throw new TypeError('transformFiles must return File[].');
            if (!files.length || disposed) return;
        }
        const invalid = validateUploadFiles(
            files,
            effectiveAccept.value,
            props.maxSizeMiB,
            props.multiple || props.gallery,
        );
        if (invalid) {
            problem.value = validationMessage(invalid);
            return;
        }
        if (props.gallery && images.value.length + files.length > props.maxFiles) {
            problem.value = trans('common.gallery.limit', { count: props.maxFiles });
            return;
        }
        if (props.gallery && files.some((file) => !file.type.startsWith('image/'))) {
            problem.value = trans('common.upload.errors.image');
            return;
        }
        if (props.gallery || props.minDimensions || props.maxDimensions) {
            try {
                for (const file of files) {
                    const image = await createImageBitmap(file);
                    const { width, height } = image;
                    image.close();
                    if (
                        !fitsImageDimensions(
                            { width, height },
                            props.minDimensions,
                            props.maxDimensions,
                        )
                    ) {
                        problem.value = trans('common.upload.errors.dimensions');
                        return;
                    }
                }
            } catch {
                problem.value = trans('common.upload.errors.image');
                return;
            }
        }
        if (!disposed && !props.disabled && (!props.gallery || !props.busy)) {
            if (props.gallery) {
                const additions = files.map((file) => {
                    const id = crypto.randomUUID();
                    const url = URL.createObjectURL(file);
                    ownedUrls.set(id, url);
                    return { id, url, title: file.name, file };
                });
                updateImages([...images.value, ...additions]);
            }
            emit('files', files);
            await nextTick();
            if (props.error || props.status === 'error') feedback.error();
            else if (!props.busy) feedback.success();
        }
    } catch (error) {
        if (!disposed) {
            problem.value = trans('common.schedule.processing_failed');
            feedback.error();
            emit('processing-error', error);
        }
    } finally {
        validating.value = false;
    }
}

const { trans } = useI18n();
</script>
