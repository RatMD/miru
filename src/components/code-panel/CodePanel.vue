<template>
    <section
        data-slot="code-panel"
        :data-condensed="condensed"
        :aria-label="label || trans('common.code.label')"
        :aria-busy="formatting || undefined"
        :class="
            cn(
                'relative min-w-0 border-border bg-neutral-50 dark:bg-neutral-950/50',
                condensed ? 'rounded-none border-y' : 'overflow-hidden rounded-xl border',
                props.class,
            )
        ">
        <div class="absolute top-3 right-4 z-20">
            <TooltipProvider :delay-duration="100" ignore-non-keyboard-focus>
                <Tooltip v-model:open="tooltipOpen">
                    <TooltipTrigger as-child>
                        <ButtonAction
                            variant="outline"
                            size="sm"
                            :loading="formatting"
                            :aria-label="trans('common.actions.copy')"
                            @click="copyData">
                            <IconClipboardCheck v-if="copied" aria-hidden="true" />
                            <IconCopy v-else aria-hidden="true" />
                        </ButtonAction>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="end">
                        {{ copied ? trans('common.states.copied') : trans('common.actions.copy') }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        <p v-if="failed" role="status" class="px-4 pt-3 pr-16 text-xs text-muted-foreground">
            {{ trans('common.code.format_failed') }}
        </p>
        <p
            v-if="copyFailed"
            role="alert"
            class="px-4 pt-3 pr-16 text-xs text-danger-700 dark:text-danger-400">
            {{ trans('common.code.copy_failed') }}
        </p>
        <ScrollArea orientation="both" fit-content :style="{ maxHeight: height }">
            <pre
                tabindex="0"
                :aria-label="label || trans('common.code.label')"
                class="m-0 w-max min-w-full p-4 pr-16 font-mono text-xs leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"><code class="block"><span v-for="(line,index) in lines" :key="index" data-slot="code-line" class="grid" :style="{ gridTemplateColumns: lineNumbers ? 'calc(' + String(lines.length).length + 'ch + 1rem) minmax(0,1fr)' : 'minmax(0,1fr)' }"><span v-if="lineNumbers" aria-hidden="true" data-slot="code-line-number" class="pr-3 text-right text-muted-foreground select-none">{{ index + 1 }}</span><span data-slot="code-line-text">{{ line || '​' }}</span></span></code></pre>
        </ScrollArea>
    </section>
</template>
<script setup lang="ts">
import type { CodeLanguage } from './types';
import type { HTMLAttributes } from 'vue';
import { IconCopy, IconClipboardCheck } from '@tabler/icons-vue';
import { useTimeoutFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { ButtonAction } from '../button-action';
import { ScrollArea } from '../scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import { copyCode } from './clipboard';
import { formatCode, serializeCode } from './formatCode';
const props = withDefaults(
    defineProps<{
        value: unknown;
        language?: CodeLanguage;
        format?: boolean;
        /** Flush presentation with top/bottom borders for embedded panels and dialogs. */
        condensed?: boolean;
        lineNumbers?: boolean;
        maxHeight?: number | string;
        label?: string;
        class?: HTMLAttributes['class'];
    }>(),
    {
        language: 'json',
        format: true,
        condensed: false,
        lineNumbers: true,
        maxHeight: 'min(55dvh,32rem)',
    },
);
const { trans } = useI18n();
const text = ref(serializeCode(props.value));
const failed = ref(false),
    formatting = ref(false),
    copyFailed = ref(false);
const height = computed(() =>
    typeof props.maxHeight === 'number' ? props.maxHeight + 'px' : props.maxHeight,
);
const lines = computed(() => text.value.split(/\r?\n/));
const copied = ref(false);
const tooltipOpen = ref(false);
const { start: startCopiedTimer, stop: stopCopiedTimer } = useTimeoutFn(
    () => {
        copied.value = false;
        tooltipOpen.value = false;
    },
    2000,
    { immediate: false },
);
watch(
    () => [props.value, props.language, props.format] as const,
    async ([value, language, enabled], _previous, onCleanup) => {
        let current = true;
        onCleanup(() => (current = false));
        text.value = serializeCode(value);
        failed.value = false;
        copyFailed.value = false;
        copied.value = false;
        tooltipOpen.value = false;
        stopCopiedTimer();
        formatting.value = true;
        const result = await formatCode(value, language, enabled);
        if (current) {
            text.value = result.text;
            failed.value = result.failed;
            formatting.value = false;
        }
    },
    { immediate: true, deep: true },
);
async function copyData(): Promise<void> {
    copyFailed.value = false;
    try {
        const snapshot = text.value;
        await copyCode(snapshot);
        if (snapshot !== text.value) return;
        copied.value = true;
        tooltipOpen.value = true;
        startCopiedTimer();
    } catch {
        copyFailed.value = true;
    }
}
</script>
