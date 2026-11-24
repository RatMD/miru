<template>
    <div ref="root" data-slot="editor-frame-root" :class="cn('space-y-2', props.class)">
        <Label v-if="label" :for="labelFor || inputId" :required="required">{{ label }}</Label>
        <div
            data-slot="editor-frame"
            :data-disabled="disabled"
            :data-readonly="readonly"
            :data-invalid="invalid || undefined"
            :class="
                cn(
                    'miru-field overflow-hidden rounded-md border border-input shadow-xs transition-[border-color,box-shadow] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
                    invalid &&
                        'border-danger! focus-within:border-danger! focus-within:ring-danger/20!',
                )
            ">
            <div
                v-if="commands.length || $slots.toolbar || $slots['toolbar-end']"
                data-slot="editor-toolbar"
                class="flex flex-wrap items-center gap-1 border-b bg-muted/40 p-1"
                role="toolbar"
                :aria-label="toolbarLabel || trans('common.editors.toolbar')">
                <slot name="toolbar" :api="api">
                    <EditorToolbarButton
                        v-for="command in commands"
                        :key="command.id"
                        :label="command.label"
                        :disabled="isDisabled(command)"
                        :aria-pressed="command.active"
                        @mousedown.prevent
                        @click="execute(command.id)">
                        <component
                            v-if="command.icon"
                            :is="command.icon"
                            class="size-4"
                            aria-hidden="true" />
                        <span v-else>{{ command.label }}</span>
                    </EditorToolbarButton>
                </slot>
                <slot name="toolbar-end" :api="api" />
            </div>
            <slot :api="api" :input-id="inputId">
                <Textarea
                    v-bind="$attrs"
                    :id="inputId"
                    :model-value="modelValue"
                    :name="name"
                    :rows="rows"
                    :maxlength="maxlength"
                    :disabled="disabled"
                    :readonly="readonly"
                    :required="required"
                    :placeholder="placeholder"
                    :aria-label="label || trans('common.form.editor.area')"
                    :aria-invalid="invalid || $attrs['aria-invalid']"
                    class="min-h-64 resize-y rounded-none border-0 shadow-none focus-visible:ring-0"
                    style="field-sizing: fixed"
                    @update:model-value="setValue(String($event))"
                    @blur="emit('blur')" />
            </slot>
        </div>
        <EditorCounter
            v-if="counter"
            :value="modelValue"
            :maxlength="maxlength"
            :mode="counterMode"
            :locale="locale">
            <template #default="state">
                <slot name="counter" v-bind="state">{{ state.text }}</slot>
            </template>
        </EditorCounter>
        <slot name="footer" :api="api" />
    </div>
</template>

<script setup lang="ts">
import type {
    EditorFrameApi,
    EditorFrameCommand,
    EditorFrameExtension,
    EditorSelection,
} from './types';
import type { HTMLAttributes } from 'vue';
import { computed, nextTick, ref, useId } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Label } from '../label';
import { Textarea } from '../textarea';
import EditorCounter from './EditorCounter.vue';
import EditorToolbarButton from './EditorToolbarButton.vue';

defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        modelValue?: string;
        id?: string;
        label?: string;
        labelFor?: string;
        name?: string;
        toolbarLabel?: string;
        extensions?: readonly EditorFrameExtension[];
        disabled?: boolean;
        readonly?: boolean;
        invalid?: boolean;
        required?: boolean;
        placeholder?: string;
        rows?: number;
        maxlength?: number;
        counter?: boolean;
        counterMode?: 'limit' | 'count' | 'remaining';
        locale?: string;
        class?: HTMLAttributes['class'];
    }>(),
    { modelValue: '', extensions: () => [], rows: 10, counterMode: 'limit' },
);
const emit = defineEmits<{
    'update:modelValue': [value: string];
    blur: [];
    command: [id: string];
}>();
const { trans } = useI18n(() => props.locale);
const root = ref<HTMLElement | null>(null);
const generatedId = useId();
const inputId = computed(() => props.id || `editor-${generatedId}`);
const commands = computed(() => {
    const unique = new Map<string, EditorFrameCommand>();
    for (const extension of props.extensions) {
        for (const command of extension.commands || []) {
            unique.set(command.id, command);
        }
    }
    return [...unique.values()];
});

/** Return the active native text surface, including a custom default slot. */
function getTextarea(): HTMLTextAreaElement | null {
    return root.value?.querySelector('textarea') || null;
}

/** Read the current selection without requiring DOM access during setup or SSR. */
function getSelection(): EditorSelection {
    const input = getTextarea();
    return {
        value: input?.value ?? props.modelValue,
        start: input?.selectionStart ?? 0,
        end: input?.selectionEnd ?? 0,
    };
}

/** Update editable content; native maxlength also applies to extension commands. */
function setValue(value: string): void {
    if (props.disabled || props.readonly) {
        return;
    }
    if (props.maxlength !== undefined && value.length > props.maxlength) {
        return;
    }
    emit('update:modelValue', value);
}

/** Restore focus and selection after a controlled model update. */
async function setSelection(start: number, end = start): Promise<void> {
    await nextTick();
    const input = getTextarea();
    input?.focus();
    input?.setSelectionRange(start, end);
}

/** Replace selected text while preserving a useful caret position. */
async function replaceSelection(text: string): Promise<void> {
    if (props.disabled || props.readonly) {
        return;
    }
    const before = getSelection();
    const value = before.value.slice(0, before.start) + text + before.value.slice(before.end);
    if (props.maxlength !== undefined && value.length > props.maxlength) {
        return;
    }
    setValue(value);
    await setSelection(before.start + text.length);
}

function focus(): void {
    getTextarea()?.focus();
}

function isDisabled(command: EditorFrameCommand): boolean {
    return (
        !!props.disabled || !!command.disabled || (!!props.readonly && command.mutates !== false)
    );
}

/** Execute only commands attached to this frame and allowed by its current state. */
function execute(id: string): void {
    const command = commands.value.find((entry) => entry.id === id);
    if (command && !isDisabled(command)) {
        void command.run(api);
        emit('command', id);
    }
}

const api: EditorFrameApi = {
    get value() {
        return props.modelValue;
    },
    get disabled() {
        return !!props.disabled;
    },
    get readonly() {
        return !!props.readonly;
    },
    getTextarea,
    getSelection,
    setValue,
    setSelection,
    replaceSelection,
    focus,
    execute,
};
defineExpose(api);
</script>
