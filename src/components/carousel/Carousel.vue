<template>
    <section
        ref="root"
        data-slot="carousel"
        :data-effect="effect"
        :data-orientation="orientation"
        :data-ready="ready"
        :data-selected="selected"
        :data-playing="playing"
        :dir="direction"
        :tabindex="disabled ? -1 : 0"
        role="region"
        :aria-roledescription="trans('common.carousel.role')"
        :aria-label="label || trans('common.carousel.label')"
        :class="
            cn(
                'miru-carousel min-w-0 w-full space-y-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring',
                props.class,
            )
        "
        :style="layoutStyle"
        @keydown="onKeydown"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @focusin="onFocusIn"
        @focusout="onFocusOut">
        <div class="relative min-w-0">
            <div
                v-if="items.length"
                :id="viewportId"
                ref="viewport"
                data-slot="carousel-viewport"
                class="miru-carousel-viewport overflow-hidden rounded-md"
                :style="orientation === 'vertical' ? { height: cssLength(height) } : undefined"
                :aria-live="playing ? 'off' : 'polite'">
                <div
                    data-slot="carousel-track"
                    class="miru-carousel-track"
                    :class="
                        autoHeight && orientation === 'horizontal' ? 'items-start' : 'items-stretch'
                    ">
                    <div
                        v-for="(item, index) in items"
                        :key="getKey?.(item, index) ?? index"
                        data-slot="carousel-slide"
                        class="miru-carousel-slide"
                        :class="slideClass"
                        :data-selected="selectedSlides.includes(index)"
                        role="group"
                        :aria-roledescription="trans('common.carousel.slide_role')"
                        :aria-label="
                            trans('common.carousel.slide', {
                                number: index + 1,
                                total: items.length,
                            })
                        ">
                        <div
                            data-slot="carousel-effect-viewport"
                            :class="
                                effect === 'parallax' ? 'overflow-hidden rounded-md' : undefined
                            ">
                            <div data-slot="carousel-effect" class="miru-carousel-effect">
                                <slot
                                    name="slide"
                                    :item="item"
                                    :index="index"
                                    :selected="selectedSlides.includes(index)">
                                    {{ item }}
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-else
                data-slot="carousel-empty"
                class="rounded-md border p-8 text-center text-sm text-muted-foreground">
                <slot name="empty">{{ trans('common.states.empty') }}</slot>
            </div>
            <div
                v-if="navigation && navigationPosition === 'overlay' && count > 1"
                class="pointer-events-none absolute inset-0 flex items-center justify-between px-2"
                :class="orientation === 'vertical' ? 'flex-col py-2' : ''">
                <Button
                    data-slot="carousel-previous"
                    type="button"
                    variant="outline"
                    size="sm"
                    shape="round"
                    icon-only
                    class="pointer-events-auto bg-background"
                    :disabled="disabled || !canPrevious"
                    :aria-label="trans('common.carousel.previous')"
                    :aria-controls="viewportId"
                    @click="previous">
                    <component :is="previousIcon" />
                </Button>
                <Button
                    data-slot="carousel-next"
                    type="button"
                    variant="outline"
                    size="sm"
                    shape="round"
                    icon-only
                    class="pointer-events-auto bg-background"
                    :disabled="disabled || !canNext"
                    :aria-label="trans('common.carousel.next')"
                    :aria-controls="viewportId"
                    @click="next">
                    <component :is="nextIcon" />
                </Button>
            </div>
        </div>
        <div
            v-if="
                items.length &&
                ((navigation && navigationPosition === 'bottom') ||
                    pagination !== 'none' ||
                    motionRequested)
            "
            data-slot="carousel-controls"
            class="flex min-w-0 flex-wrap items-center justify-between gap-3">
            <slot
                name="controls"
                :previous="previous"
                :next="next"
                :go-to="goTo"
                :selected="selected"
                :count="count"
                :can-previous="canPrevious"
                :can-next="canNext"
                :playing="playing"
                :play="play"
                :pause="pause">
                <div v-if="navigation && navigationPosition === 'bottom'" class="flex gap-2">
                    <Button
                        data-slot="carousel-previous"
                        type="button"
                        variant="outline"
                        size="sm"
                        icon-only
                        :disabled="disabled || !canPrevious"
                        :aria-label="trans('common.carousel.previous')"
                        :aria-controls="viewportId"
                        @click="previous">
                        <component :is="previousIcon" />
                    </Button>
                    <Button
                        data-slot="carousel-next"
                        type="button"
                        variant="outline"
                        size="sm"
                        icon-only
                        :disabled="disabled || !canNext"
                        :aria-label="trans('common.carousel.next')"
                        :aria-controls="viewportId"
                        @click="next">
                        <component :is="nextIcon" />
                    </Button>
                </div>
                <div
                    v-if="pagination === 'dots' || pagination === 'numbers'"
                    data-slot="carousel-pages"
                    class="flex max-w-full flex-wrap items-center justify-center gap-1"
                    role="group"
                    :aria-label="trans('common.carousel.pagination')">
                    <Button
                        v-for="(_, index) in snaps"
                        :key="index"
                        data-slot="carousel-page"
                        type="button"
                        :variant="
                            pagination === 'numbers'
                                ? index === selected
                                    ? 'primary'
                                    : 'outline'
                                : 'ghost'
                        "
                        size="xs"
                        :icon-only="pagination === 'dots'"
                        :data-selected="index === selected"
                        :disabled="disabled || count < 2"
                        :aria-label="
                            trans('common.carousel.go_to', {
                                number: index + 1,
                                total: count,
                            })
                        "
                        :aria-current="index === selected ? 'true' : undefined"
                        :aria-controls="viewportId"
                        @click="goTo(index)">
                        <span
                            v-if="pagination === 'dots'"
                            aria-hidden="true"
                            class="size-2 rounded-full transition-colors"
                            :class="
                                index === selected
                                    ? 'bg-primary'
                                    : 'bg-neutral-300 dark:bg-neutral-600'
                            " />
                        <template v-else>{{ formatNumber(index + 1) }}</template>
                    </Button>
                </div>
                <span
                    v-else-if="pagination === 'counter'"
                    data-slot="carousel-counter"
                    class="text-sm tabular-nums text-muted-foreground">
                    {{ formatNumber(count ? selected + 1 : 0) }} / {{ formatNumber(count) }}
                </span>
                <Progress
                    v-else-if="pagination === 'progress'"
                    data-slot="carousel-progress"
                    class="min-w-16 flex-1"
                    :model-value="progress * 100"
                    :aria-label="trans('common.carousel.progress')" />
                <Button
                    v-if="motionRequested && showPlayButton"
                    data-slot="carousel-play"
                    type="button"
                    variant="outline"
                    size="sm"
                    icon-only
                    :disabled="disabled || reducedMotion || count < 2"
                    :aria-label="
                        userPaused ? trans('common.carousel.play') : trans('common.carousel.pause')
                    "
                    :aria-pressed="!userPaused"
                    @click="userPaused ? play() : pause()">
                    <IconPlayerPause v-if="!userPaused" />
                    <IconPlayerPlay v-else />
                </Button>
            </slot>
        </div>
        <span ref="liveRegion" class="sr-only" />
    </section>
