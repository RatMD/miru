<template>
    <AutocompleteRoot
        v-bind="{ ...forwarded, ...(readonly ? { open: false } : {}) }"
        data-slot="auto-complete"
        :class="cn('w-full', props.wrapperClass)">
        <slot>
            <AutoCompleteAnchor class="relative w-full">
                <AutoCompleteInput
                    v-bind="$attrs"
                    :readonly="readonly"
                    :id="id"
                    :size="size"
                    :placeholder="placeholder"
                    :aria-label="ariaLabel"
                    :aria-busy="loading || undefined"
                    :class="cn(clearable || loading ? 'pr-9' : undefined, props.class)" />
                <Spinner
                    v-if="loading"
                    decorative
                    size="sm"
                    class="absolute top-1/2 right-3 -translate-y-1/2" />
                <AutocompleteCancel v-else-if="clearable" as-child>
                    <button
                        type="button"
                        :disabled="disabled || readonly"
                        :aria-label="trans('common.autocomplete.clear')"
                        class="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">
                        <IconX class="size-4" />
                    </button>
                </AutocompleteCancel>
            </AutoCompleteAnchor>
            <AutoCompleteList>
                <AutoCompleteViewport class="max-h-64 overflow-y-auto">
                    <AutoCompleteEmpty>
                        {{
                            loading
                                ? trans('common.states.loading')
                                : emptyText || trans('common.autocomplete.empty')
                        }}
                    </AutoCompleteEmpty>
                    <AutoCompleteItem v-for="option in options" :key="option" :value="option">
                        {{ option }}
                    </AutoCompleteItem>
                </AutoCompleteViewport>
            </AutoCompleteList>
        </slot>
    </AutocompleteRoot>
</template>
<script setup lang="ts">
import type { AutocompleteRootProps, AutocompleteRootEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconX } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { AutocompleteRoot, AutocompleteCancel, useForwardPropsEmits } from 'reka-ui';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Spinner } from '../spinner';
import AutoCompleteAnchor from './AutoCompleteAnchor.vue';
import AutoCompleteEmpty from './AutoCompleteEmpty.vue';
import AutoCompleteInput from './AutoCompleteInput.vue';
import AutoCompleteItem from './AutoCompleteItem.vue';
import AutoCompleteList from './AutoCompleteList.vue';
import AutoCompleteViewport from './AutoCompleteViewport.vue';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<
        AutocompleteRootProps & {
            options?: readonly string[];
            id?: string;
            placeholder?: string;
            ariaLabel?: string;
            size?: 'sm' | 'default' | 'lg';
            clearable?: boolean;
            loading?: boolean;
            emptyText?: string;
            class?: HTMLAttributes['class'];
            wrapperClass?: HTMLAttributes['class'];
            readonly?: boolean;
        }
    >(),
    { options: () => [], size: 'default', clearable: false, loading: false },
);
const emit = defineEmits<AutocompleteRootEmits>();
const forwarded = useForwardPropsEmits(
    reactiveOmit(
        props,
        'options',
        'id',
        'placeholder',
        'ariaLabel',
        'size',
        'clearable',
        'loading',
        'emptyText',
        'class',
        'wrapperClass',
        'readonly',
    ),
    emit,
);
const { trans } = useI18n();
</script>
