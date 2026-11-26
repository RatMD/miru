<template>
    <Field
        :valid="field.state.meta.isTouched && field.state.meta.isValid"
        :invalid="field.state.meta.errors.length > 0">
        <FieldLabel :for="field.name">{{ label }}</FieldLabel>
        <InputSearch
            v-if="widget === 'search'"
            :id="field.name"
            :model-value="text"
            :aria-label="label"
            @blur="field.handleBlur"
            @update:model-value="field.handleChange($event)" />
        <InputPhone
            v-else-if="widget === 'phone'"
            :id="field.name"
            :model-value="text"
            :aria-label="label"
            :placeholder="label"
            :country-code-label="copy.country"
            :countries="[
                { value: 'de', label: copy.germany, callingCode: '+49', pinned: true },
                { value: 'gb', label: copy.uk, callingCode: '+44', pinned: false },
            ]"
            @update:model-value="field.handleChange($event)" />
        <InputPin
            v-else-if="widget === 'otp'"
            :id="field.name"
            :model-value="text"
            :maxlength="6"
            :aria-label="label"
            @blur="field.handleBlur"
            @update:model-value="field.handleChange($event)">
            <InputPinGroup><InputPinSlot v-for="n in 6" :key="n" :index="n - 1" /></InputPinGroup>
        </InputPin>
        <InputNumber
            v-else-if="widget === 'number'"
            :model-value="Number(field.state.value) || 0"
            :min="0"
            :locale="locale"
            @update:model-value="field.handleChange($event)">
            <InputNumberContent>
                <InputNumberDecrement :aria-label="copy.remove" />
                <InputNumberInput :aria-label="label" />
                <InputNumberIncrement :aria-label="copy.add" />
            </InputNumberContent>
        </InputNumber>
        <InputTags
            v-else-if="widget === 'tags'"
            :model-value="strings"
            @update:model-value="field.handleChange($event)">
            <InputTagsItem v-for="tag in strings" :key="tag" :value="tag">
                <InputTagsItemText />
                <InputTagsItemDelete :aria-label="copy.remove" aria-labelledby="" />
            </InputTagsItem>
            <InputTagsInput :aria-label="label" :placeholder="label" />
        </InputTags>
        <ColorPicker
            v-else-if="widget === 'color'"
            :model-value="text"
            :ariaLabel="label"
            @update:model-value="field.handleChange($event)" />
        <InputDateTime
            mode="time"
            v-else-if="widget === 'time'"
            :model-value="text"
            :aria-label="label"
            @update:model-value="field.handleChange($event)" />
        <InputDateTime
            v-else-if="widget === 'datetime'"
            :model-value="text || null"
            :locale="locale"
            :aria-label="label"
            :placeholder="label"
            @update:model-value="field.handleChange($event)" />
        <Calendar
            v-else-if="widget === 'calendar'"
            :model-value="calendarValue"
            :locale="locale"
            @update:model-value="field.handleChange($event?.toString() ?? '')" />
        <Calendar
            v-else-if="widget === 'rangeCalendar'"
            range
            :model-value="calendarRange"
            :locale="locale"
            @update:model-value="
                field.handleChange({
                    start: $event.start?.toString() ?? '',
                    end: $event.end?.toString() ?? '',
                })
            " />
        <InputFile
            v-else-if="widget === 'file'"
            :aria-label="label"
            @files="field.handleChange($event)" />
        <UploadZone
            v-else-if="widget === 'upload'"
            :title="copy.upload"
            :description="copy.uploadHint"
            @files="field.handleChange($event)" />
        <UploadZone
            v-else-if="widget === 'images'"
            gallery
            :model-value="uploadImages"
            :title="copy.images"
            :description="copy.uploadHint"
            @update:model-value="field.handleChange($event)" />
        <Toggle
            v-else-if="widget === 'toggle'"
            :model-value="!!field.state.value"
            :aria-label="label"
            @update:model-value="field.handleChange($event)">
            <IconBold class="size-4" />
        </Toggle>
        <ToggleGroup
            v-else-if="widget === 'toggleGroup'"
            type="single"
            :model-value="text"
            :aria-label="label"
            @update:model-value="field.handleChange($event)">
            <ToggleGroupItem value="first">{{ copy.first }}</ToggleGroupItem>
            <ToggleGroupItem value="second">{{ copy.second }}</ToggleGroupItem>
        </ToggleGroup>
        <FormDateTimeRangeField
            v-else-if="widget === 'range'"
            :start="range.start"
            :end="range.end"
            :all-day="false"
            :locale="locale"
            :range-label="copy.range"
            :range-hint="copy.rangeHint"
            :start-time-label="copy.startTime"
            :end-time-label="copy.endTime"
            @update:start="field.handleChange({ ...range, start: $event })"
            @update:end="field.handleChange({ ...range, end: $event })" />
        <FormRepeater
            v-else-if="widget === 'repeater'"
            :items="items"
            accordion
            :add-label="literal(copy.add)"
            :remove-label="literal(copy.remove)"
            @add="field.handleChange([...items, { id: String(Date.now()), name: '' }])"
            @remove="field.handleChange(items.filter((_, index) => index !== $event))">
            <template #item="{ item, index }">
                <Input
                    :model-value="item.name"
                    :aria-label="copy.item + ' ' + (index + 1)"
                    @update:model-value="
                        field.handleChange(
                            items.map((old, i) =>
                                i === index ? { ...old, name: String($event) } : old,
                            ),
                        )
                    " />
            </template>
        </FormRepeater>
        <FormRelationshipPicker
            v-else-if="widget === 'relationships'"
            :model-value="strings"
            :options="projects"
            @update:model-value="field.handleChange($event)" />
        <FormRelationSummary
            v-else-if="widget === 'summary'"
            :items="[
                { id: 'workspace', label: 'Workspace', description: copy.fieldHint },
                { id: 'portal', label: 'Example App', description: copy.fieldHint },
            ]" />
        <FieldError v-if="field.state.meta.errors.length" :errors="field.state.meta.errors" />
    </Field>
