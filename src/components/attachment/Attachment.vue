<template>
    <article
        data-slot="attachment"
        :data-kind="kind"
        :data-status="status"
        :data-orientation="orientation"
        :style="{
            maxWidth: maxWidth
                ? cssLength(maxWidth)
                : orientation === 'vertical'
                  ? 'var(--ui-attachment-max-width,20rem)'
                  : undefined,
        }"
        :aria-label="filename"
        :aria-busy="busy || undefined"
        :class="
            cn(
                'relative min-w-0 w-full rounded-lg border border-border bg-background text-foreground ',
                size === 'sm' ? 'p-2' : 'p-3',
                progressVisible && 'pb-8',
                isDisabled && 'opacity-60',
                props.class,
            )
        ">
        <div class="flex gap-3" :class="orientation === 'vertical' ? 'flex-col' : 'items-start'">
            <div
                data-slot="attachment-thumbnail"
                class="relative shrink-0"
                :class="
                    orientation === 'vertical'
                        ? 'w-full'
                        : size === 'sm'
                          ? 'size-10'
                          : size === 'lg'
                            ? 'size-20'
                            : 'size-16'
                "
                :style="
                    orientation === 'vertical'
                        ? {
                              aspectRatio: String(aspectRatio > 0 ? aspectRatio : 1),
                              maxHeight: cssLength(maxPreviewHeight),
                          }
                        : undefined
                ">
                <div
                    data-slot="attachment-media"
                    class="absolute inset-0 overflow-hidden rounded-md"
                    :class="
                        previewUrl && !imageFailed
                            ? 'bg-muted'
                            : 'bg-neutral-200 dark:bg-neutral-800'
                    ">
                    <slot name="media" :item="item" :kind="kind" :url="previewUrl">
                        <img
                            v-if="previewUrl && !imageFailed"
                            :src="previewUrl"
                            :alt="displayTitle || filename"
                            class="size-full object-cover"
                            draggable="false"
                            @error="imageFailed = true" />
                        <div
                            v-else
                            class="grid size-full min-h-10 place-items-center text-muted-foreground"
                            :class="busy && showStatus ? 'opacity-0' : undefined">
                            <component
                                :is="mediaIcon"
                                :class="size === 'sm' ? 'size-5' : 'size-8'"
                                aria-hidden="true" />
                        </div>
                    </slot>
                </div>
                <div
                    v-if="showStatus && busy"
                    data-slot="attachment-loading"
                    class="pointer-events-none absolute inset-0 grid place-items-center rounded-md"
                    :class="previewUrl && !imageFailed ? 'bg-background/50' : 'bg-primary/10'">
                    <IconLoader2
                        data-slot="attachment-status-icon"
                        aria-hidden="true"
                        class="size-6 animate-spin text-primary motion-reduce:animate-none" />
                </div>
                <span
                    v-else-if="showStatus && (status === 'success' || status === 'error')"
                    data-slot="attachment-status-badge"
                    aria-hidden="true"
                    class="absolute -top-1 -right-1 z-10 grid size-5 place-items-center rounded-full ring-2 ring-background"
                    :class="
                        status === 'error'
                            ? 'bg-danger text-danger-foreground'
                            : 'bg-success text-success-foreground'
                    ">
                    <component
                        :is="statusIcon"
                        data-slot="attachment-status-icon"
                        class="size-3.5 stroke-[3]" />
                </span>
                <Badge
                    v-if="primary"
                    data-slot="attachment-primary"
                    variant="default"
                    class="pointer-events-none absolute top-1 left-1 max-w-[calc(100%-0.5rem)] truncate text-[10px]">
                    {{ primaryLabel || trans('common.attachments.primary') }}
                </Badge>
            </div>
            <div data-slot="attachment-content" class="min-w-0 flex-1 space-y-2">
                <div class="flex min-w-0 items-start gap-2">
                    <p
                        data-slot="attachment-title"
                        class="min-w-0 flex-1 truncate text-sm font-semibold"
                        :title="displayTitle || filename">
                        {{ displayTitle || filename }}
                    </p>
                </div>
                <p
                    v-if="displayTitle && displayTitle !== filename"
                    data-slot="attachment-filename"
                    class="truncate text-xs text-muted-foreground"
                    :title="filename">
                    {{ filename }}
                </p>
                <p
                    v-if="displayDescription"
                    data-slot="attachment-description"
                    class="break-words text-xs leading-5 text-muted-foreground">
                    {{ displayDescription }}
                </p>
                <div
                    v-if="showType || (showMime && mimeType) || (showSize && bytes !== undefined)"
                    data-slot="attachment-metadata"
                    class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                    <Badge
                        v-if="showType"
                        data-slot="attachment-kind"
                        variant="outline"
                        class="border-border text-[10px]">
                        {{ trans('common.attachments.kinds.' + kind) }}
                    </Badge>
                    <TooltipProvider
                        v-if="showMime && mimeType && shortMime !== mimeType"
                        :delay-duration="100">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Badge
                                    data-slot="attachment-mime"
                                    variant="outline"
                                    tabindex="0"
                                    :aria-label="mimeType"
                                    class="max-w-full truncate border-border text-[10px]">
                                    {{ shortMime }}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent
                                side="top"
                                class="max-w-[min(24rem,calc(100vw-2rem))] break-all">
                                {{ mimeType }}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Badge
                        v-else-if="showMime && mimeType"
                        data-slot="attachment-mime"
                        variant="outline"
                        class="max-w-full truncate border-border text-[10px]">
                        {{ mimeType }}
                    </Badge>
                    <Badge
                        v-if="showSize && bytes !== undefined"
                        variant="outline"
                        class="border-border text-[10px]">
                        <span
                            v-if="sizeMetric"
                            data-slot="attachment-size"
                            v-file-size:[sizePrecision].metric="bytes">
                            {{ sizeText }}
                        </span>
                        <span
                            v-else
                            data-slot="attachment-size"
                            v-file-size:[sizePrecision]="bytes">
                            {{ sizeText }}
                        </span>
                    </Badge>
                </div>
                <div
                    v-if="
                        showStatus && status !== 'idle' && (status !== 'error' || !hasDetailedError)
                    "
                    data-slot="attachment-status"
                    class="space-y-1.5"
                    role="status"
                    aria-live="polite">
                    <p
                        class="text-xs"
                        :class="
                            status === 'error'
                                ? 'text-danger'
                                : status === 'success'
                                  ? 'text-success'
                                  : 'text-muted-foreground'
                        ">
                        {{ trans('common.attachments.status.' + status) }}
                        <span v-if="busy && normalizedProgress !== undefined && !showProgress">
                            · {{ percentText }}
                        </span>
                    </p>
                </div>
                <FieldError v-if="status === 'error' && hasDetailedError" :errors="[item.error]" />
            </div>
            <div
                v-if="dragHandle || moveButtons || removable || $slots.actions"
                data-slot="attachment-actions"
                class="flex shrink-0 flex-wrap items-center gap-2"
                :class="orientation === 'vertical' ? 'justify-between' : 'justify-end'">
                <ButtonAction
                    v-if="dragHandle"
                    data-slot="attachment-drag-handle"
                    type="button"
                    variant="outline"
                    borderless="effect"
                    muted
                    icon-only
                    size="default"
                    class="touch-none cursor-grab active:cursor-grabbing"
                    :disabled="isDisabled"
                    :aria-label="trans('common.attachments.move', { name: filename })"
                    :title="trans('common.attachments.move_hint')"
                    @keydown.left.prevent="$emit('move', 'previous')"
                    @keydown.up.prevent="$emit('move', 'previous')"
                    @keydown.right.prevent="$emit('move', 'next')"
                    @keydown.down.prevent="$emit('move', 'next')">
                    <IconGripVertical />
                </ButtonAction>
                <div v-if="moveButtons" class="flex gap-2">
                    <ButtonAction
                        data-slot="attachment-move-previous"
                        type="button"
                        variant="outline"
                        borderless="effect"
                        muted
                        icon-only
                        size="default"
                        :disabled="isDisabled || !canMovePrevious"
                        :aria-label="trans('common.attachments.previous', { name: filename })"
                        @click="$emit('move', 'previous')">
                        <IconChevronUp v-if="moveDirection === 'vertical'" />
                        <IconChevronLeft v-else />
                    </ButtonAction>
                    <ButtonAction
                        data-slot="attachment-move-next"
                        type="button"
                        variant="outline"
                        borderless="effect"
                        muted
                        icon-only
                        size="default"
                        :disabled="isDisabled || !canMoveNext"
                        :aria-label="trans('common.attachments.next', { name: filename })"
                        @click="$emit('move', 'next')">
                        <IconChevronDown v-if="moveDirection === 'vertical'" />
                        <IconChevronRight v-else />
                    </ButtonAction>
                </div>
                <slot name="actions" :item="item" :disabled="isDisabled" />
                <ButtonAction
                    v-if="removable"
                    data-slot="attachment-remove"
                    type="button"
                    variant="danger"
                    borderless="effect"
                    icon-only
                    size="default"
                    muted
                    :disabled="isDisabled"
                    :aria-label="trans('common.attachments.remove', { name: filename })"
                    @click="remove">
                    <IconTrash />
                </ButtonAction>
            </div>
        </div>
        <div
            v-if="editable || $slots.fields"
            data-slot="attachment-fields"
            class="mt-3 space-y-3 border-t pt-3">
            <FormLocaleSwitcher
                v-if="locales.length > 1"
                :model-value="editingLocale"
                :locales="locales"
                :base-locale="baseLocale || locales[0]?.value || locale"
                @update:model-value="selectLocale" />
            <slot
                name="fields"
                :item="item"
                :locale="editingLocale"
                :update="updateMetadata"
                :disabled="isDisabled">
                <Field>
                    <FieldLabel :for="titleId">
                        {{ trans('common.attachments.title') }}
                        <Badge v-if="locales.length" variant="ghostly" class="ml-1 text-[10px]">
                            {{ editingLocale.toUpperCase() }}
                        </Badge>
                    </FieldLabel>
                    <Input
                        :id="titleId"
                        :name="fieldName('title')"
                        :model-value="editableTitle"
                        :disabled="isDisabled"
                        @update:model-value="updateMetadata({ title: String($event) })" />
                </Field>
                <Field>
                    <FieldLabel :for="descriptionId">
                        {{ trans('common.attachments.description') }}
                    </FieldLabel>
                    <Textarea
                        :id="descriptionId"
                        :name="fieldName('description')"
                        :model-value="editableDescription"
                        :rows="2"
                        :disabled="isDisabled"
                        @update:model-value="updateMetadata({ description: String($event) })" />
                </Field>
            </slot>
        </div>
        <div
            v-if="progressVisible"
            data-slot="attachment-progress"
            class="pointer-events-none absolute -inset-x-px -bottom-px h-1">
            <Progress
                data-slot="attachment-progress-track"
                :model-value="normalizedProgress"
                :aria-label="trans('common.attachments.progress', { name: filename })"
                class="h-1 rounded-t-none rounded-b-lg" />
            <span
                data-slot="attachment-progress-label"
                aria-hidden="true"
                class="absolute bottom-full mb-1 -translate-x-1/2 transition-[left] duration-300 ease-out motion-reduce:transition-none whitespace-nowrap rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px] leading-none tabular-nums text-foreground shadow-xs"
                :style="{
                    left: `clamp(2rem, ${normalizedProgress}%, calc(100% - 2rem))`,
                }">
                {{ percentText }}
            </span>
        </div>
    </article>
