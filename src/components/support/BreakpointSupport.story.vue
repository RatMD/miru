<template>
    <Story title="Support/BreakpointSupport">
        <Variant title="Default">
            <BreakpointSupport max="xxs">
                xss
            </BreakpointSupport>

            <BreakpointSupport min="xxs" max="xs">
                xxs - xs
            </BreakpointSupport>

            <BreakpointSupport min="xs" max="sm">
                xs - sm
            </BreakpointSupport>

            <BreakpointSupport min="sm" max="md">
                sm - md
            </BreakpointSupport>

            <BreakpointSupport min="md" max="lg">
                md - lg
            </BreakpointSupport>

            <BreakpointSupport min="lg" max="xl">
                lg - xl
            </BreakpointSupport>

            <BreakpointSupport min="xl" max="xxl">
                xl - xxl
            </BreakpointSupport>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import BreakpointSupport from './BreakpointSupport.vue';
</script>

<docs lang="md">
Work in Progress
</docs>
