<template>
    <section
        data-slot="form-page-layout"
        ref="layoutRoot"
        class="ui-form-page-layout"
        :style="clearanceStyle">
        <slot name="header" />
        <form novalidate @submit.prevent="emit('submit')">
            <slot name="before-content" />
            <div class="ui-form-page-grid" :data-actions="showActions">
                <Tabs
                    v-if="tabs.length"
                    v-model="activeTab"
                    class="ui-form-page-tabs"
                    :tabs="tabs"
                    appearance="buttons"
                    :aria-label="navigationLabel"
                    :orientation="isDesktop ? 'vertical' : 'horizontal'"
                    :unmount-on-hide="false"
                    :collapse-overflow="!isDesktop">
                    <template v-if="$slots['tab-action']" #tab-action="scope">
                        <slot name="tab-action" v-bind="scope" />
                    </template>
                    <template v-for="tab in tabs" :key="tab.value" #[tab.value]>
                        <slot :tab="tab" />
                    </template>
                </Tabs>
                <div v-else class="min-w-0"><slot /></div>
                <aside
                    v-if="showActions"
                    data-slot="form-actions"
                    class="ui-form-page-desktop-actions">
                    <slot name="desktop-actions" :loading="loading">
                        <p v-if="actionsLabel" class="text-sm font-semibold">{{ actionsLabel }}</p>
                        <slot name="primary-action" surface="desktop" :loading="loading">
                            <Button
                                type="submit"
                                :variant="primaryVariant"
                                :disabled="loading"
                                :loading="loading"
                                class="w-full">
                                {{ primaryLabel ?? trans('common.actions.save') }}
                            </Button>
                        </slot>
                        <slot name="secondary-action" surface="desktop" :loading="loading">
                            <Button
                                type="button"
                                variant="outline"
                                class="w-full"
                                :disabled="loading"
                                @click="emit('secondary')">
                                {{ secondaryLabel ?? trans('common.actions.cancel') }}
                            </Button>
                        </slot>
                        <div
                            v-if="hasDesktopAdditionalActions()"
                            data-slot="form-actions-divider"
                            class="flex flex-col gap-3 border-t pt-3">
                            <Button
                                v-for="action in additionalActions"
                                :key="action.id"
                                type="button"
                                :variant="action.variant ?? 'outline'"
                                :disabled="loading || action.disabled"
                                :data-action="action.id"
                                class="w-full"
                                @click="emit('action', action.id)">
                                <component :is="action.icon" v-if="action.icon" class="size-4" />
                                {{ action.label }}
                            </Button>
                            <slot
                                name="additional-actions"
                                surface="desktop"
                                :loading="loading"
                                :close="closeAdditionalActions" />
                        </div>
                    </slot>
                </aside>
            </div>
            <div
                v-if="showActions || $slots['floating-app-bar']"
                ref="dock"
                data-slot="form-page-dock"
                class="ui-form-page-dock">
                <div
                    v-if="showActions"
                    data-slot="form-mobile-actions"
                    class="ui-form-page-mobile-actions">
                    <Button
                        v-if="hasAdditionalActions()"
                        type="button"
                        variant="outline"
                        icon-only
                        :disabled="loading"
                        :aria-label="trans('common.form.additional_actions')"
                        aria-haspopup="dialog"
                        :aria-expanded="additionalActionsOpen"
                        @click="additionalActionsOpen = true">
                        <IconDots class="size-4" />
                    </Button>
                    <div class="min-w-0 flex-1">
                        <slot name="secondary-action" surface="mobile" :loading="loading">
                            <Button
                                type="button"
                                variant="outline"
                                class="w-full"
                                :disabled="loading"
                                @click="emit('secondary')">
                                {{ secondaryLabel ?? trans('common.actions.cancel') }}
                            </Button>
                        </slot>
                    </div>
                    <div class="min-w-0 flex-1">
                        <slot name="primary-action" surface="mobile" :loading="loading">
                            <Button
                                type="submit"
                                :variant="primaryVariant"
                                :disabled="loading"
                                :loading="loading"
                                class="w-full">
                                {{ primaryLabel ?? trans('common.actions.save') }}
                            </Button>
                        </slot>
                    </div>
                </div>
                <div
                    v-if="$slots['floating-app-bar']"
                    data-slot="form-page-floating-bar"
                    class="ui-form-page-floating-bar">
                    <slot
                        name="floating-app-bar"
                        :fixed="false as const"
                        :orientation="'horizontal' as const" />
                </div>
            </div>
        </form>
        <Drawer v-if="!isDesktop" v-model:open="additionalActionsOpen">
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{{ trans('common.form.additional_actions') }}</DrawerTitle>
                    <DrawerDescription class="sr-only">
                        {{ trans('common.form.additional_actions_description') }}
                    </DrawerDescription>
                </DrawerHeader>
                <div class="flex flex-col gap-3 overflow-y-auto px-4 pb-6">
                    <Button
                        v-for="action in additionalActions"
                        :key="action.id"
                        type="button"
                        :variant="action.variant ?? 'outline'"
                        :disabled="loading || action.disabled"
                        :data-action="action.id"
                        @click="
                            emit('action', action.id);
                            closeAdditionalActions();
                        ">
                        <component :is="action.icon" v-if="action.icon" class="size-4" />
                        {{ action.label }}
                    </Button>
                    <slot
                        name="mobile-additional-actions"
                        :loading="loading"
                        :close="closeAdditionalActions" />
                    <slot
                        name="additional-actions"
                        surface="mobile"
                        :loading="loading"
                        :close="closeAdditionalActions" />
                </div>
            </DrawerContent>
        </Drawer>
    </section>
