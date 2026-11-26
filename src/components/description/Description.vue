<template>
    <Drawer v-if="!isDesktop" v-model:open="open" swipe-direction="down">
        <DrawerTrigger as-child>
            <slot name="trigger">
                <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    icon-only
                    data-slot="description-trigger"
                    :aria-label="title">
                    <IconInfoSquareRounded
                        class="size-4 text-muted-foreground"
                        aria-hidden="true" />
                </Button>
            </slot>
        </DrawerTrigger>
        <DrawerContent :aria-describedby="description || details ? undefined : ''" class="">
            <DrawerHeader class="px-6 pt-6 pr-12 pb-8">
                <DrawerTitle>{{ title }}</DrawerTitle>
                <DrawerDescription
                    v-if="description || details"
                    class="space-y-3 text-base leading-relaxed">
                    <span v-if="description" class="block">{{ description }}</span>
                    <span v-if="details" class="block text-sm">{{ details }}</span>
                </DrawerDescription>
                <div v-if="$slots.default" class="mt-3 text-sm text-foreground/80">
                    <slot />
                </div>
            </DrawerHeader>
        </DrawerContent>
    </Drawer>

    <Popover v-else v-model:open="open">
        <PopoverTrigger as-child>
            <slot name="trigger">
                <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    icon-only
                    data-slot="description-trigger"
                    :aria-label="title">
                    <IconInfoSquareRounded
                        class="size-4 text-muted-foreground"
                        aria-hidden="true" />
                </Button>
            </slot>
        </PopoverTrigger>
        <PopoverContent
            :side="side"
            :align="align"
            :align-offset="alignOffset ?? (align === 'center' ? 0 : -8)"
            :arrow-padding="arrowPadding"
            class="relative w-80 p-0">
            <div class="max-h-[80vh] space-y-2 overflow-y-auto p-4 text-sm text-muted-foreground">
                <p v-if="description">{{ description }}</p>
                <p v-if="details" class="text-xs">{{ details }}</p>
                <slot />
            </div>
            <PopoverArrow />
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { IconInfoSquareRounded } from '@tabler/icons-vue';
import { useMediaQuery } from '@vueuse/core';
import { computed, watch } from 'vue';
import { useBreakpoint } from '../../composables/useBreakpoint';
import { Button } from '../button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../drawer';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '../popover';

// Page headers and informational legends share this responsive presentation.
const props = withDefaults(
    defineProps<{
        title: string;
        description?: string;
        details?: string;
        align?: 'start' | 'center' | 'end';
        /** Override the automatic inset for narrow explanation triggers. */
        alignOffset?: number;
        /** Minimum arrow clearance from the popover corners. */
        arrowPadding?: number;
        side?: 'top' | 'right' | 'bottom' | 'left';
        breakpoint?: string;
    }>(),
    { align: 'start', side: 'bottom', arrowPadding: 8 },
);

const { matches: tokenDesktop } = useBreakpoint({ min: 'md' });
const explicitDesktop = useMediaQuery(() => props.breakpoint || '(min-width: 0px)');
const isDesktop = computed(() => props.breakpoint ? explicitDesktop.value : tokenDesktop.value);
const open = defineModel<boolean>('open', { default: false });

// Unmount the active overlay when crossing the breakpoint, including its focus trap.
watch(isDesktop, () => {
    open.value = false;
});
</script>
