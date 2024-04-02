<template>
    <Story title="Support/BreakpointSupport">
        <Variant title="Default">
            <BreakpointSupport max="xxs">
                xxs
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

            <BreakpointSupport min="xxl">
                xxl
            </BreakpointSupport>
        </Variant>

        <Variant title="Else slot">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row items-center">
                    <div class="basis-[120px]">up to xxs</div>
                    <BreakpointSupport max="xxs">
                        <div class="bg-success-50 text-success-600 px-4 py-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>

                        <template #else>
                            <div class="bg-danger-50 text-danger-600 px-4 py-1.5 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </div>
                        </template>
                    </BreakpointSupport>
                </div>
                <div class="flex flex-row items-center">
                    <div class="basis-[120px]">xxs - xs</div>
                    <BreakpointSupport min="xxs" max="xs">
                        <div class="bg-success-50 text-success-600 px-4 py-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>

                        <template #else>
                            <div class="bg-danger-50 text-danger-600 px-4 py-1.5 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </div>
                        </template>
                    </BreakpointSupport>
                </div>
                <div class="flex flex-row items-center">
                    <div class="basis-[120px]">xs - sm</div>
                    <BreakpointSupport min="xs" max="sm">
                        <div class="bg-success-50 text-success-600 px-4 py-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>

                        <template #else>
                            <div class="bg-danger-50 text-danger-600 px-4 py-1.5 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </div>
                        </template>
                    </BreakpointSupport>
                </div>
                <div class="flex flex-row items-center">
                    <div class="basis-[120px]">sm - md</div>
                    <BreakpointSupport min="sm" max="md">
                        <div class="bg-success-50 text-success-600 px-4 py-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>

                        <template #else>
                            <div class="bg-danger-50 text-danger-600 px-4 py-1.5 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </div>
                        </template>
                    </BreakpointSupport>
                </div>
                <div class="flex flex-row items-center">
                    <div class="basis-[120px]">md - lg</div>
                    <BreakpointSupport min="md" max="lg">
                        <div class="bg-success-50 text-success-600 px-4 py-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>

                        <template #else>
                            <div class="bg-danger-50 text-danger-600 px-4 py-1.5 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </div>
                        </template>
                    </BreakpointSupport>
                </div>
                <div class="flex flex-row items-center">
                    <div class="basis-[120px]">lg - xl</div>
                    <BreakpointSupport min="lg" max="xl">
                        <div class="bg-success-50 text-success-600 px-4 py-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>

                        <template #else>
                            <div class="bg-danger-50 text-danger-600 px-4 py-1.5 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </div>
                        </template>
                    </BreakpointSupport>
                </div>
                <div class="flex flex-row items-center">
                    <div class="basis-[120px]">xl - xxl</div>
                    <BreakpointSupport min="xl" max="xxl">
                        <div class="bg-success-50 text-success-600 px-4 py-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>

                        <template #else>
                            <div class="bg-danger-50 text-danger-600 px-4 py-1.5 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </div>
                        </template>
                    </BreakpointSupport>
                </div>
                <div class="flex flex-row items-center">
                    <div class="basis-[120px]">xxl+</div>
                    <BreakpointSupport min="xxl">
                        <div class="bg-success-50 text-success-600 px-4 py-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>

                        <template #else>
                            <div class="bg-danger-50 text-danger-600 px-4 py-1.5 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </div>
                        </template>
                    </BreakpointSupport>
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import BreakpointSupport from './BreakpointSupport.vue';
</script>

<docs lang="md">
Work in Progress
</docs>
