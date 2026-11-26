<template>
    <TooltipProvider :delay-duration="200">
        <EditableRoot
            ref="root"
            as="span"
            v-model="displayValue"
            v-slot="{ isEditing }"
            data-slot="editable"
            :disabled="disabled || busy"
            :readonly="readonly"
            :activation-mode="disabled || readonly || busy ? 'none' : activationMode"
            submit-mode="enter"
            :start-with-edit-mode="startWithEditMode"
            :select-on-focus="selectOnFocus"
            :placeholder="placeholder ?? ''"
            :max-length="maxLength"
            :id="id"
            :dir="dir"
            :class="
                cn(
                    'miru-inline-edit inline-grid w-fit max-w-full min-w-0 justify-self-start gap-1 align-baseline',
                    props.class,
                )
            "
            :aria-busy="busy || undefined"
            @submit="submit"
            @update:state="stateChanged">
            <span class="flex max-w-full min-w-0 items-center gap-1">
                <EditableArea
                    as="span"
                    data-slot="editable-area"
                    class="miru-inline-edit-area relative min-w-0 shrink"
                    :data-editing="isEditing"
                    :data-multiline="multiline"
                    :style="areaStyle">
                    <span
                        data-slot="editable-measure"
                        aria-hidden="true"
                        class="miru-inline-edit-measure">
                        {{ measuredText }}
                    </span>
                    <EditablePreview
                        v-show="!isEditing"
                        :tabindex="
                            disabled || readonly || busy || activationMode === 'none' ? -1 : 0
                        "
                        data-slot="editable-preview"
                        class="miru-inline-edit-preview"
                        :class="!displayValue && 'text-muted-foreground'" />
                    <EditableInput
                        v-show="isEditing"
                        data-slot="editable-input"
                        :id="id"
                        :as="multiline ? 'textarea' : 'input'"
                        :rows="multiline ? rows : undefined"
                        :aria-label="ariaLabel || trans('common.editable.value')"
                        :aria-invalid="!!message"
                        class="miru-inline-edit-control"
                        :style="{ overflow: autoResize ? 'hidden' : 'auto' }"
                        @input="
                            draft = ($event.target as HTMLInputElement | HTMLTextAreaElement).value
                        " />
                </EditableArea>
                <span
                    v-if="!readonly"
                    class="flex shrink-0 items-center gap-0.5"
                    data-slot="editable-actions"
                    :style="{
                        minInlineSize:
                            actionSize === 'xs'
                                ? '3.125rem'
                                : buttonStyle === 'shadow'
                                  ? '3.625rem'
                                  : '4.125rem',
                    }">
                    <template v-if="isEditing || busy">
                        <EditableAction
                            action="cancel"
                            :button-style="buttonStyle"
                            :size="actionSize"
                            :label="cancelLabel || trans('common.editable.cancel')"
                            :disabled="disabled || busy"
                            :loading="false"
                            :muted="muted" />
                        <EditableAction
                            action="submit"
                            :button-style="buttonStyle"
                            :size="actionSize"
                            :label="
                                busy
                                    ? trans('common.editable.saving')
                                    : saveLabel || trans('common.editable.save')
                            "
                            :disabled="disabled || busy"
                            :loading="busy"
                            :muted="muted" />
                    </template>
                    <EditableAction
                        v-else
                        action="edit"
                        :button-style="buttonStyle"
                        :size="actionSize"
                        :label="editLabel || trans('common.editable.edit')"
                        :disabled="disabled"
                        :loading="false"
                        :muted="muted" />
                </span>
            </span>
            <span v-if="message" role="alert" class="block text-sm text-danger">{{ message }}</span>
            <input v-if="name" type="hidden" :name="name" :value="committed" :disabled="disabled" />
        </EditableRoot>
    </TooltipProvider>
