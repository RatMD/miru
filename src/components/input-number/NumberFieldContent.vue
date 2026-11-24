<template>
    <InputGroup :size="size ?? inheritedSize ?? 'default'" :class="props.class">
        <slot />
    </InputGroup>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { inject } from 'vue';
import { InputGroup, inputGroupSizeKey } from '../input-group';
const props = defineProps<{ class?: HTMLAttributes['class']; size?: 'sm' | 'default' | 'lg' }>();
const inheritedSize = inject(inputGroupSizeKey, undefined);
</script>
