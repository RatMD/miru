import type { BreakpointMap, BreakpointValue } from '../constants/breakpoints';
import type { ScreenOrientation } from './useClient';
import type { MaybeRefOrGetter } from 'vue';
import { computed, hasInjectionContext, inject, toValue } from 'vue';
import { defaultBreakpoints } from '../constants/breakpoints';
import { miruOptionsKey } from '../miru';
import { useClient } from './useClient';

interface BreakpointOptions {
    min?: BreakpointValue;
    /** Exclusive upper bound: max=md matches widths below md. */
    max?: BreakpointValue;
    orientation?: ScreenOrientation | null;
    breakpoints?: BreakpointMap;
    /** Deterministic initial viewport, used on both server and initial client render. */
    ssrWidth?: number;
    ssrHeight?: number;
}

/** Resolve reactive viewport rules using local, app-configured or default thresholds. */
function useBreakpoint(options: MaybeRefOrGetter<BreakpointOptions> = {}) {
    const config = hasInjectionContext() ? inject(miruOptionsKey, {}) : {};
    const client = useClient();
    const settings = computed(() => toValue(options));
    const breakpoints = computed(() => ({
        ...defaultBreakpoints,
        ...config.breakpoints,
        ...settings.value.breakpoints,
    }));
    const width = computed(() =>
        client.isSupported.value ? client.screen.width : (settings.value.ssrWidth ?? 0),
    );
    const height = computed(() =>
        client.isSupported.value ? client.screen.height : (settings.value.ssrHeight ?? 0),
    );
    const orientation = computed<ScreenOrientation | undefined>(() =>
        width.value && height.value
            ? width.value > height.value
                ? 'landscape'
                : 'portrait'
            : undefined,
    );
    const ready = computed(() => client.isSupported.value || settings.value.ssrWidth !== undefined);

    /** Resolve a named threshold; reject misspellings instead of silently matching everything. */
    function resolve(value: BreakpointValue): number {
        const result =
            typeof value === 'number'
                ? value
                : value === null
                  ? 0
                  : (breakpoints.value as BreakpointMap)[value];
        if (result === undefined || !Number.isFinite(result) || result < 0) {
            throw new RangeError(`Unknown or invalid breakpoint: ${String(value)}`);
        }
        return result;
    }
    function between(min?: BreakpointValue, max?: BreakpointValue): boolean {
        return (
            ready.value &&
            (min == null || width.value >= resolve(min)) &&
            (max == null || width.value < resolve(max))
        );
    }
    const matches = computed(
        () =>
            between(settings.value.min, settings.value.max) &&
            (!settings.value.orientation || orientation.value === settings.value.orientation),
    );
    const current = computed(() =>
        ready.value
            ? Object.entries(breakpoints.value)
                  .filter(([, threshold]) => width.value >= threshold)
                  .sort((a, b) => b[1] - a[1])[0]?.[0]
            : undefined,
    );

    return {
        dispose: client.dispose,
        matches,
        width,
        height,
        orientation,
        current,
        breakpoints,
        ready,
        resolve,
        between,
        greaterOrEqual: (value: BreakpointValue) => computed(() => between(value)),
        smaller: (value: BreakpointValue) => computed(() => between(undefined, value)),
    };
}

export { useBreakpoint };
export type { BreakpointOptions };
