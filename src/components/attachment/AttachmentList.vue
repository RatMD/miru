<template>
    <div data-slot="attachment-list" :class="cn('min-w-0', props.class)">
        <ul
            ref="list"
            data-slot="attachment-list-items"
            :aria-label="label || trans('common.attachments.list')"
            :class="
                cn(
                    layout === 'row'
                        ? 'grid auto-cols-[minmax(14rem,18rem)] grid-flow-col gap-3 overflow-x-auto pb-2'
                        : layout === 'grid'
                          ? 'grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 lg:grid-cols-3'
                          : 'grid grid-cols-1 gap-3',
                    listClass,
                )
            ">
            <li
                v-for="(item, index) in modelValue"
                :key="item.id"
                :data-id="item.id"
                class="min-w-0"
                :class="layout === 'row' ? 'snap-start' : undefined">
                <Attachment
                    :item="item"
                    :orientation="orientation || (layout === 'list' ? 'horizontal' : 'vertical')"
                    :size="size"
                    :aspect-ratio="aspectRatio"
                    :max-width="maxWidth"
                    :max-preview-height="maxPreviewHeight"
                    :primary="showPrimary && (primaryId ? item.id === primaryId : index === 0)"
                    :primary-label="primaryLabel"
                    :show-type="showType"
                    :show-mime="showMime"
                    :show-size="showSize"
                    :show-status="showStatus"
                    :show-progress="showProgress"
                    :mime-max-length="mimeMaxLength"
                    :size-digits="sizeDigits"
                    :size-metric="sizeMetric"
                    :drag-handle="sortable && dragHandle"
                    :move-buttons="sortable && moveButtons"
                    :can-move-previous="index > 0"
                    :can-move-next="index < modelValue.length - 1"
                    :move-direction="layout === 'list' ? 'vertical' : 'horizontal'"
                    :removable="removable"
                    :editable="editable"
                    :disabled="disabled"
                    :locales="locales"
                    :base-locale="baseLocale"
                    :active-locale="activeLocale"
                    :locale="locale"
                    :name-prefix="namePrefix ? `${namePrefix}[${index}]` : undefined"
                    @update:item="updateItem"
                    @update:active-locale="$emit('update:activeLocale', $event)"
                    @remove="remove"
                    @move="move(index, $event === 'previous' ? index - 1 : index + 1)">
                    <template v-if="$slots.fields" #fields="state">
                        <slot name="fields" v-bind="state" :index="index" />
                    </template>
                    <template v-if="$slots.actions" #actions="state">
                        <slot name="actions" v-bind="state" :index="index" />
                    </template>
                    <template v-if="$slots.media" #media="state">
                        <slot name="media" v-bind="state" :index="index" />
                    </template>
                </Attachment>
            </li>
        </ul>
        <div
            v-if="!modelValue.length"
            data-slot="attachment-list-empty"
            class="py-6 text-center text-sm text-muted-foreground">
            <slot name="empty">{{ trans('common.states.empty') }}</slot>
        </div>
        <span class="sr-only" role="status" aria-live="polite">{{ announcement }}</span>
    </div>
</template>
<script setup lang="ts">
import type { FormLocaleOption } from '../form/types';
import type { AttachmentItem } from './types';
import type Sortable from 'sortablejs';
import type { HTMLAttributes } from 'vue';
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import Attachment from './Attachment.vue';
import { getAttachmentName } from './utils';
const props = withDefaults(
    defineProps<{
        modelValue: AttachmentItem[];
        layout?: 'list' | 'grid' | 'row';
        orientation?: 'horizontal' | 'vertical';
        size?: 'sm' | 'default' | 'lg';
        aspectRatio?: number;
        maxWidth?: number | string;
        maxPreviewHeight?: number | string;
        sortable?: boolean;
        dragHandle?: boolean;
        moveButtons?: boolean;
        removable?: boolean;
        editable?: boolean;
        disabled?: boolean;
        showPrimary?: boolean;
        primaryId?: string;
        primaryLabel?: string;
        showType?: boolean;
        showMime?: boolean;
        showSize?: boolean;
        showStatus?: boolean;
        showProgress?: boolean;
        mimeMaxLength?: number;
        sizeDigits?: number;
        sizeMetric?: boolean;
        locales?: FormLocaleOption[];
        baseLocale?: string;
        activeLocale?: string;
        locale?: string;
        namePrefix?: string;
        label?: string;
        class?: HTMLAttributes['class'];
        listClass?: HTMLAttributes['class'];
    }>(),
    {
        layout: 'list',
        size: 'default',
        aspectRatio: 1,
        sortable: false,
        dragHandle: true,
        moveButtons: true,
        removable: false,
        editable: false,
        disabled: false,
        showPrimary: false,
        showType: true,
        showMime: false,
        showSize: true,
        showStatus: true,
        showProgress: true,
        mimeMaxLength: 40,
        sizeDigits: 1,
        sizeMetric: false,
        locales: () => [],
    },
);
const emit = defineEmits<{
    'update:modelValue': [items: AttachmentItem[]];
    reorder: [ids: string[]];
    remove: [id: string];
    'update:item': [item: AttachmentItem];
    'update:activeLocale': [locale: string];
}>();
const { trans } = useI18n(() => props.locale);
const list = ref<HTMLElement | null>(null);
const announcement = ref('');
let instance: Sortable | undefined;
let disposed = false;
function move(from: number, to: number) {
    if (
        props.disabled ||
        !props.sortable ||
        to < 0 ||
        to >= props.modelValue.length ||
        from === to ||
        props.modelValue[from]?.disabled ||
        props.modelValue[to]?.disabled
    )
        return;
    const items = [...props.modelValue];
    const item = items.splice(from, 1)[0]!;
    items.splice(to, 0, item);
    emit('update:modelValue', items);
    emit(
        'reorder',
        items.map((item) => item.id),
    );
    announcement.value = trans('common.attachments.moved', {
        name: getAttachmentName(item),
        position: to + 1,
    });
}
function remove(id: string) {
    if (
        props.disabled ||
        !props.removable ||
        props.modelValue.find((item) => item.id === id)?.disabled
    )
        return;
    emit(
        'update:modelValue',
        props.modelValue.filter((item) => item.id !== id),
    );
    emit('remove', id);
}
function updateItem(item: AttachmentItem) {
    if (props.disabled || props.modelValue.find((value) => value.id === item.id)?.disabled) return;
    emit(
        'update:modelValue',
        props.modelValue.map((value) => (value.id === item.id ? item : value)),
    );
    emit('update:item', item);
}
onMounted(async () => {
    const { default: Sortable } = await import('sortablejs');
    if (disposed || !list.value) return;
    instance = Sortable.create(list.value, {
        handle: '[data-slot="attachment-drag-handle"]',
        animation: 150,
        ghostClass: 'opacity-30',
        disabled: props.disabled || !props.sortable || !props.dragHandle,
        onMove(event) {
            return (
                !event.dragged.querySelector('[data-slot="attachment-drag-handle"]:disabled') &&
                !event.related.querySelector('[data-slot="attachment-drag-handle"]:disabled')
            );
        },
        onEnd(event) {
            if (event.oldIndex === undefined || event.newIndex === undefined) return;
            const siblings = Array.from(event.to.children).filter((child) => child !== event.item);
            event.to.insertBefore(event.item, siblings[event.oldIndex] ?? null);
            move(event.oldIndex, event.newIndex);
        },
    });
});
watch(
    () => props.disabled || !props.sortable || !props.dragHandle,
    (value) => instance?.option('disabled', value),
);
onBeforeUnmount(() => {
    disposed = true;
    instance?.destroy();
});
</script>
