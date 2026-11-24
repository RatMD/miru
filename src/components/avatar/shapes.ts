import type { AvatarVariants } from './variants';
import type { CSSProperties } from 'vue';
import { floatingAppBarHexagonPath } from '../app-bar/types';

type AvatarShape = NonNullable<AvatarVariants['shape']>;

const paths: Record<AvatarShape, string> = {
    round: 'M50 0a50 50 0 1 0 0 100a50 50 0 1 0 0-100Z',
    square: 'M18.75 0H81.25Q100 0 100 18.75V81.25Q100 100 81.25 100H18.75Q0 100 0 81.25V18.75Q0 0 18.75 0Z',
    squircle: 'M50 0C92 0 100 8 100 50C100 92 92 100 50 100C8 100 0 92 0 50C0 8 8 0 50 0Z',
    hexagon: floatingAppBarHexagonPath,
};

/** Preserve the AppBar hexagon's aspect ratio and center its 200 by 182 outline. */
function outline(shape: AvatarShape): string {
    const transform = shape === 'hexagon' ? ' transform="translate(0 4.5) scale(.5)"' : '';

    return `<path d="${paths[shape]}"${transform} vector-effect="non-scaling-stroke"/>`;
}

/** Encode a normalized SVG as a CSS image without external assets or document IDs. */
function svgImage(content: string): string {
    return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${content}</svg>`)}")`;
}

/** Share the squircle and rounded hexagon outline between images, fallbacks and stack cutouts. */
function avatarMaskStyle(shape: AvatarVariants['shape']): CSSProperties | undefined {
    if (shape !== 'squircle' && shape !== 'hexagon') {
        return undefined;
    }

    return {
        maskImage: svgImage(outline(shape)),
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
    };
}

/** Cut the next avatar's silhouette and a transparent gap out of the current item's alpha mask. */
function avatarCutout(
    shape: AvatarShape,
    currentSize: number,
    nextSize: number,
    overlap: number,
    rtl = false,
): string {
    const scale = nextSize / currentSize;
    const x = ((rtl ? overlap - nextSize : currentSize - overlap) / currentSize) * 100;
    const y = ((currentSize - nextSize) / currentSize) * 50;

    return svgImage(
        `<mask id="cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100" style="mask-type:luminance"><rect width="100" height="100" fill="white"/><g transform="translate(${x} ${y}) scale(${scale})" fill="black" stroke="black" stroke-width="8" stroke-linejoin="round">${outline(shape)}</g></mask><rect width="100" height="100" fill="white" mask="url(#cutout)"/>`,
    );
}

export { avatarMaskStyle, avatarCutout };
