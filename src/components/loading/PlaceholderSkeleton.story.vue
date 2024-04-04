<template>
    <Story title="Components/Loading/PlaceholderSkeleton" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <div class="p-4">
                <PlaceholderSkeleton width="12rem" height="0.75rem" />
            </div>
        </Variant>

        <Variant title="Vertical">
            <div class="p-4">
                <PlaceholderSkeleton width="8rem" height="8rem" vertical />
            </div>
        </Variant>

        <Variant title="Rounded">
            <div class="p-4">
                <PlaceholderSkeleton width="8rem" height="8rem" class="rounded-full" vertical />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import PlaceholderSkeleton from './PlaceholderSkeleton.vue';
</script>

<docs lang="md">
Work in Progress
</docs>
