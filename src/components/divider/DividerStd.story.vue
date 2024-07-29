<template>
    <Story title="Components/Divider/DividerStd" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <DividerStd />
        </Variant>

        <Variant title="Spacings">
            <div class="flex flex-col gap-4">
                <div class="border border-gray-200 rounded dark:border-gray-600">
                    <DividerStd spacing="xs" />
                </div>
                <div class="border border-gray-200 rounded dark:border-gray-600">
                    <DividerStd spacing="sm" />
                </div>
                <div class="border border-gray-200 rounded dark:border-gray-600">
                    <DividerStd spacing="md" />
                </div>
                <div class="border border-gray-200 rounded dark:border-gray-600">
                    <DividerStd spacing="lg" />
                </div>
                <div class="border border-gray-200 rounded dark:border-gray-600">
                    <DividerStd spacing="xl" />
                </div>
            </div>
        </Variant>

        <Variant title="Variants">
            <div class="flex flex-col gap-4">
                <div>
                    <DividerStd variant="solid" />
                </div>
                <div>
                    <DividerStd variant="dashed" />
                </div>
                <div>
                    <DividerStd variant="dotted" />
                </div>
                <div>
                    <DividerStd variant="scissor" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import DividerStd from './DividerStd.vue';

</script>

<docs lang="md">
Work in Progress
</docs>
