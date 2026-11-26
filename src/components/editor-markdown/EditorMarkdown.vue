<template>
    <div ref="container" data-slot="editor-markdown" :class="wrapperClass" @keydown="onKeydown">
        <EditorFrame
            ref="frame"
            :id="inputId"
            :model-value="model"
            :label="label"
            :required="required"
            :disabled="disabled"
            :readonly="readonly"
            :extensions="extensions"
            :invalid="$attrs['aria-invalid'] === true || $attrs['aria-invalid'] === 'true'"
            :counter="counter"
            :counter-mode="counterMode"
            :maxlength="maxlength"
            :locale="locale">
            <template #default>
                <Textarea
                    v-bind="$attrs"
                    :class="props.class"
                    :id="inputId"
                    :name="name"
                    :disabled="disabled"
                    :readonly="readonly"
                    :required="required"
                    :placeholder="placeholder"
                    :aria-label="label || trans('common.editors.markdown')"
                    @blur="$emit('blur')"
                    :model-value="model"
                    @beforeinput="onBeforeInput"
                    @input="onInput"
                    @compositionstart="onCompositionStart"
                    @compositionend="onCompositionEnd"
                    :maxlength="maxlength"
                    class="min-h-64 resize-y rounded-none border-0 shadow-none focus-visible:ring-0"
                    style="field-sizing: fixed"
                    :rows="rows"
                    @keydown.ctrl.b.prevent="format('bold')"
                    @keydown.meta.b.prevent="format('bold')" />
            </template>
            <template #counter="state">
                <slot name="counter" v-bind="state">{{ state.text }}</slot>
            </template>
        </EditorFrame>
    </div>
