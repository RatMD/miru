<template>
    <div>
        <FormLayout
            :title="heading"
            :description="description || copy.description"
            :form="controller.form"
            :sections="sections"
            :localization="localization"
            cancel-href="#cancel"
            :loading="loading"
            :form-error="formError"
            :actions-label="literal(copy.actions)"
            :section-selector-label="literal(copy.section)"
            :save-label="literal(copy.save)"
            :cancel-label="literal(copy.cancel)"
            :additional-actions="actions"
            @submit="validate"
            @action="feedback = copy.extraDone + ': ' + String($event)">
            <template v-for="widget in widgets" :key="widget" #[`field-${widget}`]="{ field }">
                <FormWidgetDemo
                    :widget="widget"
                    :field="field"
                    :locale="locale"
                    :label="copy[widget as keyof typeof copy] || widget" />
            </template>
        </FormLayout>
        <p role="status" data-test="form-feedback" class="mt-4 text-sm">{{ feedback }}</p>
    </div>
</template>
<script setup lang="ts">
import type { FormSectionDefinition, FormActionDefinition } from '../components/form';
import { IconEye, IconCopy, IconDownload, IconArchive } from '@tabler/icons-vue';
import { computed, ref, onMounted, nextTick } from 'vue';
import { z } from 'zod';
import { FormLayout, literal } from '../components/form';
import { useForm } from '../composables';
import { formShowcaseCopy } from './form-showcase-copy';
import FormWidgetDemo from './FormWidgetDemo.vue';
const props = withDefaults(
    defineProps<{
        locale?: string;
        title?: string;
        description?: string;
        loading?: boolean;
        formError?: string;
        withErrors?: boolean;
        generator?: boolean;
    }>(),
    { locale: 'en', generator: false, withErrors: false },
);
const copy = computed(() => formShowcaseCopy[props.locale === 'de' ? 'de' : 'en']);
const heading = computed(() =>
    props.title && props.title !== 'Example profile' ? props.title : copy.value.title,
);
const initial = {
    name: 'Alex Morgan',
    email: 'alex@example.com',
    translations: {
        en: { headline: 'English headline', teaser: 'English teaser' },
        de: { headline: 'Deutsche Überschrift', teaser: 'Deutscher Kurztext' },
    },
    password: '',
    date: '2026-11-17',
    notes: '',
    json: '{"status":"ready"}',
    markdown: '# MIRU',
    richtext: '<p>MIRU</p>',
    status: 'active',
    project: null as string | null,
    category: null as string | null,
    accept: false,
    enabled: true,
    choices: ['first'],
    radio: 'first',
    search: '',
    phone: '+49123456789',
    otp: '',
    number: 2,
    tags: ['MIRU'],
    color: '#4f46e5',
    time: '09:30',
    datetime: '2026-11-17T09:30',
    calendar: '2026-11-17',
    rangeCalendar: { start: '2026-11-17', end: '2026-11-20' },
    file: [],
    upload: [],
    images: [],
    toggle: false,
    toggleGroup: 'first',
    range: { start: '2026-11-17T09:00', end: '2026-11-17T10:00' },
    repeater: [{ id: 'first', name: 'MIRU' }],
    relationships: ['workspace'],
    summary: [],
    grid1: '',
    grid2: '',
    grid3: '',
    grid4: '',
    grid5: '',
};
const schema = z.object({
    ...Object.fromEntries(Object.keys(initial).map((key) => [key, z.unknown()])),
    json: z.string().refine(
        (value) => {
            try {
                JSON.parse(value);
                return true;
            } catch {
                return false;
            }
        },
        { error: copy.value.invalidJson },
    ),
    accept: z.boolean().refine((value) => value, { error: copy.value.accept }),
    name: z.string().min(2, copy.value.invalidName),
    email: z.email(copy.value.invalidEmail),
    translations: z.object({
        en: z.object({ headline: z.string().min(1, copy.value.invalidTitle), teaser: z.string() }),
        de: z.object({ headline: z.string().min(1, copy.value.invalidTitle), teaser: z.string() }),
    }),
});
const controller = useForm({
    schema,
    initialValues: initial,
    submit: '/storybook-example',
    mode: 'json',
});
const localization = computed(() => ({
    locales: [
        { value: 'en', label: literal(copy.value.english) },
        { value: 'de', label: literal(copy.value.german) },
    ],
    baseLocale: 'en',
    initialLocale: props.locale,
}));
const actions = computed<FormActionDefinition[]>(() => [
    { id: 'preview', label: literal(copy.value.preview), icon: IconEye },
    { id: 'duplicate', label: literal(copy.value.duplicate), icon: IconCopy },
    { id: 'export', label: literal(copy.value.export), icon: IconDownload },
    { id: 'archive', label: literal(copy.value.archive), icon: IconArchive, variant: 'danger' },
]);
const widgets = [
    'search',
    'phone',
    'otp',
    'number',
    'tags',
    'color',
    'time',
    'datetime',
    'calendar',
    'rangeCalendar',
    'file',
    'upload',
    'images',
    'toggle',
    'toggleGroup',
    'range',
    'repeater',
    'relationships',
    'summary',
];
const sections = computed<FormSectionDefinition[]>(() => {
    const c = copy.value,
        text = (key: keyof typeof c) => literal(c[key]);
    const general: FormSectionDefinition = {
        id: 'general',
        label: text('general'),
        fields: [
            { type: 'header', id: 'contact', title: text('basicHeading'), span: 12 },
            { type: 'input', name: 'name', label: text('name'), required: true, span: 6 },
            {
                type: 'input',
                inputType: 'email',
                name: 'email',
                label: text('email'),
                required: true,
                span: 6,
            },
            { type: 'spacer', id: 'space', span: 12 },
            {
                type: 'switch',
                name: 'enabled',
                label: text('enabled'),
                description: text('fieldHint'),
            },
        ],
    };
    const translations: FormSectionDefinition = {
        id: 'translations',
        label: text('translations'),
        fields: [
            {
                type: 'input',
                name: 'headline',
                label: text('headline'),
                localized: true,
                required: true,
                counter: true,
                maxLength: 100,
            },
            {
                type: 'textarea',
                name: 'teaser',
                label: text('teaser'),
                localized: true,
                span: 12,
                rows: 3,
            },
        ],
    };
    const selection: FormSectionDefinition = {
        id: 'selection',
        label: text('selection'),
        fields: [
            {
                type: 'select',
                name: 'status',
                label: text('status'),
                clearable: true,
                options: [
                    {
                        value: 'active',
                        label: text('first'),
                        color: '#059669',
                        group: text('first'),
                    },
                    { value: 'draft', label: text('second'), group: text('second') },
                    { value: 'disabled', label: text('third'), disabled: true },
                ],
            },
            {
                type: 'combobox',
                name: 'project',
                label: text('project'),
                clearable: true,
                options: [
                    { value: 'workspace', label: literal('Workspace') },
                    { value: 'portal', label: literal('Example App') },
                ],
            },
            {
                type: 'category',
                name: 'category',
                label: text('category'),
                allowNone: true,
                options: [
                    { value: 'root', label: c.first, depth: 0 },
                    { value: 'child', label: c.second, depth: 1, parent_id: 'root' },
                ],
            },
            { type: 'checkbox', name: 'accept', label: text('accept'), required: true },
            {
                type: 'checkbox-group',
                name: 'choices',
                label: text('choices'),
                options: [
                    { value: 'first', label: text('first') },
                    { value: 'second', label: text('second') },
                ],
            },
            {
                type: 'radio',
                name: 'radio',
                label: text('status'),
                options: [
                    { value: 'first', label: text('first') },
                    { value: 'second', label: text('second') },
                ],
            },
        ],
    };
    if (!props.generator) return [general, translations, selection];
    const content: FormSectionDefinition = {
        id: 'content',
        label: text('content'),
        fields: [
            { type: 'header', id: 'content', title: text('contentHeading') },
            { type: 'password', name: 'password', label: text('password'), span: 6 },
            { type: 'date', name: 'date', label: text('date'), allowFuture: true, span: 6 },
            {
                type: 'textarea',
                name: 'notes',
                label: text('notes'),
                maxLength: 250,
                counter: true,
            },
            { type: 'json', name: 'json', label: text('json') },
            {
                type: 'markdown',
                name: 'markdown',
                label: literal('Markdown'),
                markdownSyntax: 'kleinanzeigen',
            },
            { type: 'richtext', name: 'richtext', label: text('richtext') },
        ],
    };
    const custom = (keys: string[]) =>
        keys.map((widget) => ({
            type: 'custom' as const,
            name: widget,
            slot: widget,
            label: literal(c[widget as keyof typeof c]),
            span: 12 as const,
        }));
    const special: FormSectionDefinition = {
        id: 'special',
        label: text('special'),
        fields: custom([
            'search',
            'phone',
            'otp',
            'number',
            'tags',
            'color',
            'time',
            'datetime',
            'toggle',
            'toggleGroup',
        ]),
    };
    const dates: FormSectionDefinition = {
        id: 'dates',
        label: text('range'),
        fields: custom(['calendar', 'rangeCalendar', 'range']),
    };
    const files: FormSectionDefinition = {
        id: 'files',
        label: text('files'),
        fields: custom(['file', 'upload', 'images']),
    };
    const relations: FormSectionDefinition = {
        id: 'relations',
        label: text('relations'),
        fields: custom(['repeater', 'relationships', 'summary']),
    };
    const grid: FormSectionDefinition = {
        id: 'grid',
        label: text('grid'),
        gridColumns: 10,
        fields: [
            { type: 'header', id: 'grid-heading', title: text('grid'), span: 10 },
            ...[1, 2, 3, 4, 5].map((n) => ({
                type: 'input' as const,
                name: 'grid' + n,
                label: literal(String(n) + ' / 5'),
                span: 2 as const,
            })),
            { type: 'spacer', id: 'grid-space', span: 2 },
        ],
    };
    return [general, translations, selection, content, special, dates, files, relations, grid];
});
const feedback = ref('');
async function validate() {
    await controller.form.validate('submit');
    for (const name of [
        'accept',
        'name',
        'email',
        'translations.en.headline',
        'translations.de.headline',
    ] as const)
        controller.form.setFieldMeta(name, (current) => ({ ...current, isTouched: true }));
    feedback.value = controller.form.state.isValid ? copy.value.valid : copy.value.invalid;
}
onMounted(async () => {
    if (!props.withErrors) return;
    await nextTick();
    for (const [path, message] of [
        ['email', copy.value.invalidEmail],
        ['translations.de.headline', copy.value.invalidTitle],
    ] as const)
        controller.form.setFieldMeta(path, (current) => ({
            ...current,
            isTouched: true,
            errors: [message],
            errorMap: { onSubmit: message },
        }));
});
</script>
