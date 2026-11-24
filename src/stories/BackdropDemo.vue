<template>
    <div
        ref="panel"
        data-slot="backdrop-demo"
        class="relative isolate h-[28rem] w-[min(52rem,calc(100vw-3rem))] overflow-hidden rounded-xl border border-border bg-background p-6 text-foreground">
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="text-xs text-muted-foreground">MIRU WORKSPACE</p>
                <h2 class="mt-1 text-xl font-semibold">A little space to focus.</h2>
            </div>
            <Popover v-if="mode === 'popover'" v-model:open="open">
                <span ref="anchor" class="relative" :class="open && 'z-50'">
                    <PopoverTrigger as-child>
                        <Button variant="primary">Profile menu</Button>
                    </PopoverTrigger>
                </span>
                <PopoverContent align="end" class="w-64 p-4">
                    <p class="font-semibold">Sam Morgan</p>
                    <p class="mt-1 text-sm text-muted-foreground">Team workspace</p>
                    <Button class="mt-4 w-full" variant="outline" @click="open = false">
                        Close menu
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
        <div class="mt-8 grid grid-cols-3 gap-3">
            <div
                v-for="(tone, index) in ['primary', 'accent', 'secondary']"
                :key="tone"
                class="grid h-28 place-content-center rounded-xl text-center"
                :class="
                    index === 0
                        ? 'bg-primary-500/20'
                        : index === 1
                          ? 'bg-accent-500/20'
                          : 'bg-secondary-500/20'
                ">
                <p class="text-2xl font-semibold">{{ [128, 96, 42][index] }}</p>
                <p class="mt-1 text-xs">{{ ['Projects', 'Completed', 'Members'][index] }}</p>
            </div>
        </div>
        <div class="mt-5 grid gap-3">
            <p
                v-for="line in [
                    'Recent activity and project updates',
                    'Your next delivery is ready for review',
                    'Make room for what comes next',
                ]"
                :key="line"
                class="rounded-lg border border-border p-4 text-sm">
                {{ line }}
            </p>
        </div>
        <Backdrop
            v-bind="args"
            position="absolute"
            :visible="mode === 'popover' ? open : true"
            :origin="origin"
            :interactive="mode === 'popover'"
            @click="open = false" />
    </div>
</template>
<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import { computed, ref } from 'vue';
import { Backdrop } from '../components/backdrop';
import { Button } from '../components/button';
import { Popover, PopoverContent, PopoverTrigger } from '../components/popover';
const props = withDefaults(
    defineProps<{ args?: Record<string, unknown>; mode?: 'static' | 'popover' }>(),
    { mode: 'static' },
);
const panel = ref<HTMLElement | null>(null);
const anchor = ref<HTMLElement | null>(null);
const panelBounds = useElementBounding(panel);
const anchorBounds = useElementBounding(anchor);
const open = ref(false);
const origin = computed(() =>
    props.mode === 'popover'
        ? {
              x: anchorBounds.x.value + anchorBounds.width.value / 2 - panelBounds.x.value,
              y: anchorBounds.y.value + anchorBounds.height.value / 2 - panelBounds.y.value,
          }
        : { x: '85%', y: '10%' },
);
</script>
