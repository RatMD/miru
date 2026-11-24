<template>
    <header :class="[spanClasses, definition.class, 'border-b pb-4']">
        <h3 class="text-lg font-semibold"><FormText :text="definition.title" /></h3>
        <p v-if="definition.description" class="text-sm text-muted-foreground">
            <FormText :text="definition.description" />
        </p>
    </header>
</template>

<script setup lang="ts">
import type { FormHeaderDefinition } from './types';
import { computed } from 'vue';
import FormText from './FormText.vue';
import { formSpanClasses } from './layout';

const props = defineProps<{ definition: FormHeaderDefinition }>();
const spanClasses = computed(() => formSpanClasses(props.definition.span ?? 12));
</script>