</template>

<script setup lang="ts" generic="T">
import type {
    CarouselEffect,
    CarouselPagination,
    CarouselResponsive,
    CarouselOptions,
} from './types';
import type { EmblaCarouselType, EmblaPluginType } from 'embla-carousel';
import type { CSSProperties, HTMLAttributes } from 'vue';
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronUp,
    IconChevronDown,
    IconPlayerPause,
    IconPlayerPlay,
} from '@tabler/icons-vue';
import { useMediaQuery } from '@vueuse/core';
import Accessibility from 'embla-carousel-accessibility';
import AutoHeight from 'embla-carousel-auto-height';
import AutoScroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-vue';
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import { Progress } from '../progress';

const props = withDefaults(
    defineProps<{
        items: readonly T[];
        getKey?: (item: T, index: number) => string | number;
        modelValue?: number;
        slidesPerView?: number | CarouselResponsive<number>;
        gap?: number | string | CarouselResponsive<number | string>;
        align?: 'start' | 'center' | 'end';
        loop?: boolean;
        slidesToScroll?: number | 'auto';
        dragFree?: boolean | 'snap';
        draggable?: boolean;
        disabled?: boolean;
        orientation?: 'horizontal' | 'vertical';
        direction?: 'ltr' | 'rtl';
        height?: number | string;
        navigation?: boolean;
        navigationPosition?: 'bottom' | 'overlay';
        pagination?: CarouselPagination;
        effect?: CarouselEffect;
        effectStrength?: number;
        duration?: number;
        autoplay?: boolean;
        autoplayDelay?: number;
        autoScroll?: boolean;
        autoScrollSpeed?: number;
        autoScrollDirection?: 'forward' | 'backward';
        autoHeight?: boolean;
        pauseOnHover?: boolean;
        showPlayButton?: boolean;
        options?: CarouselOptions;
        label?: string;
        locale?: string;
        class?: HTMLAttributes['class'];
        slideClass?: HTMLAttributes['class'];
    }>(),
    {
        modelValue: undefined,
        slidesPerView: 1,
        gap: 16,
        align: 'center',
        loop: false,
        slidesToScroll: 1,
        dragFree: false,
        draggable: true,
        disabled: false,
        orientation: 'horizontal',
        direction: 'ltr',
        height: 320,
        navigation: true,
        navigationPosition: 'bottom',
        pagination: 'dots',
        effect: 'slide',
        duration: 25,
        autoplay: false,
        autoplayDelay: 4000,
        autoScroll: false,
        autoScrollSpeed: 2,
        autoScrollDirection: 'forward',
        autoHeight: false,
        pauseOnHover: true,
        showPlayButton: true,
    },
);
const emit = defineEmits<{
    'update:modelValue': [index: number];
    change: [state: { index: number; count: number }];
    ready: [api: EmblaCarouselType];
    'playing-change': [playing: boolean];
}>();
const { trans, locale } = useI18n(() => props.locale);
const root = ref<HTMLElement>();
const liveRegion = ref<HTMLElement>();
const viewportId = `carousel-${useId()}`;
const ready = ref(false),
    selected = ref(props.modelValue ?? 0),
    selectedSlides = ref<number[]>([]),
    snaps = ref<number[]>([]);
