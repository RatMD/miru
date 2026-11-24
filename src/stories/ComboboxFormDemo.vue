<template>
    <form class="w-80 space-y-4" @submit.prevent>
        <FormFieldRenderer :form="controller.form" :definition="definition" />
        <Button
            type="button"
            variant="outline"
            @click="snapshot = JSON.stringify(controller.form.state.values)">
            {{ labels.inspect }}
        </Button>
        <output data-test="form-values" class="block text-sm">{{ snapshot }}</output>
    </form>
</template>
<script setup lang="ts">
import type { ComboboxFieldDefinition } from '../components/form';
import { ref, computed } from 'vue';
import { z } from 'zod';
import { Button } from '../components/button';
import { FormFieldRenderer, literal } from '../components/form';
import { useForm } from '../composables';
const props = defineProps<{ locale: string }>();
const labels = computed(() =>
    props.locale === 'de'
        ? { project: 'Projekt', inspect: 'Formularwerte anzeigen' }
        : { project: 'Project', inspect: 'Show form values' },
);
const controller = useForm({
    schema: z.object({ project: z.string().nullable() }),
    initialValues: { project: null },
    submit: '/storybook-example',
    mode: 'json',
});
const definition = computed<ComboboxFieldDefinition>(() => ({
    type: 'combobox',
    name: 'project',
    label: literal(labels.value.project),
    clearable: true,
    options: [
        { value: 'workspace', label: literal('Workspace') },
        { value: 'default', label: literal('MIRU') },
        { value: 'portal', label: literal('Example App') },
    ],
}));
const snapshot = ref('');
</script>
