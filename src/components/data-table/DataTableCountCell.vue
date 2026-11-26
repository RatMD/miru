<template><TableCountValue :value="value" /></template>
<script setup lang="ts">
import TableCountValue from '../table/values/TableCountValue.vue';
defineOptions({ inheritAttrs: false });
defineProps<{ value: unknown }>();
</script>