const canPrevious = ref(false),
    canNext = ref(false),
    progress = ref(0),
    playing = ref(false);
const count = computed(() => snaps.value.length);
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
const motionRequested = computed(
    () => props.autoplay || (props.autoScroll && props.effect !== 'fade'),
);
const userPaused = ref(false),
    hovered = ref(false),
    focused = ref(false),
    pointerDown = ref(false);
let disposed = false,
    animationFrame: number | undefined;
let effectNodes: HTMLElement[] = [];
const initialIndex = props.modelValue ?? props.options?.startSnap ?? 0;

function cssLength(value: number | string): string {
    return typeof value === 'number' ? `${Math.max(0, value)}px` : value;
}
function responsive<TValue>(
    value: TValue | CarouselResponsive<TValue>,
): CarouselResponsive<TValue> {
    return typeof value === 'object' && value !== null
        ? (value as CarouselResponsive<TValue>)
        : { base: value as TValue };
}
const layoutStyle = computed(() => {
    const style: Record<string, string> = {};
    const sizes = responsive(props.slidesPerView),
        gaps = responsive(props.gap);
    for (const size of ['base', 'sm', 'md', 'lg', 'xl'] as const) {
        if (sizes[size] !== undefined)
            style[`--carousel-count-${size}`] = String(
                props.effect === 'fade' ? 1 : Math.max(1, sizes[size]!),
            );
        if (gaps[size] !== undefined)
            style[`--carousel-gap-${size}`] =
                props.effect === 'fade' ? '0px' : cssLength(gaps[size]!);
    }
    if (props.effect === 'fade') {
        style['--carousel-count-base'] = '1';
        style['--carousel-gap-base'] = '0px';
    }
    return style as CSSProperties;
});
const emblaOptions = computed<CarouselOptions>(() => ({
    ...props.options,
    align: props.effect === 'fade' ? 'center' : props.align,
    axis: props.orientation === 'vertical' ? 'y' : 'x',
    direction: props.direction,
    loop: props.loop,
    slidesToScroll: props.effect === 'fade' ? 1 : props.slidesToScroll,
    containScroll: props.options?.containScroll ?? false,
    dragFree: props.effect === 'fade' ? false : props.dragFree,
    draggable: props.draggable && !props.disabled,
    duration: reducedMotion.value ? 0 : Math.max(0, props.duration),
    startSnap: initialIndex,
}));
const plugins = computed<EmblaPluginType[]>(() => {
    const list: EmblaPluginType[] = [
        Accessibility({
            rootNode: () => root.value ?? null,
            carouselAriaLabel: props.label || trans('common.carousel.label'),
            carouselAriaRoleDescription: trans('common.carousel.role'),
            slideAriaRoleDescription: trans('common.carousel.slide_role'),
            previousButtonAriaLabel: trans('common.carousel.previous'),
            nextButtonAriaLabel: trans('common.carousel.next'),
            slideAriaLabel: (_grouped, first, last, total) =>
                trans('common.carousel.slides', {
                    first: first + 1,
                    last: last + 1,
                    total,
                }),
            dotButtonAriaLabel: (_grouped, _first, _last, _total, index, total) =>
                trans('common.carousel.go_to', { number: index + 1, total }),
            liveRegionContent: (_grouped, first, last, total) =>
                trans('common.carousel.slides', {
                    first: first + 1,
                    last: last + 1,
                    total,
                }),
        }),
    ];
    if (props.effect === 'fade') list.push(Fade());
    if (props.autoHeight && props.orientation === 'horizontal') list.push(AutoHeight());
    if (!reducedMotion.value && !props.disabled) {
        if (props.autoScroll && props.effect !== 'fade')
            list.push(
                AutoScroll({
                    speed: Math.max(0.1, props.autoScrollSpeed),
                    direction: props.autoScrollDirection,
                    defaultInteraction: false,
                    rootNode: () => root.value ?? null,
                }),
            );
        else if (props.autoplay)
            list.push(
                Autoplay({
                    delay: Math.max(100, props.autoplayDelay),
                    defaultInteraction: false,
                    rootNode: () => root.value ?? null,
                }),
            );
    }
    return list;
});
const [viewport, api] = useEmblaCarousel(emblaOptions, plugins);
const previousIcon = computed(() =>
    props.orientation === 'vertical'
        ? IconChevronUp
        : props.direction === 'rtl'
          ? IconChevronRight
          : IconChevronLeft,
);
const nextIcon = computed(() =>
    props.orientation === 'vertical'
        ? IconChevronDown
        : props.direction === 'rtl'
          ? IconChevronLeft
          : IconChevronRight,
);
const numberFormat = computed(() => new Intl.NumberFormat(locale.value));
function formatNumber(value: number): string {
    return numberFormat.value.format(value);
}

