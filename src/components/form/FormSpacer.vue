<template>
    <div aria-hidden="true" :class="[spanClasses, 'hidden md:block', definition.class]" />
</template>

<script setup lang="ts">
import type { FormSpacerDefinition } from './types';
import { computed } from 'vue';
import { formSpanClasses } from './layout';

const props = defineProps<{ definition: FormSpacerDefinition }>();
const spanClasses = computed(() => formSpanClasses(props.definition.span));
</script>
