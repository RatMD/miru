<template>
    <component :is="isDesktop ? Sheet : Drawer" v-model:open="open">
        <TooltipProvider v-if="compact" :delay-duration="400">
            <Tooltip>
                <TooltipTrigger as-child>
                    <component :is="isDesktop ? SheetTrigger : DrawerTrigger" as-child>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            class="relative size-8 p-0"
                            :disabled="disabled">
                            <IconFilter class="size-4" />
                            <span class="sr-only">{{ trans('common.datatable.filters') }}</span>
                            <span
                                v-if="activeCount > 0"
                                data-slot="button-badge"
                                class="pointer-events-none absolute -top-1 -right-1 z-10 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
                                {{ activeCount }}
                            </span>
                        </Button>
                    </component>
                </TooltipTrigger>
                <TooltipContent>{{ trans('common.datatable.filters') }}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <component :is="isDesktop ? SheetTrigger : DrawerTrigger" v-else as-child>
            <Button type="button" variant="outline" size="sm" :disabled="disabled">
                <IconFilter class="size-4" />
                {{ trans('common.datatable.filters') }}
                <Badge v-if="activeCount > 0" variant="ghostly" class="ml-1 px-1.5 py-0">
                    {{ activeCount }}
                </Badge>
            </Button>
        </component>

        <component
            :is="isDesktop ? SheetContent : DrawerContent"
            :side="isDesktop ? 'right' : undefined"
            class="max-h-[90vh] md:max-h-none md:max-w-md">
            <component :is="isDesktop ? SheetHeader : DrawerHeader">
                <component :is="isDesktop ? SheetTitle : DrawerTitle">
                    {{ trans('common.datatable.filters') }}
                </component>
                <component :is="isDesktop ? SheetDescription : DrawerDescription">
                    {{ trans('common.datatable.filter_description') }}
                </component>
            </component>

            <div class="flex-1 space-y-5 overflow-y-auto px-4 pb-4">
                <DataTableFilterField
                    v-for="(configuration, key) in list.config.filters"
                    :key="key"
                    v-model="draftFilters[key]"
                    :configuration="configuration"
                    :disabled="disabled" />
            </div>

            <component
                :is="isDesktop ? SheetFooter : DrawerFooter"
                class="border-t sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    :disabled="disabled"
                    @click="clear">
                    {{ trans('common.datatable.clear') }}
                </Button>
                <Button type="button" size="sm" :disabled="disabled || invalid" @click="apply">
                    {{ trans('common.datatable.apply_filters') }}
                </Button>
            </component>
        </component>
    </component>
</template>

<script setup lang="ts" generic="TData">
import type { ListPayload } from './contracts';
import { IconFilter } from '@tabler/icons-vue';
import { computed, reactive, ref, watch } from 'vue';
import { useBreakpoint } from '../../composables/useBreakpoint';
import { useI18n } from '../../composables/useI18n';
import { Badge } from '../badge';
import { Button } from '../button';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
} from '../drawer';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import DataTableFilterField from './DataTableFilterField.vue';
import { appliedFilterValue, filterDraft, filterRangeInvalid } from './filter-values';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{
    list: ListPayload<TData>;
    activeCount: number;
    disabled?: boolean;
    compact?: boolean;
}>();
const emit = defineEmits<{
    (event: 'apply', filters: Record<string, unknown>): void;
    (event: 'clear'): void;
}>();

const invalid = computed(() =>
    Object.entries(props.list.config.filters).some(([key, config]) =>
        filterRangeInvalid(config, draftFilters[key]),
    ),
);
const open = ref(false);
const { matches: isDesktop } = useBreakpoint({ min: 'md' });
const draftFilters = reactive<Record<string, unknown>>({});

watch(open, (value) => {
    if (value) resetDraft();
});

function resetDraft(): void {
    Object.keys(draftFilters).forEach((key) => delete draftFilters[key]);
    Object.keys(props.list.config.filters).forEach((key) => {
        draftFilters[key] = filterDraft(props.list.config.filters[key]!, props.list.filters[key]);
    });
}

function apply(): void {
    if (props.disabled || invalid.value) return;
    const filters = { ...props.list.filters };
    Object.keys(props.list.config.filters).forEach((key) => {
        filters[key] = appliedFilterValue(draftFilters[key]);
    });
    emit('apply', filters);
    open.value = false;
}

function clear(): void {
    if (props.disabled) return;
    emit('clear');
    open.value = false;
}
</script>
