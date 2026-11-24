<template>
    <div class="flex justify-end">
        <div class="hidden items-center justify-end gap-1 md:flex">
            <TooltipProvider v-for="action in desktopActions" :key="action.key">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <ButtonAction
                            borderless="yes"
                            type="button"
                            muted
                            :variant="action.color ?? 'primary'"
                            size="sm"
                            :disabled="unavailable || action.disabled?.(item)"
                            :aria-label="text(action.label)"
                            class="size-8 p-0"
                            @click.stop="selectAction(action)">
                            <component :is="action.icon" v-if="action.icon" class="size-4" />
                        </ButtonAction>
                    </TooltipTrigger>
                    <TooltipContent>{{ text(action.label) }}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>

        <DropdownMenu v-if="desktopOverflowActions.length > 0">
            <DropdownMenuTrigger as-child>
                <ButtonAction
                    borderless="yes"
                    type="button"
                    :disabled="unavailable"
                    class="hidden size-8 p-0 md:inline-flex"
                    variant="outline"
                    size="sm">
                    <IconDots class="size-4" />
                    <span class="sr-only">{{ trans('common.accessibility.more') }}</span>
                </ButtonAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{{ trans('common.datatable.actions') }}</DropdownMenuLabel>
                <DropdownMenuItem
                    v-for="action in desktopOverflowActions"
                    :key="action.key"
                    :disabled="unavailable || action.disabled?.(item)"
                    @click="selectAction(action)">
                    <component :is="action.icon" v-if="action.icon" class="size-4" />
                    {{ text(action.label) }}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Drawer v-model:open="mobileActionsOpen">
            <DrawerTrigger as-child>
                <ButtonAction
                    borderless="yes"
                    :disabled="unavailable"
                    type="button"
                    class="size-8 p-0 md:hidden"
                    variant="outline"
                    size="sm">
                    <IconDots class="size-4" />
                    <span class="sr-only">{{ trans('common.accessibility.more') }}</span>
                </ButtonAction>
            </DrawerTrigger>
            <DrawerContent class="md:hidden">
                <DrawerHeader class="border-b pr-12">
                    <DrawerTitle>{{ trans('common.datatable.actions') }}</DrawerTitle>
                    <DrawerDescription>
                        {{ trans('common.datatable.action_description') }}
                    </DrawerDescription>
                </DrawerHeader>
                <div class="overflow-y-auto p-2">
                    <ButtonAction
                        v-for="action in visibleActions"
                        :key="action.key"
                        muted
                        type="button"
                        :variant="action.color ?? 'primary'"
                        :icon-only="false"
                        borderless="yes"
                        class="w-full justify-start"
                        :disabled="unavailable || action.disabled?.(item)"
                        @click="selectAction(action, true)">
                        <component :is="action.icon" v-if="action.icon" class="size-4" />
                        {{ text(action.label) }}
                    </ButtonAction>
                </div>
            </DrawerContent>
        </Drawer>

        <DataTableConfirmation
            v-if="selectedAction?.confirmation"
            v-model:open="confirmationOpen"
            :title="text(selectedAction.confirmation.title)"
            :description="selectedAction.confirmation.description([item])"
            :confirm-label="text(selectedAction.confirmation.confirmLabel)"
            :confirm-icon="selectedAction.icon"
            :trigger-label="text(selectedAction.label)"
            :cancel-label="text(selectedAction.confirmation.cancelLabel)"
            :option-label="
                selectedAction.confirmation.option
                    ? text(selectedAction.confirmation.option.label)
                    : undefined
            "
            @confirm="executeSelected" />
    </div>
</template>

<script setup lang="ts" generic="TData extends RowData">
import type { DataTableRowAction, DataTableText } from './types';
import type { RowData } from '@tanstack/vue-table';
import { IconDots } from '@tabler/icons-vue';
import { computed, inject, ref, toValue, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { ButtonAction } from '../button-action';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import { dataTableInteractionKey } from './context';
import DataTableConfirmation from './DataTableConfirmation.vue';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{
    item: TData;
    actions?: DataTableRowAction<TData>[];
}>();

const interaction = inject(dataTableInteractionKey, undefined);
const unavailable = computed(() =>
    Boolean(interaction?.disabled.value || interaction?.rowDisabled(props.item)),
);
const selectedAction = ref<DataTableRowAction<TData>>();
const confirmationOpen = ref(false);
const mobileActionsOpen = ref(false);
watch(unavailable, (value) => {
    if (value) {
        confirmationOpen.value = false;
        mobileActionsOpen.value = false;
    }
});
const visibleActions = computed(
    () => props.actions?.filter((action) => action.visible?.(props.item) !== false) ?? [],
);
const hasDesktopOverflow = computed(() => visibleActions.value.length > 4);
const desktopActions = computed(() =>
    hasDesktopOverflow.value
        ? visibleActions.value.filter((action) => action.priority !== 'secondary')
        : visibleActions.value,
);
const desktopOverflowActions = computed(() =>
    hasDesktopOverflow.value
        ? visibleActions.value.filter((action) => action.priority === 'secondary')
        : [],
);

function text(value: DataTableText): string {
    return toValue(value);
}

function selectAction(action: DataTableRowAction<TData>, closeMobile = false): void {
    if (unavailable.value || action.disabled?.(props.item)) return;
    if (closeMobile) {
        mobileActionsOpen.value = false;
    }

    selectedAction.value = action;
    if (action.confirmation) {
        confirmationOpen.value = true;
        return;
    }
    action.execute(props.item);
}

function executeSelected(optionEnabled: boolean): void {
    const action = selectedAction.value;
    if (
        !action ||
        unavailable.value ||
        action.disabled?.(props.item) ||
        action.visible?.(props.item) === false
    ) {
        return;
    }

    if (optionEnabled && action.confirmation?.option) {
        action.confirmation.option.execute([props.item]);
        return;
    }

    action.execute(props.item);
}
</script>
