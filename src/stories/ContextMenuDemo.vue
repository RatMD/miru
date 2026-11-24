<template>
    <div class="grid w-[min(28rem,calc(100vw-3rem))] gap-4 text-foreground">
        <ContextMenu :modal="modal">
            <ContextMenuTrigger as-child>
                <button
                    type="button"
                    class="grid h-44 place-content-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    Right click or press Shift+F10
                </button>
            </ContextMenuTrigger>
            <ContextMenuContent class="w-64" aria-label="Workspace actions">
                <ContextMenuLabel>Workspace</ContextMenuLabel>
                <ContextMenuGroup>
                    <ContextMenuItem @select="selection = 'rename'">
                        <IconPencil />
                        Rename
                        <ContextMenuShortcut>F2</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem disabled>Unavailable action</ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>
                            <IconShare />
                            Share
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent class="w-48">
                            <ContextMenuItem @select="selection = 'copy-link'">
                                Copy link
                            </ContextMenuItem>
                            <ContextMenuItem @select="selection = 'invite'">
                                Invite member
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem v-model="details" @select.prevent>
                    Show details
                </ContextMenuCheckboxItem>
                <ContextMenuRadioGroup v-model="view">
                    <ContextMenuRadioItem value="grid" @select.prevent>
                        Grid view
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value="list" @select.prevent>
                        List view
                    </ContextMenuRadioItem>
                </ContextMenuRadioGroup>
                <ContextMenuSeparator />
                <ContextMenuItem variant="danger" @select="selection = 'delete'">
                    <IconTrash />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
        <output data-testid="context-state" class="text-xs text-muted-foreground">
            action:{{ selection }} details:{{ details }} view:{{ view }}
        </output>
    </div>
</template>
<script setup lang="ts">
import { IconPencil, IconShare, IconTrash } from '@tabler/icons-vue';
import { ref } from 'vue';
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '../components/context-menu';
withDefaults(defineProps<{ modal?: boolean }>(), { modal: true });
const selection = ref('none');
const details = ref(true);
const view = ref('grid');
</script>
