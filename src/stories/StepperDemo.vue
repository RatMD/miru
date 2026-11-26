<template>
    <div class="w-full max-w-5xl" :class="mobilePreview && 'max-w-[375px]'">
        <div :class="page ? 'rounded-xl border border-border bg-background p-5 sm:p-8' : ''">
            <div v-if="page" class="mb-7 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 class="text-xl font-semibold">
                        {{ de ? 'Neuer Versandauftrag' : 'New shipment' }}
                    </h2>
                    <p class="mt-1 text-sm text-muted-foreground">
                        {{
                            de
                                ? 'Auftrag Schritt für Schritt erfassen.'
                                : 'Create your order step by step.'
                        }}
                    </p>
                </div>
                <Badge variant="outline">{{ de ? 'Entwurf' : 'Draft' }}</Badge>
            </div>
            <Stepper
                v-model="current"
                ref="stepper"
                :orientation="orientation"
                :variant="variant"
                :size="size"
                :color="color"
                :completed-color="completedColor"
                :inactive-appearance="inactiveAppearance"
                :mobile="mobilePreview ? true : undefined"
                :mobile-layout="mobileLayout"
                :mobile-breakpoint="Number(args.mobileBreakpoint ?? 640)"
                :linear="args.linear !== false"
                :disabled="!!args.disabled"
                :loading="!!args.loading"
                :error="String(args.error || '')"
                :before-next="validate"
                :before-change="beforeChange"
                @complete="completed = true"
                @error="failures++"
                v-slot="state">
                <StepperList>
                    <StepperItem
                        v-for="(item, index) in items"
                        :key="item.step"
                        :step="item.step"
                        :disabled="Number(args.disabledStep || 0) === item.step"
                        :error="Number(args.errorStep || 0) === item.step"
                        :completed="completed"
                        v-slot="itemState">
                        <StepperTrigger>
                            <StepperIndicator
                                :icon="args.icons ? item.icon : undefined"
                                :show-check="args.showCheck !== false" />
                            <StepperLabel>
                                <StepperTitle>{{ item.title }}</StepperTitle>
                                <StepperDescription v-if="args.descriptions !== false">
                                    {{ item.description }}
                                </StepperDescription>
                            </StepperLabel>
                        </StepperTrigger>
                        <StepperSeparator v-if="index < items.length - 1" />
                        <StepperContent v-if="inline" force-mount>
                            <StepperDemoContent
                                :step="item.step"
                                v-model="name"
                                v-model:delivery="delivery"
                                :de="de"
                                :disabled="state.busy || !!args.disabled"
                                :invalid="!!itemState.error" />
                        </StepperContent>
                    </StepperItem>
                </StepperList>
                <template v-if="!inline && args.showContent !== false">
                    <StepperContent
                        v-for="item in items"
                        :key="item.step"
                        :step="item.step"
                        force-mount>
                        <StepperDemoContent
                            :step="item.step"
                            v-model="name"
                            v-model:delivery="delivery"
                            :de="de"
                            :disabled="state.busy || !!args.disabled"
                            :invalid="!!state.error" />
                    </StepperContent>
                </template>
                <StepperActions
                    v-if="args.showActions !== false"
                    :show-previous="args.showPrevious !== false"
                    :complete-label="de ? 'Auftrag abschließen' : 'Complete order'" />
            </Stepper>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
            <Button
                v-if="validation !== 'none'"
                size="sm"
                variant="outline"
                @click="name = 'Alex Morgan'">
                {{ de ? 'Beispieldaten einsetzen' : 'Fill example data' }}
            </Button>
            <Button size="sm" variant="outline" @click="reset">
                {{ de ? 'Zurücksetzen' : 'Reset' }}
            </Button>
        </div>
        <output
            class="mt-3 block rounded-md border border-border bg-muted/30 p-3 text-xs"
            data-testid="stepper-state">
            {{ de ? 'Schritt' : 'Step' }}: {{ current }} · {{ de ? 'Gespeichert' : 'Saved' }}:
            {{ completed ? 'yes' : '—' }}
        </output>
        <output class="sr-only" data-testid="stepper-validation-calls">{{ calls }}</output>
        <output class="sr-only" data-testid="stepper-failures">{{ failures }}</output>
    </div>
