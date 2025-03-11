<template>
    <div class="source">
        <nav class="source-tabs">
            <div class="tab-item tab-preview" :class="view == 'preview' ? 'is-active' : ''" @click="view = 'preview'">
                <span>Preview</span>
            </div>
            <div class="tab-item tab-code" :class="view == 'code' ? 'is-active' : ''" @click="view = 'code'">
                <span>Source Code</span>
            </div>

            <a :href="`https://histoire.miru.ink/${histoire.replace(/^\//, '')}`" target="_blank" v-if="props.histoire">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" version="1.1">
                    <rect style="opacity:0.5;fill:#34d399;fill-opacity:1;stroke-width:1.00375" id="rect1372" width="314.30923" height="406.60901" x="-26.565063" y="134.75079" transform="rotate(-23.821262)" ry="8"/>
                    <rect style="fill:#34d399;fill-opacity:1;stroke-width:1.00375" id="rect850" width="314.30923" height="406.60901" x="77.571838" y="72.808708" ry="8" transform="rotate(-4.5744534)"/>
                    <path style="display:inline;fill:#b4fae2;fill-opacity:1;stroke:#b4fae2;stroke-width:8.34923;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M 359.38947,355.95134 320.72935,176.52942 238.34613,238.94118 Z M 273.64124,273.06608 152.59788,156.05591 191.25804,335.47786 Z"/>
                </svg>
                <span>View on histoire.miru.ink</span>
            </a>
        </nav>

        <div class="source-views">
            <div class="source-view source-preview" :class="view == 'preview' ? 'is-visible' : ''">
                <div class="preview-content">
                    <slot name="default" />
                </div>
            </div>
            <div class="source-view source-code" :class="view == 'code' ? 'is-visible' : ''">
                <slot name="source" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * Miru Source Properties
 */
export interface MiruSourceProps {
    /**
     * The name of the component.
     */
    component: string;

    /**
     * Histoire URL path.
     */
    histoire?: string;
}

/**
 * Miru Source Properties
 */
export interface MiruSourceSlots {
    /**
     * The default demonstration content slot.
     */
    default(): any;

    /**
     * The source-code content slot.
     */
    source(): any;
}
</script>

<script lang="ts" setup>
import { ref, useAttrs } from 'vue';

// Define Component
const props = defineProps<MiruSourceProps>();
const slots = defineSlots<MiruSourceSlots>();

// States
const view = ref<'preview'|'code'>('preview');
</script>

<style scoped>
.source {
    @apply flex flex-col mt-8;
}

/** Source Tabs */
.source-tabs {
    @apply relative flex flex-row flex-wrap md:flex-nowrap z-20;

    & .tab-item {
        @apply px-5 py-2 border rounded-t-lg -mb-px text-sm cursor-pointer;
        border-color: transparent;

        &.is-active {
            background-color: var(--vp-code-block-bg);
            border-top-color: var(--vp-c-border);
            border-left-color: var(--vp-c-border);
            border-right-color: var(--vp-c-border);
            border-bottom-color: var(--vp-code-block-bg);
        }
    }

    & a {
        @apply flex flex-row gap-2 items-center justify-center px-3 ml-auto border rounded-lg no-underline;
        @apply -order-1 basis-full mb-4 py-2 md:order-3 md:basis-auto md:mb-1 md:py-0;
        @apply duration-200 ease-in-out transition-colors;
        color: #2C7C5F;
        border-color: #34D399;
        background-color: rgb(52 211 153 / 0.25);

        &:hover {
            border-color: #2C7C5F;
            background-color: rgb(52 211 153 / 0.3725);
        }

        & svg {
            @apply w-6 h-6;
        }

        & span {
            @apply no-underline font-normal text-xs;
        }
    }
}
.dark .source-tabs a {
    color: #34D399;
    border-color: #2C7C5F;
    background-color: rgb(44 124 95 / 0.25);

    &:hover {
        border-color: #34D399;
        background-color: rgb(44 124 95 / 0.5);
    }
}

/** Source Views */
.source-views {
    @apply flex h-96;

    & .source-view {
        @apply w-full flex flex-col border border-solid rounded-lg h-96;
        border-color: var(--vp-c-border);

        &:not(.is-visible) {
            @apply hidden;
        }
    }

    & .source-view.source-preview {
        @apply items-center justify-center;
        background-color: var(--vp-code-block-bg);

        &.is-visible {
            @apply rounded-tl-none;
        }

        & .preview-content {
            @apply overflow-x-auto p-8;
        }
    }

    & .source-view.source-code {
        & > :deep(div) {
            @apply h-full m-0;
            flex: 0 0 100%;
        }
    }
}
</style>
