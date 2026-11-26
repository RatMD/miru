import type { CSSProperties } from 'vue';

/** Cut the measured pill/circle out of the target's alpha channel, preserving surrounding shadows. */
export function indicatorMask(
    targetWidth: number,
    targetHeight: number,
    x: number,
    y: number,
    width: number,
    height: number,
    gap: number,
): CSSProperties {
    const spacing = Number.isFinite(gap) ? Math.max(0, gap) : 2;
    const padding = Math.max(32, spacing);
    const round = (value: number) => Math.round(value * 1000) / 1000;
    const canvasWidth = round(targetWidth + padding * 2),
        canvasHeight = round(targetHeight + padding * 2);
    const holeWidth = round(width + spacing * 2),
        holeHeight = round(height + spacing * 2);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="${-padding} ${-padding} ${canvasWidth} ${canvasHeight}"><defs><mask id="hole" maskUnits="userSpaceOnUse" x="${-padding}" y="${-padding}" width="${canvasWidth}" height="${canvasHeight}" style="mask-type:luminance"><rect x="${-padding}" y="${-padding}" width="${canvasWidth}" height="${canvasHeight}" fill="white"/><rect x="${round(x - spacing)}" y="${round(y - spacing)}" width="${holeWidth}" height="${holeHeight}" rx="${round(holeHeight / 2)}" fill="black"/></mask></defs><rect x="${-padding}" y="${-padding}" width="${canvasWidth}" height="${canvasHeight}" fill="white" mask="url(#hole)"/></svg>`;
    const image = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    const size = `${canvasWidth}px ${canvasHeight}px`,
        position = `${-padding}px ${-padding}px`;
    return {
        maskImage: image,
        WebkitMaskImage: image,
        maskSize: size,
        WebkitMaskSize: size,
        maskPosition: position,
        WebkitMaskPosition: position,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskClip: 'no-clip',
        WebkitMaskClip: 'no-clip',
    };
}

/** Preserve labels verbatim; only numeric values participate in the optional count cap. */
export function indicatorValue(
    value: string | number | null | undefined,
    max?: number,
): string | undefined {
    if (value === undefined || value === null || value === '') return undefined;
    return typeof value === 'number' && max !== undefined && Number.isFinite(max) && value > max
        ? `${max}+`
        : String(value);
}
/** Choose readable text for opaque custom hex colors; other CSS colors can override foreground. */
export function indicatorInk(color: string): string {
    const hex = color.replace(/^#/, '');
    if (!color.startsWith('#') || !/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(hex)) return '#ffffff';
    const full = hex.length === 3 ? [...hex].map((char) => char + char).join('') : hex;
    const rgb = [0, 2, 4].map((offset) => {
        const channel = parseInt(full.slice(offset, offset + 2), 16) / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    const luminance = 0.2126 * rgb[0]! + 0.7152 * rgb[1]! + 0.0722 * rgb[2]!;
    return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05) ? '#000000' : '#ffffff';
}
