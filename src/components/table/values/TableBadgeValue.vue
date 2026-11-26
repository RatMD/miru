<template>
    <Badge :variant="variant" class="font-normal">
        <component :is="icon" v-if="icon" class="size-3" />
        {{ label }}
    </Badge>
</template>

<script setup lang="ts">
import type { BadgeVariants } from '../../badge';
import type { TableStatusDefinition } from '../types';
import {
    IconApi,
    IconBuildingStore,
    IconDeviceDesktop,
    IconShoppingBag,
    IconWorld,
} from '@tabler/icons-vue';
import { computed, toValue } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { Badge } from '../../badge';
const { trans } = useI18n();

const props = defineProps<{
    value: unknown;
    statuses?: Record<string, TableStatusDefinition>;
    translationPrefix?: string;
    variant?: BadgeVariants['variant'];
}>();
const value = computed(() => String(props.value ?? ''));
const definition = computed(() => props.statuses?.[value.value]);
const label = computed(() => {
    if (definition.value?.label) return toValue(definition.value.label);
    if (definition.value?.labelKey) return trans(definition.value.labelKey);
    return props.translationPrefix
        ? trans(`${props.translationPrefix}.${value.value}`)
        : value.value;
});
const variant = computed<BadgeVariants['variant']>(() => {
    if (props.variant) return props.variant;
    if (['deleted', 'cancelled', 'failed', 'blocked', 'inactive'].includes(value.value))
        return 'danger';
    if (['active', 'paid', 'completed', 'released', 'confirmed'].includes(value.value))
        return 'default';
    if (['pending', 'draft', 'open', 'processing'].includes(value.value)) return 'ghostly';
    return 'outline';
});
const icon = computed(
    () =>
        definition.value?.icon ??
        {
            web: IconWorld,
            redo_online: IconShoppingBag,
            store: IconBuildingStore,
            internal: IconDeviceDesktop,
            ebay: IconShoppingBag,
            merkandi: IconShoppingBag,
            api: IconApi,
        }[value.value],
);
</script>
