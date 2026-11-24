<template>
    <div class="w-full max-w-3xl space-y-4">
        <EditorJson
            v-if="kind === 'json'"
            v-bind="args"
            v-model="json"
            :label="trans('common.editors.json')"
            @validation="valid = $event.valid" />
        <EditorMarkdown
            v-else-if="kind === 'markdown'"
            v-bind="args"
            v-model="markdown"
            :label="trans('common.editors.markdown')" />
        <UploadZone
            v-else
            v-bind="args"
            v-model="images"
            gallery
            :title="trans('common.gallery.order')"
            :description="trans('common.gallery.hint')" />
        <output
            data-testid="editor-value"
            class="block whitespace-pre-wrap break-all text-xs text-muted-foreground">
            {{
                kind === 'json'
                    ? json
                    : kind === 'markdown'
                      ? markdown
                      : images.map((image) => image.title).join(', ')
            }}
        </output>
    </div>
</template>
<script setup lang="ts">
import type { UploadImage } from '../index';
import { ref } from 'vue';
import { useI18n } from '../composables/useI18n';
import { EditorJson, EditorMarkdown, UploadZone } from '../index';
const props = defineProps<{
    kind: 'json' | 'markdown' | 'gallery';
    args: Record<string, unknown>;
}>();
const { trans } = useI18n();
const json = ref(props.args.invalidExample ? '{"status": }' : '{"status":"ready","items":[1,2,3]}');
const markdown = ref('MIRU');
const valid = ref(true);
const images = ref<UploadImage[]>(
    ['A', 'B', 'C'].map((title, index) => ({
        id: title,
        title,
        url:
            'data:image/svg+xml,' +
            encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${['#2563eb', '#059669', '#eab308'][index]}"/><text x="100" y="115" text-anchor="middle" fill="white" font-size="48">${title}</text></svg>`,
            ),
    })),
);
</script>