</template>
<script setup lang="ts">
import type { UploadImage } from '../components/sortable-image-gallery';
import type { AnyFieldApi } from '@tanstack/vue-form';
import { parseDate } from '@internationalized/date';
import { IconBold } from '@tabler/icons-vue';
import { computed } from 'vue';
import {
    Field,
    FieldLabel,
    FieldError,
    InputSearch,
    InputPhone,
    InputPin,
    InputPinGroup,
    InputPinSlot,
    InputNumber,
    InputNumberContent,
    InputNumberInput,
    InputNumberDecrement,
    InputNumberIncrement,
    InputTags,
    InputTagsItem,
    InputTagsItemText,
    InputTagsItemDelete,
    InputTagsInput,
    ColorPicker,
    InputDateTime,
    Calendar,
    InputFile,
    UploadZone,
    Toggle,
    ToggleGroup,
    ToggleGroupItem,
    FormDateTimeRangeField,
    FormRepeater,
    FormRelationshipPicker,
    FormRelationSummary,
    Input,
    literal,
} from '../index';
import { formShowcaseCopy } from './form-showcase-copy';
const props = defineProps<{ widget: string; field: AnyFieldApi; locale: string; label: string }>();
const copy = computed(() => formShowcaseCopy[props.locale === 'de' ? 'de' : 'en']);
const text = computed(() => String(props.field.state.value ?? ''));
const strings = computed<string[]>(() =>
    Array.isArray(props.field.state.value) ? props.field.state.value : [],
);
// Keep serializable values in the form; Calendar receives DateValue instances only.
const calendarValue = computed(() => (text.value ? parseDate(text.value) : undefined));
const calendarRange = computed(() => {
    const value = props.field.state.value as { start?: string; end?: string } | undefined;
    return {
        start: value?.start ? parseDate(value.start) : undefined,
        end: value?.end ? parseDate(value.end) : undefined,
    };
});
const range = computed(() => props.field.state.value as { start: string; end: string | null });
const uploadImages = computed(() => props.field.state.value as UploadImage[]);
const items = computed(() => props.field.state.value as { id: string; name: string }[]);
const projects = [
    { value: 'workspace', label: literal('Workspace') },
    { value: 'portal', label: literal('Example App') },
];
</script>
