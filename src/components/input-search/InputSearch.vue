<template>
    <div data-slot="input-search" :class="cn('relative', props.class)">
        <IconSearch
            aria-hidden="true"
            :class="
                cn(
                    'pointer-events-none absolute size-4 text-muted-foreground',
                    iconAlign === 'top'
                        ? 'top-2 left-3'
                        : size === 'sm'
                          ? 'top-1/2 left-2.5 -translate-y-1/2'
                          : 'top-1/2 left-3 -translate-y-1/2',
                )
            " />
        <Input
            v-bind="$attrs"
            ref="input"
            v-model="modelValue"
            :size="size"
            :disabled="disabled"
            :readonly="readonly"
            :class="
                cn(
                    size === 'sm' && iconAlign !== 'top' ? 'pl-8' : 'pl-9',
                    hasValue && !readonly && 'pr-9',
                    inputClass,
                )
            " />
        <Button
            v-if="hasValue && !readonly"
            type="button"
            variant="ghost"
            size="xs"
            icon-only
            class="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground"
            :disabled="disabled"
            :aria-label="trans('common.datatable.clear_search')"
            :title="trans('common.datatable.clear_search')"
            @mousedown.prevent
            @click="clear">
            <IconX aria-hidden="true" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { IconSearch, IconX } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import { Input } from '../input';
defineOptions({ inheritAttrs: false });

const props = defineProps<{
    size?: 'default' | 'sm' | 'lg';
    disabled?: boolean;
    readonly?: boolean;
    iconAlign?: 'center' | 'top';
    class?: HTMLAttributes['class'];
    inputClass?: HTMLAttributes['class'];
}>();
const modelValue = defineModel<string | number>();
const input = ref<InstanceType<typeof Input>>();
const hasValue = computed(() => String(modelValue.value ?? '').length > 0);

function clear(): void {
    if (props.disabled || props.readonly) return;
    modelValue.value = '';
    input.value?.$el.focus();
}

const { trans } = useI18n();
</script>