function updatePlaying(): void {
    const value = !!(
        api.value?.plugins().autoplay?.isPlaying() || api.value?.plugins().autoScroll?.isPlaying()
    );
    if (playing.value !== value) {
        playing.value = value;
        emit('playing-change', value);
    }
    api.value?.plugins().accessibility?.setUpdateLiveRegion(!value);
}
function syncMotion(): void {
    const instance = api.value;
    if (!instance) return;
    const shouldPlay =
        !disposed &&
        motionRequested.value &&
        !reducedMotion.value &&
        !props.disabled &&
        count.value > 1 &&
        !userPaused.value &&
        !hovered.value &&
        !focused.value &&
        !pointerDown.value;
    const { autoplay, autoScroll } = instance.plugins();
    if (shouldPlay) {
        if (autoScroll) autoScroll.play(0);
        else autoplay?.play();
    } else {
        autoplay?.stop();
        autoScroll?.stop();
    }
    updatePlaying();
}
function play(): void {
    userPaused.value = false;
    hovered.value = false;
    focused.value = false;
    syncMotion();
}
function pause(): void {
    userPaused.value = true;
    syncMotion();
}
function previous(): void {
    if (!props.disabled) api.value?.goToPrev(reducedMotion.value);
}
function next(): void {
    if (!props.disabled) api.value?.goToNext(reducedMotion.value);
}
function goTo(index: number, instant = false): void {
    if (!props.disabled && Number.isFinite(index))
        api.value?.goTo(
            Math.max(0, Math.min(count.value - 1, Math.floor(index))),
            instant || reducedMotion.value,
        );
}
function onMouseEnter(): void {
    if (props.pauseOnHover) {
        hovered.value = true;
        syncMotion();
    }
}
function onMouseLeave(): void {
    hovered.value = false;
    syncMotion();
}
function onFocusIn(): void {
    focused.value = true;
    syncMotion();
}
function onFocusOut(event: FocusEvent): void {
    if (!(event.relatedTarget instanceof Node) || !root.value?.contains(event.relatedTarget)) {
        focused.value = false;
        syncMotion();
    }
}
function onPointerDown(): void {
    pointerDown.value = true;
    syncMotion();
}
function onPointerUp(): void {
    pointerDown.value = false;
    syncMotion();
}
function onKeydown(event: KeyboardEvent): void {
    if (
        props.disabled ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (event.target as HTMLElement).closest(
            'input,textarea,select,[contenteditable]:not([contenteditable="false"])',
        )
    )
        return;
    const prevKey =
        props.orientation === 'vertical'
            ? 'ArrowUp'
            : props.direction === 'rtl'
              ? 'ArrowRight'
              : 'ArrowLeft';
    const nextKey =
        props.orientation === 'vertical'
            ? 'ArrowDown'
            : props.direction === 'rtl'
              ? 'ArrowLeft'
              : 'ArrowRight';
    if (event.key === prevKey) {
        event.preventDefault();
        previous();
    }
    if (event.key === nextKey) {
        event.preventDefault();
        next();
    }
    if (event.key === 'Home') {
        event.preventDefault();
        goTo(0);
    }
    if (event.key === 'End') {
        event.preventDefault();
        goTo(count.value - 1);
    }
}
function updateState(instance: EmblaCarouselType): void {
    const nextIndex = instance.selectedSnap();
    snaps.value = instance.snapList();
    selectedSlides.value = instance.internalEngine().scrollSnapList.slidesBySnap[nextIndex] ?? [];
    canPrevious.value = instance.canGoToPrev();
    canNext.value = instance.canGoToNext();
    if (selected.value !== nextIndex) {
        selected.value = nextIndex;
        emit('update:modelValue', nextIndex);
        emit('change', { index: nextIndex, count: count.value });
    }
    updateScroll(instance);
}
function updateScroll(instance: EmblaCarouselType): void {
    progress.value = Math.max(0, Math.min(1, instance.scrollProgress()));
    if (animationFrame !== undefined || typeof requestAnimationFrame === 'undefined') return;
    animationFrame = requestAnimationFrame(() => {
        animationFrame = undefined;
        applyEffects();
    });
}
// Measure the actual translated slides, so tween effects also work across loop boundaries.
function applyEffects(): void {
    const instance = api.value;
    if (!instance || disposed) return;
    const view = instance.rootNode().getBoundingClientRect(),
        vertical = props.orientation === 'vertical';
    const viewSize = vertical ? view.height : view.width,
        viewCenter = vertical ? view.top + view.height / 2 : view.left + view.width / 2;
    const strength = Math.max(
        0,
        Math.min(
            0.95,
            props.effectStrength ??
                (props.effect === 'scale' ? 0.2 : props.effect === 'parallax' ? 0.4 : 0.8),
        ),
    );
    instance.slideNodes().forEach((slide, index) => {
        const node = effectNodes[index];
        if (!node) return;
        node.style.transform = '';
        node.style.opacity = '';
        if (reducedMotion.value || !['scale', 'parallax', 'opacity'].includes(props.effect)) return;
        const rect = slide.getBoundingClientRect(),
            size = vertical ? rect.height : rect.width,
            center = vertical ? rect.top + size / 2 : rect.left + size / 2;
        const distance = Math.max(
            -1,
            Math.min(1, (center - viewCenter) / Math.max(1, (viewSize + size) / 2)),
        );
        if (props.effect === 'scale')
            node.style.transform = `scale(${1 - Math.abs(distance) * strength})`;
        if (props.effect === 'opacity')
            node.style.opacity = String(1 - Math.abs(distance) * strength);
        if (props.effect === 'parallax')
            node.style.transform = `scale(${1 + strength}) translate${vertical ? 'Y' : 'X'}(${distance * size * strength * 0.5}px)`;
    });
}
async function connectControls(): Promise<void> {
    await nextTick();
    if (disposed || !root.value || !api.value) return;
    const accessibility = api.value.plugins().accessibility;
    const prev = root.value.querySelector<HTMLElement>('[data-slot="carousel-previous"]'),
        next = root.value.querySelector<HTMLElement>('[data-slot="carousel-next"]');
    if (prev && next) accessibility?.setupPrevAndNextButtons(prev, next);
    const pages = root.value.querySelector<HTMLElement>('[data-slot="carousel-pages"]');
    if (pages) accessibility?.setupDotButtons(pages);
    if (liveRegion.value) accessibility?.setupLiveRegion(liveRegion.value);
    updatePlaying();
}
function onReInit(instance: EmblaCarouselType): void {
    effectNodes = instance
        .slideNodes()
        .map((node) => node.querySelector<HTMLElement>('[data-slot="carousel-effect"]')!);
    updateState(instance);
    void connectControls();
    syncMotion();
}
function detach(instance: EmblaCarouselType): void {
    instance
        .off('select', updateState)
        .off('scroll', updateScroll)
        .off('reinit', onReInit)
        .off('pointerdown', onPointerDown)
        .off('pointerup', onPointerUp)
        .off('autoplay:play', updatePlaying)
        .off('autoplay:stop', updatePlaying)
        .off('autoscroll:play', updatePlaying)
        .off('autoscroll:stop', updatePlaying);
}
watch(api, (instance, previous) => {
    if (previous) detach(previous);
    ready.value = !!instance;
    if (!instance) {
        snaps.value = [];
        canPrevious.value = false;
        canNext.value = false;
        selectedSlides.value = [];
        updatePlaying();
        return;
    }
    instance
        .on('select', updateState)
        .on('scroll', updateScroll)
        .on('reinit', onReInit)
        .on('pointerdown', onPointerDown)
        .on('pointerup', onPointerUp)
        .on('autoplay:play', updatePlaying)
        .on('autoplay:stop', updatePlaying)
        .on('autoscroll:play', updatePlaying)
        .on('autoscroll:stop', updatePlaying);
    onReInit(instance);
    emit('ready', instance);
});
watch(
    () => props.modelValue,
    (index) => {
        if (index !== undefined && index !== selected.value) goTo(index);
    },
);
watch([() => props.navigation, () => props.navigationPosition, () => props.pagination], () => {
    void connectControls();
});
watch([() => props.disabled, () => props.pauseOnHover, reducedMotion], () => {
    if (!props.pauseOnHover) hovered.value = false;
    syncMotion();
});
watch(layoutStyle, async () => {
    await nextTick();
    if (!disposed) api.value?.reInit();
});
watch([() => props.effect, () => props.effectStrength, reducedMotion], () => {
    if (api.value) updateScroll(api.value);
});
onBeforeUnmount(() => {
    disposed = true;
    if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
    if (api.value) detach(api.value);
});
defineExpose({
    api,
    previous,
    next,
    goTo,
    play,
    pause,
    reInit: () => api.value?.reInit(),
});
</script>

