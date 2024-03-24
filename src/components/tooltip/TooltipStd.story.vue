<template>
    <Story title="Components/Tooltip/TooltipStd" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <TooltipStd label="Tooltip" />
        </Variant>

        <Variant title="Placements">
            <template v-for="(items, idx) of placements" :key="idx">
                <div class="flex flex-row gap-4">
                    <template v-for="([key, label], id2) of Object.entries(items)" :key="id2">
                        <TooltipStd :label="label" :placement="(key as any)" v-slot="{ show, hide }">
                            <div class="flex items-center justify-center w-48 h-16 m-4 border border-gray-300 border-solid rounded-md bg-gray-50" 
                                @mouseover="show" @mouseout="hide">
                                {{ key }}
                            </div>
                        </TooltipStd>
                    </template>
                </div>
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import TooltipStd from './TooltipStd.vue';

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

<docs lang="md">
</docs>
