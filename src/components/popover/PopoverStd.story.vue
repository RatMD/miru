<template>
    <Story title="Components/Popover/PopoverStd" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <div class="flex flex-row justify-center gap-4">
                <PopoverStd>
                    <template #default="{ show, hide, visible }">
                        <div class="demo-box" @click="(ev) => visible ? hide(ev) : show(ev)">
                            <span>Default Popover</span>
                        </div>
                    </template>

                    <template #content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                            commodo consequat.
                        </p>
                    </template>
                </PopoverStd>
            </div>
        </Variant>

        <Variant title="Placements">
            <template v-for="(items, idx) of placements" :key="idx">
                <div class="flex flex-row justify-center gap-4">
                    <template v-for="([key, label], id2) of Object.entries(items)" :key="id2">
                        <PopoverStd :label="label" :placement="(key as any)" arrow>
                            <template #default="{ show, hide, visible }">
                                <div class="demo-box" @click="(ev) => visible ? hide(ev) : show(ev)">
                                    <span>{{ key }}</span>
                                </div>
                            </template>
                            <template #content>
                                Some Content
                            </template>
                        </PopoverStd>
                    </template>
                </div>
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import PopoverStd from './PopoverStd.vue';

// Available Playments
const placements = [
    {
        'top': 'Top Tooltip',
        'top-start': 'Top-Start Tooltip',
        'top-end': 'Top-End Tooltip',
    },
    {
        'right': 'Right Tooltip',
        'right-start': 'Right-Start Tooltip',
        'right-end': 'Right-End Tooltip',
    },
    {
        'bottom': 'Bottom Tooltip',
        'bottom-start': 'Bottom-Start Tooltip',
        'bottom-end': 'Bottom-End Tooltip',
    },
    {
        'left': 'Left Tooltip',
        'left-start': 'Left-Start Tooltip',
        'left-end': 'Left-End Tooltip',
    },
];
</script>

<style lang="css">
.demo-box {
    @apply flex items-center justify-center w-48 h-16 m-4 border border-solid rounded-md cursor-pointer;
    @apply border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800;

    & span {
        pointer-events: none;
    }
}
</style>

<docs lang="md">
Work in Progress
</docs>
