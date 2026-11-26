<template>
    <component :is="navigation.link ?? 'a'" v-bind="$attrs"><slot /></component>
</template>
<script setup lang="ts">
import { useNavigation } from '../../composables/useNavigation';

defineOptions({ inheritAttrs: false });
const navigation = useNavigation();
</script>
