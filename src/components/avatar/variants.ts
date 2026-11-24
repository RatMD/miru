import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { buttonColorVariants } from '../button';
export const avatarColorVariants = buttonColorVariants.filter(
    (color): color is Exclude<(typeof buttonColorVariants)[number], 'ghost'> => color !== 'ghost',
);
export const avatarShapeClasses = {
    round: 'rounded-full',
    square: 'rounded-md',
    squircle: 'miru-avatar-squircle rounded-none',
    hexagon: 'miru-avatar-hexagon rounded-none',
};
export const avatarVariants = cva(
    'relative inline-flex shrink-0 overflow-hidden items-center justify-center',
    {
        variants: {
            size: {
                xs: 'size-5 text-[10px]',
                sm: 'size-6 text-xs',
                default: 'size-8 text-sm',
                lg: 'size-12 text-lg',
                xl: 'size-16 text-xl',
            },
            shape: avatarShapeClasses,
            tone: {
                default: 'bg-default text-default-foreground',
                primary: 'bg-primary text-primary-foreground',
                secondary: 'bg-secondary text-secondary-foreground',
                accent: 'bg-accent text-accent-foreground',
                outline: 'border border-input bg-outline text-outline-foreground',
                ghostly: 'bg-neutral-300 text-neutral-950 dark:bg-neutral-700 dark:text-neutral-50',
                info: 'bg-info text-info-foreground',
                success: 'bg-success text-success-foreground',
                warning: 'bg-warning text-warning-foreground',
                danger: 'bg-danger text-danger-foreground',
            },
        },
        defaultVariants: { size: 'default', shape: 'round', tone: 'default' },
    },
);
export type AvatarVariants = VariantProps<typeof avatarVariants>;
