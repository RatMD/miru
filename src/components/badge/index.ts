import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Badge } from './Badge.vue';

/** The same semantic colors as Button. */
export const badgeColorVariants = [
    'default',
    'primary',
    'secondary',
    'accent',
    'outline',
    'ghost',
    'danger',
    'warning',
    'success',
    'info',
    'ghostly',
] as const;

// Dark badges use palette-based tints so host color overrides also apply.
export const badgeVariants = cva(
    'miru-badge data-[interactive=true]:cursor-pointer inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 [&>svg]:pointer-events-none [&>svg]:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-neutral-950 text-white data-[interactive=true]:hover:bg-neutral-800 dark:border-neutral-400/30 dark:bg-neutral-400/10 dark:text-neutral-300 dark:data-[interactive=true]:hover:bg-neutral-400/20',
                primary:
                    'border-transparent bg-primary-600 text-white data-[interactive=true]:hover:bg-primary-700 dark:border-primary-400/30 dark:bg-primary-400/10 dark:text-primary-300 dark:data-[interactive=true]:hover:bg-primary-400/20',
                secondary:
                    'border-transparent bg-secondary-600 text-white data-[interactive=true]:hover:bg-secondary-700 dark:border-secondary-400/30 dark:bg-secondary-400/10 dark:text-secondary-300 dark:data-[interactive=true]:hover:bg-secondary-400/20',
                accent: 'border-transparent bg-accent-600 text-accent-foreground data-[interactive=true]:hover:bg-accent-700 dark:border-accent-400/30 dark:bg-accent-400/10 dark:text-accent-300 dark:data-[interactive=true]:hover:bg-accent-400/20',
                outline:
                    'border-input bg-background text-foreground data-[interactive=true]:hover:bg-outline-hover',
                ghost: 'border-transparent bg-transparent text-foreground data-[interactive=true]:hover:bg-surface-hover data-[interactive=true]:hover:text-surface-hover-foreground',
                danger: 'border-transparent bg-danger-600 text-white data-[interactive=true]:hover:bg-danger-700 dark:border-danger-400/30 dark:bg-danger-400/10 dark:text-danger-300 dark:data-[interactive=true]:hover:bg-danger-400/20',
                warning:
                    'border-transparent bg-warning-400 text-warning-950 data-[interactive=true]:hover:bg-warning-500 dark:border-warning-400/30 dark:bg-warning-400/10 dark:text-warning-300 dark:data-[interactive=true]:hover:bg-warning-400/20',
                success:
                    'border-transparent bg-success-600 text-white data-[interactive=true]:hover:bg-success-700 dark:border-success-400/30 dark:bg-success-400/10 dark:text-success-300 dark:data-[interactive=true]:hover:bg-success-400/20',
                info: 'border-transparent bg-info-600 text-white data-[interactive=true]:hover:bg-info-700 dark:border-info-400/30 dark:bg-info-400/10 dark:text-info-300 dark:data-[interactive=true]:hover:bg-info-400/20',
                ghostly:
                    'border-transparent bg-ghostly text-ghostly-foreground data-[interactive=true]:hover:bg-ghostly-hover dark:border-neutral-400/30 dark:bg-neutral-400/10 dark:text-neutral-300 dark:data-[interactive=true]:hover:bg-neutral-400/20',
            },
            size: {
                default: 'gap-1 px-2 py-0.5 text-xs [&>svg]:size-3',
                lg: 'gap-1.5 px-3 py-1 text-sm [&>svg]:size-4',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);
export type BadgeVariants = VariantProps<typeof badgeVariants>;
