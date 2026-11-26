<template>
    <input
        type="file"
        data-slot="file-input"
        :data-size="size"
        :class="
            cn(
                inputVariants({ size }),
                'cursor-pointer overflow-hidden py-0 pl-0 file:mr-3 file:h-full file:cursor-pointer file:border-r file:border-input file:bg-ghostly file:text-foreground file:transition-colors file:px-3 file:font-medium enabled:hover:file:bg-ghostly-hover disabled:cursor-not-allowed disabled:file:cursor-not-allowed',
                size === 'sm' ? 'file:text-xs' : size === 'lg' ? 'file:text-base' : 'file:text-sm',
                props.class,
            )
        "
        :data-readonly="isReadonly || undefined"
        @click.capture="guard"
        @keydown.capture="guard"
        @drop.capture="guard"
        @change="onChange" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
import { useReadonlyField } from '../field/readonly';
import { inputVariants } from '../input';

const props = withDefaults(
    defineProps<{
        size?: 'sm' | 'default' | 'lg';
        class?: HTMLAttributes['class'];
        readonly?: boolean;
    }>(),
    { size: 'default' },
);
const { readonly: isReadonly, guard } = useReadonlyField(() => props.readonly);
const emit = defineEmits<{ files: [files: File[]] }>();

/** Expose selected files while retaining native file-input attributes and events. */
function onChange(event: Event): void {
    emit('files', Array.from((event.target as HTMLInputElement).files ?? []));
}
</script>
