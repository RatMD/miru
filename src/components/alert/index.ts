export { default as Alert } from './Alert.vue';
export { default as AlertDescription } from './AlertDescription.vue';
export { default as AlertTitle } from './AlertTitle.vue';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const alertColorVariants = [
    'default',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
] as const;

export const alertVariants = cva(
    'relative grid min-h-[64px] w-full grid-cols-[auto_1fr] grid-rows-[auto] items-center gap-x-3 gap-y-0.5 overflow-hidden rounded-xl border-2 border-white bg-background px-3 py-2.5 text-foreground shadow-md dark:border-gray-950 dark:bg-gray-950 ring-1 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1 [&>svg]:size-9 [&>svg]:shrink-0 [&>svg]:rounded-xl [&>svg]:p-[7.5px] [&>svg]:col-start-1 [&>svg]:row-start-1 [&>svg]:row-end-[-1] [&>svg]:self-center [&:has(>[data-slot=alert-title]):has(>[data-slot=alert-description])]:grid-rows-[auto_auto] data-[icon=false]:grid-cols-1 data-[icon=false]:pl-5 data-[icon=false]:[&>[data-slot]]:col-start-1',
    {
        variants: {
            variant: {
                default:
                    'ring-gray-300 dark:ring-gray-700 before:bg-gray-400 [&>[data-slot=alert-icon]]:bg-gray-100 [&>[data-slot=alert-icon]]:text-gray-700 dark:[&>[data-slot=alert-icon]]:bg-gray-800 dark:[&>[data-slot=alert-icon]]:text-gray-300 [&>svg]:bg-gray-100 [&>svg]:text-gray-700 dark:[&>svg]:bg-gray-800 dark:[&>svg]:text-gray-300',
                info: 'ring-info-300 dark:ring-info-700 before:bg-info-500 [&>[data-slot=alert-icon]]:bg-info-100 [&>[data-slot=alert-icon]]:text-info-600 dark:[&>[data-slot=alert-icon]]:bg-info-900 dark:[&>[data-slot=alert-icon]]:text-info-300 [&>svg]:bg-info-100 [&>svg]:text-info-600 dark:[&>svg]:bg-info-900 dark:[&>svg]:text-info-300',
                accent: 'ring-accent-300 dark:ring-accent-700 before:bg-accent-500 [&>[data-slot=alert-icon]]:bg-accent-100 [&>[data-slot=alert-icon]]:text-accent-600 dark:[&>[data-slot=alert-icon]]:bg-accent-900 dark:[&>[data-slot=alert-icon]]:text-accent-300 [&>svg]:bg-accent-100 [&>svg]:text-accent-600 dark:[&>svg]:bg-accent-900 dark:[&>svg]:text-accent-300',
                success:
                    'ring-success-300 dark:ring-success-700 before:bg-success-500 [&>[data-slot=alert-icon]]:bg-success-100 [&>[data-slot=alert-icon]]:text-success-600 dark:[&>[data-slot=alert-icon]]:bg-success-900 dark:[&>[data-slot=alert-icon]]:text-success-300 [&>svg]:bg-success-100 [&>svg]:text-success-600 dark:[&>svg]:bg-success-900 dark:[&>svg]:text-success-300',
                warning:
                    'ring-warning-300 dark:ring-warning-700 before:bg-warning-500 [&>[data-slot=alert-icon]]:bg-warning-100 [&>[data-slot=alert-icon]]:text-warning-600 dark:[&>[data-slot=alert-icon]]:bg-warning-900 dark:[&>[data-slot=alert-icon]]:text-warning-300 [&>svg]:bg-warning-100 [&>svg]:text-warning-600 dark:[&>svg]:bg-warning-900 dark:[&>svg]:text-warning-300',
                danger: 'ring-danger-300 dark:ring-danger-700 before:bg-danger-500 [&>[data-slot=alert-icon]]:bg-danger-100 [&>[data-slot=alert-icon]]:text-danger-600 dark:[&>[data-slot=alert-icon]]:bg-danger-900 dark:[&>[data-slot=alert-icon]]:text-danger-300 [&>svg]:bg-danger-100 [&>svg]:text-danger-600 dark:[&>svg]:bg-danger-900 dark:[&>svg]:text-danger-300',
            },
            appearance: {
                default: '',
                soft: 'gap-x-4 gap-y-1 border p-4 shadow-none ring-0 before:hidden [&>[data-slot=alert-title]]:text-sm/5 [&>[data-slot=alert-title]]:text-inherit [&>[data-slot=alert-description]]:font-normal [&>[data-slot=alert-description]]:text-foreground [&>[data-slot=alert-icon]]:size-12 [&>[data-slot=alert-icon]]:rounded-full [&>[data-slot=alert-icon]]:border [&>[data-slot=alert-icon]]:border-current/15 [&>[data-slot=alert-icon]]:bg-current/5 [&>[data-slot=alert-icon]]:text-inherit dark:[&>[data-slot=alert-icon]]:bg-current/5 dark:[&>[data-slot=alert-icon]]:text-inherit [&>[data-slot=alert-icon]>svg]:size-6 [&>svg]:size-12 [&>svg]:rounded-full [&>svg]:border [&>svg]:border-current/15 [&>svg]:bg-current/5 [&>svg]:p-3 [&>svg]:text-inherit dark:[&>svg]:bg-current/5 dark:[&>svg]:text-inherit',
            },
        },
        compoundVariants: [
            {
                appearance: 'soft',
                variant: 'default',
                class: 'border-border bg-gray-100 text-foreground dark:border-border dark:bg-background',
            },
            {
                appearance: 'soft',
                variant: 'accent',
                class: 'border-accent-200 bg-accent-50 text-accent-700 dark:border-accent-800/60 dark:bg-accent-950/40 dark:text-accent-400',
            },
            {
                appearance: 'soft',
                variant: 'info',
                class: 'border-info-200 bg-info-50 text-info-700 dark:border-info-800/60 dark:bg-info-950/40 dark:text-info-400',
            },
            {
                appearance: 'soft',
                variant: 'success',
                class: 'border-success-200 bg-success-50 text-success-700 dark:border-success-800/60 dark:bg-success-950/40 dark:text-success-400',
            },
            {
                appearance: 'soft',
                variant: 'warning',
                class: 'border-warning-200 bg-warning-50 text-warning-700 dark:border-warning-800/60 dark:bg-warning-950/40 dark:text-warning-400',
            },
            {
                appearance: 'soft',
                variant: 'danger',
                class: 'border-danger-200 bg-danger-50 text-danger-700 dark:border-danger-800/60 dark:bg-danger-950/40 dark:text-danger-400',
            },
        ],
        defaultVariants: { variant: 'default', appearance: 'default' },
    },
);
export type AlertVariants = VariantProps<typeof alertVariants>;
