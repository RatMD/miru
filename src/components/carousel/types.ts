import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
export type CarouselOptions = EmblaOptionsType;
export type CarouselEffect = 'slide' | 'fade' | 'scale' | 'parallax' | 'opacity';
export type CarouselPagination = 'dots' | 'numbers' | 'counter' | 'progress' | 'none';
export interface CarouselResponsive<T> {
    base?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
}
/** Public template-ref methods. Vue unwraps the exposed API ref. */
export interface CarouselHandle {
    api: EmblaCarouselType | undefined;
    previous: () => void;
    next: () => void;
    goTo: (index: number, instant?: boolean) => void;
    play: () => void;
    pause: () => void;
    reInit: () => void;
}
