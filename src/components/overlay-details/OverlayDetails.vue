<template>
    <Overlay
        v-bind="$attrs"
        v-model:open="open"
        :title="title"
        :description="description"
        :loading="loading"
        :dismissible="dismissible"
        :width-class="widthClass"
        :size="size"
        flush>
        <template v-if="$slots.trigger" #trigger><slot name="trigger" /></template>
        <template v-if="$slots.description" #description><slot name="description" /></template>
        <div v-if="loading" class="p-6 text-sm text-muted-foreground" role="status">
            {{ trans('common.states.loading') }}
        </div>
        <div v-else-if="error" class="px-6 pb-6">
            <Alert variant="danger">
                <AlertDescription>{{ error }}</AlertDescription>
            </Alert>
        </div>
        <template v-else-if="sections.length">
            <Tabs
                v-if="sections.length > 1"
                v-model="selected"
                :tabs="tabs"
                :content="false"
                :aria-label="trans('common.code.sections')"
                inset />
            <CodePanel
                v-if="current"
                condensed
                :key="current.id"
                :value="current.value"
                :language="current.language ?? 'json'"
                :label="current.label"
                :format="format"
                :line-numbers="lineNumbers"
                :max-height="maxHeight"
                :class="['border-b-0', sections.length > 1 && 'border-t-0']" />
        </template>
        <p v-else class="px-6 pb-6 text-sm text-muted-foreground">
            {{ trans('common.states.empty') }}
        </p>
        <template #footer>
            <div class="flex justify-end">
                <Button variant="outline" :disabled="loading" @click="close">
                    <IconX aria-hidden="true" />
                    {{ trans('common.actions.close') }}
                </Button>
            </div>
        </template>
    </Overlay>
</template>
<script setup lang="ts">
import type { CodeSection } from '../code-panel';
import type { DialogSize } from '../dialog';
import { IconX } from '@tabler/icons-vue';
import { computed, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Alert, AlertDescription } from '../alert';
import { Button } from '../button';
import { CodePanel } from '../code-panel';
import { Overlay } from '../overlay';
import { Tabs } from '../tabs';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        title: string;
        description?: string;
        sections: readonly CodeSection[];
        loading?: boolean;
        error?: string;
        dismissible?: boolean;
        format?: boolean;
        lineNumbers?: boolean;
        maxHeight?: string | number;
        size?: DialogSize;
        widthClass?: string;
    }>(),
    {
        description: '',
        loading: false,
        error: '',
        dismissible: true,
        format: true,
        lineNumbers: true,
        maxHeight: 'min(55dvh,32rem)',
        size: '5xl',
    },
);
const open = defineModel<boolean>('open', { default: false });
const activeTab = defineModel<string>('activeTab');
const emit = defineEmits<{ close: [] }>();
const { trans } = useI18n();
const selected = computed({
    get: () =>
        props.sections.some((s) => s.id === activeTab.value)
            ? activeTab.value!
            : (props.sections[0]?.id ?? ''),
    set: (value) => (activeTab.value = value),
});
const current = computed(() => props.sections.find((s) => s.id === selected.value));
const tabs = computed(() => props.sections.map((s) => ({ value: s.id, label: s.label })));
watch(
    () => props.sections.map((s) => s.id),
    (ids) => {
        if (!ids.includes(activeTab.value ?? '')) activeTab.value = ids[0] ?? '';
    },
    { immediate: true },
);
function close(): void {
    if (props.loading) return;
    open.value = false;
    emit('close');
}
</script>
