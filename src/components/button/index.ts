import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';

/** Supported colors; legacy MIRU variant names are intentionally excluded. */
export const buttonColorVariants = [
    'default',
    'primary',
    'secondary',
    'accent',
    'outline',
    'ghost',
    'ghostly',
    'info',
    'success',
    'warning',
    'danger',
] as const;

/** MIRU sizes, shape and icon behavior with application-independent theme colors. */
export const buttonVariants = cva(
    [
        'box-border inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-sans text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,opacity] duration-200',
        "shrink-0 border-0 border-solid outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        '[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:inset-shadow-pressed',
        'disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        'aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40',
    ],
    {
        variants: {
            variant: {
                default:
                    'bg-default text-default-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-default-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-default-active dark:border dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:border-neutral-500 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-neutral-700 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:text-neutral-100 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:border-neutral-700 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-neutral-900',
                primary:
                    'bg-primary text-primary-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-primary-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-primary-active focus-visible:ring-primary/50 dark:border dark:border-primary-border dark:bg-primary-900 dark:text-(--ui-primary-900-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:border-primary-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-primary-800 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:text-(--ui-primary-800-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:border-primary-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-primary-950 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:text-(--ui-primary-950-foreground)',
                secondary:
                    'bg-secondary text-secondary-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-secondary-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-secondary-active focus-visible:ring-secondary/50 dark:border dark:border-secondary-border dark:bg-secondary-900 dark:text-(--ui-secondary-900-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:border-secondary-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-secondary-800 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:text-(--ui-secondary-800-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:border-secondary-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-secondary-950 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:text-(--ui-secondary-950-foreground)',
                accent: 'bg-accent text-accent-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-accent-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-accent-active focus-visible:ring-accent/50 dark:border dark:border-accent-border dark:bg-accent-900 dark:text-(--ui-accent-900-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:border-accent-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-accent-800 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:text-(--ui-accent-800-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:border-accent-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-accent-950 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:text-(--ui-accent-950-foreground)',
                outline:
                    'border border-border shadow-[var(--ui-button-outline-shadow)] bg-outline text-outline-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-outline-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-outline-active',
                ghost: 'bg-ghost text-ghost-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-ghost-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-ghost-active',
                ghostly:
                    'bg-ghostly text-ghostly-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-ghostly-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-ghostly-active',
                info: 'bg-info text-info-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-info-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-info-active focus-visible:ring-info/50 dark:border dark:border-info-border dark:bg-info-900 dark:text-(--ui-info-900-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:border-info-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-info-800 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:text-(--ui-info-800-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:border-info-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-info-950 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:text-(--ui-info-950-foreground)',
                success:
                    'bg-success text-success-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-success-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-success-active focus-visible:ring-success/50 dark:border dark:border-success-border dark:bg-success-900 dark:text-(--ui-success-900-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:border-success-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-success-800 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:text-(--ui-success-800-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:border-success-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-success-950 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:text-(--ui-success-950-foreground)',
                warning:
                    'bg-warning text-warning-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-warning-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-warning-active focus-visible:ring-warning/50 dark:border dark:border-warning-border dark:bg-warning-900 dark:text-(--ui-warning-900-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:border-warning-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-warning-800 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:text-(--ui-warning-800-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:border-warning-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-warning-950 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:text-(--ui-warning-950-foreground)',
                danger: 'bg-danger text-danger-foreground [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-danger-hover [&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-danger-active focus-visible:ring-danger/50 dark:border dark:border-danger-border dark:bg-danger-900 dark:text-(--ui-danger-900-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:border-danger-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:bg-danger-800 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:hover:text-(--ui-danger-800-foreground) dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:border-danger-border dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:bg-danger-950 dark:[&:not(:disabled):not([aria-disabled=true]):not([data-disabled])]:active:text-(--ui-danger-950-foreground)',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                xs: "h-6 gap-1 rounded-sm px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: 'h-8 gap-1.5 rounded px-3 text-xs has-[>svg]:px-2.5',
                lg: "h-12 gap-2.5 rounded-lg px-6 py-3 text-base has-[>svg]:px-5 [&_svg:not([class*='size-'])]:size-5",
            },
            shape: { default: '', round: 'rounded-full' },
            iconOnly: { true: 'p-0 has-[>svg]:px-0', false: '' },
        },
        compoundVariants: [
            {
                variant: ['outline', 'ghost', 'ghostly'],
                class: '[--ui-pressed-shadow:var(--ui-pressed-shadow-subtle)]',
            },
            { iconOnly: true, size: 'xs', class: 'size-6' },
            { iconOnly: true, size: 'sm', class: 'size-8' },
            { iconOnly: true, size: 'default', class: 'size-9' },
            { iconOnly: true, size: 'lg', class: 'size-12' },
            { shape: 'round', iconOnly: false, size: 'xs', class: 'px-3 has-[>svg]:px-2' },
            { shape: 'round', iconOnly: false, size: 'sm', class: 'px-4 has-[>svg]:px-3' },
            { shape: 'round', iconOnly: false, size: 'default', class: 'px-5 has-[>svg]:px-4' },
            { shape: 'round', iconOnly: false, size: 'lg', class: 'px-7 has-[>svg]:px-6' },
        ],
        defaultVariants: { variant: 'default', size: 'default', shape: 'default', iconOnly: false },
    },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
