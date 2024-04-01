<template>
    <Story title="Components/Card/BaseCard" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <BaseCard>
                <div class="p-4">
                    Card Content
                </div>
            </BaseCard>
        </Variant>

        <Variant title="Small Size">
            <BaseCard size="sm">
                <div class="p-4">
                    Card Content
                </div>
            </BaseCard>
        </Variant>

        <Variant title="Medium Size">
            <BaseCard size="md">
                <div class="p-4">
                    Card Content
                </div>
            </BaseCard>
        </Variant>

        <Variant title="Large Size">
            <BaseCard size="lg">
                <div class="p-4">
                    Card Content
                </div>
            </BaseCard>
        </Variant>

        <Variant title="Fullwidth Size">
            <BaseCard size="full">
                <div class="p-4">
                    Card Content
                </div>
            </BaseCard>
        </Variant>

        <Variant title="Small Shadow">
            <div class="flex flex-col items-center p-8">
                <BaseCard size="sm" shadow="sm">
                    <div class="p-4">
                        Card Content
                    </div>
                </BaseCard>
            </div>
        </Variant>

        <Variant title="Medium Shadow">
            <div class="flex flex-col items-center p-8">
                <BaseCard size="sm" shadow="md">
                    <div class="p-4">
                        Card Content
                    </div>
                </BaseCard>
            </div>
        </Variant>

        <Variant title="Large Shadow">
            <div class="flex flex-col items-center p-8">
                <BaseCard size="sm" shadow="lg">
                    <div class="p-4">
                        Card Content
                    </div>
                </BaseCard>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import BaseCard from './BaseCard.vue';

</script>

<docs lang="md">
Work in Progress
</docs>
