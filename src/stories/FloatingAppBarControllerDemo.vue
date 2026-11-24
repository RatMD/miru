<template>
    <div class="grid gap-4">
        <div class="flex flex-wrap gap-2">
            <Button variant="outline" :disabled="depth > 0" @click="openInput">
                {{ labels.input }}
            </Button>
            <Button variant="outline" :disabled="current?.variant !== 'three'" @click="openCamera">
                {{ labels.camera }}
            </Button>
            <Button variant="outline" :disabled="depth === 0" @click="bar.pop">
                {{ labels.back }}
            </Button>
            <Button variant="outline" @click="bar.reset">{{ labels.reset }}</Button>
        </div>
        <p class="text-sm text-muted-foreground">{{ labels.hint }}</p>
        <div class="floating-controller-frame">
            <div class="space-y-3 p-5">
                <h2 class="text-lg font-semibold">{{ labels.title }}</h2>
                <p>{{ labels.layout }}: {{ current ? labels[current.variant] : labels.empty }}</p>
                <p>{{ labels.depth }}: {{ depth }}</p>
                <p role="status">{{ labels.last }}: {{ lastAction || labels.none }}</p>
            </div>
            <FloatingAppBar
                v-if="current"
                :label="labels.title"
                :fixed="false"
                class="floating-controller-bar"
                :variant="current.variant"
                :shape="current.shape"
                :appearance="current.appearance"
                :gradient-tone="current.gradientTone"
                :bordered="current.bordered"
                :transition-key="transitionKey">
                <template #left>
                    <Button
                        v-for="item in current.left"
                        :key="item.key"
                        variant="ghost"
                        icon-only
                        :disabled="toValue(item.disabled)"
                        :loading="toValue(item.loading)"
                        :aria-label="toValue(item.label)"
                        @click="invoke(item)">
                        <component :is="unref(item.icon)" class="size-5" />
                    </Button>
                </template>
                <template #primary>
                    <Button
                        :variant="current.primary.tone ?? 'primary'"
                        icon-only
                        :disabled="toValue(current.primary.disabled)"
                        :loading="toValue(current.primary.loading)"
                        :aria-label="toValue(current.primary.label)"
                        @click="invoke(current.primary)">
                        <component :is="unref(current.primary.icon)" class="size-7" />
                    </Button>
                </template>
                <template #right>
                    <Button
                        v-for="item in current.right"
                        :key="item.key"
                        variant="ghost"
                        icon-only
                        :disabled="toValue(item.disabled)"
                        :loading="toValue(item.loading)"
                        :aria-label="toValue(item.label)"
                        @click="invoke(item)">
                        <component :is="unref(item.icon)" class="size-5" />
                    </Button>
                </template>
                <template v-if="current.auxiliaryStart" #auxiliary-start>
                    <Button
                        :variant="current.auxiliaryStart.tone ?? 'danger'"
                        icon-only
                        :aria-label="toValue(current.auxiliaryStart.label)"
                        @click="invoke(current.auxiliaryStart)">
                        <component :is="unref(current.auxiliaryStart.icon)" class="size-5" />
                    </Button>
                </template>
            </FloatingAppBar>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { FloatingAppBarAction, FloatingAppBarConfig } from '../composables/useFloatingAppBar';
