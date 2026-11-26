<template>
    <div ref="container" data-slot="editor-json" :class="wrapperClass" :data-invalid="!validation.valid">
        <EditorFrame
            :id="inputId"
            :model-value="modelValue"
            :label="label"
            :label-for="previewActive ? previewId : inputId"
            :required="required"
            :disabled="disabled"
            :readonly="readonly"
            :invalid="!validation.valid"
            :extensions="extensions"
            :toolbar-label="trans('common.editors.json_toolbar')"
            :counter="counter"
            :counter-mode="counterMode"
            :maxlength="maxlength"
            :locale="locale"
            @update:model-value="emit('update:modelValue', $event)">
            <template #toolbar-end>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <span
                                role="status"
                                aria-live="polite"
                                tabindex="0"
                                data-slot="json-validation-status"
                                class="ml-auto mr-1 flex size-7 shrink-0 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                :class="
                                    validation.valid
                                        ? 'bg-success/10 text-success'
                                        : 'bg-danger/10 text-danger'
                                ">
                                <IconCheck
                                    v-if="validation.valid"
                                    class="size-4"
                                    aria-hidden="true" />
                                <IconX v-else class="size-4" aria-hidden="true" />
                                <span class="sr-only">{{ validationLabel }}</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" :side-offset="6">
                            {{ validationLabel }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </template>
            <template #default>
                <ScrollArea
                    v-if="previewActive"
                    orientation="both"
                    data-slot="json-preview"
                    :style="{ height: previewSurfaceHeight, maxHeight: previewHeight }"
                    class="bg-muted/30"
                    viewport-class="max-h-[inherit] focus-visible:ring-0 focus-visible:outline-none">
                    <div class="flex min-h-64">
                        <div
                            v-if="lineNumbers"
                            aria-hidden="true"
                            data-slot="json-preview-line-numbers"
                            class="sticky left-0 z-10 shrink-0 select-none border-r bg-muted px-3 py-2 text-right font-mono text-sm leading-[1.5] tabular-nums text-muted-foreground"
                            :style="{ minWidth: previewGutterWidth }">
                            <span v-for="line in previewLineCount" :key="line" class="block">
                                {{ line }}
                            </span>
                        </div>
                        <pre
                            :id="previewId"
                            tabindex="0"
                            :aria-label="trans('common.editors.preview')"
                            class="m-0 min-h-64 flex-1 px-3 py-2 font-mono text-sm leading-[1.5] outline-none focus-visible:ring-0"><code>{{ formatted }}</code></pre>
                    </div>
                </ScrollArea>
                <div
                    v-show="!previewActive"
                    class="relative"
                    :style="{ '--json-gutter-width': editingGutterWidth }">
                    <div
                        v-if="lineNumbers"
                        aria-hidden="true"
                        data-slot="json-line-numbers"
                        class="pointer-events-none absolute inset-y-0 left-0 z-10 overflow-hidden border-r bg-muted/50 text-right font-mono text-sm leading-[1.5] tabular-nums text-muted-foreground select-none"
                        style="width: var(--json-gutter-width)">
                        <div
                            class="px-3 py-2"
                            :style="{ transform: 'translateY(-' + scrollTop + 'px)' }">
                            <span v-for="line in editingLineCount" :key="line" class="block">
                                {{ line }}
                            </span>
                        </div>
                    </div>
                    <Textarea
                        v-bind="$attrs"
                    :class="props.class"
                        :id="inputId"
                        :name="name"
                        :model-value="modelValue"
                        :rows="rows"
                        :maxlength="maxlength"
                        :disabled="disabled"
                        :readonly="readonly"
                        :required="required"
                        :placeholder="placeholder"
                        :aria-label="label || trans('common.editors.json')"
                        :aria-invalid="
                            !validation.valid ||
                            $attrs['aria-invalid'] === true ||
                            $attrs['aria-invalid'] === 'true'
                        "
                        :aria-describedby="
                            [
                                String($attrs['aria-describedby'] || ''),
                                !validation.valid ? errorId : '',
                            ]
                                .filter(Boolean)
                                .join(' ') || undefined
                        "
                        class="min-h-64 resize-y rounded-none border-0 font-mono text-sm leading-[1.5] shadow-none focus-visible:ring-0"
                        :wrap="lineNumbers ? 'off' : undefined"
                        :style="{
                            fieldSizing: 'fixed',
                            paddingLeft: lineNumbers
                                ? 'calc(var(--json-gutter-width) + 0.75rem)'
                                : undefined,
                        }"
                        @scroll="scrollTop = ($event.target as HTMLTextAreaElement).scrollTop"
                        @blur="$emit('blur')"
                        @update:model-value="$emit('update:modelValue', String($event))" />
                </div>
            </template>
            <template #counter="state">
                <slot name="counter" v-bind="state">{{ state.text }}</slot>
            </template>
            <template #footer>
                <p v-if="!validation.valid" :id="errorId" role="alert" class="text-xs text-danger">
                    {{ trans('common.editors.json_error') }}
                </p>
            </template>
        </EditorFrame>
    </div>
