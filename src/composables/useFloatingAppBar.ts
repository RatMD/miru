import type {
    FloatingAppBarOrientation,
    FloatingAppBarShape,
    FloatingAppBarTone,
    FloatingAppBarVariant,
} from '../components/app-bar/types';
import type { Component, ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue';
import {
    computed,
    getCurrentInstance,
    inject,
    onMounted,
    onScopeDispose,
    provide,
    shallowRef,
    toValue,
} from 'vue';

export interface FloatingAppBarAction {
    key: string;
    /** Use unref, not toValue: functional Vue components must not be called as getters. */
    icon: Component | Ref<Component>;
    /** A localized label or a getter that follows the application's locale. */
    label: MaybeRefOrGetter<string>;
    onClick?: () => void | Promise<void>;
    disabled?: MaybeRefOrGetter<boolean>;
    loading?: MaybeRefOrGetter<boolean>;
    tone?: FloatingAppBarTone;
}

/** Router-independent state; the host renders actions and owns all business behavior. */
export interface FloatingAppBarConfig {
    variant: FloatingAppBarVariant;
    primary: FloatingAppBarAction;
    left?: readonly FloatingAppBarAction[];
    right?: readonly FloatingAppBarAction[];
    auxiliaryStart?: FloatingAppBarAction;
    auxiliaryEnd?: FloatingAppBarAction;
    shape?: FloatingAppBarShape;
    appearance?: 'solid' | 'gradient';
    gradientTone?: FloatingAppBarTone;
    orientation?: FloatingAppBarOrientation;
    bordered?: boolean;
    animated?: boolean;
    auxiliaryPosition?: 'adjacent' | 'edge';
}

export type FloatingAppBarSource = MaybeRefOrGetter<FloatingAppBarConfig | null>;
export type FloatingAppBarRelease = () => void;

export interface FloatingAppBarController {
    current: ComputedRef<FloatingAppBarConfig | null>;
    /** Stable while only labels/disabled values change, new for each set/push/pop or layout change. */
    transitionKey: ComputedRef<string>;
    depth: ComputedRef<number>;
    /** Set page state and discard temporary layers from the previous page. */
    set: (source: FloatingAppBarSource) => void;
    /** Returns an idempotent release function that removes only its own layer. */
    push: (source: FloatingAppBarSource) => FloatingAppBarRelease;
    pop: () => void;
    clear: () => void;
    reset: () => void;
}

interface Entry {
    id: number;
    source: FloatingAppBarSource;
}

/** Create an isolated controller, also usable without Vue injection in a host adapter. */
export function createFloatingAppBarController(
    initial: FloatingAppBarSource = null,
): FloatingAppBarController {
    let sequence = 0;
    const entry = (source: FloatingAppBarSource): Entry => ({ id: ++sequence, source });
    const base = shallowRef(entry(initial));
    const layers = shallowRef<readonly Entry[]>([]);
    const active = computed(() => layers.value.at(-1) ?? base.value);
    const current = computed<FloatingAppBarConfig | null>(() => toValue(active.value.source));
    const transitionKey = computed(() => `${active.value.id}:${current.value?.variant ?? 'empty'}`);
    const depth = computed(() => layers.value.length);

    function set(source: FloatingAppBarSource): void {
        base.value = entry(source);
        layers.value = [];
    }
    function push(source: FloatingAppBarSource): FloatingAppBarRelease {
        const layer = entry(source);
        layers.value = [...layers.value, layer];
        return (): void => {
            layers.value = layers.value.filter((candidate) => candidate.id !== layer.id);
        };
    }
    return {
        current,
        transitionKey,
        depth,
        set,
        push,
        pop: (): void => {
            layers.value = layers.value.slice(0, -1);
        },
        clear: (): void => set(null),
        reset: (): void => set(initial),
    };
}

const floatingAppBarKey: InjectionKey<FloatingAppBarController> = Symbol(
    'FloatingAppBarController',
);

/** Provide once in a layout. Nested providers and separate apps never share controller state. */
export function provideFloatingAppBar(
    initial: FloatingAppBarSource = null,
): FloatingAppBarController {
    if (!getCurrentInstance())
        throw new Error('provideFloatingAppBar must be called during component setup.');
    const controller = createFloatingAppBarController(initial);
    provide(floatingAppBarKey, controller);
    return controller;
}

/** Consume the nearest controller, optionally registering a page-owned temporary configuration. */
export function useFloatingAppBar(source?: FloatingAppBarSource): FloatingAppBarController {
    const controller = inject(floatingAppBarKey, undefined);
    if (!controller)
        throw new Error('useFloatingAppBar requires an ancestor calling provideFloatingAppBar.');
    if (source !== undefined) {
        let release: FloatingAppBarRelease | undefined;
        onMounted(() => {
            release = controller.push(source);
        });
        onScopeDispose(() => release?.());
    }
    return controller;
}
