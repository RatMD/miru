import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import CarouselExamples from '../../stories/CarouselExamples.vue';
import { componentDescription } from '../../stories/component-descriptions';
import { Carousel } from './index';
const boolean = { control: 'boolean' as const };
const select = (options: readonly unknown[]) => ({
    control: 'select' as const,
    options,
});
const meta: Meta = {
    title: 'Components/Carousel',
    component: Carousel as unknown as NonNullable<Meta['component']>,
    parameters: {
        layout: 'padded',
        docs: { description: { component: componentDescription('Carousel') } },
    },
    args: {
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
    argTypes: {
        slidesPerView: select([1, 1.5, 2, 3, 4]),
        gap: { control: { type: 'number', min: 0, max: 64 } },
        align: select(['start', 'center', 'end']),
        loop: boolean,
        slidesToScroll: select([1, 2, 3, 'auto']),
        dragFree: select([false, true, 'snap']),
        draggable: boolean,
        disabled: boolean,
        orientation: select(['horizontal', 'vertical']),
        direction: select(['ltr', 'rtl']),
        height: { control: { type: 'number', min: 160, max: 800 } },
        navigation: boolean,
        navigationPosition: select(['bottom', 'overlay']),
        pagination: select(['dots', 'numbers', 'counter', 'progress', 'none']),
        effect: select(['slide', 'fade', 'scale', 'parallax', 'opacity']),
        effectStrength: {
            control: { type: 'range', min: 0, max: 0.95, step: 0.05 },
        },
        duration: { control: { type: 'number', min: 0, max: 100 } },
        autoplay: boolean,
        autoplayDelay: {
            control: { type: 'number', min: 100, max: 10000, step: 100 },
        },
        autoScroll: boolean,
        autoScrollSpeed: {
            control: { type: 'range', min: 0.1, max: 8, step: 0.1 },
        },
        autoScrollDirection: select(['forward', 'backward']),
        autoHeight: boolean,
        pauseOnHover: boolean,
        showPlayButton: boolean,
        items: { table: { disable: true } },
        getKey: { table: { disable: true } },
        options: { control: 'object' },
        modelValue: { table: { disable: true } },
    },
    render: (args, { globals }) => ({
        components: { CarouselExamples },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<CarouselExamples :args="args" :locale="locale"/>',
    }),
};
export default meta;
async function rootOf(canvasElement: HTMLElement) {
    const root = canvasElement.querySelector<HTMLElement>('[data-slot="carousel"]')!;
    await waitFor(() => expect(root).toHaveAttribute('data-ready', 'true'));
    return root;
}
export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const root = await rootOf(canvasElement),
            canvas = within(root);
        const next = canvas.getByRole('button', {
            name: /^(Next slide|Nächste Folie)$/,
        });
        const previous = canvas.getByRole('button', {
            name: /^(Previous slide|Vorherige Folie)$/,
        });
        await expect(previous).toBeDisabled();
        await userEvent.click(next);
        await waitFor(() => expect(root).toHaveAttribute('data-selected', '1'));
        const dots = root.querySelectorAll<HTMLButtonElement>('[data-slot="carousel-page"]');
        await userEvent.click(dots[dots.length - 1]!);
        await waitFor(() => expect(next).toBeDisabled());
        await userEvent.keyboard('{Home}');
        await waitFor(() => expect(root).toHaveAttribute('data-selected', '0'));
        await userEvent.keyboard('{ArrowRight}');
        await waitFor(() => expect(root).toHaveAttribute('data-selected', '1'));
    },
};
export const NumberedPagination: StoryObj = { args: { pagination: 'numbers' } };
export const Counter: StoryObj = {
    args: { pagination: 'counter', navigationPosition: 'overlay' },
};
export const ProgressBar: StoryObj = { args: { pagination: 'progress' } };
export const Gaps: StoryObj = {
    args: { slidesPerView: 2, gap: 32, align: 'start' },
};
export const AlignStart: StoryObj = {
    args: { slidesPerView: 1.5, align: 'start', gap: 24 },
};
export const AlignCenter: StoryObj = {
    args: { slidesPerView: 1.5, align: 'center', gap: 24 },
};
export const AlignEnd: StoryObj = {
    args: { slidesPerView: 1.5, align: 'end', gap: 24 },
};
export const Loop: StoryObj = {
    args: { loop: true },
    play: async ({ canvasElement }) => {
        const root = await rootOf(canvasElement);
        await userEvent.click(
            within(root).getByRole('button', {
                name: /^(Previous slide|Vorherige Folie)$/,
            }),
        );
        await waitFor(() => expect(root).toHaveAttribute('data-selected', '4'));
        await userEvent.click(
            within(root).getByRole('button', {
                name: /^(Next slide|Nächste Folie)$/,
            }),
        );
        await waitFor(() => expect(root).toHaveAttribute('data-selected', '0'));
    },
};
export const Responsive: StoryObj = {
    args: {
        slidesPerView: { base: 1, md: 2, lg: 3 },
        gap: { base: 12, md: 20, lg: 24 },
        align: 'start',
        slidesToScroll: 'auto',
    },
    argTypes: {
        slidesPerView: { control: 'object' },
        gap: { control: 'object' },
    },
};
export const GroupedSlides: StoryObj = {
    args: { slidesPerView: 2, slidesToScroll: 2, align: 'start' },
};
export const DragFree: StoryObj = {
    args: {
        slidesPerView: 2.5,
        dragFree: true,
        loop: true,
        pagination: 'progress',
    },
};
export const DragFreeSnap: StoryObj = {
    args: { slidesPerView: 2.5, dragFree: 'snap', loop: true },
};
export const Vertical: StoryObj = {
    args: {
        orientation: 'vertical',
        height: 400,
        slidesPerView: 2,
        align: 'start',
    },
};
export const RightToLeft: StoryObj = {
    args: { direction: 'rtl', slidesPerView: 1.5, loop: true },
};
export const Autoplay: StoryObj = {
    args: { autoplay: true, autoplayDelay: 2500, loop: true },
};
export const AutoplayControls: StoryObj = {
    args: { autoplay: true, autoplayDelay: 300, loop: true },
    play: async ({ canvasElement }) => {
        const root = await rootOf(canvasElement);
        await waitFor(() => expect(root).toHaveAttribute('data-playing', 'true'));
        await waitFor(() => expect(root).not.toHaveAttribute('data-selected', '0'), {
            timeout: 3000,
        });
        await userEvent.click(
            root.querySelector<HTMLButtonElement>('[data-slot="carousel-play"]')!,
        );
        await waitFor(() => expect(root).toHaveAttribute('data-playing', 'false'));
        await expect(root.querySelector('[data-slot="carousel-play"]')).toHaveAttribute(
            'aria-pressed',
            'false',
        );
    },
};
export const AutoScroll: StoryObj = {
    args: {
        autoScroll: true,
        autoScrollSpeed: 1.5,
        loop: true,
        slidesPerView: 2.5,
        pagination: 'none',
    },
};
export const AutoHeight: StoryObj = { args: { autoHeight: true } };
export const Fade: StoryObj = {
    args: { effect: 'fade', autoplay: true, loop: true, autoplayDelay: 3500 },
};
export const Scale: StoryObj = {
    args: { effect: 'scale', slidesPerView: 1.5, loop: true },
};
export const Parallax: StoryObj = { args: { effect: 'parallax', loop: true } };
export const Opacity: StoryObj = {
    args: { effect: 'opacity', slidesPerView: 2.5, loop: true },
};
export const SlowTransition: StoryObj = { args: { duration: 60, loop: true } };
export const WithoutControls: StoryObj = {
    args: { navigation: false, pagination: 'none', slidesPerView: 2, loop: true },
};
export const Disabled: StoryObj = { args: { disabled: true } };
export const SingleSlide: StoryObj = { args: { single: true } };
export const Empty: StoryObj = { args: { empty: true } };
