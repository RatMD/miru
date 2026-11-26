<template>
    <ContextProvider :locale="locale">
        <div class="w-full min-w-0 space-y-4" data-slot="composition-demo">
            <template v-if="mode === 'buttons'">
                <ButtonGroup
                    :size="args.size"
                    :shape="args.shape"
                    :orientation="args.orientation"
                    :label="copy.title">
                    <template v-if="args.actionButtons">
                        <ButtonAction
                            variant="warning"
                            :size="args.size"
                            :disabled="args.disabled"
                            :title="copy.save">
                            <IconStar />
                        </ButtonAction>
                        <ButtonAction
                            variant="danger"
                            :size="args.size"
                            :disabled="args.disabled"
                            :title="copy.close">
                            <IconTrash />
                        </ButtonAction>
                    </template>
                    <template v-else>
                        <Button
                            variant="outline"
                            :size="args.size"
                            :disabled="args.disabled"
                            :icon-only="args.iconOnly"
                            :aria-label="copy.previous"
                            @click="feedback = copy.previous">
                            <IconArrowLeft />
                            <span v-if="!args.iconOnly">{{ copy.previous }}</span>
                        </Button>
                        <Button
                            variant="outline"
                            :size="args.size"
                            :disabled="args.disabled"
                            :icon-only="args.iconOnly"
                            :aria-label="copy.save"
                            @click="feedback = copy.save">
                            <IconCheck />
                            <span v-if="!args.iconOnly">{{ copy.save }}</span>
                        </Button>
                        <Button
                            variant="outline"
                            :size="args.size"
                            :disabled="args.disabled"
                            :icon-only="args.iconOnly"
                            :aria-label="copy.next"
                            @click="feedback = copy.next">
                            <IconArrowRight />
                            <span v-if="!args.iconOnly">{{ copy.next }}</span>
                        </Button>
                    </template>
                </ButtonGroup>
                <output class="block text-sm">{{ feedback }}</output>
            </template>
            <template v-else-if="mode === 'badges'">
                <div :class="args.narrow ? 'w-64 max-w-full' : 'w-full'" class="flex min-w-0">
                    <FilterBar
                        :items="badgeItems"
                        :size="args.size"
                        :disabled="args.disabled"
                        @remove="removed.push($event)" />
                </div>
                <output class="block text-sm">{{ badgeItems.length }}</output>
            </template>
            <template v-else-if="mode === 'command'">
                <template v-if="args.dialog">
                    <Button class="mx-auto flex w-auto" @click="open = true">
                        {{ copy.open }}
                    </Button>
                    <CommandDialog
                        v-model:open="open"
                        v-model:query="query"
                        v-model:filters="filters"
                        :title="copy.title"
                        :description="copy.description"
                        :items="args.empty ? [] : items"
                        :filter-options="filterOptions"
                        :placeholder="copy.placeholder"
                        :disabled="args.disabled"
                        :loading="args.loading"
                        @select="select" />
                </template>
                <div v-else :class="args.narrow ? 'w-80 max-w-full' : 'w-full'">
                    <Command
                        v-model:query="query"
                        v-model:filters="filters"
                        :items="args.empty ? [] : items"
                        :filter-options="filterOptions"
                        :placeholder="copy.placeholder"
                        :disabled="args.disabled"
                        :loading="args.loading"
                        @select="select" />
                </div>
                <output class="block text-sm" aria-live="polite">
                    {{ copy.selected }}: {{ feedback }}
                </output>
            </template>
            <template v-else-if="mode === 'drawer'">
                <Drawer
                    v-model:open="open"
                    :swipe-direction="args.swipeDirection || 'down'"
                    :snap-points="args.snapPoints"
                    :default-snap-point="args.startHeight ?? args.snapPoints?.[0]">
                    <DrawerTrigger as-child>
                        <Button class="mx-auto flex w-auto">{{ copy.open }}</Button>
                    </DrawerTrigger>
                    <DrawerContent
                        :show-handle="args.showHandle ?? true"
                        :max-height="args.maxHeight"
                        :content-size="args.contentSize"
                        :scrollable="args.scrollable ?? true">
                        <template #header>
                            <DrawerHeader>
                                <DrawerTitle>{{ copy.drawerTitle }}</DrawerTitle>
                                <DrawerDescription>{{ copy.drawerDescription }}</DrawerDescription>
                            </DrawerHeader>
                        </template>
                        <div class="px-6 pb-6">
                            <Input
                                v-model="text"
                                :aria-label="copy.note"
                                :placeholder="copy.note" />
                            <p v-for="n in args.longContent ? 30 : 3" :key="n" class="mt-4 text-sm">
                                {{ n }}. {{ copy.paragraph }}
                            </p>
                        </div>
                        <template #footer>
                            <DrawerFooter>
                                <DrawerClose as-child>
                                    <Button variant="outline">{{ copy.close }}</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </template>
                    </DrawerContent>
                </Drawer>
            </template>
            <template v-else-if="mode === 'aspect'">
                <div v-if="args.gallery" class="grid gap-4 sm:grid-cols-2">
                    <div v-for="(ratio, preset) in aspectRatioPresets" :key="preset">
                        <p class="mb-2 text-sm font-medium">
                            {{ preset }} · {{ ratio.toFixed(3) }}
                        </p>
                        <AspectRatio
                            :preset="preset"
                            class="rounded-md bg-gradient-to-br from-primary-100 to-primary-400">
                            <div
                                class="flex size-full items-center justify-center p-4 text-sm text-primary-950">
                                {{ copy.preview }}
                            </div>
                        </AspectRatio>
                    </div>
                </div>
                <AspectRatio
                    v-else
                    :preset="args.preset"
                    :ratio="args.ratio"
                    class="rounded-md bg-gradient-to-br from-primary-100 to-primary-400">
                    <div
                        class="flex size-full items-center justify-center p-4 text-sm text-primary-950">
                        {{ copy.preview }}
                    </div>
                </AspectRatio>
            </template>
        </div>
    </ContextProvider>
