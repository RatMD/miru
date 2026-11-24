<template>
    <div class="floating-bar-demo">
        <div class="flex flex-wrap items-center gap-2">
            <Button
                v-for="option in layouts"
                :key="option"
                size="sm"
                :variant="currentVariant === option ? 'primary' : 'outline'"
                :aria-pressed="currentVariant === option"
                @click="currentVariant = option">
                {{ option === 'primary' ? labels.primaryAction : labels[option] }}
            </Button>
            <template v-if="currentVariant !== 'five'">
                <Button
                    size="sm"
                    :variant="leftEnabled ? 'primary' : 'outline'"
                    :aria-pressed="leftEnabled"
                    @click="leftEnabled = !leftEnabled">
                    {{ labels.leftButton }}
                </Button>
                <Button
                    size="sm"
                    :variant="rightEnabled ? 'primary' : 'outline'"
                    :aria-pressed="rightEnabled"
                    @click="rightEnabled = !rightEnabled">
                    {{ labels.rightButton }}
                </Button>
            </template>
            <Button
                size="sm"
                variant="outline"
                :aria-pressed="landscapePreview"
                @click="rotatePreview">
                <IconRotate class="size-4" />
                {{ labels.rotate }}
            </Button>
            <Button
                size="sm"
                variant="outline"
                :disabled="reducedMotion"
                :aria-pressed="isActive"
                @click="isActive ? pause() : resume()">
                <component :is="isActive ? IconPlayerPause : IconPlayerPlay" class="size-4" />
                {{ isActive ? labels.pause : labels.play }}
            </Button>
            <Button
                v-if="currentVariant === 'five'"
                size="sm"
                variant="outline"
                :aria-pressed="backDisabled"
                @click="backDisabled = !backDisabled">
                {{ labels.disabledBack }}
            </Button>
            <Button
                size="sm"
                :variant="surfaceMode === 'white' ? 'primary' : 'outline'"
                :aria-pressed="surfaceMode === 'white'"
                @click="surfaceMode = surfaceMode === 'white' ? 'dark' : 'white'">
                {{ labels.whitePage }}
            </Button>
            <Button
                v-if="surfaceMode === 'white'"
                size="sm"
                :variant="bottomShadow ? 'primary' : 'outline'"
                :aria-pressed="bottomShadow"
                @click="bottomShadow = !bottomShadow">
                {{ labels.bottomShadow }}
            </Button>
        </div>
        <div
            v-for="control in colorControls"
            :key="control.key"
            class="flex flex-wrap items-center gap-2"
            role="group"
            :aria-label="control.label">
            <span class="w-36 text-sm font-medium">{{ control.label }}</span>
            <Button
                v-for="tone in tones"
                :key="tone"
                size="sm"
                :variant="control.tone === tone ? 'primary' : 'outline'"
                @click="setTone(control.key, tone)"
                :aria-pressed="control.tone === tone">
                {{ labels[tone] }}
            </Button>
        </div>
        <p class="text-sm text-muted-foreground">
            {{ viewport ? labels.viewportHint : labels.previewHint }}
            <span v-if="reducedMotion">{{ labels.reduced }}</span>
        </p>
        <div
            ref="frame"
            class="floating-bar-demo-frame"
            :class="{ 'is-landscape': landscapePreview, 'is-viewport': viewport }"
            :data-animated="args.animated !== false"
            :data-surface="surfaceMode"
            :data-bottom-shadow="bottomShadow">
            <div class="floating-bar-demo-content">
                <ScrollArea class="h-full w-full rounded-[inherit]">
                    <div class="p-5">
                        <p class="text-xs font-semibold tracking-wide text-muted-foreground">
                            {{ preset === 'compact' ? 'Compact' : 'Hexagon' }}
                        </p>
                        <h2 class="mt-1 text-xl font-semibold">{{ labels.workspace }}</h2>
                        <div class="mt-5 grid gap-3">
                            <div
                                v-for="item in 3"
                                :key="item"
                                class="rounded-lg border border-border bg-background p-4">
                                <p class="font-medium">{{ labels.task }} {{ item }}</p>
                                <p class="mt-1 text-sm text-muted-foreground">
                                    {{ labels.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
            <FloatingAppBar
                :fixed="false"
                class="floating-bar-demo-position"
                :label="args.label || labels.navigation"
                :variant="currentVariant"
                :shape="args.shape"
                :appearance="args.appearance"
                :bordered="args.bordered"
                :gradient-tone="primaryTone"
                :orientation="barOrientation"
                :animated="args.animated"
                :transition-key="currentVariant"
                :auxiliary-position="args.auxiliaryPosition"
                :style="{
                    '--ui-floating-app-bar-viewport-half-width': `${width / 2}px`,
                    '--floating-bar-demo-height': `${height}px`,
                }">
                <template #left>
                    <Button
                        v-if="currentVariant === 'five'"
                        variant="ghost"
                        icon-only
                        :aria-label="labels.home"
                        @click="record('home')">
                        <IconHome class="size-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        icon-only
                        :disabled="currentVariant === 'five' && backDisabled"
                        :aria-label="currentVariant === 'five' ? labels.back : labels.close"
                        :data-floating-app-bar-icon-offset="
                            currentVariant === 'five' ? '' : undefined
                        "
                        @click="record(currentVariant === 'five' ? 'back' : 'close')">
                        <component
                            :is="currentVariant === 'five' ? IconArrowLeft : IconX"
                            class="size-5" />
                    </Button>
                </template>
                <template #primary>
                    <Button
                        :variant="primaryTone"
                        icon-only
                        :aria-label="primaryLabel"
                        @click="record('primary')">
                        <component :is="primaryIcon" class="size-7" />
                    </Button>
                </template>
                <template #right>
                    <Button
                        v-if="currentVariant === 'five'"
                        variant="ghost"
                        icon-only
                        class="relative"
                        :aria-label="labels.notifications"
                        data-floating-app-bar-icon-offset
                        @click="record('notifications')">
                        <span data-floating-app-bar-glyph class="size-5">
                            <IconBell class="size-5" />
                            <span
                                class="absolute -top-1.5 -right-1.5 min-w-4 rounded-full bg-danger-600 px-1 text-center text-[10px] leading-4 text-white">
                                7
                            </span>
                        </span>
                    </Button>
                    <Button
                        variant="ghost"
                        icon-only
                        :aria-label="currentVariant === 'five' ? labels.profile : labels.camera"
                        @click="record(currentVariant === 'five' ? 'profile' : 'camera')">
                        <component
                            :is="currentVariant === 'five' ? IconUserCircle : IconCamera"
                            class="size-5" />
                    </Button>
                </template>
                <template v-if="showLeftButton" #auxiliary-start>
                    <Button
                        :variant="leftTone"
                        icon-only
                        :aria-label="labels.cancel"
                        @click="record('cancel')">
                        <IconX class="size-5" />
                    </Button>
                </template>
                <template v-if="showRightButton" #auxiliary-end>
                    <Button
                        :variant="rightTone"
                        icon-only
                        :aria-label="labels.help"
                        @click="record('help')">
                        <IconQuestionMark class="size-5" />
                    </Button>
                </template>
            </FloatingAppBar>
        </div>
        <p role="status" class="text-sm text-muted-foreground">
            {{ labels.lastAction }}: {{ lastAction ? labels[lastAction] : labels.none }}
        </p>
    </div>
</template>

<script setup lang="ts">
import type {
    FloatingAppBarOrientation,
    FloatingAppBarShape,
    FloatingAppBarTone,
    FloatingAppBarVariant,
} from '../components/app-bar';
import {
    IconArrowLeft,
    IconBell,
    IconCamera,
    IconCheck,
    IconHome,
    IconMenu2,
    IconPlayerPause,
    IconPlayerPlay,
    IconQuestionMark,
    IconRotate,
    IconScan,
    IconUserCircle,
    IconX,
} from '@tabler/icons-vue';
import { useElementSize, useIntervalFn, useMediaQuery } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { FloatingAppBar } from '../components/app-bar';
import { Button } from '../components/button';
import { ScrollArea } from '../components/scroll-area';

interface DemoArgs {
    label?: string;
    variant?: FloatingAppBarVariant;
    shape?: FloatingAppBarShape;
    appearance?: 'solid' | 'gradient';
    bordered?: boolean;
    gradientTone?: FloatingAppBarTone;
    orientation?: FloatingAppBarOrientation;
    animated?: boolean;
    auxiliaryPosition?: 'adjacent' | 'edge';
}
const props = withDefaults(
    defineProps<{
        args?: DemoArgs;
        locale?: string;
        preset?: string;
        autoplay?: boolean;
        viewport?: boolean;
        surface?: 'dark' | 'white';
    }>(),
    {
        args: () => ({}),
        locale: 'en',
        preset: 'compact',
        autoplay: false,
        viewport: false,
        surface: 'dark',
    },
);
// Story fixtures only; production labels always come from the host translator.
const translations = {
    en: {
        five: 'Five Actions',
        three: 'Three Actions',
        primaryAction: 'Primary Action',
        leftButton: 'Left Button',
        rightButton: 'Right Button',
        primaryColor: 'Primary Color',
        leftColor: 'Left Button Color',
        rightColor: 'Right Button Color',
        whitePage: 'White Page',
        bottomShadow: 'Bottom Shadow',
        accent: 'Accent',
        primary: 'Primary',
        rotate: 'Portrait / landscape',
        play: 'Play transitions',
        pause: 'Pause transitions',
        disabledBack: 'Disable back',
        success: 'Success',
        danger: 'Danger',
        warning: 'Warning',
        info: 'Info',
        previewHint:
            'Rotate the preview or switch layouts. The same bar moves and keeps its icons upright.',
        viewportHint:
            'Resize the Storybook viewport: the bar stays inside this preview and docks at the bottom or right. The rotation button also works here.',
        reduced: 'Reduced motion is enabled; animations and autoplay are disabled.',
        workspace: 'Workspace overview',
        task: 'Example task',
        content: 'The page owns navigation, data and workflow actions.',
        navigation: 'Mobile navigation',
        home: 'Home',
        back: 'Back',
        close: 'Close',
        notifications: 'Notifications',
        profile: 'Profile',
        camera: 'Camera',
        cancel: 'Cancel workflow',
        help: 'Help',
        scan: 'Scan or enter a code',
        menu: 'Open menu',
        confirm: 'Confirm',
        lastAction: 'Last action',
        none: 'No action yet',
    },
    de: {
        five: 'Fünf Aktionen',
        three: 'Drei Aktionen',
        primaryAction: 'Primäre Aktion',
        leftButton: 'Linker Button',
        rightButton: 'Rechter Button',
        primaryColor: 'Primärfarbe',
        leftColor: 'Farbe linker Button',
        rightColor: 'Farbe rechter Button',
        whitePage: 'Weiße Seite',
        bottomShadow: 'Schattenverlauf',
        accent: 'Accent',
        primary: 'Primary',
        rotate: 'Hochformat / Querformat',
        play: 'Wechsel abspielen',
        pause: 'Wechsel pausieren',
        disabledBack: 'Zurück deaktivieren',
        success: 'Erfolg',
        danger: 'Gefahr',
        warning: 'Warnung',
        info: 'Info',
        previewHint:
            'Vorschau drehen oder Layout wechseln. Dieselbe Bar bewegt sich und hält ihre Icons aufrecht.',
        viewportHint:
            'Storybook-Viewport ändern: Die Bar bleibt in dieser Vorschau und sitzt unten oder rechts. Der Drehschalter funktioniert auch hier.',
        reduced:
            'Reduzierte Bewegung ist aktiv; Animationen und automatischer Wechsel sind deaktiviert.',
        workspace: 'Arbeitsübersicht',
        task: 'Beispielaufgabe',
        content: 'Die Seite verwaltet Navigation, Daten und Workflow-Aktionen.',
        navigation: 'Mobile Navigation',
        home: 'Startseite',
        back: 'Zurück',
        close: 'Schließen',
        notifications: 'Benachrichtigungen',
        profile: 'Profil',
        camera: 'Kamera',
        cancel: 'Vorgang abbrechen',
        help: 'Hilfe',
        scan: 'Code scannen oder eingeben',
        menu: 'Menü öffnen',
        confirm: 'Bestätigen',
        lastAction: 'Letzte Aktion',
        none: 'Noch keine Aktion',
    },
} as const;
const labels = computed(() => translations[props.locale === 'de' ? 'de' : 'en']);
type Action =
    | 'home'
    | 'back'
    | 'close'
    | 'notifications'
    | 'profile'
    | 'camera'
    | 'cancel'
    | 'help'
    | 'scan'
    | 'menu'
    | 'confirm';
const layouts: FloatingAppBarVariant[] = ['five', 'three', 'primary'];
const tones: FloatingAppBarTone[] = ['primary', 'accent', 'success', 'danger', 'warning', 'info'];
const currentVariant = ref<FloatingAppBarVariant>(props.args.variant ?? 'five');
const viewportLandscape = useMediaQuery('(orientation: landscape)');
const landscapePreview = ref(
    props.viewport ? viewportLandscape.value : props.args.orientation === 'vertical',
);
const orientationOverride = ref<FloatingAppBarOrientation>();
const surfaceMode = ref(props.surface);
const bottomShadow = ref(true);
const toneOverride = ref<FloatingAppBarTone>();
const leftEnabled = ref(props.preset === 'hexagon-wizard' || props.preset === 'auxiliary');
const rightEnabled = ref(props.preset === 'auxiliary');
const leftTone = ref<FloatingAppBarTone>('danger');
const rightTone = ref<FloatingAppBarTone>('info');
const backDisabled = ref(props.preset === 'compact');
const lastAction = ref<Action>();
const frame = ref<HTMLElement>();
const { width, height } = useElementSize(frame);
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
const barOrientation = computed<FloatingAppBarOrientation>(
    () =>
        orientationOverride.value ??
        (props.viewport
            ? (props.args.orientation ?? 'auto')
            : props.args.orientation === 'auto'
              ? landscapePreview.value
                  ? 'vertical'
                  : 'horizontal'
              : (props.args.orientation ?? 'horizontal')),
);
const showLeftButton = computed(() => currentVariant.value !== 'five' && leftEnabled.value);
const showRightButton = computed(() => currentVariant.value !== 'five' && rightEnabled.value);
const primaryTone = computed<FloatingAppBarTone>(
    () =>
        toneOverride.value ??
        (props.args.appearance === 'gradient'
            ? (props.args.gradientTone ?? 'primary')
            : props.preset === 'hexagon-wizard' ||
                (props.preset === 'compact' && currentVariant.value === 'three')
              ? 'success'
              : 'primary'),
);
type ColorTarget = 'primary' | 'left' | 'right';
const colorControls = computed(() => {
    const controls: { key: ColorTarget; label: string; tone: FloatingAppBarTone }[] = [
        { key: 'primary', label: labels.value.primaryColor, tone: primaryTone.value },
    ];
    if (showLeftButton.value)
        controls.push({ key: 'left', label: labels.value.leftColor, tone: leftTone.value });
    if (showRightButton.value)
        controls.push({ key: 'right', label: labels.value.rightColor, tone: rightTone.value });
    return controls;
});
function setTone(target: ColorTarget, tone: FloatingAppBarTone): void {
    if (target === 'primary') toneOverride.value = tone;
    else if (target === 'left') leftTone.value = tone;
    else rightTone.value = tone;
}
const primaryIcon = computed(() =>
    currentVariant.value === 'three'
        ? IconCheck
        : props.args.shape === 'rounded-hexagon'
          ? IconMenu2
          : IconScan,
);
const primaryLabel = computed(() =>
    currentVariant.value === 'three'
        ? labels.value.confirm
        : props.args.shape === 'rounded-hexagon'
          ? labels.value.menu
          : labels.value.scan,
);
const { isActive, pause, resume } = useIntervalFn(
    () => {
        const index = layouts.indexOf(currentVariant.value);
        currentVariant.value = layouts[(index + 1) % layouts.length]!;
        if (index === layouts.length - 1) rotatePreview();
    },
    2400,
    { immediate: props.autoplay && !reducedMotion.value },
);
watch(reducedMotion, (reduce) => {
    if (reduce) pause();
});
watch(viewportLandscape, (landscape) => {
    if (!props.viewport) return;
    orientationOverride.value = undefined;
    landscapePreview.value = landscape;
});
watch(
    () => props.surface,
    (surface) => {
        surfaceMode.value = surface;
    },
);
watch(
    () => props.args.variant,
    (variant) => {
        if (variant) currentVariant.value = variant;
    },
);
watch(
    () => props.args.orientation,
    (orientation) => {
        orientationOverride.value = undefined;
        landscapePreview.value =
            props.viewport && orientation === 'auto'
                ? viewportLandscape.value
                : orientation === 'vertical';
    },
);
watch(
    () => props.args.gradientTone,
    () => {
        toneOverride.value = undefined;
    },
);
function rotatePreview(): void {
    landscapePreview.value = !landscapePreview.value;
    orientationOverride.value = landscapePreview.value ? 'vertical' : 'horizontal';
}
function record(action: Action | 'primary'): void {
    lastAction.value =
        action === 'primary'
            ? currentVariant.value === 'three'
                ? 'confirm'
                : props.args.shape === 'rounded-hexagon'
                  ? 'menu'
                  : 'scan'
            : action;
}
</script>

<style>
.floating-bar-demo {
    width: min(100%, 52rem);
    display: grid;
    gap: 1rem;
}
.floating-bar-demo-frame {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    width: min(100%, 22.5rem);
    height: 29rem;
    margin-inline: auto;
    border: 1px solid var(--ui-border);
    border-radius: 1.5rem;
    background: #242424;
    transition:
        width 380ms ease,
        height 380ms ease;
}
.floating-bar-demo-frame.is-landscape {
    width: min(100%, 44rem);
    height: 21rem;
}
.floating-bar-demo-frame.is-viewport {
    height: min(70dvh, 29rem);
}
.floating-bar-demo-frame.is-viewport.is-landscape {
    height: min(70dvh, 21rem);
}
.floating-bar-demo-frame[data-surface='white'] {
    --ui-background: #ffffff;
    --ui-foreground: var(--ui-neutral-950);
    --ui-border: var(--ui-neutral-300);
    --ui-muted: var(--ui-neutral-100);
    --ui-muted-foreground: var(--ui-neutral-500);
    background: #ffffff;
    border-color: var(--ui-neutral-300);
}
.floating-bar-demo-frame[data-surface='white'][data-bottom-shadow='true']::after {
    content: '';
    position: absolute;
    z-index: 1;
    inset: auto 0 0;
    height: 6rem;
    pointer-events: none;
    background: linear-gradient(to top, rgb(0 0 0 / 18%), transparent);
}
.floating-bar-demo-frame.is-landscape[data-surface='white'][data-bottom-shadow='true']::after {
    inset: 0 0 0 auto;
    width: 6rem;
    height: auto;
    background: linear-gradient(to left, rgb(0 0 0 / 16%), transparent);
}
.floating-bar-demo-content {
    position: absolute;
    inset: 0.75rem 0.75rem 7rem;
    overflow: hidden;
    border-radius: 1rem;
    background: var(--ui-background);
    color: var(--ui-foreground);
}
.floating-bar-demo-frame.is-landscape .floating-bar-demo-content {
    right: 7rem;
    bottom: 0.75rem;
}
.floating-bar-demo-position {
    position: absolute;
    z-index: 2;
    top: calc(100% - var(--ui-floating-app-bar-dock-offset));
    left: 50%;
    translate: -50% -50%;
    margin: 0;
    padding-bottom: 1rem;
}
.floating-bar-demo-position[data-orientation='vertical'] {
    top: 50%;
    left: calc(100% - var(--ui-floating-app-bar-dock-offset));
    width: min(var(--ui-floating-app-bar-length), calc(var(--floating-bar-demo-height) - 2rem));
}
.floating-bar-demo-position[data-orientation='vertical']:has(.ui-floating-app-bar-auxiliary) {
    width: min(var(--ui-floating-app-bar-length), calc(var(--floating-bar-demo-height) - 8rem));
}
.floating-bar-demo-frame[data-animated='false'] {
    transition: none;
}
@media (prefers-reduced-motion: reduce) {
    .floating-bar-demo-frame {
        transition: none;
    }
}
</style>