</template>
<script setup lang="ts">
import type { FormLocaleOption } from '../form/types';
import type { AttachmentItem, AttachmentMetadata } from './types';
import type { HTMLAttributes } from 'vue';
import {
    IconFile,
    IconFileText,
    IconFileZip,
    IconCode,
    IconPhoto,
    IconVideo,
    IconMusic,
    IconPhotoOff,
    IconCheck,
    IconX,
    IconLoader2,
    IconGripVertical,
    IconChevronLeft,
    IconChevronRight,
    IconChevronUp,
    IconChevronDown,
    IconTrash,
} from '@tabler/icons-vue';
import { computed, ref, useId, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { directiveFilesize as vFileSize } from '../../plugins/filesize';
import { cn } from '../../support/classNames';
import { filesize } from '../../support/filesize';
import { Badge } from '../badge';
import { ButtonAction } from '../button-action';
import { Field, FieldLabel, FieldError } from '../field';
import FormLocaleSwitcher from '../form/FormLocaleSwitcher.vue';
import { Input } from '../input';
import { Progress } from '../progress';
import { Textarea } from '../textarea';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';
import { getAttachmentKind, getAttachmentName } from './utils';
const props = withDefaults(
    defineProps<{
        item: AttachmentItem;
        orientation?: 'horizontal' | 'vertical';
        size?: 'sm' | 'default' | 'lg';
        aspectRatio?: number;
        maxWidth?: number | string;
        maxPreviewHeight?: number | string;
        primary?: boolean;
        primaryLabel?: string;
        showType?: boolean;
        showMime?: boolean;
        mimeMaxLength?: number;
        showSize?: boolean;
        sizeDigits?: number;
        sizeMetric?: boolean;
        showStatus?: boolean;
        showProgress?: boolean;
        dragHandle?: boolean;
        moveButtons?: boolean;
        canMovePrevious?: boolean;
        canMoveNext?: boolean;
        moveDirection?: 'horizontal' | 'vertical';
        removable?: boolean;
        editable?: boolean;
        disabled?: boolean;
        locales?: FormLocaleOption[];
        baseLocale?: string;
        activeLocale?: string;
        locale?: string;
        namePrefix?: string;
        class?: HTMLAttributes['class'];
    }>(),
    {
        orientation: 'horizontal',
        size: 'default',
        aspectRatio: 1,
        maxPreviewHeight: 240,
        primary: false,
        showType: true,
        showMime: false,
        mimeMaxLength: 40,
        showSize: true,
        sizeDigits: 1,
        sizeMetric: false,
        showStatus: true,
        showProgress: true,
        dragHandle: false,
        moveButtons: false,
        canMovePrevious: true,
        canMoveNext: true,
        moveDirection: 'horizontal',
        removable: false,
        editable: false,
        disabled: false,
        locales: () => [],
    },
);
const emit = defineEmits<{
    'update:item': [item: AttachmentItem];
    'update:activeLocale': [locale: string];
    remove: [id: string];
    move: [direction: 'previous' | 'next'];
}>();
const { trans, locale } = useI18n(() => props.locale);
function cssLength(value: number | string): string {
    return typeof value === 'number' ? `${Math.max(0, value)}px` : value;
}
const generatedId = useId();
const titleId = `attachment-title-${generatedId}`,
    descriptionId = `attachment-description-${generatedId}`;
const filename = computed(
    () => getAttachmentName(props.item) || trans('common.attachments.unnamed'),
);
const kind = computed(() => getAttachmentKind(props.item));
const status = computed(() => props.item.status ?? 'idle');
const hasDetailedError = computed(
    () => typeof props.item.error === 'string' && props.item.error.trim().length > 0,
);
const busy = computed(() => status.value === 'uploading' || status.value === 'processing');
const isDisabled = computed(() => props.disabled || !!props.item.disabled);
const internalLocale = ref(
    props.activeLocale ||
        props.baseLocale ||
        props.locales.find(
            (value) => value.value === locale.value || value.value === locale.value.split('-')[0],
        )?.value ||
        props.locales[0]?.value ||
        locale.value,
);
const editingLocale = computed(() => props.activeLocale || internalLocale.value);
watch(
    () => props.locales,
    (locales) => {
        if (locales.length && !locales.some((value) => value.value === editingLocale.value))
            selectLocale(props.baseLocale || locales[0]!.value);
    },
);
function selectLocale(value: string) {
    internalLocale.value = value;
    emit('update:activeLocale', value);
}
const metadata = computed(() =>
    props.locales.length ? props.item.translations?.[editingLocale.value] : undefined,
);
const editableTitle = computed(() =>
    props.locales.length ? (metadata.value?.title ?? '') : (props.item.title ?? ''),
);
const editableDescription = computed(() =>
    props.locales.length ? (metadata.value?.description ?? '') : (props.item.description ?? ''),
);
const displayTitle = computed(
    () =>
        metadata.value?.title ||
        props.item.translations?.[locale.value]?.title ||
        props.item.translations?.[locale.value.split('-')[0]!]?.title ||
        props.item.title ||
        '',
);
const displayDescription = computed(
    () =>
        metadata.value?.description ||
        props.item.translations?.[locale.value]?.description ||
        props.item.translations?.[locale.value.split('-')[0]!]?.description ||
        props.item.description ||
        '',
);
function updateMetadata(patch: Partial<AttachmentMetadata>) {
    if (isDisabled.value) return;
    const item = props.locales.length
        ? {
              ...props.item,
              translations: {
                  ...props.item.translations,
                  [editingLocale.value]: {
                      ...props.item.translations?.[editingLocale.value],
                      ...patch,
                  },
              },
          }
        : { ...props.item, ...patch };
    emit('update:item', item);
}
function fieldName(field: keyof AttachmentMetadata): string | undefined {
    return props.namePrefix
        ? `${props.namePrefix}.${props.locales.length ? `translations.${editingLocale.value}.` : ''}${field}`
        : undefined;
}
const mimeType = computed(() => props.item.mimeType || props.item.file?.type || '');
const shortMime = computed(() => {
    const max = Math.max(8, Math.floor(props.mimeMaxLength));
    return mimeType.value.length > max ? mimeType.value.slice(0, max - 1) + '…' : mimeType.value;
});
const bytes = computed(() => {
    const size = props.item.size ?? props.item.file?.size;
    return typeof size === 'number' && Number.isFinite(size) && size >= 0 ? size : undefined;
});
const sizePrecision = computed(() =>
    String(
        Number.isFinite(props.sizeDigits)
            ? Math.max(0, Math.min(20, Math.floor(props.sizeDigits)))
            : 1,
    ),
);
const sizeText = computed(() =>
    bytes.value === undefined
        ? ''
        : filesize(bytes.value, props.sizeMetric, Number(sizePrecision.value)),
);
const normalizedProgress = computed(() =>
    typeof props.item.progress === 'number' && Number.isFinite(props.item.progress)
        ? Math.max(0, Math.min(100, props.item.progress))
        : undefined,
);
const progressVisible = computed(
    () =>
        props.showStatus &&
        props.showProgress &&
        busy.value &&
        normalizedProgress.value !== undefined,
);
const percentText = computed(() =>
    new Intl.NumberFormat(locale.value, {
        style: 'percent',
        maximumFractionDigits: 0,
    }).format((normalizedProgress.value ?? 0) / 100),
);
const previewUrl = computed(
    () => props.item.thumbnailUrl || (kind.value === 'image' ? props.item.url : null),
);
const imageFailed = ref(false);
watch(previewUrl, () => (imageFailed.value = false));
const mediaIcon = computed(() =>
    imageFailed.value
        ? IconPhotoOff
        : {
              image: IconPhoto,
              video: IconVideo,
              audio: IconMusic,
              document: IconFileText,
              archive: IconFileZip,
              code: IconCode,
              file: IconFile,
          }[kind.value],
);
const statusIcon = computed(() =>
    status.value === 'success' ? IconCheck : status.value === 'error' ? IconX : IconLoader2,
);
function remove() {
    if (!isDisabled.value) emit('remove', props.item.id);
}
</script>
