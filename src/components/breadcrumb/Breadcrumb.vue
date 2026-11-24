<template>
    <nav
        :aria-label="trans('common.accessibility.breadcrumb')"
        data-slot="breadcrumb"
        :class="props.class">
        <slot />
    </nav>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { useI18n } from '../../composables/useI18n';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>
