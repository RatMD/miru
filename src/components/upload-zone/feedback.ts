import { ref } from 'vue';

/** A new attempt cancels old feedback; only success expires automatically. */
export function createUploadFeedback(successDuration = 3000) {
    const state = ref<'idle' | 'success' | 'error'>('idle');
    let timer: ReturnType<typeof setTimeout> | undefined;
    function reset(): void {
        clearTimeout(timer);
        timer = undefined;
        state.value = 'idle';
    }
    function success(): void {
        reset();
        state.value = 'success';
        timer = setTimeout(reset, successDuration);
    }
    function error(): void {
        reset();
        state.value = 'error';
    }
    return { state, reset, success, error };
}
