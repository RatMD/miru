<template>
    <TooltipProvider
        v-if="copyable && copyTarget === 'all'"
        disable-closing-trigger
        ignore-non-keyboard-focus>
        <Tooltip v-model:open="tooltipOpen">
            <TooltipTrigger as-child>
                <button
                    v-bind="$attrs"
                    type="button"
                    data-slot="code"
                    :data-variant="variant"
                    :data-borderless="borderless"
                    data-copy-target="all"
                    :data-copied="copied"
                    :aria-disabled="copying || undefined"
                    :aria-busy="copying || undefined"
                    :aria-label="copyLabel"
                    :aria-describedby="
                        [$attrs['aria-describedby'], contentId].filter(Boolean).join(' ')
                    "
                    :class="
                        cn(
                            rootClass,
                            'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-current aria-disabled:cursor-wait',
                        )
                    "
                    @click="copy">
                    <span
                        v-if="prefix"
                        data-slot="code-prefix"
                        :data-variant="prefixVariant"
                        aria-hidden="true"
                        :class="prefixClass">
                        {{ prefix }}
                    </span>
                    <code
                        :id="contentId"
                        ref="source"
                        data-slot="code-content"
                        class="min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere]">
                        <slot>{{ value }}</slot>
                    </code>
                    <IconClipboardCheck
                        v-if="copied"
                        data-slot="code-copy-icon"
                        class="size-3.5 shrink-0 self-center opacity-70"
                        aria-hidden="true" />
                    <IconClipboard
                        v-else
                        data-slot="code-copy-icon"
                        class="size-3.5 shrink-0 self-center opacity-70"
                        aria-hidden="true" />
                </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" data-code-tooltip>
                <span class="flex items-center gap-2">
                    <component :is="copyIcon" class="size-4" aria-hidden="true" />
                    <span>{{ copyLabel }}</span>
                </span>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <code
        v-else
        v-bind="$attrs"
        data-slot="code"
        :data-variant="variant"
        :data-borderless="borderless"
        :data-copy-target="copyable ? 'button' : undefined"
        :class="rootClass">
        <span
            v-if="prefix"
            data-slot="code-prefix"
            :data-variant="prefixVariant"
            aria-hidden="true"
            :class="prefixClass">
            {{ prefix }}
        </span>
        <span
            ref="source"
            data-slot="code-content"
            class="min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere]">
            <slot>{{ value }}</slot>
        </span>
        <TooltipProvider v-if="copyable" disable-closing-trigger ignore-non-keyboard-focus>
            <Tooltip v-model:open="tooltipOpen">
                <TooltipTrigger as-child>
                    <button
                        type="button"
                        :aria-disabled="copying || undefined"
                        :aria-busy="copying || undefined"
                        :aria-label="copyLabel"
                        data-slot="code-copy"
                        :data-copied="copied"
                        class="inline-flex size-5 shrink-0 cursor-pointer items-center justify-center self-center rounded text-current opacity-70 outline-none hover:bg-current/10 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current disabled:cursor-wait"
                        @click="copy">
                        <IconClipboardCheck v-if="copied" class="size-3.5" aria-hidden="true" />
                        <IconClipboard v-else class="size-3.5" aria-hidden="true" />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" data-code-tooltip>
                    <span class="flex items-center gap-2">
                        <component :is="copyIcon" class="size-4" aria-hidden="true" />
                        <span>{{ copyLabel }}</span>
                    </span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </code>
    <span v-if="copyable" role="status" aria-live="polite" class="sr-only">
        {{
            copied ? trans('common.states.copied') : failed ? trans('common.code.copy_failed') : ''
        }}
    </span>
