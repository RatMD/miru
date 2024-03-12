<template>
    <svg xmlns="http://www.w3.org/2000/svg" 
        :width="props.size" 
        :height="props.size" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        :stroke-width="props.strokeWidth" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="lucide lucide-plus">
        <path d="M5 12h14"/>
        <path d="M12 5v14"/>
    </svg>
</template>

<script lang="ts">
/**
 * We integrate the required LucideIcons manually, to reduce the build effort and not setting any 
 * requirements for the icon package.
 * @source https://lucide.dev/icons/plus
 */
export interface LucideIconProps {
    size?: 24 | number;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'PlusSign'
}
</script>

<script lang="ts" setup>
// Define Component
const props = withDefaults(defineProps<LucideIconProps>(), {
    size: 24,
    strokeWidth: 1.5,
    absoluteStrokeWidth: false
});
</script>

<style scoped></style>
