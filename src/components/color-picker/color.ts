import type { ColorPickerOutputFormat, ColorPickerSwatch } from './types';
import type { Color } from 'reka-ui';
import { colorToString, parseColor } from 'reka-ui';

/** Accept the formats supported by Reka, while rejecting out-of-range external data. */
export function readColor(value: unknown): Color | undefined {
    if (typeof value !== 'string' || !value.trim()) return;
    try {
        // Reka calls this space HSB; accept our public HSV spelling on input too.
        const color = parseColor(value.trim().replace(/^hsv(a?)\(/i, 'hsb$1('));
        const values =
            color.space === 'rgb'
                ? [color.r, color.g, color.b]
                : color.space === 'hsl'
                  ? [color.h, color.s, color.l]
                  : [color.h, color.s, color.b];
        const maxima = color.space === 'rgb' ? [255, 255, 255] : [360, 100, 100];
        if (
            !values.every(
                (channel, index) =>
                    Number.isFinite(channel) && channel >= 0 && channel <= maxima[index]!,
            ) ||
            !Number.isFinite(color.alpha) ||
            color.alpha < 0 ||
            color.alpha > 1
        )
            return;
        return color;
    } catch {
        return;
    }
}
export function formatColor(color: Color, format: ColorPickerOutputFormat = 'hex'): string {
    return colorToString(color, format === 'hsv' ? 'hsb' : format).replace(/^hsb/, 'hsv');
}
export function normalizeSwatches(
    values: readonly (string | ColorPickerSwatch)[],
    alpha: boolean,
): ColorPickerSwatch[] {
    const seen = new Set<string>();
    return values.flatMap((item) => {
        const color = readColor(typeof item === 'string' ? item : item.value);
        if (!color) return [];
        const value = formatColor(alpha ? color : { ...color, alpha: 1 });
        if (seen.has(value)) return [];
        seen.add(value);
        return [{ value, label: typeof item === 'string' ? item : item.label || item.value }];
    });
}
