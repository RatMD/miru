<template>
    <Description
        v-if="errors.length"
        :title="trans('common.form.validation_errors', { count: errors.length })"
        :description="trans('common.form.validation_errors_description', { section: sectionLabel })"
        side="right"
        breakpoint="(min-width: 1024px)">
        <template #trigger>
            <Button
                variant="danger"
                size="xs"
                data-slot="form-error-badge"
                v-bind="$attrs"
                type="button"
                class="h-5 gap-1 min-w-5 cursor-pointer items-center justify-center rounded-full bg-danger px-1.5 text-[10px] leading-5 font-semibold text-danger-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                :aria-label="trans('common.form.validation_errors', { count: errors.length })"
                @click.stop>
                <IconInfoCircle aria-hidden="true" class="size-3" />
                <span>{{ errors.length }}</span>
            </Button>
        </template>
        <ul class="space-y-3">
            <li v-for="error in errors" :key="error.field" class="space-y-1">
                <code class="block text-xs break-all text-foreground">{{ error.field }}</code>
                <FieldError :errors="error.messages" />
            </li>
        </ul>
    </Description>
</template>

<script setup lang="ts">
import { IconInfoCircle } from '@tabler/icons-vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Description } from '../description';
import { FieldError } from '../field';
defineOptions({ inheritAttrs: false });
defineProps<{
    sectionLabel: string;
    errors: { field: string; messages: string[] }[];
}>();

const { trans } = useI18n();
</script>
