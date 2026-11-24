export { default as Progress } from './Progress.vue';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const progressColorVariants = [
    'default',
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
] as const;
export const progressVariants = cva(
    'h-full w-full flex-1 transition-transform duration-300 ease-out',
    {
        variants: {
            variant: {
                default: 'bg-default',
                primary: 'bg-primary dark:bg-primary-500',
                secondary: 'bg-secondary dark:bg-secondary-500',
                accent: 'bg-accent dark:bg-accent-500',
                info: 'bg-info dark:bg-info-500',
                warning: 'bg-warning dark:bg-warning-400',
                danger: 'bg-danger dark:bg-danger-500',
                success: 'bg-success dark:bg-success-500',
            },
        },
        defaultVariants: { variant: 'default' },
    },
);
export type ProgressVariants = VariantProps<typeof progressVariants>;
