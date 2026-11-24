<template>
    <TooltipProvider :disable-closing-trigger="true" :ignore-non-keyboard-focus="true">
        <Tooltip :open="open">
            <TooltipTrigger as-child>
                <button
                    data-slot="copy"
                    type="button"
                    :aria-label="props.label || trans('common.actions.copy')"
                    :class="
                        cn([
                            'inline-flex w-fit max-w-full justify-self-start cursor-pointer rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                            props.wrapper ? 'inline-flex' : '',
                            ...(Array.isArray(props.class) ? props.class : [props.class]),
                        ])
                    "
                    @click="onCopy">
                    <slot />
                </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
                <div class="flex flex-row items-center gap-2 text-xs">
                    <IconClipboardCheck class="size-4" />
                    <span>{{ props.label || trans('common.states.copied') }}</span>
                </div>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script lang="ts">
export interface CopyContentItems {
    [key: string]: string;
}

export interface CopyProps {
    content: string | CopyContentItems;
    label?: string;
    type?: string;
    wrapper?: boolean;
    class?: string | string[];
}
</script>

<script lang="ts" setup>
import { IconClipboardCheck } from '@tabler/icons-vue';
import { useClipboardItems } from '@vueuse/core';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
const { trans, transChoice, locale } = useI18n();

// Define Component
const props = defineProps<CopyProps>();

// Composable
const clipboard = useClipboardItems();

// States
const open = computed<boolean>(() => clipboard.copied.value);

/**
 *
 * @param type
 */
function prepareType(type: string) {
    if (['text/plain', 'text/html', 'image/png', 'image/svg+xml'].includes(type)) {
        return type;
    } else {
        return `web ${type}`;
    }
}

/**
 *
 * @param content
 */
function onCopy() {
    const content: { [key: string]: Blob } = {};

    if (typeof props.content == 'string') {
        const type = props.type || 'text/plain';
        content[prepareType(type)] = new Blob([props.content], { type });
    } else {
        for (const [type, data] of Object.entries(props.content)) {
            content[prepareType(type)] = new Blob([data], { type });
        }
    }

    clipboard.copy([new ClipboardItem(content)]);
}
</script>