</template>
<script setup lang="ts">
import type { CommandItem } from '../components/command';
import {
    IconArrowLeft,
    IconArrowRight,
    IconCheck,
    IconMail,
    IconStar,
    IconTrash,
    IconFolder,
    IconSettings,
    IconUsers,
} from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { AspectRatio, aspectRatioPresets } from '../components/aspect-ratio';
import { Button } from '../components/button';
import { ButtonAction } from '../components/button-action';
import { ButtonGroup } from '../components/button-group';
import { Command, CommandDialog } from '../components/command';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
} from '../components/drawer';
import { FilterBar } from '../components/filter-bar';
import { Input } from '../components/input';
import { ContextProvider } from '../components/provider';
import { compositionCopy } from './composition-copy';
const props = defineProps<{
    mode: 'buttons' | 'badges' | 'command' | 'drawer' | 'aspect';
    locale?: string;
    args: Record<string, any>;
}>();
const copy = computed(() => compositionCopy[props.locale === 'de' ? 'de' : 'en']);
const feedback = ref(''),
    open = ref(false),
    query = ref(''),
    filters = ref<string[]>([]),
    text = ref('');
const removed = ref<string[]>([]);
const badgeItems = computed(() =>
    Object.entries(copy.value.badges)
        .filter(([key]) => !removed.value.includes(key))
        .map(([key, label]) => ({
            key,
            label,
            value: copy.value.values[key as keyof typeof copy.value.values],
        })),
);
const filterOptions = computed(() =>
    Object.entries(copy.value.types).map(([value, label]) => ({
        value,
        label,
    })),
);
const items = computed<CommandItem[]>(() =>
    filterOptions.value.flatMap((type, index) =>
        [0, 1].map((n) => ({
            value: type.value + '-' + n,
            label: type.label + (n ? ' API' : ''),
            description: copy.value.paragraph,
            group: index < 4 ? copy.value.navigation : copy.value.management,
            type: type.value,
            keywords: [type.value, 'MIRU'],
            icon: [IconFolder, IconUsers, IconMail, IconSettings][index % 4],
            shortcut: n ? '' : '↵',
            disabled: index === 2 && n === 1,
        })),
    ),
);
function select(item: CommandItem): void {
    feedback.value = item.label;
}
</script>