</template>
<script setup lang="ts">
import type { EditorFrameApi, EditorFrameExtension } from '../editor-frame';
import type { MarkdownSelection, MarkdownTool } from './formatting';
import type { MarkdownSyntax } from './formatting';
import type { HTMLAttributes } from 'vue';
import {
    IconBold,
    IconH1,
    IconList,
    IconListNumbers,
    IconArrowBackUp,
    IconArrowForwardUp,
    IconMinus,
} from '@tabler/icons-vue';
import { computed, nextTick, reactive, ref, useId, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { EditorFrame } from '../editor-frame';
import { Textarea } from '../textarea';
import { continueMarkdownList, formatMarkdown, MarkdownHistory } from './formatting';
defineOptions({ inheritAttrs: false });
defineEmits<{ blur: [] }>();
const { trans } = useI18n();

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes['class'];
        wrapperClass?: HTMLAttributes['class'];
        label?: string;
        id?: string;
        name?: string;
        maxlength?: number;
        counter?: boolean;
        counterMode?: 'limit' | 'count' | 'remaining';
        locale?: string;
        rows?: number;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        placeholder?: string;
        syntax?: 'standard' | 'kleinanzeigen';
        syntaxOptions?: Partial<MarkdownSyntax>;
        toolbar?: MarkdownTool[];
    }>(),
    {
        counter: false,
        counterMode: 'limit',
        maxlength: 65000,
        rows: 12,
        syntax: 'standard',
        toolbar: () => ['heading', 'bold', 'list', 'ordered', 'divider'],
    },
);
const model = defineModel<string>({ default: '' });
const container = ref<HTMLElement | null>(null);
const frame = ref<EditorFrameApi | null>(null);
const generatedId = useId();
const inputId = computed(() => props.id || `markdown-${generatedId}`);
const syntaxConfig = computed(() => ({
    divider: props.syntax === 'kleinanzeigen' ? '———————————————' : '---',
    bullet: props.syntax === 'kleinanzeigen' ? '* ' : '- ',
    ...props.syntaxOptions,
}));
const history = reactive(new MarkdownHistory());
let knownValue = model.value;
let beforeInput: MarkdownSelection | null = null;
let compositionBefore: MarkdownSelection | null = null;
let plainLineBreak = false;
const tools = [
    { id: 'heading' as const, icon: IconH1 },
    { id: 'bold' as const, icon: IconBold },
    { id: 'list' as const, icon: IconList },
    { id: 'ordered' as const, icon: IconListNumbers },
    { id: 'divider' as const, icon: IconMinus },
];
const enabledTools = computed(() => tools.filter((tool) => props.toolbar.includes(tool.id)));
// Loading a product/template is a new editing baseline, not an undoable user input.
watch(model, (value) => {
    if (value !== knownValue) {
        knownValue = value;
        history.clear();
        beforeInput = null;
        compositionBefore = null;
    }
});
function inputElement(): HTMLTextAreaElement | null {
    return frame.value?.getTextarea() ?? null;
}
function selection(input: HTMLTextAreaElement): MarkdownSelection {
    return { value: input.value, start: input.selectionStart, end: input.selectionEnd };
}
function updateValue(value: string): void {
    knownValue = value;
    model.value = value;
}
async function restore(state: MarkdownSelection | null): Promise<void> {
    if (!state) return;
    updateValue(state.value);
    await nextTick();
    const input = inputElement();
    input?.focus();
    input?.setSelectionRange(state.start, state.end);
}
function undo(): void {
    void restore(props.disabled || props.readonly ? null : history.undo());
}
function redo(): void {
    void restore(props.disabled || props.readonly ? null : history.redo());
}
function onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter')
        plainLineBreak = event.shiftKey || event.ctrlKey || event.metaKey || event.altKey;
    if (event.isComposing || event.altKey || !(event.ctrlKey || event.metaKey)) return;
    const key = event.key.toLowerCase();
    if (key !== 'z' && key !== 'y') return;
    event.preventDefault();
    event.stopPropagation();
    if (key === 'y' || event.shiftKey) redo();
    else undo();
}
function onBeforeInput(event: Event): void {
    const inputEvent = event as InputEvent;
    if (inputEvent.inputType === 'historyUndo' || inputEvent.inputType === 'historyRedo') {
        event.preventDefault();
        if (inputEvent.inputType === 'historyUndo') undo();
        else redo();
        return;
    }
    const plainBreak = plainLineBreak;
    plainLineBreak = false;
    if (
        event.cancelable &&
        !plainBreak &&
        !compositionBefore &&
        !inputEvent.isComposing &&
        ['insertLineBreak', 'insertParagraph'].includes(inputEvent.inputType)
    ) {
        const before = selection(event.target as HTMLTextAreaElement);
        const after = continueMarkdownList(before, props.maxlength, syntaxConfig.value);
        if (after) {
            event.preventDefault();
            beforeInput = null;
            history.record(before, after);
            void restore(after);
            return;
        }
    }
    beforeInput = selection(event.target as HTMLTextAreaElement);
}
function onInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    const after = selection(input);
    const before = beforeInput ?? { value: knownValue, start: after.start, end: after.end };
    const inputType = (event as InputEvent).inputType;
    const group = ['insertText', 'deleteContentBackward', 'deleteContentForward'].includes(
        inputType,
    )
        ? inputType
        : null;
    if (!compositionBefore) history.record(before, after, group);
    beforeInput = null;
    updateValue(after.value);
}
function onCompositionStart(event: Event): void {
    compositionBefore = selection(event.target as HTMLTextAreaElement);
}
function onCompositionEnd(event: Event): void {
    const after = selection(event.target as HTMLTextAreaElement);
    if (compositionBefore) history.record(compositionBefore, after);
    compositionBefore = null;
    beforeInput = null;
    updateValue(after.value);
}
function format(tool: MarkdownTool): void {
    const input = inputElement();
    if (
        !input ||
        compositionBefore ||
        props.disabled ||
        props.readonly ||
        !props.toolbar.includes(tool)
    )
        return;
    const before = selection(input);
    const after = formatMarkdown(before, tool, props.maxlength, syntaxConfig.value);
    if (!after) return;
    history.record(before, after);
    void restore(after);
}
const extensions = computed<EditorFrameExtension[]>(() => [
    {
        id: 'markdown',
        commands: [
            {
                id: 'markdown.undo',
                label: trans('common.editors.undo'),
                icon: IconArrowBackUp,
                disabled: !history.canUndo,
                run: () => undo(),
            },
            {
                id: 'markdown.redo',
                label: trans('common.editors.redo'),
                icon: IconArrowForwardUp,
                disabled: !history.canRedo,
                run: () => redo(),
            },
            ...enabledTools.value.map((tool) => ({
                id: 'markdown.' + tool.id,
                label: trans('common.editors.' + tool.id),
                icon: tool.icon,
                run: () => format(tool.id),
            })),
        ],
    },
]);
</script>
