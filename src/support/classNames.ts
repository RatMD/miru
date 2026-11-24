import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names and resolve Tailwind utility conflicts.
 * @param inputs Conditional class values to combine.
 * @returns The merged class string.
 */
function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

// Export module
export { cn };
