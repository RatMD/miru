import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const carouselSummary =
    'A carousel for browsing slides with responsive sizing, keyboard navigation and configurable controls. Add visual effects or automatic movement with pause controls and reduced-motion support.';
export function carouselDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        {
            components: [
                {
                    name: 'Button',
                    url: '/components/api/button',
                    storybook: '/docs/components-button--docs',
                },
                {
                    name: 'Progress',
                    url: '/components/api/progress',
                    storybook: '/docs/components-progress--docs',
                },
            ],
            packages: [
                '@tabler/icons-vue',
                '@vueuse/core',
                'class-variance-authority',
                'clsx',
                'embla-carousel',
                'embla-carousel-accessibility',
                'embla-carousel-auto-height',
                'embla-carousel-auto-scroll',
                'embla-carousel-autoplay',
                'embla-carousel-fade',
                'embla-carousel-vue',
                'reka-ui',
                'tailwind-merge',
                'vue',
            ],
        },
        storybook,
    );
}
export const carouselApiCopy: Record<
    string,
    { props: Record<string, string>; events: Record<string, string>; slots: Record<string, string> }
> = {
    Carousel: {
        props: {
            items: 'The ordered collection of slide data.',
            getKey: 'Return a stable, unique key for each slide; defaults to its array index.',
            modelValue:
                'The selected snap index, starting at 0; bind with v-model to control selection.',
            slidesPerView: 'The visible slide count, as a number or responsive breakpoint map.',
            gap: 'The spacing between slides, as a CSS length, pixel number or responsive breakpoint map.',
            align: 'Align slides at the start, centre or end of the viewport.',
            loop: 'Loop navigation when enough slides are available for the layout.',
            slidesToScroll: 'The number of slides per snap, or auto for viewport-sized groups.',
            dragFree:
                'Choose snap-based dragging (false), free scrolling (true) or free scrolling that settles on a snap (snap).',
            draggable: 'Allow pointer and touch dragging.',
            disabled: 'Disable navigation, dragging and automatic movement.',
            orientation: 'Arrange slides and navigation along the horizontal or vertical axis.',
            direction: 'Set the reading direction and horizontal navigation order.',
            height: 'The viewport height for vertical layouts; numbers are interpreted as pixels.',
            navigation: 'Show the previous and next navigation controls.',
            navigationPosition: 'Place navigation below the slides or over the viewport.',
            pagination: 'Choose dots, numbers, a counter, a progress bar or no pagination.',
            effect: 'Choose the slide, fade, scale, parallax or opacity effect.',
            effectStrength:
                'Set the scale, parallax or opacity effect strength; uses an effect-specific default when omitted.',
            duration:
                'Set the Embla transition duration, rather than milliseconds; 0 makes navigation instant.',
            autoplay:
                'Advance automatically between snaps when continuous auto-scroll is not active.',
            autoplayDelay: 'The delay between automatic advances, in milliseconds.',
            autoScroll:
                'Enable continuous scrolling; takes precedence over autoplay and is ignored with fade.',
            autoScrollSpeed: 'Set the continuous scrolling speed.',
            autoScrollDirection: 'Set the continuous scrolling direction.',
            autoHeight: 'Adapt the viewport height to selected slides in horizontal layouts.',
            pauseOnHover: 'Pause automatic movement while the pointer is over the carousel.',
            showPlayButton: 'Show the play/pause control when automatic movement is requested.',
            options:
                'Additional Embla options; the dedicated layout and interaction props take precedence.',
            label: 'The accessible region label; uses the translated carousel label when omitted or empty.',
            locale: 'Override the locale for translated labels and number formatting.',
            class: 'Additional CSS classes for the carousel region.',
            slideClass: 'Additional CSS classes for each slide container.',
        },
        events: {
            'update:modelValue':
                'Emitted when the selected snap changes, with its zero-based index.',
            change: 'Emitted when selection changes, with the selected snap index and total snap count.',
            ready: 'Emitted when the carousel initialises, with the Embla instance.',
            'playing-change':
                'Emitted when automatic movement starts or stops, with the playing state.',
        },
        slots: {
            slide: 'Render each slide; exposes its item, zero-based index and selected state.',
            empty: 'Replace the translated empty state when items is empty.',
            controls:
                'Replace the bottom controls; exposes navigation methods, selection, snap count and playback state.',
        },
    },
};
export const carouselNotes = [
    {
        title: 'Slides, selection and responsive layout',
        text: 'Pass `items` and render content through the `slide` slot. Selection uses zero-based snap indices, which may represent groups of slides when `slidesToScroll` exceeds one. `slidesPerView` and `gap` accept `base`, `sm`, `md`, `lg` and `xl` values at viewport widths of 0, 640, 768, 1024 and 1280px. Values carry forward until overridden. Fade always uses one full-width slide with no gap and one slide per snap. The dedicated props override corresponding `options`; avoid overriding the container, slides or active state.',
    },
    {
        title: 'Automatic movement and accessibility',
        text: 'Automatic movement pauses during dragging and while keyboard focus is inside the carousel; `pauseOnHover` also pauses it on hover. An explicit pause remains in effect until resumed. Reduced-motion preferences disable automatic movement and tween effects and make navigation instant. Keep a visible pause control when enabling automatic movement. Arrow keys follow the orientation and reading direction; Home and End select the first and last snaps. The `controls` slot replaces the bottom controls when that area is enabled; overlay arrows remain controlled separately by `navigation` and `navigationPosition`.',
    },
    {
        title: 'Template ref',
        text: 'A template ref exposes `api` for the Embla instance, `previous()` and `next()` for adjacent snaps, and `goTo(index, instant?)` for a specific snap. Use `play()` and `pause()` to control configured automatic movement, and `reInit()` to recalculate the carousel layout. The instance becomes available after initialisation; the `ready` event also provides it.',
    },
];
