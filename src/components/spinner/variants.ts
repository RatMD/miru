import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const spinnerColorVariants = [
    'default',
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
] as const;

const spinnerVariants = cva(
    'inline-flex shrink-0 items-center justify-center align-middle [&>svg]:size-full',
    {
        variants: {
            variant: {
                default: 'text-foreground',
                primary: 'text-primary-600 dark:text-primary-300',
                secondary: 'text-secondary-600 dark:text-secondary-300',
                accent: 'text-accent-600 dark:text-accent-300',
                info: 'text-info-600 dark:text-info-300',
                success: 'text-success-600 dark:text-success-300',
                warning: 'text-warning-700 dark:text-warning-300',
                danger: 'text-danger-600 dark:text-danger-300',
            },
            size: { xs: 'size-3', sm: 'size-4', default: 'size-5', lg: 'size-6', xl: 'size-8' },
        },
        defaultVariants: { variant: 'default', size: 'default' },
    },
);

type SpinnerVariants = VariantProps<typeof spinnerVariants>;

export { spinnerVariants, spinnerColorVariants };
export type { SpinnerVariants };