</template>
<script setup lang="ts">
import type {
    StepperApi,
    StepperColor,
    StepperMobileLayout,
    StepperTransition,
    StepperVariant,
} from '../components/stepper';
import { IconUser, IconTruck, IconChecklist, IconCheck } from '@tabler/icons-vue';
import { computed, ref, watch } from 'vue';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import {
    Stepper,
    StepperList,
    StepperItem,
    StepperTrigger,
    StepperIndicator,
    StepperTitle,
    StepperLabel,
    StepperDescription,
    StepperSeparator,
    StepperContent,
    StepperActions,
} from '../components/stepper';
import StepperDemoContent from './StepperDemoContent.vue';
const props = withDefaults(
    defineProps<{
        args: Record<string, unknown>;
        locale: string;
        inline?: boolean;
        page?: boolean;
        mobilePreview?: boolean;
        validation?: 'none' | 'required' | 'async' | 'reject' | 'false';
        guardPrevious?: boolean;
    }>(),
    { inline: false, page: false, mobilePreview: false, validation: 'none' },
);
const de = computed(() => props.locale === 'de');
const current = ref(Number(props.args.modelValue || 1));
watch(
    () => props.args.modelValue,
    (value) => {
        if (value !== undefined) current.value = Number(value);
    },
);
const name = ref('');
const delivery = ref('standard');
const completed = ref(false);
const calls = ref(0);
const failures = ref(0);
function beforeChange(change: StepperTransition) {
    if (props.guardPrevious && change.to !== undefined && change.to < change.from)
        return de.value
            ? 'Bereits übermittelte Schritte sind gesperrt.'
            : 'Submitted steps are locked.';
}
const stepper = ref<StepperApi>();
const orientation = computed(
    () => (props.args.orientation || 'horizontal') as 'horizontal' | 'vertical',
);
const variant = computed(() => (props.args.variant || 'default') as StepperVariant);
const size = computed(() => (props.args.size || 'default') as 'sm' | 'default' | 'lg');
const color = computed(() => (props.args.color || 'primary') as StepperColor);
const completedColor = computed(() => (props.args.completedColor || 'success') as StepperColor);
const inactiveAppearance = computed(
    () => (props.args.inactiveAppearance || 'outline') as 'outline' | 'solid' | 'muted',
);
const mobileLayout = computed(() => (props.args.mobileLayout || 'vertical') as StepperMobileLayout);
const items = computed(() =>
    de.value
        ? [
              { step: 1, title: 'Erfassen', description: 'Empfänger und Adresse', icon: IconUser },
              { step: 2, title: 'Lieferung', description: 'Versandart auswählen', icon: IconTruck },
              {
                  step: 3,
                  title: 'Prüfen',
                  description: 'Angaben kontrollieren',
                  icon: IconChecklist,
              },
              { step: 4, title: 'Abschließen', description: 'Auftrag bestätigen', icon: IconCheck },
          ]
        : [
              { step: 1, title: 'Details', description: 'Recipient and address', icon: IconUser },
              {
                  step: 2,
                  title: 'Delivery',
                  description: 'Choose delivery method',
                  icon: IconTruck,
              },
              { step: 3, title: 'Review', description: 'Check your details', icon: IconChecklist },
              { step: 4, title: 'Complete', description: 'Confirm your order', icon: IconCheck },
          ],
);
async function validate(_transition: StepperTransition) {
    if (props.validation === 'none') return;
    calls.value++;
    if (props.validation === 'async' || props.validation === 'reject')
        await new Promise((resolve) => setTimeout(resolve, 450));
    if (props.validation === 'reject' && calls.value === 1)
        throw new Error('Example request rejected');
    if (props.validation === 'false' && calls.value === 1) return false;
    if (!name.value.trim())
        return de.value
            ? 'Bitte den Namen des Empfängers ergänzen.'
            : 'Please enter the recipient name.';
}
function reset() {
    current.value = Number(props.args.modelValue || 1);
    completed.value = false;
    calls.value = 0;
    failures.value = 0;
    stepper.value?.clearError();
}
</script>
