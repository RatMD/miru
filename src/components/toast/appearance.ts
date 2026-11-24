export type ToastAppearance = 'flat' | 'frost' | 'graphite';
export const toastAppearanceClasses = {
    graphite: {
        toast: 'border-white/15 bg-gray-950/95 text-white shadow-[0_14px_36px_rgb(0_0_0_/_0.28)] backdrop-blur-xl',
        title: 'text-white',
        description: 'text-gray-300!',
        closeButton: 'text-gray-400! hover:bg-white/10! hover:text-white!',
    },
    frost: {
        toast: 'border-white/70 bg-white/95 text-gray-900 shadow-[0_16px_40px_rgb(11_22_39_/_0.24)] backdrop-blur-xl',
        title: 'text-gray-900',
        description: 'text-gray-600!',
        closeButton: 'text-gray-500! hover:bg-gray-900/5! hover:text-gray-900!',
    },
    flat: {
        toast: 'border-border bg-white text-gray-900 shadow-[0_9px_24px_rgb(18_28_45_/_0.18)]',
        title: 'text-gray-900',
        description: 'text-gray-600!',
        closeButton: 'text-gray-500! hover:bg-gray-100! hover:text-gray-900!',
    },
} as const;
