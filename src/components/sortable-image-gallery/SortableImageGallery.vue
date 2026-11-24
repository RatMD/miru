<template>
    <div data-slot="sortable-image-gallery">
        <AttachmentList
            :model-value="attachments"
            layout="grid"
            list-class="grid-cols-2 sm:grid-cols-3"
            :sortable="sortable"
            :drag-handle="dragHandle"
            :move-buttons="moveButtons"
            :removable="removable"
            :editable="editable"
            :disabled="disabled"
            :show-primary="showPrimary"
            :primary-label="trans('common.gallery.primary')"
            :show-type="showType"
            :show-mime="showMime"
            :show-size="showSize"
            :locales="locales"
            :base-locale="baseLocale"
            :label="trans('common.gallery.order')"
            @update:model-value="update"
            @reorder="$emit('reorder', $event)"
            @remove="$emit('remove', $event)">
            <template v-if="$slots.fields" #fields="state">
                <slot name="fields" v-bind="state" />
            </template>
            <template v-if="$slots.actions" #actions="state">
                <slot name="actions" v-bind="state" />
            </template>
        </AttachmentList>
    </div>
</template>
<script setup lang="ts">
import type { AttachmentItem } from '../attachment';
import type { FormLocaleOption } from '../form/types';
import type { UploadImage } from './types';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { AttachmentList, getAttachmentName } from '../attachment';
const props = withDefaults(
    defineProps<{
        modelValue: UploadImage[];
        disabled?: boolean;
        sortable?: boolean;
        showPrimary?: boolean;
        dragHandle?: boolean;
        moveButtons?: boolean;
        removable?: boolean;
        editable?: boolean;
        showType?: boolean;
        showMime?: boolean;
        showSize?: boolean;
        locales?: FormLocaleOption[];
        baseLocale?: string;
    }>(),
    {
        sortable: true,
        showPrimary: true,
        dragHandle: true,
        moveButtons: true,
        removable: true,
        editable: false,
        showType: false,
        showMime: false,
        showSize: true,
        locales: () => [],
    },
);
const emit = defineEmits<{
    'update:modelValue': [images: UploadImage[]];
    reorder: [ids: string[]];
    remove: [id: string];
}>();
const { trans } = useI18n();
const attachments = computed<AttachmentItem[]>(() =>
    props.modelValue.map((image) => ({ ...image, kind: 'image' })),
);
function update(items: AttachmentItem[]) {
    emit(
        'update:modelValue',
        items.map((item) => ({
            ...item,
            kind: 'image',
            url: item.url ?? null,
            title: item.title ?? getAttachmentName(item),
        })),
    );
}
</script>
