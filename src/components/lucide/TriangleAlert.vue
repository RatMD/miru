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
        class="lucide lucide-triangle-alert">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
    </svg>
</template>

<script lang="ts">
/**
 * We integrate the required LucideIcons manually, to reduce the build effort and not setting any 
 * requirements for the icon package.
 * @source https://lucide.dev/icons/triangle-alert
 */
export interface LucideIconProps {
    size?: 24 | number;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'TriangleAlert'
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
