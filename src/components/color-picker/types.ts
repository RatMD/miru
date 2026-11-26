export type ColorPickerMode = 'hex' | 'rgb' | 'hsl' | 'hsv';
export type ColorPickerOutputFormat = ColorPickerMode;
export interface ColorPickerSwatch {
    value: string;
    label?: string;
}