</template>

<script setup lang="ts">
import type { FormPageAction } from '../../layouts/types';
import type { ButtonVariants } from '../button';
import type { TabItem } from '../tabs';
import type { CSSProperties, VNode } from 'vue';
import { IconDots } from '@tabler/icons-vue';
import { useElementSize } from '@vueuse/core';
import { computed, onUpdated, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../drawer';
import { Tabs } from '../tabs';

const props = withDefaults(
    defineProps<{
        tabs?: TabItem[];
        modelValue?: string;
        navigationLabel?: string;
        actionsLabel?: string;
        primaryLabel?: string;
        secondaryLabel?: string;
        primaryVariant?: NonNullable<ButtonVariants['variant']>;
        additionalActions?: FormPageAction[];
        loading?: boolean;
        /** Standalone sections can suppress form actions while retaining the app bar. */
        showActions?: boolean;
    }>(),
    {
        tabs: () => [],
        additionalActions: () => [],
        loading: false,
        showActions: true,
        primaryVariant: 'success',
    },
);
const emit = defineEmits<{
    'update:modelValue': [value: string];
    submit: [];
    secondary: [];
    action: [id: string];
}>();
const { trans } = useI18n();
type ActionSlotScope = { surface: 'desktop' | 'mobile'; loading: boolean };
type AdditionalSlotScope = ActionSlotScope & { close: () => void };
const slots = defineSlots<{
    default?: (props: { tab?: TabItem }) => VNode[];
    header?: () => VNode[];
    'tab-action'?: (props: { tab: TabItem }) => VNode[];
    'before-content'?: () => VNode[];
    'desktop-actions'?: (props: { loading: boolean }) => VNode[];
    'primary-action'?: (props: ActionSlotScope) => VNode[];
    'secondary-action'?: (props: ActionSlotScope) => VNode[];
    'additional-actions'?: (props: AdditionalSlotScope) => VNode[];
    'mobile-additional-actions'?: (props: { loading: boolean; close: () => void }) => VNode[];
    'floating-app-bar'?: (props: { fixed: false; orientation: 'horizontal' }) => VNode[];
}>();
const internalTab = ref(props.modelValue ?? props.tabs[0]?.value ?? '');
const activeTab = computed({
    get: () => props.modelValue ?? internalTab.value,
    set: (value: string) => {
        internalTab.value = value;
        emit('update:modelValue', value);
    },
});
watch(
    () => props.tabs.map((tab) => tab.value),
    (values) => {
        if (!values.includes(activeTab.value)) activeTab.value = values[0] ?? '';
    },
);
const layoutRoot = ref<HTMLElement>();
const { width: layoutWidth } = useElementSize(layoutRoot);
const isDesktop = computed(() => layoutWidth.value >= 1024);
const dock = ref<HTMLElement>();
const { height: dockHeight } = useElementSize(dock, { width: 0, height: 0 }, { box: 'border-box' });
const clearanceStyle = computed<CSSProperties>(() => ({
    '--ui-form-page-dock-height': dockHeight.value + 'px',
}));
/** Evaluate slot presence on each render because Vue's slots object is not reactive. */
function hasDesktopAdditionalActions(): boolean {
    return props.additionalActions.length > 0 || !!slots['additional-actions'];
}
function hasAdditionalActions(): boolean {
    return hasDesktopAdditionalActions() || !!slots['mobile-additional-actions'];
}
const additionalActionsOpen = ref(false);
function closeAdditionalActions(): void {
    additionalActionsOpen.value = false;
}
watch(
    [isDesktop, () => props.showActions, () => props.additionalActions.length],
    closeAdditionalActions,
);
onUpdated(() => {
    if (!hasAdditionalActions()) closeAdditionalActions();
});
</script>

<style>
.ui-form-page-layout {
    --ui-form-page-sticky-top: 1rem;
    container: ui-form-page / inline-size;
    display: grid;
    gap: 1.5rem;
    min-width: 0;
}
.ui-form-page-layout > form {
    padding-bottom: calc(var(--ui-form-page-dock-height, 0px) + 1rem);
}
.ui-form-page-grid {
    display: grid;
    align-items: start;
    gap: 2rem;
    min-width: 0;
}
.ui-form-page-tabs[data-slot='tabs'] {
    overflow: visible;
}
.ui-form-page-tabs > [role='tabpanel'] {
    overflow: visible;
}
.ui-form-page-desktop-actions {
    display: none;
}
.ui-form-page-dock {
    position: fixed;
    inset-inline: 0;
    bottom: 0;
    z-index: 40;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background: var(--ui-background);
}
.ui-form-page-mobile-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-top: 1px solid var(--ui-border);
    padding: 0.75rem max(0.75rem, env(safe-area-inset-right, 0px)) 0.75rem
        max(0.75rem, env(safe-area-inset-left, 0px));
    box-shadow: 0 -4px 16px #0001;
}
.ui-form-page-floating-bar {
    display: flex;
    justify-content: center;
    padding-inline: max(0.5rem, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px));
}
/* The dock owns the safe area once, including an inline FloatingAppBar. */
.ui-form-page-floating-bar > .ui-floating-app-bar {
    padding-bottom: 1rem;
}
@container ui-form-page (min-width: 1024px) {
    .ui-form-page-layout > form {
        padding-bottom: 0;
    }
    .ui-form-page-grid[data-actions='true'] {
        grid-template-columns: minmax(0, 1fr) 12rem;
    }
    .ui-form-page-tabs[data-slot='tabs'] {
        display: grid;
        grid-template-columns: 14rem minmax(0, 1fr);
        align-items: start;
        gap: 2rem;
    }
    .ui-form-page-tabs > div:first-child {
        position: sticky;
        top: var(--ui-form-page-sticky-top);
        width: auto;
    }
    .ui-form-page-tabs > [role='tabpanel'] {
        grid-column: 2;
        grid-row: 1;
        padding: 0;
    }
    .ui-form-page-desktop-actions {
        position: sticky;
        top: var(--ui-form-page-sticky-top);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        border-left: 1px solid var(--ui-border);
        padding-left: 1.5rem;
    }
    .ui-form-page-dock {
        display: none;
    }
}
@container ui-form-page (min-width: 1280px) {
    .ui-form-page-grid[data-actions='true'] {
        grid-template-columns: minmax(0, 1fr) 14rem;
    }
    .ui-form-page-tabs[data-slot='tabs'] {
        grid-template-columns: 16rem minmax(0, 1fr);
    }
}
</style>
