<template>
    <div v-if="address" class="flex min-w-48 flex-col items-start gap-1 text-xs">
        <Copy v-if="recipient" :content="recipient">
            <Badge variant="outline" class="max-w-[180px]">
                <IconBuilding v-if="address.company_name" class="size-3.5 shrink-0" />
                <IconUser v-else class="size-3.5 shrink-0" />
                <span class="truncate">{{ recipient }}</span>
            </Badge>
        </Copy>
        <Copy v-if="street" :content="street">
            <Badge variant="outline" class="max-w-[180px]">
                <IconMapPin class="size-3.5 shrink-0" />
                <span class="truncate">{{ street }}</span>
            </Badge>
        </Copy>
        <Copy v-if="address.address_addition" :content="address.address_addition">
            <Badge variant="outline" class="max-w-[180px]">
                <IconMapPin class="size-3.5 shrink-0" />
                <span class="truncate">{{ address.address_addition }}</span>
            </Badge>
        </Copy>
        <div v-if="address.postal_code || address.city" class="flex max-w-[180px] gap-1">
            <Copy v-if="address.postal_code" :content="address.postal_code">
                <Badge variant="outline" class="max-w-[180px]">
                    <IconMailbox class="size-3.5 shrink-0" />
                    <span class="truncate">{{ address.postal_code }}</span>
                </Badge>
            </Copy>
            <Copy v-if="address.city" :content="address.city">
                <Badge variant="outline" class="max-w-[180px]">
                    <IconBuildingCommunity class="size-3.5 shrink-0" />
                    <span class="truncate">{{ address.city }}</span>
                </Badge>
            </Copy>
        </div>
        <div v-if="region || country" class="flex max-w-[180px] gap-1">
            <Copy v-if="region" :content="region">
                <Badge variant="outline" class="max-w-[180px]">
                    <IconMap class="size-3.5 shrink-0" />
                    <span class="truncate">{{ region }}</span>
                </Badge>
            </Copy>
            <Copy v-if="country" :content="country">
                <Badge variant="outline" class="max-w-[180px]">
                    <IconWorld class="size-3.5 shrink-0" />
                    <span class="truncate">{{ country }}</span>
                </Badge>
            </Copy>
        </div>
    </div>
    <span v-else class="text-muted-foreground">—</span>
</template>

<script setup lang="ts">
import type { TableAddressLike } from '../types';
import {
    IconBuilding,
    IconBuildingCommunity,
    IconMailbox,
    IconMap,
    IconMapPin,
    IconUser,
    IconWorld,
} from '@tabler/icons-vue';
import { computed } from 'vue';
import { Badge } from '../../badge';
import { Copy } from '../../copy';

const props = defineProps<{ value?: TableAddressLike | null; fallbackName?: string }>();
const address = computed(() => props.value);
const recipient = computed(
    () => address.value?.company_name || address.value?.recipient_name || props.fallbackName || '',
);
const street = computed(() =>
    [address.value?.street, address.value?.house_number].filter(Boolean).join(' '),
);
const region = computed(() => name(address.value?.state));
const country = computed(() => name(address.value?.country));

function name(value: TableAddressLike['state']): string {
    if (typeof value === 'string') return value;
    return value?.name ?? '';
}
</script>