<style scoped>
.miru-carousel {
    --carousel-count: var(--carousel-count-base, 1);
    --carousel-gap: var(--carousel-gap-base, 16px);
}
.miru-carousel-viewport {
    transition: height var(--ui-carousel-height-duration, 250ms) ease;
}
/* Fade snaps round slide offsets to whole pixels; keep borders inside the clipping edge. */
.miru-carousel[data-effect='fade'] .miru-carousel-viewport {
    padding: 1px;
}
.miru-carousel-track {
    display: flex;
    gap: var(--carousel-gap);
    touch-action: pan-y pinch-zoom;
}
.miru-carousel-slide {
    min-width: 0;
    flex: 0 0
        calc((100% - (var(--carousel-count) - 1) * var(--carousel-gap)) / var(--carousel-count));
}
.miru-carousel-effect {
    min-width: 0;
    transform-origin: center;
}
[data-orientation='vertical'] .miru-carousel-track {
    flex-direction: column;
    height: 100%;
    touch-action: pan-x pinch-zoom;
}
[data-orientation='vertical'] .miru-carousel-slide {
    min-height: 0;
}
[data-orientation='vertical'] [data-slot='carousel-effect-viewport'],
[data-orientation='vertical'] .miru-carousel-effect {
    height: 100%;
}
@media (min-width: 640px) {
    .miru-carousel {
        --carousel-count: var(--carousel-count-sm, var(--carousel-count-base, 1));
        --carousel-gap: var(--carousel-gap-sm, var(--carousel-gap-base, 16px));
    }
}
@media (min-width: 768px) {
    .miru-carousel {
        --carousel-count: var(
            --carousel-count-md,
            var(--carousel-count-sm, var(--carousel-count-base, 1))
        );
        --carousel-gap: var(
            --carousel-gap-md,
            var(--carousel-gap-sm, var(--carousel-gap-base, 16px))
        );
    }
}
@media (min-width: 1024px) {
    .miru-carousel {
        --carousel-count: var(
            --carousel-count-lg,
            var(--carousel-count-md, var(--carousel-count-sm, var(--carousel-count-base, 1)))
        );
        --carousel-gap: var(
            --carousel-gap-lg,
            var(--carousel-gap-md, var(--carousel-gap-sm, var(--carousel-gap-base, 16px)))
        );
    }
}
@media (min-width: 1280px) {
    .miru-carousel {
        --carousel-count: var(
            --carousel-count-xl,
            var(
                --carousel-count-lg,
                var(--carousel-count-md, var(--carousel-count-sm, var(--carousel-count-base, 1)))
            )
        );
        --carousel-gap: var(
            --carousel-gap-xl,
            var(
                --carousel-gap-lg,
                var(--carousel-gap-md, var(--carousel-gap-sm, var(--carousel-gap-base, 16px)))
            )
        );
    }
}
@media (prefers-reduced-motion: reduce) {
    .miru-carousel-viewport {
        transition: none;
    }
}
</style>
