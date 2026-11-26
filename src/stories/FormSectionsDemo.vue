<template>
    <Form
        title="Project settings"
        :form="controller.form"
        :sections="sections"
        :actions-label="literal('Actions')"
        :section-selector-label="literal('Sections')"
        cancel-href="#cancel"
        @submit="saved = true">
        <template #section-project-before>
            <div class="rounded-lg border border-border bg-muted/30 p-4 text-sm">
                Section · before slot
            </div>
        </template>
        <template #section-project-actions>
            <Button variant="outline" size="sm" @click="controller.form.setFieldValue('name', '')">
                Reset
            </Button>
        </template>
        <template #section-project-after>
            <p role="status" class="text-sm text-muted-foreground">
                {{ saved ? 'Saved locally ✓' : 'Section · after slot' }}
            </p>
        </template>
        <template #field-preview="{ field }">
            <div class="rounded-lg border border-dashed border-border p-6">
                <Badge variant="primary">Custom field slot</Badge>
                <p class="mt-3 font-medium">{{ field.state.value || 'Untitled project' }}</p>
            </div>
        </template>
    </Form>
</template>
<script setup lang="ts">
import type { FormSectionDefinition } from '../components/form';
import { ref } from 'vue';
import { z } from 'zod';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Form, literal } from '../components/form';
import { useForm } from '../composables/useForm';
const controller = useForm({
    schema: z.object({ name: z.string() }),
    initialValues: { name: 'MIRU' },
    submit: '/unused',
    adapter: 'ajax',
});
const saved = ref(false);
const sections: FormSectionDefinition[] = [
    {
        id: 'project',
        label: literal('Project'),
        title: literal('Section title'),
        description: literal('Description · header action · before and after slots'),
        fields: [
            {
                type: 'header',
                id: 'identity',
                title: literal('Field group'),
                description: literal('Header inside the grid'),
            },
            { type: 'input', name: 'name', label: literal('Project name') },
        ],
    },
    {
        id: 'preview',
        label: literal('Standalone preview'),
        standalone: true,
        hideHeader: true,
        fields: [{ type: 'custom', name: 'name', slot: 'preview' }],
    },
];
</script>