</template>
<script setup lang="ts">
import type { EditorFrameExtension } from '../editor-frame';
import type { HTMLAttributes } from 'vue';
import { IconBraces, IconCodeDots, IconEye, IconPencil, IconCheck, IconX } from '@tabler/icons-vue';
import { computed, nextTick, ref, useId, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { EditorFrame } from '../editor-frame';
import { ScrollArea } from '../scroll-area';
import { Textarea } from '../textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes['class'];
        wrapperClass?: HTMLAttributes['class'];
        modelValue?: string;
        id?: string;
        name?: string;
        label?: string;
        rows?: number;
        indent?: number;
        maxlength?: number;
        counter?: boolean;
        counterMode?: 'limit' | 'count' | 'remaining';
        locale?: string;
        allowEmpty?: boolean;
        preview?: boolean;
        /** Maximum height of the scrollable in-place JSON preview. */
        previewMaxHeight?: number | string;
        /** Show synchronized line numbers; long edit lines scroll horizontally. */
        lineNumbers?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        placeholder?: string;
    }>(),
    {
        counter: false,
        counterMode: 'limit',
        modelValue: '',
        rows: 10,
        indent: 2,
        allowEmpty: true,
        preview: true,
        previewMaxHeight: 320,
        lineNumbers: true,
    },
);
const emit = defineEmits<{
    'update:modelValue': [value: string];
    validation: [state: { valid: boolean; value?: unknown }];
    blur: [];
}>();
const { trans } = useI18n();
const generatedId = useId();
const inputId = computed(() => props.id || `json-${generatedId}`);
const errorId = computed(() => `${inputId.value}-error`);
const container = ref<HTMLElement>();
const showPreview = ref(false);
const previewSurfaceHeight = ref('16rem');
const scrollTop = ref(0);
const editingLineCount = computed(() => props.modelValue.split(/\r\n|\r|\n/).length);
const editingGutterWidth = computed(
    () => 'calc(' + Math.max(2, String(editingLineCount.value).length) + 'ch + 1.5rem)',
);
const previewLineCount = computed(() => formatted.value.split('\n').length);
const previewGutterWidth = computed(
    () => 'calc(' + Math.max(2, String(previewLineCount.value).length) + 'ch + 1.5rem)',
);
const previewActive = computed(() => props.preview && showPreview.value);
const previewId = computed(() => inputId.value + '-preview');
const previewHeight = computed(() =>
    typeof props.previewMaxHeight === 'number'
        ? props.previewMaxHeight + 'px'
        : props.previewMaxHeight,
);
const validationLabel = computed(() =>
    trans(validation.value.valid ? 'common.editors.json_valid' : 'common.editors.json_invalid'),
);
async function togglePreview(): Promise<void> {
    if (props.disabled || !validation.value.valid) return;
    if (!previewActive.value) {
        const height = container.value?.querySelector('textarea')?.getBoundingClientRect().height;
        if (height) previewSurfaceHeight.value = height + 'px';
    }
    showPreview.value = !showPreview.value;
    await nextTick();
    container.value?.querySelector<HTMLElement>(previewActive.value ? 'pre' : 'textarea')?.focus();
}
const validation = computed<{ valid: boolean; value?: unknown }>(() => {
    if (!props.modelValue.trim()) return { valid: props.allowEmpty };
    try {
        return { valid: true, value: JSON.parse(props.modelValue) };
    } catch {
        return { valid: false };
    }
});
const canTransform = computed(
    () => !props.disabled && !props.readonly && validation.value.valid && !!props.modelValue.trim(),
);
const formatted = computed(() =>
    validation.value.valid && props.modelValue.trim()
        ? JSON.stringify(validation.value.value, null, Math.min(10, Math.max(0, props.indent)))
        : '',
);
watch(
    validation,
    (state) => {
        if (!state.valid) showPreview.value = false;
        emit('validation', state);
    },
    { immediate: true },
);
const extensions = computed<EditorFrameExtension[]>(() => [
    {
        id: 'json',
        commands: [
            {
                id: 'json.format',
                label: trans('common.editors.format'),
                icon: IconCodeDots,
                disabled: !canTransform.value,
                run: (api) => api.setValue(formatted.value),
            },
            {
                id: 'json.minify',
                label: trans('common.editors.minify'),
                icon: IconBraces,
                disabled: !canTransform.value,
                run: (api) => api.setValue(JSON.stringify(validation.value.value)),
            },
            ...(props.preview
                ? [
                      {
                          id: 'json.preview',
                          label: trans(
                              previewActive.value
                                  ? 'common.actions.edit'
                                  : 'common.editors.preview',
                          ),
                          icon: previewActive.value ? IconPencil : IconEye,
                          mutates: false,
                          disabled: !validation.value.valid,
                          active: previewActive.value,
                          run: () => togglePreview(),
                      },
                  ]
                : []),
        ],
    },
]);
</script>
