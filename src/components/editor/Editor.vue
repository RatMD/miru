<template>
    <div
        ref="editorRoot"
        data-slot="editor"
        :style="props.style"
        :data-editor-theme="dark ? 'dark' : 'light'"
        :data-disabled="disabled"
        :class="cn('miru-editor relative w-full min-w-0', props.wrapperClass)">
        <div :key="locale + ':' + String(toolbar)" class="miru-tinymce-host">
            <Textarea
                v-bind="$attrs"
                :class="props.class"
                v-tinymce="binding"
                :model-value="modelValue"
                :disabled="disabled"
                :readonly="readonly"
                :placeholder="placeholder"
                :aria-label="label"
                :style="{ minHeight: height + 'px' }"
                @update:model-value="emit('update:modelValue', String($event))"
                @blur="emit('blur')" />
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Editor as TinyEditor } from 'tinymce';
import type { HTMLAttributes } from 'vue';
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { vTinymce } from '../../plugins/tinymce';
import { cn } from '../../support/classNames';
import { Textarea } from '../textarea';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        modelValue?: string;
        label?: string;
        locale?: string;
        disabled?: boolean;
        readonly?: boolean;
        height?: number;
        toolbar?: string | false;
        placeholder?: string;
        licenseKey?: string;
        class?: HTMLAttributes['class'];
        wrapperClass?: HTMLAttributes['class'];
        style?: HTMLAttributes['style'];
    }>(),
    {
        modelValue: '',
        height: 380,
        disabled: false,
        readonly: false,
        toolbar: 'undo redo | blocks | bold italic underline | bullist numlist | removeformat',
    },
);
const emit = defineEmits<{
    'update:modelValue': [value: string];
    blur: [];
    ready: [editor: TinyEditor];
    error: [error: unknown];
}>();
const { locale, trans } = useI18n(() => props.locale);
const dark = ref(false);
const editorRoot = ref<HTMLElement | null>(null);
let observer: MutationObserver | undefined;
onMounted(() => {
    const update = () => {
        let node: HTMLElement | null = editorRoot.value;
        while (node) {
            if (node.dataset.theme === 'dark' || node.classList.contains('dark')) {
                dark.value = true;
                return;
            }
            if (node.dataset.theme === 'light' || node.classList.contains('light')) {
                dark.value = false;
                return;
            }
            node = node.parentElement;
        }
        dark.value = false;
    };
    update();
    observer = new MutationObserver(update);
    let node: HTMLElement | null = editorRoot.value;
    while (node) {
        observer.observe(node, { attributes: true, attributeFilter: ['class', 'data-theme'] });
        node = node.parentElement;
    }
});
onBeforeUnmount(() => observer?.disconnect());
const binding = computed(() => ({
    dark: dark.value,
    value: props.modelValue,
    label: props.label || trans('common.form.editor.area'),
    locale: locale.value,
    translate: trans,
    disabled: props.disabled,
    readonly: props.readonly,
    height: props.height,
    toolbar: props.toolbar,
    placeholder: props.placeholder,
    licenseKey: props.licenseKey,
    update: (value: string) => emit('update:modelValue', value),
    blur: () => emit('blur'),
    ready: (editor: TinyEditor) => emit('ready', editor),
    error: (error: unknown) => emit('error', error),
}));
</script>
