<template>
    <div class="grid w-full max-w-4xl gap-4">
        <div
            class="rounded-lg border border-border bg-background"
            :style="{ height: `${Number(args.height || 280)}px` }">
            <Resizable
                :id="id"
                :key="`${args.direction}-${args.sizeUnit}-${preset}`"
                :direction="direction"
                :keyboard-resize-by="Number(args.keyboardResizeBy || 5)"
                :disabled="!!args.disabled"
                :auto-save-id="persist ? id + '-saved' : undefined"
                @layout="layout = $event">
                <ResizablePanel
                    :id="id + '-first'"
                    ref="first"
                    :default-size="Number(args.defaultSize ?? 35)"
                    :min-size="Number(args.minSize ?? 20)"
                    :max-size="Number(args.maxSize ?? 75)"
                    :collapsible="!!args.collapsible"
                    :collapsed-size="Number(args.collapsedSize ?? 0)"
                    :size-unit="unit"
                    :order="0">
                    <div
                        class="flex h-full min-h-0 flex-col items-center justify-center gap-2 overflow-hidden p-4 text-center">
                        <strong class="text-sm">
                            {{ locale === 'de' ? 'Navigation' : 'Navigation' }}
                        </strong>
                        <span class="text-xs text-muted-foreground">
                            {{ unit === 'px' ? 'Pixel sizing' : 'First panel' }}
                        </span>
                        <Button
                            v-if="args.collapsible"
                            size="xs"
                            variant="outline"
                            @click="first?.collapse()">
                            {{ locale === 'de' ? 'Einklappen' : 'Collapse' }}
                        </Button>
                    </div>
                </ResizablePanel>
                <ResizableHandle
                    :show-grip="!!args.showGrip"
                    :show-toggle="!!args.showToggle"
                    :toggle-target="targetNext ? id + '-second' : undefined"
                    :aria-label="locale === 'de' ? 'Hauptbereiche anpassen' : 'Resize main panels'"
                    @dragging="dragging = $event" />
                <ResizablePanel
                    :id="id + '-second'"
                    :min-size="15"
                    :collapsible="targetNext"
                    :collapsed-size="0"
                    :order="1">
                    <Resizable v-if="preset === 'nested'" :id="id + '-nested'" direction="vertical">
                        <ResizablePanel :default-size="55" :min-size="20">
                            <div
                                class="flex h-full items-center justify-center p-4 text-sm font-medium">
                                Editor
                            </div>
                        </ResizablePanel>
                        <ResizableHandle
                            :show-grip="!!args.showGrip"
                            aria-label="Resize editor and preview" />
                        <ResizablePanel :min-size="20">
                            <div
                                class="flex h-full items-center justify-center bg-muted/30 p-4 text-sm">
                                Preview
                            </div>
                        </ResizablePanel>
                    </Resizable>
                    <div
                        v-else
                        class="flex h-full flex-col items-center justify-center gap-2 overflow-hidden bg-muted/20 p-4 text-center">
                        <strong class="text-sm">
                            {{ locale === 'de' ? 'Inhalt' : 'Content' }}
                        </strong>
                        <span class="text-xs text-muted-foreground">
                            {{ direction === 'horizontal' ? 'Side by side' : 'Stacked panels' }}
                        </span>
                    </div>
                </ResizablePanel>
                <template v-if="preset === 'three'">
                    <ResizableHandle
                        :show-grip="!!args.showGrip"
                        aria-label="Resize details panel" />
                    <ResizablePanel :default-size="20" :min-size="10" :order="2">
                        <div
                            class="flex h-full items-center justify-center p-4 text-sm font-medium">
                            Details
                        </div>
                    </ResizablePanel>
                </template>
            </Resizable>
        </div>
        <div class="flex flex-wrap items-center gap-2">
            <Button v-if="args.collapsible" size="sm" variant="outline" @click="first?.expand()">
                {{ locale === 'de' ? 'Navigation ausklappen' : 'Expand navigation' }}
            </Button>
            <Button
                size="sm"
                variant="outline"
                @click="first?.resize(Number(args.defaultSize ?? 35))">
                {{ locale === 'de' ? 'Größe zurücksetzen' : 'Reset size' }}
            </Button>
        </div>
        <output
            data-testid="resizable-layout"
            class="rounded-md border border-border bg-muted/30 p-3 text-xs font-mono">
            {{ layout.map((value) => Number(value.toFixed(1))).join(' / ') }}
        </output>
        <output class="sr-only" data-testid="resizable-dragging">{{ dragging }}</output>
    </div>
</template>
<script lang="ts">
let sequence = 0;
</script>
<script setup lang="ts">
import type { ResizablePanelApi, ResizableDirection } from '../components/resizable';
import { computed, ref } from 'vue';
import { Button } from '../components/button';
import { Resizable, ResizablePanel, ResizableHandle } from '../components/resizable';
const props = withDefaults(
    defineProps<{
        args: Record<string, unknown>;
        locale: string;
        preset?: 'basic' | 'nested' | 'three';
        persist?: boolean;
        targetNext?: boolean;
    }>(),
    { preset: 'basic', persist: false, targetNext: false },
);
const id = `resizable-demo-${++sequence}`;
const direction = computed(() => (props.args.direction || 'horizontal') as ResizableDirection);
const unit = computed(() => (props.args.sizeUnit === 'px' ? ('px' as const) : ('%' as const)));
const first = ref<ResizablePanelApi>();
const layout = ref<number[]>([]);
const dragging = ref(false);
</script>
