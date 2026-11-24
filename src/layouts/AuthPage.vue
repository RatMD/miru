<template>
    <section
        data-slot="auth-page"
        :data-variant="variant"
        :data-panel-side="panelSide"
        :data-full-height="fullHeight"
        :data-framed="framed"
        :data-hide-visual="hideVisualOnMobile"
        :class="
            cn(
                'miru-auth-page relative isolate w-full min-w-0 bg-muted p-3 text-foreground md:p-6',
                props.class,
            )
        "
        :style="layoutStyle">
        <div
            data-slot="auth-frame"
            class="miru-auth-frame relative isolate mx-auto w-full min-w-0 overflow-hidden bg-background">
            <main
                data-slot="auth-panel"
                class="miru-auth-panel relative z-10 flex min-w-0 flex-col bg-background"
                :aria-labelledby="title && !$slots.header ? titleId : undefined">
                <div v-if="$slots.brand" class="shrink-0 border-b border-border px-6 py-6 md:px-8">
                    <slot name="brand" />
                </div>
                <div
                    class="miru-auth-form flex min-h-0 flex-1 flex-col gap-7 px-6 py-7 md:px-8 md:py-9">
                    <header v-if="title || description || $slots.header">
                        <slot name="header">
                            <h1
                                v-if="title"
                                :id="titleId"
                                class="text-2xl font-semibold tracking-tight">
                                {{ title }}
                            </h1>
                            <p
                                v-if="description"
                                class="mt-3 text-sm leading-6 text-muted-foreground">
                                {{ description }}
                            </p>
                        </slot>
                    </header>
                    <slot />
                </div>
                <footer
                    v-if="$slots.footer"
                    class="shrink-0 border-t border-border px-6 py-5 text-sm text-muted-foreground md:px-8">
                    <slot name="footer" />
                </footer>
            </main>
            <div
                data-slot="auth-visual"
                class="miru-auth-visual relative min-w-0 overflow-hidden bg-neutral-950">
                <slot name="visual">
                    <img
                        v-if="image"
                        :src="image"
                        :alt="imageAlt"
                        class="absolute inset-0 size-full object-cover" />
                    <AuthArtwork v-else class="absolute inset-0" />
                </slot>
                <div
                    v-if="$slots['visual-overlay']"
                    class="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/75 to-transparent p-7 pt-28 text-white md:p-12 md:pt-32">
                    <slot name="visual-overlay" />
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue';
import { computed, useId } from 'vue';
import { cn } from '../support/classNames';
import AuthArtwork from './auth/AuthArtwork.vue';

const props = withDefaults(
    defineProps<{
        title?: string;
        description?: string;
        /** Side-by-side authentication screen or a centered card over the visual. */
        variant?: 'split' | 'card';
        panelSide?: 'left' | 'right';
        /** Host-owned image URL. The fallback illustration uses the active palette. */
        image?: string;
        imageAlt?: string;
        panelWidth?: number | string;
        maxWidth?: number | string;
        height?: number | string;
        fullHeight?: boolean;
        framed?: boolean;
        hideVisualOnMobile?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    {
        variant: 'split',
        panelSide: 'left',
        imageAlt: '',
        panelWidth: '26rem',
        maxWidth: '90rem',
        height: 'min(90dvh,64rem)',
        fullHeight: true,
        framed: true,
        hideVisualOnMobile: false,
    },
);
const titleId = `auth-title-${useId()}`;
const length = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const layoutStyle = computed<CSSProperties>(() => ({
    '--auth-panel-width': length(props.panelWidth),
    '--auth-max-width': length(props.maxWidth),
    '--auth-height': length(props.height),
}));
</script>
<style scoped>
.miru-auth-page {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-bottom));
}
.miru-auth-page[data-full-height='true'] {
    min-height: 100dvh;
}
.miru-auth-frame {
    display: flex;
    max-width: var(--auth-max-width);
    min-height: 36rem;
    height: var(--auth-height);
}
.miru-auth-page[data-framed='true'] .miru-auth-frame {
    border: 1px solid var(--ui-border);
    border-radius: 1.5rem;
    box-shadow: 0 20px 70px rgb(0 0 0 / 0.16);
}
.miru-auth-panel {
    width: min(48%, var(--auth-panel-width));
    flex: none;
}
.miru-auth-form {
    overflow-y: auto;
    overscroll-behavior: contain;
}
.miru-auth-visual {
    flex: 1;
    z-index: 0;
}
.miru-auth-page[data-panel-side='right'] .miru-auth-panel {
    order: 2;
}
.miru-auth-page[data-variant='card'] .miru-auth-frame {
    align-items: center;
    justify-content: center;
    padding: 2rem;
}
.miru-auth-page[data-variant='card'] .miru-auth-panel {
    width: min(100%, var(--auth-panel-width));
    max-height: 100%;
    border: 1px solid var(--ui-border);
    border-radius: 1.25rem;
    overflow: hidden;
    box-shadow: 0 20px 60px rgb(0 0 0 / 0.2);
}
.miru-auth-page[data-variant='card'] .miru-auth-visual {
    position: absolute;
    inset: 0;
}
@media (max-width: 1023px) {
    .miru-auth-page[data-variant='split'] .miru-auth-frame {
        height: auto;
        min-height: 0;
        flex-direction: column;
    }
    .miru-auth-page[data-variant='split'] .miru-auth-visual {
        order: 0;
        flex: none;
        height: min(40dvh, 20rem);
        min-height: 10rem;
    }
    .miru-auth-page[data-variant='split'] .miru-auth-panel {
        order: 1;
        width: 100%;
        margin-top: -1.5rem;
        border-radius: 1.5rem 1.5rem 0 0;
    }
    .miru-auth-page[data-variant='split'] .miru-auth-form {
        overflow: visible;
    }
    .miru-auth-page[data-variant='split'][data-hide-visual='true'] .miru-auth-visual {
        display: none;
    }
    .miru-auth-page[data-variant='split'][data-hide-visual='true'] .miru-auth-panel {
        margin-top: 0;
    }
}
@media (max-width: 479px) {
    .miru-auth-page[data-variant='card'] .miru-auth-frame {
        height: auto;
        min-height: 100dvh;
        padding: 1rem;
    }
    .miru-auth-page[data-variant='card'] .miru-auth-panel {
        max-height: none;
    }
}
</style>