import type { Component } from 'vue';
import {
    IconArrowLeft,
    IconBell,
    IconCamera,
    IconCheck,
    IconHome,
    IconScan,
    IconUserCircle,
    IconX,
} from '@tabler/icons-vue';
import { computed, ref, toValue, unref } from 'vue';
import { FloatingAppBar } from '../components/app-bar';
import { Button } from '../components/button';
import { provideFloatingAppBar } from '../composables/useFloatingAppBar';
const props = withDefaults(defineProps<{ locale?: string }>(), { locale: 'en' });
const messages = {
    en: {
        input: 'Open input',
        camera: 'Open camera',
        back: 'Back',
        reset: 'Reset',
        hint: 'Open input, then camera. Back restores the preceding bar. The primary buttons also open and close these layers.',
        title: 'Shared bar controller',
        layout: 'Current layout',
        depth: 'Overlay depth',
        last: 'Last action',
        none: 'No action yet',
        empty: 'Hidden',
        five: 'Five Actions',
        three: 'Three Actions',
        primary: 'Primary Action',
        home: 'Home',
        scan: 'Scan or enter a code',
        close: 'Close input',
        confirm: 'Confirm input',
        photo: 'Take photo',
        cancel: 'Close camera',
        notifications: 'Notifications',
        profile: 'Profile',
    },
    de: {
        input: 'Eingabe öffnen',
        camera: 'Kamera öffnen',
        back: 'Zurück',
        reset: 'Zurücksetzen',
        hint: 'Eingabe öffnen, danach Kamera. Zurück stellt die vorherige Bar wieder her. Auch die Primary-Buttons öffnen und schließen diese Ebenen.',
        title: 'Gemeinsamer Bar-Controller',
        layout: 'Aktuelles Layout',
        depth: 'Überlagerungstiefe',
        last: 'Letzte Aktion',
        none: 'Noch keine Aktion',
        empty: 'Ausgeblendet',
        five: 'Fünf Aktionen',
        three: 'Drei Aktionen',
        primary: 'Primäre Aktion',
        home: 'Startseite',
        scan: 'Code scannen oder eingeben',
        close: 'Eingabe schließen',
        confirm: 'Eingabe bestätigen',
        photo: 'Foto aufnehmen',
        cancel: 'Kamera schließen',
        notifications: 'Benachrichtigungen',
        profile: 'Profil',
    },
} as const;
const labels = computed(() => messages[props.locale === 'de' ? 'de' : 'en']);
type Label =
    | 'home'
    | 'back'
    | 'scan'
    | 'close'
    | 'confirm'
    | 'camera'
    | 'photo'
    | 'cancel'
    | 'notifications'
    | 'profile';
const lastAction = ref('');
function action(key: Label, icon: Component, onClick?: () => void): FloatingAppBarAction {
    return {
        key,
        icon,
        label: () => labels.value[key],
        onClick: () => {
            lastAction.value = labels.value[key];
            onClick?.();
        },
    };
}
const visual = { shape: 'rounded-hexagon', appearance: 'gradient', bordered: false } as const;
const initial: FloatingAppBarConfig = {
    ...visual,
    variant: 'five',
    primary: action('scan', IconScan, openInput),
    left: [
        action('home', IconHome, () => bar.reset()),
        { ...action('back', IconArrowLeft), disabled: true },
    ],
    right: [action('notifications', IconBell), action('profile', IconUserCircle)],
};
const bar = provideFloatingAppBar(initial);
const { current, transitionKey, depth } = bar;
function openInput(): void {
    bar.push({
        ...visual,
        variant: 'three',
        gradientTone: 'success',
        primary: action('confirm', IconCheck, () => bar.pop()),
        left: [action('close', IconX, () => bar.pop())],
        right: [action('camera', IconCamera, openCamera)],
    });
}
function openCamera(): void {
    bar.push({
        ...visual,
        variant: 'primary',
        gradientTone: 'info',
        primary: action('photo', IconCamera, () => bar.pop()),
        auxiliaryStart: { ...action('cancel', IconX, () => bar.pop()), tone: 'danger' },
    });
}
async function invoke(item: FloatingAppBarAction): Promise<void> {
    if (toValue(item.disabled) || toValue(item.loading)) return;
    await item.onClick?.();
}
</script>
<style>
.floating-controller-frame {
    position: relative;
    isolation: isolate;
    width: min(100%, 24rem);
    height: 25rem;
    border: 1px solid var(--ui-border);
    border-radius: 1.5rem;
    overflow: hidden;
    background: var(--ui-background);
}
.floating-controller-frame::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 6rem;
    background: linear-gradient(to top, #0002, transparent);
    pointer-events: none;
}
.floating-controller-bar {
    position: absolute;
    z-index: 2;
    top: calc(100% - var(--ui-floating-app-bar-dock-offset));
    left: 50%;
    translate: -50% -50%;
    margin: 0;
    padding-bottom: 1rem;
}
</style>
