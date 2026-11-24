<template>
    <div class="mx-auto w-full max-w-xl space-y-4">
        <Attachment
            :item="attachment"
            :locales="locales"
            :active-locale="editingLocale"
            @update:active-locale="editingLocale = $event as 'en' | 'de'">
            <template #fields>
                <form.Field :name="`translations.${editingLocale}.title`">
                    <template #default="{ field }">
                        <Field :invalid="field.state.meta.isTouched && !field.state.meta.isValid">
                            <FieldLabel :for="field.name" required>
                                {{ copy.title }} ({{ editingLocale.toUpperCase() }})
                            </FieldLabel>
                            <Input
                                :id="field.name"
                                :model-value="field.state.value"
                                :aria-invalid="
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                "
                                required
                                @blur="field.handleBlur"
                                @update:model-value="field.handleChange(String($event))" />
                            <FieldError
                                :errors="
                                    field.state.meta.isTouched ? field.state.meta.errors : []
                                " />
                        </Field>
                    </template>
                </form.Field>
                <form.Field :name="`translations.${editingLocale}.description`">
                    <template #default="{ field }">
                        <Field>
                            <FieldLabel :for="field.name">{{ copy.description }}</FieldLabel>
                            <Textarea
                                :id="field.name"
                                :rows="2"
                                :model-value="field.state.value"
                                @blur="field.handleBlur"
                                @update:model-value="field.handleChange(String($event))" />
                        </Field>
                    </template>
                </form.Field>
            </template>
        </Attachment>
        <Button variant="success" @click="validate">{{ copy.validate }}</Button>
        <p role="status" data-testid="attachment-form-result" class="text-sm">
            {{ feedback }}
        </p>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { z } from 'zod';
import { Attachment } from '../components/attachment';
import { Button } from '../components/button';
import { Field, FieldLabel, FieldError } from '../components/field';
import { literal } from '../components/form/types';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { useForm } from '../composables/useForm';
const props = defineProps<{ locale: string }>();
const copy = computed(() =>
    props.locale === 'de'
        ? {
              title: 'Titel',
              description: 'Beschreibung',
              validate: 'Prüfen',
              required: 'Bitte einen Titel eingeben.',
              valid: 'Gültig — es wurde keine Anfrage gesendet.',
              invalid: 'Bitte die markierten Felder prüfen.',
              english: 'Englisch',
              german: 'Deutsch',
          }
        : {
              title: 'Title',
              description: 'Description',
              validate: 'Validate',
              required: 'Enter a title.',
              valid: 'Valid — no request was sent.',
              invalid: 'Check the highlighted fields.',
              english: 'English',
              german: 'German',
          },
);
const metadata = z.object({
    title: z.string().min(1, copy.value.required),
    description: z.string(),
});
const controller = useForm({
    schema: z.object({ translations: z.object({ en: metadata, de: metadata }) }),
    initialValues: {
        translations: {
            en: { title: 'Project', description: '' },
            de: { title: 'Projekt', description: '' },
        },
    },
    submit: '/storybook-attachment',
    mode: 'json',
});
const form = controller.form;
const values = form.useSelector((state) => state.values);
const attachment = computed(() => ({
    id: 'form',
    name: 'project.pdf',
    mimeType: 'application/pdf',
    size: 4096,
    translations: values.value.translations,
}));
const editingLocale = ref<'en' | 'de'>(props.locale === 'de' ? 'de' : 'en');
const locales = computed(() => [
    { value: 'en', label: literal(copy.value.english) },
    { value: 'de', label: literal(copy.value.german) },
]);
const feedback = ref('');
async function validate() {
    await form.validate('submit');
    for (const name of ['translations.en.title', 'translations.de.title'] as const)
        form.setFieldMeta(name, (meta) => ({ ...meta, isTouched: true }));
    feedback.value = form.state.isValid ? copy.value.valid : copy.value.invalid;
}
</script>