</template>
<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue';
import { EditableRoot, EditableArea, EditablePreview, EditableInput } from 'reka-ui';
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { TooltipProvider } from '../tooltip';
import EditableAction from './EditableAction.vue';
const props = withDefaults(
    defineProps<{
        modelValue?: string;
        defaultValue?: string;
        id?: string;
        name?: string;
        ariaLabel?: string;
        placeholder?: string;
        disabled?: boolean;
        readonly?: boolean;
        loading?: boolean;
        error?: string;
        save?: (value: string) => void | string | Promise<void | string>;
        activationMode?: 'none' | 'focus' | 'dblclick';
        startWithEditMode?: boolean;
        selectOnFocus?: boolean;
        maxLength?: number;
        size?: 'sm' | 'default' | 'lg';
        /** Fit the field's width and height to the current content. */
        autoResize?: boolean;
        /** CSS length, or a number of pixels. Used in both preview and edit mode. */
        minWidth?: string | number;
        maxWidth?: string | number;
        /** Shift+Enter adds a line; Enter saves. */
        multiline?: boolean;
        rows?: number;
        actionSize?: 'xs' | 'sm';
        buttonStyle?: 'action' | 'shadow';
        muted?: boolean;
        editLabel?: string;
        cancelLabel?: string;
        saveLabel?: string;
        dir?: 'ltr' | 'rtl';
        class?: HTMLAttributes['class'];
    }>(),
    {
        disabled: false,
        readonly: false,
        loading: false,
        activationMode: 'none',
        startWithEditMode: false,
        selectOnFocus: true,
        size: 'default',
        autoResize: true,
        minWidth: '8ch',
        maxWidth: '100%',
        multiline: true,
        rows: 1,
        actionSize: 'xs',
        buttonStyle: 'action',
        muted: true,
    },
);
const emit = defineEmits<{
    'update:modelValue': [value: string];
    'update:editing': [value: boolean];
    submit: [value: string];
    saved: [value: string];
    cancel: [];
    error: [error: unknown];
}>();
const { trans } = useI18n();
const committed = ref(props.modelValue ?? props.defaultValue ?? '');
const displayValue = ref(committed.value);
const pending = ref(false);
const editing = ref(props.startWithEditMode);
const draft = ref(displayValue.value);
const cssLength = (value: string | number) => (typeof value === 'number' ? `${value}px` : value);
const areaStyle = computed<CSSProperties>(() => ({
    width: props.autoResize ? 'max-content' : cssLength(props.minWidth),
    minWidth: cssLength(props.minWidth),
    maxWidth: cssLength(props.maxWidth),
    fontSize: props.size === 'sm' ? '0.875rem' : props.size === 'lg' ? '1.125rem' : 'inherit',
}));
const measuredText = computed(() => {
    const current = props.autoResize ? (editing.value ? draft.value : displayValue.value) : '';
    const text = current || props.placeholder || ' ';
    if (!props.multiline) return text.replace(/\n/g, ' ') + '\u200b';
    const lines = text.split('\n');
    const count = Number.isFinite(props.rows) ? Math.max(1, Math.floor(props.rows)) : 1;
    while (lines.length < count) lines.push('');
    return lines.join('\n') + '\u200b';
});
const busy = computed(() => props.loading || pending.value);
const localError = ref('');
const message = computed(() => props.error || localError.value);
const root = ref<{ edit: () => void; cancel: () => void; submit: () => void }>();
watch(
    () => props.modelValue,
    (value) => {
        if (value !== undefined) {
            committed.value = value;
            if (!pending.value) {
                displayValue.value = value;
                if (editing.value) draft.value = value;
            }
        }
    },
);
function stateChanged(state: 'edit' | 'submit' | 'cancel') {
    editing.value = state === 'edit';
    if (editing.value) draft.value = displayValue.value;
    emit('update:editing', state === 'edit');
    if (state === 'edit') localError.value = '';
    if (state === 'cancel') {
        displayValue.value = committed.value;
        localError.value = '';
        emit('cancel');
    }
}
async function submit(value: string | null | undefined) {
    if (busy.value || props.disabled || props.readonly) return;
    const candidate = value ?? '';
    emit('submit', candidate);
    pending.value = true;
    localError.value = '';
    try {
        const result = await props.save?.(candidate);
        const next = typeof result === 'string' ? result : candidate;
        committed.value = next;
        displayValue.value = next;
        emit('update:modelValue', next);
        emit('saved', next);
    } catch (error) {
        const failure = error instanceof Error ? error.message : trans('common.editable.failed');
        displayValue.value = candidate;
        emit('error', error);
        await nextTick();
        root.value?.edit();
        localError.value = failure;
    } finally {
        pending.value = false;
    }
}
defineExpose({
    edit: () => {
        if (!busy.value && !props.disabled && !props.readonly) root.value?.edit();
    },
    cancel: () => {
        if (!busy.value) root.value?.cancel();
    },
    submit: () => {
        if (!busy.value) root.value?.submit();
    },
});
</script>

<style>
.miru-inline-edit-area {
    box-sizing: border-box;
    border-radius: max(3px, calc(var(--ui-radius) - 2px));
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    transition: background-color 150ms ease;
}
.miru-inline-edit-area[data-editing='true'] {
    background: var(--ui-ghostly);
}
.miru-inline-edit-measure,
.miru-inline-edit-preview,
.miru-inline-edit-control {
    box-sizing: border-box;
    margin: 0;
    border: 0;
    padding: 0.125rem 0.25rem;
    font: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    white-space: pre;
    overflow-wrap: normal;
}
.miru-inline-edit-measure {
    display: block;
    visibility: hidden;
    pointer-events: none;
}
.miru-inline-edit-area[data-multiline='true'] > * {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}
.miru-inline-edit-preview,
.miru-inline-edit-control {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    min-width: 0;
}
.miru-inline-edit-control {
    display: block;
    appearance: none;
    resize: none;
    background: transparent;
    color: inherit;
    outline: none;
    box-shadow: none;
    border-radius: inherit;
}
.miru-inline-edit-preview {
    outline: none;
}
.miru-inline-edit-control:disabled {
    cursor: not-allowed;
}
</style>
