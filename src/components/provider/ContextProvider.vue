<template>
    <ConfigProvider :locale="locale"><slot /></ConfigProvider>
</template>
<script setup lang="ts">
import type { I18nTranslator, I18nChoiceTranslator } from '../../plugins/i18n';
import { ConfigProvider } from 'reka-ui';
import { provideI18nLocale } from '../../composables/useI18n';
const props = defineProps<{
    locale?: string;
    translate?: I18nTranslator;
    translateChoice?: I18nChoiceTranslator;
}>();
const locale = provideI18nLocale(
    () => props.locale,
    () => props.translate,
    () => props.translateChoice,
);
</script>
