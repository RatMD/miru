<template>
    <div class="ui-layout-demo">
        <div class="ui-layout-demo-controls mb-6 flex flex-wrap items-end gap-4">
            <Field class="w-52">
                <FieldLabel :for="deviceId">{{ copy.device }}</FieldLabel>
                <Select v-model="device">
                    <SelectTrigger :id="deviceId"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="item in devices" :key="item.value" :value="item.value">
                            {{ item.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </Field>
            <Field orientation="horizontal">
                <Switch :id="extraId" v-model="extras" />
                <FieldLabel :for="extraId">{{ copy.extra }}</FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <Switch :id="floatingId" v-model="floating" />
                <FieldLabel :for="floatingId">{{ copy.floating }}</FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <Switch :id="busyId" v-model="busy" />
                <FieldLabel :for="busyId">{{ copy.busy }}</FieldLabel>
            </Field>
        </div>
        <div class="ui-layout-demo-frame" :style="{ width: frameWidth }">
            <FormPageLayout
                v-model="active"
                :tabs="tabs"
                :navigation-label="copy.navigation"
                :actions-label="copy.actions"
                :primary-label="copy.save"
                :secondary-label="copy.cancel"
                :additional-actions="actions"
                :loading="busy"
                :show-actions="!standalone || active !== 'standalone'"
                @submit="feedback = copy.saved"
                @secondary="feedback = copy.cancelled"
                @action="feedback = copy.actionDone + ': ' + $event">
                <template #header>
                    <header>
                        <h1 class="text-2xl font-semibold">{{ copy.title }}</h1>
                        <p class="mt-2 text-sm text-muted-foreground">{{ copy.description }}</p>
                    </header>
                </template>
                <template #default="{ tab }">
                    <div class="space-y-6">
                        <p class="text-sm text-muted-foreground">{{ copy.hint }}</p>
                        <div
                            v-if="tab?.value === 'general'"
                            class="ui-layout-demo-fields grid grid-cols-1 gap-5">
                            <Field>
                                <FieldLabel :for="nameId">{{ copy.name }}</FieldLabel>
                                <Input :id="nameId" v-model="name" autocomplete="name" />
                            </Field>
                            <Field>
                                <FieldLabel :for="notesId">{{ copy.notes }}</FieldLabel>
                                <Input :id="notesId" v-model="notes" />
                            </Field>
                        </div>
                        <Field v-else-if="tab?.value === 'contact'">
                            <FieldLabel :for="emailId">{{ copy.email }}</FieldLabel>
                            <Input
                                :id="emailId"
                                v-model="email"
                                type="email"
                                autocomplete="email" />
                        </Field>
                        <Field v-else-if="tab?.value === 'settings'" orientation="horizontal">
                            <Switch :id="enabledId" v-model="enabled" />
                            <FieldLabel :for="enabledId">{{ copy.enabled }}</FieldLabel>
                        </Field>
                        <p v-else>{{ copy.standaloneHint }}</p>
                    </div>
                </template>
                <template v-if="floating" #floating-app-bar="barProps">
                    <FloatingAppBar
                        v-bind="barProps"
                        :label="copy.appNavigation"
                        variant="three"
                        :shape="hexagon ? 'rounded-hexagon' : 'circle'"
                        :appearance="hexagon ? 'gradient' : 'solid'"
                        :bordered="!hexagon">
                        <template #left>
                            <Button
                                type="button"
                                variant="ghost"
                                icon-only
                                :aria-label="copy.home"
                                @click="feedback = copy.home">
                                <IconHome class="size-5" />
                            </Button>
                        </template>
                        <template #primary>
                            <Button
                                type="button"
                                variant="primary"
                                icon-only
                                :aria-label="copy.search"
                                @click="feedback = copy.search">
                                <IconSearch class="size-5" />
                            </Button>
                        </template>
                        <template #right>
                            <Button
                                type="button"
                                variant="ghost"
                                icon-only
                                :aria-label="copy.profile"
                                @click="feedback = copy.profile">
                                <IconUser class="size-5" />
                            </Button>
                        </template>
                    </FloatingAppBar>
                </template>
            </FormPageLayout>
            <p role="status" class="mt-4 text-sm" data-test="layout-feedback">{{ feedback }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { FormPageAction } from '../layouts';
import { IconArchive, IconCopy, IconEye, IconHome, IconSearch, IconUser } from '@tabler/icons-vue';
import { computed, ref, useId, watch } from 'vue';
import { FloatingAppBar } from '../components/app-bar';
import { Button } from '../components/button';
import { Field, FieldLabel } from '../components/field';
import { Input } from '../components/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/select';
import { Switch } from '../components/switch';
import { FormPageLayout } from '../layouts';
import { formPageLayoutCopy } from './form-page-layout-copy';
const props = withDefaults(
    defineProps<{
        locale?: string;
        device?: string;
        additionalActions?: boolean;
        floatingAppBar?: boolean;
        loading?: boolean;
        standalone?: boolean;
        hexagon?: boolean;
    }>(),
    {
        locale: 'en',
        device: 'responsive',
        additionalActions: true,
        floatingAppBar: false,
        loading: false,
        standalone: false,
        hexagon: false,
    },
);
const copy = computed(() => formPageLayoutCopy[props.locale === 'de' ? 'de' : 'en']);
const device = ref(props.device);
const extras = ref(props.additionalActions);
const floating = ref(props.floatingAppBar);
const busy = ref(props.loading);
watch(
    () => props.device,
    (value) => (device.value = value),
);
watch(
    () => props.additionalActions,
    (value) => (extras.value = value),
);
watch(
    () => props.floatingAppBar,
    (value) => (floating.value = value),
);
watch(
    () => props.loading,
    (value) => (busy.value = value),
);
const devices = computed(() =>
    ['responsive', 'desktop', 'tablet', 'mobile'].map((value) => ({
        value,
        label: copy.value[value as 'responsive' | 'desktop' | 'tablet' | 'mobile'],
    })),
);
const frameWidth = computed(
    () => ({ desktop: '1440px', tablet: '820px', mobile: '390px' })[device.value] ?? '100%',
);
const tabs = computed(() => [
    ...['general', 'contact', 'settings'].map((value) => ({
        value,
        label: copy.value[value as 'general' | 'contact' | 'settings'],
    })),
    ...(props.standalone ? [{ value: 'standalone', label: copy.value.standalone }] : []),
]);
const actions = computed<FormPageAction[]>(() =>
    extras.value
        ? [
              { id: 'preview', label: copy.value.preview, icon: IconEye },
              { id: 'duplicate', label: copy.value.duplicate, icon: IconCopy },
              { id: 'archive', label: copy.value.archive, icon: IconArchive, variant: 'danger' },
          ]
        : [],
);
const active = ref('general');
const name = ref('Alex Morgan');
const email = ref('alex@example.com');
const notes = ref('');
const enabled = ref(true);
const feedback = ref('');
const deviceId = useId(),
    extraId = useId(),
    floatingId = useId(),
    busyId = useId(),
    nameId = useId(),
    notesId = useId(),
    emailId = useId(),
    enabledId = useId();
</script>
<style>
.ui-layout-demo {
    width: 100%;
}
.ui-layout-demo-controls > [data-slot='field'] {
    width: auto;
}
@container ui-form-page (min-width: 640px) {
    .ui-layout-demo-fields {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
.ui-layout-demo-frame {
    max-width: 100%;
    height: 680px;
    overflow: auto;
    position: relative;
    transform: translateZ(0);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    padding: 1.5rem;
    margin-inline: auto;
}
</style>
