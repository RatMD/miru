<template>
    <div>Divider</div>
</template>

<script lang="ts">
/**
 * Divider Properties
 */
export interface DividerProps {

}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'Divider'
}
</script>

<script lang="ts" setup>
// Define Component
const props = defineProps<DividerProps>();
</script>

<style scoped>
</style>
