<template>
    <Story title="Components/Feedback/LoadingSpinner" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <div class="p-4">
                <LoadingSpinner />
            </div>
        </Variant>

        <Variant title="Colors & Sizes">
            <div class="flex flex-col gap-4 p-4">
                <div class="flex gap-4">
                    <LoadingSpinner size="sm" />
                    <LoadingSpinner size="sm" color="primary" />
                    <LoadingSpinner size="sm" color="secondary" />
                    <LoadingSpinner size="sm" color="success" />
                    <LoadingSpinner size="sm" color="warning" />
                    <LoadingSpinner size="sm" color="danger" />
                    <LoadingSpinner size="sm" color="info" />
                </div>
                <div class="flex gap-4">
                    <LoadingSpinner />
                    <LoadingSpinner color="primary" />
                    <LoadingSpinner color="secondary" />
                    <LoadingSpinner color="success" />
                    <LoadingSpinner color="warning" />
                    <LoadingSpinner color="danger" />
                    <LoadingSpinner color="info" />
                </div>
                <div class="flex gap-4">
                    <LoadingSpinner size="lg" />
                    <LoadingSpinner size="lg" color="primary" />
                    <LoadingSpinner size="lg" color="secondary" />
                    <LoadingSpinner size="lg" color="success" />
                    <LoadingSpinner size="lg" color="warning" />
                    <LoadingSpinner size="lg" color="danger" />
                    <LoadingSpinner size="lg" color="info" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import LoadingSpinner from './LoadingSpinner.vue';
</script>

<docs lang="md">
Work in Progress
</docs>
