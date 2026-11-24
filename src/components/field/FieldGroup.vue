<template>
    <div
        data-slot="field-group"
        :class="
            cn(
                'group/field-group @container/field-group flex w-full flex-col gap-4 data-[slot=checkbox-group]:gap-3 lg:gap-6 xl:gap-7 [&>[data-slot=field-group]]:gap-4',
                props.class,
            )
        ">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>
