import { buttonColorVariants } from '../button';
export type ButtonActionColor = Exclude<(typeof buttonColorVariants)[number], 'ghost' | 'ghostly'>;
export const buttonActionColorVariants = buttonColorVariants.filter(
    (color): color is ButtonActionColor => color !== 'ghost' && color !== 'ghostly',
);
export type ButtonActionBorderless = 'no' | 'effect' | 'yes';
