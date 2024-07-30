<template>
    <Story title="Components/Popover/ContextMenu" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <div class="flex flex-row gap-4">
                <ContextMenu :actions="actions">
                    <template #default="{ show, hide, visible }">
                        <div class="demo-box" @click="(ev) => visible ? hide(ev) : show(ev)">
                            <span>Context Menu</span>
                        </div>
                    </template>
                </ContextMenu>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ContextMenu, { type ContextMenuAction } from './ContextMenu.vue';

const actions = ref<ContextMenuAction[]>([
    {
        label: 'Menu Item #1'
    }
]);
</script>

<docs lang="md">
Work in Progress
</docs>
