import { cva } from 'class-variance-authority';

const inlineColorVariants = [
    'default',
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
] as const;
type InlineVariant = (typeof inlineColorVariants)[number];
const inlineTextVariants = cva('', {
    variants: {
        variant: {
            default: 'text-foreground',
            primary: 'text-primary-700 dark:text-primary-300',
            secondary: 'text-secondary-700 dark:text-secondary-300',
            accent: 'text-accent-700 dark:text-accent-300',
            info: 'text-info-700 dark:text-info-300',
            success: 'text-success-700 dark:text-success-300',
            warning: 'text-warning-700 dark:text-warning-300',
            danger: 'text-danger-700 dark:text-danger-300',
        },
    },
    defaultVariants: { variant: 'default' },
});

const inlineHoverVariants = cva('', {
    variants: {
        variant: {
            default:
                '[&:not([aria-disabled=true])]:hover:text-neutral-600 dark:[&:not([aria-disabled=true])]:hover:text-neutral-300',
            primary:
                '[&:not([aria-disabled=true])]:hover:text-primary-900 dark:[&:not([aria-disabled=true])]:hover:text-primary-100',
            secondary:
                '[&:not([aria-disabled=true])]:hover:text-secondary-900 dark:[&:not([aria-disabled=true])]:hover:text-secondary-100',
            accent: '[&:not([aria-disabled=true])]:hover:text-accent-900 dark:[&:not([aria-disabled=true])]:hover:text-accent-100',
            info: '[&:not([aria-disabled=true])]:hover:text-info-900 dark:[&:not([aria-disabled=true])]:hover:text-info-100',
            success:
                '[&:not([aria-disabled=true])]:hover:text-success-900 dark:[&:not([aria-disabled=true])]:hover:text-success-100',
            warning:
                '[&:not([aria-disabled=true])]:hover:text-warning-900 dark:[&:not([aria-disabled=true])]:hover:text-warning-100',
            danger: '[&:not([aria-disabled=true])]:hover:text-danger-900 dark:[&:not([aria-disabled=true])]:hover:text-danger-100',
        },
    },
    defaultVariants: { variant: 'primary' },
});

const inlineActiveTextVariants = cva('', {
    variants: {
        variant: {
            default: 'data-[state=active]:text-foreground',
            primary:
                'data-[state=active]:text-primary-700 dark:data-[state=active]:text-primary-300',
            secondary:
                'data-[state=active]:text-secondary-700 dark:data-[state=active]:text-secondary-300',
            accent: 'data-[state=active]:text-accent-700 dark:data-[state=active]:text-accent-300',
            info: 'data-[state=active]:text-info-700 dark:data-[state=active]:text-info-300',
            success:
                'data-[state=active]:text-success-700 dark:data-[state=active]:text-success-300',
            warning:
                'data-[state=active]:text-warning-700 dark:data-[state=active]:text-warning-300',
            danger: 'data-[state=active]:text-danger-700 dark:data-[state=active]:text-danger-300',
        },
    },
});

export { inlineColorVariants, inlineTextVariants, inlineHoverVariants, inlineActiveTextVariants };
export type { InlineVariant };