</template>
<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { HTMLAttributes } from 'vue';
import { IconAlertCircle, IconClipboard, IconClipboardCheck } from '@tabler/icons-vue';
import { useTimeoutFn } from '@vueuse/core';
import { computed, onBeforeUnmount, onUpdated, ref, useId, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { copyCode } from '../code-panel/clipboard';
import { inlineTextVariants } from '../inline-variants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        value?: string;
        prefix?: string;
        /** Color only the prompt/prefix; unset inherits the code tone. */
        prefixVariant?: InlineVariant;
        variant?: InlineVariant;
        borderless?: boolean;
        copyable?: boolean;
        /** Copy through the whole inline control or only its separate icon button. */
        copyTarget?: 'all' | 'button';
        class?: HTMLAttributes['class'];
    }>(),
    { variant: 'default', borderless: false, copyable: false, copyTarget: 'all' },
);
const rootClass = computed(() =>
    cn(
        'miru-inline-code inline-flex max-w-full items-baseline gap-1.5 rounded-md border px-1.5 py-0.5 align-middle font-mono text-[0.875em] leading-normal',
        inlineTextVariants({ variant: props.variant }),
        props.class,
    ),
);
const prefixClass = computed(() =>
    cn(
        'shrink-0 select-none',
        props.prefixVariant ? inlineTextVariants({ variant: props.prefixVariant }) : 'opacity-65',
    ),
);
const emit = defineEmits<{ copy: [content: string]; 'copy-error': [error: unknown] }>();
const { trans } = useI18n();
const source = ref<HTMLElement | null>(null);
const contentId = `code-content-${useId()}`;
const copied = ref(false);
const copying = ref(false);
const failed = ref(false);
const tooltipOpen = ref(false);
let copiedContent = '';
let request = 0;
const copyLabel = computed(() =>
    trans(
        copied.value
            ? 'common.states.copied'
            : failed.value
              ? 'common.code.copy_failed'
              : 'common.code.copy',
    ),
);
const copyIcon = computed(() =>
    copied.value ? IconClipboardCheck : failed.value ? IconAlertCircle : IconClipboard,
);
const { start, stop } = useTimeoutFn(
    () => {
        copied.value = false;
        failed.value = false;
    },
    2000,
    { immediate: false },
);

/** Copy only the rendered source, without its prompt prefix or control labels. */
function content(): string {
    return source.value?.textContent ?? props.value ?? '';
}

function reset(): void {
    copied.value = false;
    failed.value = false;
    tooltipOpen.value = false;
}

watch(
    () => [props.value, props.copyable, props.copyTarget],
    () => {
        request++;
        copying.value = false;
        stop();
        reset();
    },
);
onUpdated(() => {
    if (copied.value && copiedContent !== content()) {
        stop();
        reset();
    }
});
onBeforeUnmount(() => {
    request++;
});

/** Report clipboard success after a completed write; keep permission failures visible. */
async function copy(): Promise<void> {
    if (copying.value || !props.copyable) {
        return;
    }
    const current = ++request;
    const snapshot = content();
    copying.value = true;
    failed.value = false;
    try {
        await copyCode(snapshot);
        if (current !== request || snapshot !== content()) {
            return;
        }
        copiedContent = snapshot;
        copied.value = true;
        tooltipOpen.value = true;
        start();
        emit('copy', snapshot);
    } catch (error) {
        if (current === request) {
            copied.value = false;
            failed.value = true;
            tooltipOpen.value = true;
            emit('copy-error', error);
        }
    } finally {
        if (current === request) {
            copying.value = false;
        }
    }
}
</script>
<style scoped>
.miru-inline-code {
    background-color: color-mix(in oklab, currentColor 7%, transparent);
    border-color: color-mix(in oklab, currentColor 20%, transparent);
}
.miru-inline-code [data-slot='code-content'] {
    color: inherit;
    font: inherit;
    background: none;
    border: 0;
    padding: 0;
}
.miru-inline-code[data-copy-target='all'] {
    transition:
        background-color 150ms ease,
        border-color 150ms ease,
        box-shadow 150ms ease;
}
.miru-inline-code[data-copy-target='all']:not([aria-disabled='true']):hover {
    background-color: color-mix(in oklab, currentColor 12%, transparent);
    border-color: color-mix(in oklab, currentColor 35%, transparent);
}
.miru-inline-code[data-copy-target='all']:not([aria-disabled='true']):active {
    background-color: color-mix(in oklab, currentColor 16%, transparent);
    box-shadow: var(--ui-pressed-shadow-subtle);
}
.miru-inline-code[data-borderless='true'] {
    border-color: transparent;
}
@media (prefers-reduced-motion: reduce) {
    .miru-inline-code[data-copy-target='all'] {
        transition: none;
    }
}
</style>
