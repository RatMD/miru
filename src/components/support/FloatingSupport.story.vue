<template>
    <Story title="Support/FloatingSupport">
        <Variant title="Default">
            <FloatingSupport>
                <template #default="{ show, hide }">
                    <CardStd @pointerenter="show" @pointerleave="hide">
                        <div class="p-4">Target Element</div>
                    </CardStd>
                </template>

                <template #floating>
                    Floating Text
                </template>
            </FloatingSupport>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import FloatingSupport from './FloatingSupport.vue';
import CardStd from '../card/CardStd.vue';
</script>

<docs lang="md">
Work in Progress
</docs>
