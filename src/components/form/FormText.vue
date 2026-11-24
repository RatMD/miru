<template>
    <template v-if="'translation' in text">
        {{ trans(text.translation, text.replacements) }}
    </template>
    <template v-else>{{ text.value }}</template>
</template>

<script setup lang="ts">
import type { FormText } from './types';

defineProps<{ text: FormText }>();

import { useI18n } from '../../composables/useI18n';
const { trans } = useI18n();
</script>
