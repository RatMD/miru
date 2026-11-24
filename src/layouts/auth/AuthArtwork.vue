<template>
    <svg
        viewBox="0 0 1000 1100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        class="size-full">
        <defs>
            <linearGradient :id="`${id}-base`" x1="0" y1="0" x2="1" y2="1">
                <stop stop-color="var(--ui-neutral-950)" />
                <stop offset="1" stop-color="var(--ui-primary-950)" />
            </linearGradient>
            <radialGradient :id="`${id}-glow`">
                <stop stop-color="var(--ui-accent-400)" stop-opacity=".65" />
                <stop offset="1" stop-color="var(--ui-accent-400)" stop-opacity="0" />
            </radialGradient>
            <linearGradient :id="`${id}-ribbon`" x1="0" y1="0" x2="1" y2="1">
                <stop stop-color="var(--ui-primary-400)" />
                <stop offset=".55" stop-color="var(--ui-secondary-400)" />
                <stop offset="1" stop-color="var(--ui-accent-300)" />
            </linearGradient>
        </defs>
        <rect width="1000" height="1100" :fill="`url(#${id}-base)`" />
        <circle cx="780" cy="260" r="610" :fill="`url(#${id}-glow)`" />
        <g fill="none" :stroke="`url(#${id}-ribbon)`" stroke-width="1.3" opacity=".24">
            <ellipse
                v-for="index in 15"
                :key="index"
                cx="520"
                cy="650"
                :rx="120 + index * 25"
                :ry="190 + index * 26"
                :transform="`rotate(-28 520 650) translate(${index * 2} 0)`" />
        </g>
        <path
            d="M-120 950C120 350 590 920 1120 280"
            fill="none"
            :stroke="`url(#${id}-ribbon)`"
            stroke-width="135"
            opacity=".65" />
        <path
            d="M-120 1010C120 410 590 980 1120 340"
            fill="none"
            :stroke="`url(#${id}-ribbon)`"
            stroke-width="2"
            opacity=".65" />
        <circle cx="710" cy="330" r="100" fill="var(--ui-accent-200)" opacity=".8" />
        <circle cx="730" cy="310" r="98" fill="var(--ui-primary-950)" opacity=".8" />
        <g fill="white" opacity=".45">
            <circle
                v-for="index in 32"
                :key="index"
                :cx="(index * 173) % 1000"
                :cy="(index * 211) % 1100"
                r="1.4" />
        </g>
    </svg>
</template>
<script setup lang="ts">
import { useId } from 'vue';
const id = `auth-art-${useId()}`;
</script>
