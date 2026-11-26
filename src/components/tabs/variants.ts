import { cva } from 'class-variance-authority';

/** Subtle selected surfaces, independent of the site's sidebar styling. */
export const buttonTabVariants = cva('', {
    variants: {
        variant: {
            default: 'data-[state=active]:bg-muted/70 dark:data-[state=active]:bg-muted/50',
            primary:
                'data-[state=active]:bg-primary-500/10 dark:data-[state=active]:bg-primary-400/15',
            secondary:
                'data-[state=active]:bg-secondary-500/10 dark:data-[state=active]:bg-secondary-400/15',
            accent: 'data-[state=active]:bg-accent-500/10 dark:data-[state=active]:bg-accent-400/15',
            info: 'data-[state=active]:bg-info-500/10 dark:data-[state=active]:bg-info-400/15',
            success:
                'data-[state=active]:bg-success-500/10 dark:data-[state=active]:bg-success-400/15',
            warning:
                'data-[state=active]:bg-warning-500/10 dark:data-[state=active]:bg-warning-400/15',
            danger: 'data-[state=active]:bg-danger-500/10 dark:data-[state=active]:bg-danger-400/15',
        },
    },
});
