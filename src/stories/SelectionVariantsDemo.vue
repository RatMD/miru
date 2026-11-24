<template>
    <div class="grid w-[min(42rem,calc(100vw-3rem))] gap-6">
        <div class="flex items-center gap-3 text-sm">
            <label class="flex items-center gap-3">
                Inherited variant
                <select
                    v-model="inherited"
                    class="rounded border border-border bg-background p-1 text-foreground">
                    <option value="">All colors</option>
                    <option v-for="variant in variants" :key="variant" :value="variant">
                        {{ variant }}
                    </option>
                </select>
            </label>
        </div>
        <div
            v-for="variant in variants"
            :key="variant"
            :data-variant-example="variant"
            class="grid gap-2">
            <p class="text-xs font-medium text-muted-foreground">{{ variant }}</p>
            <CheckboxGroup
                v-if="kind === 'checkbox'"
                :variant="inherited || variant"
                orientation="horizontal"
                :aria-label="variant">
                <Checkbox v-model="checked[variant]" label="Selected" />
                <Checkbox
                    model-value="indeterminate"
                    label="Mixed"
                    :variant="overrides ? 'danger' : undefined" />
                <Checkbox :model-value="true" label="Disabled" disabled />
            </CheckboxGroup>
            <RadioGroup
                v-else-if="kind === 'radio'"
                v-model="radios[variant]"
                :variant="inherited || variant"
                orientation="horizontal"
                :aria-label="variant">
                <RadioBox value="first" label="First" />
                <RadioBox
                    value="second"
                    label="Second"
                    :variant="overrides ? 'danger' : undefined" />
                <RadioBox value="third" label="Disabled" disabled />
            </RadioGroup>
            <InputTags
                v-else-if="kind === 'tags'"
                v-model="tags[variant]"
                :variant="inherited || variant">
                <InputTagsItem
                    v-for="(tag, index) in tags[variant]"
                    :key="tag"
                    :value="tag"
                    :variant="overrides && index === 1 ? 'danger' : undefined">
                    <InputTagsItemText />
                    <InputTagsItemDelete :aria-label="`Remove ${tag}`" aria-labelledby="" />
                </InputTagsItem>
                <InputTagsInput aria-label="Add a tag" placeholder="Add a tag" />
            </InputTags>
            <Tabs
                v-else
                v-model="tabs[variant]"
                :variant="inherited || variant"
                :aria-label="variant"
                :collapse-overflow="false"
                :content="false"
                :tabs="[
                    { value: 'overview', label: 'Overview' },
                    {
                        value: 'activity',
                        label: 'Activity',
                        variant: overrides ? 'danger' : undefined,
                    },
                    { value: 'disabled', label: 'Disabled', disabled: true },
                ]" />
        </div>
    </div>
</template>
<script setup lang="ts">
import type { InlineVariant } from '../components/inline-variants';
import { ref } from 'vue';
import { Checkbox } from '../components/checkbox';
import { CheckboxGroup } from '../components/checkbox-group';
import { inlineColorVariants as variants } from '../components/inline-variants';
import {
    InputTags,
    InputTagsInput,
    InputTagsItem,
    InputTagsItemDelete,
    InputTagsItemText,
} from '../components/input-tags';
import { RadioGroup } from '../components/radio-group';
import { RadioBox } from '../components/radiobox';
import { Tabs } from '../components/tabs';

defineProps<{ kind: 'checkbox' | 'radio' | 'tags' | 'tabs'; overrides?: boolean }>();
const inherited = ref<InlineVariant | ''>('');
function perVariant<T>(create: () => T): Record<InlineVariant, T> {
    return Object.fromEntries(variants.map((variant) => [variant, create()])) as Record<
        InlineVariant,
        T
    >;
}
const checked = ref(perVariant(() => true));
const radios = ref(perVariant(() => 'first'));
const tags = ref(perVariant(() => ['Vue', 'Miru']));
const tabs = ref(perVariant(() => 'overview'));
</script>
