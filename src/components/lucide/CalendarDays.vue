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
        class="lucide lucide-calendar-days">
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
        <path d="M8 14h.01"/>
        <path d="M12 14h.01"/>
        <path d="M16 14h.01"/>
        <path d="M8 18h.01"/>
        <path d="M12 18h.01"/>
        <path d="M16 18h.01"/>
    </svg>
</template>

<script lang="ts">
/**
 * We integrate the required LucideIcons manually, to reduce the build effort and not setting any 
 * requirements for the icon package.
 * @source https://lucide.dev/icons/calendar-days
 */
export interface LucideIconProps {
    size?: 24 | number;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'CalendarDays'
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
